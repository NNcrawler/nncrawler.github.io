/**
 * Filter State Manager
 * 
 * Handles all filter state logic, parsing, and business rules.
 * Completely decoupled from DOM/UI for easy testing.
 */

export interface FilterOption {
  value: string;
  label: string;
  active: boolean;
}

export interface FilterCategory {
  name: string;
  label: string;
  options: FilterOption[];
  ignored: boolean;
}

export interface ParsedFilters {
  [categoryName: string]: string[];
}

export interface FilterState {
  categories: FilterCategory[];
  activeFilters: Record<string, string[]>;
}

export interface FilterChangeEvent {
  categoryName: string;
  filterValue: string;
  isActive: boolean;
}

export interface FilterEvaluationResult {
  shouldShow: boolean;
  matchedCategories: string[];
  unmatchedCategories: string[];
}

export class FilterStateManager {
  private state: FilterState = {
    categories: [],
    activeFilters: {}
  };

  private formatLabel(value: string): string {
    return value
      .split('-')
      .map(word => word.charAt(0).toUpperCase() + word.slice(1))
      .join(' ');
  }

  /**
   * Parse filter attribute value into consistent format
   */
  parseFilterAttribute(filterValue: string): ParsedFilters {
    try {
      // Try to parse as JSON first
      const jsonData = JSON.parse(filterValue);
      const result: ParsedFilters = {};

      Object.entries(jsonData).forEach(([categoryName, values]) => {
        const category = categoryName.toLowerCase();
        const valueArray = Array.isArray(values) ? values : [values];

        result[category] = valueArray
          .map((value: any) => String(value).toLowerCase())
          .filter(value => value.length > 0);
      });

      return result;
    } catch (error) {
      // Fallback to string parsing for backward compatibility
      const values = filterValue
        .split(/[,;\s]+/)
        .map(v => v.trim().toLowerCase())
        .filter(v => v.length > 0);

      return { category: values };
    }
  }

  /**
   * Initialize filter categories from parsed content
   */
  initializeFromContent(parsedFiltersArray: ParsedFilters[]): FilterState {
    const categoriesMap = new Map<string, Set<string>>();

    // Collect all unique categories and values
    parsedFiltersArray.forEach(parsedFilters => {
      Object.entries(parsedFilters).forEach(([categoryName, values]) => {
        if (!categoriesMap.has(categoryName)) {
          categoriesMap.set(categoryName, new Set());
        }

        values.forEach(value => {
          categoriesMap.get(categoryName)!.add(value);
        });
      });
    });

    // Convert to filter categories structure
    const categories = Array.from(categoriesMap.entries())
      .map(([categoryName, values]) => ({
        name: categoryName,
        label: this.formatLabel(categoryName),
        ignored: false, // Start with all categories not ignored
        options: Array.from(values)
          .sort()
          .map(value => ({
            value,
            label: this.formatLabel(value),
            active: true // Start with all filters active
          }))
      }))
      .sort((a, b) => a.label.localeCompare(b.label));

    // Initialize active filters with all available options
    const activeFilters: Record<string, string[]> = {};
    categories.forEach(category => {
      activeFilters[category.name] = category.options.map(option => option.value);
    });

    this.state = { categories, activeFilters };
    return this.getState();
  }

  /**
   * Handle filter toggle
   */
  toggleFilter(event: FilterChangeEvent): FilterState {
    const { categoryName, filterValue, isActive } = event;

    // Ensure category exists
    if (!this.state.activeFilters[categoryName]) {
      this.state.activeFilters[categoryName] = [];
    }

    // Update active filters
    if (isActive) {
      if (!this.state.activeFilters[categoryName].includes(filterValue)) {
        this.state.activeFilters[categoryName] = [...this.state.activeFilters[categoryName], filterValue];
      }
    } else {
      this.state.activeFilters[categoryName] = this.state.activeFilters[categoryName]
        .filter(filter => filter !== filterValue);
    }

    // Update categories state to reflect changes
    this.state.categories = this.state.categories.map(category => ({
      ...category,
      options: category.options.map(option => ({
        ...option,
        active: this.state.activeFilters[category.name]?.includes(option.value) || false
      }))
    }));

    return this.getState();
  }

  /**
   * Evaluate if an element should be shown based on its filters
   */
  evaluateElement(elementFilters: ParsedFilters): FilterEvaluationResult {
    const hasAnyActiveFilters = Object.values(this.state.activeFilters)
      .some(filters => filters.length > 0);

    if (!hasAnyActiveFilters) {
      // If no filters are active, hide everything
      return {
        shouldShow: false,
        matchedCategories: [],
        unmatchedCategories: Object.keys(this.state.activeFilters)
      };
    }

    const matchedCategories: string[] = [];
    const unmatchedCategories: string[] = [];

    // Element must match ALL categories - if any category has no active filters, hide everything
    // UNLESS the category is ignored
    const shouldShow = Object.entries(this.state.activeFilters).every(([categoryName, activeValues]) => {
      // Check if this category is ignored
      const category = this.state.categories.find(cat => cat.name === categoryName);
      if (category?.ignored) {
        return true; // Ignored categories always pass
      }

      if (!activeValues || activeValues.length === 0) {
        unmatchedCategories.push(categoryName);
        return false; // No active filters for this category means hide everything
      }

      const elementValues = elementFilters[categoryName];
      if (!elementValues || elementValues.length === 0) {
        unmatchedCategories.push(categoryName);
        return false; // Element doesn't have this category, so it doesn't match
      }

      // Check if any of the element's values for this category match active filters
      const hasMatch = elementValues.some(value => activeValues.includes(value));
      
      if (hasMatch) {
        matchedCategories.push(categoryName);
      } else {
        unmatchedCategories.push(categoryName);
      }

      return hasMatch;
    });

    return {
      shouldShow,
      matchedCategories,
      unmatchedCategories
    };
  }

  /**
   * Check if an element without filters should be shown
   */
  evaluateElementWithoutFilters(): boolean {
    const hasActiveFilters = Object.values(this.state.activeFilters)
      .some(filters => filters.length > 0);
    return !hasActiveFilters;
  }

  /**
   * Get current state (immutable copy)
   */
  getState(): FilterState {
    return {
      categories: this.state.categories.map(category => ({
        ...category,
        options: category.options.map(option => ({ ...option }))
      })),
      activeFilters: Object.fromEntries(
        Object.entries(this.state.activeFilters).map(([key, values]) => [key, [...values]])
      )
    };
  }

  /**
   * Get statistics about current filter state
   */
  getStats() {
    const totalCategories = this.state.categories.length;
    const totalOptions = this.state.categories.reduce((sum, cat) => sum + cat.options.length, 0);
    const activeOptions = Object.values(this.state.activeFilters).reduce((sum, filters) => sum + filters.length, 0);
    const categoriesWithActiveFilters = Object.values(this.state.activeFilters)
      .filter(filters => filters.length > 0).length;

    return {
      totalCategories,
      totalOptions,
      activeOptions,
      categoriesWithActiveFilters,
      hasAnyActiveFilters: activeOptions > 0
    };
  }

  /**
   * Reset all filters to active state
   */
  resetFilters(): FilterState {
    this.state.categories.forEach(category => {
      this.state.activeFilters[category.name] = category.options.map(option => option.value);
      category.options.forEach(option => {
        option.active = true;
      });
    });

    return this.getState();
  }

  /**
   * Toggle ignore state for a category
   */
  toggleIgnoreCategory(categoryName: string): FilterState {
    this.state.categories = this.state.categories.map(category => {
      if (category.name === categoryName) {
        return {
          ...category,
          ignored: !category.ignored
        };
      }
      return category;
    });

    return this.getState();
  }

  /**
   * Clear all filters (set to inactive)
   */
  clearFilters(): FilterState {
    Object.keys(this.state.activeFilters).forEach(categoryName => {
      this.state.activeFilters[categoryName] = [];
    });

    this.state.categories = this.state.categories.map(category => ({
      ...category,
      options: category.options.map(option => ({
        ...option,
        active: false
      }))
    }));

    return this.getState();
  }
}
