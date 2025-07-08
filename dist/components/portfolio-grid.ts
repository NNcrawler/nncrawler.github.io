import { LitElement, html, css } from 'lit';
import { customElement, property } from 'lit/decorators.js';
import {
  FilterStateManager,
  type FilterState,
  FilterChangeEvent
} from './filter-state-manager';

@customElement('portfolio-grid')
export class PortfolioGrid extends LitElement {
  static styles = css`
    :host {
      display: block;
      width: 100%;
    }

    .portfolio-header {
      max-width: 1200px;
      margin: 0 auto 2rem auto;
      padding: 0 1rem;
    }

    .portfolio-filters {
      display: flex;
      flex-direction: column;
      gap: 1rem;
      background: #f9fafb;
      padding: 1rem;
      border-radius: 0.5rem;
      border: 1px solid #e5e7eb;
    }

    .filter-category {
      position: relative;
      padding: 0.5rem 0;
      border-bottom: 1px solid #e5e7eb;
    }

    .filter-category-header {
      display: flex;
      justify-content: space-between;
      align-items: center;
      margin-bottom: 0.5rem;
    }

    .filter-category-content {
      display: flex;
      flex-wrap: wrap;
      align-items: center;
      gap: 1rem;
    }

    .filter-category.ignored .filter-category-content,
    .filter-category.ignored .filter-category-header > .filter-label {
      opacity: 0.5;
      pointer-events: none;
    }

    .ignore-button {
      background: none;
      border: 1px solid #d1d5db;
      border-radius: 0.25rem;
      padding: 0.25rem;
      cursor: pointer;
      display: flex;
      align-items: center;
      justify-content: center;
      width: 1.5rem;
      height: 1.5rem;
      color: #6b7280;
      transition: all 0.2s;
    }

    .ignore-button:hover {
      background-color: #f3f4f6;
      border-color: #9ca3af;
    }

    .ignore-button.active {
      background-color: #fee2e2;
      border-color: #f87171;
      color: #dc2626;
    }

    .ignore-button svg {
      width: 0.875rem;
      height: 0.875rem;
    }

    .filter-category:last-child {
      border-bottom: none;
    }

    .filter-label {
      font-weight: 600;
      color: #374151;
      white-space: nowrap;
    }

    .filter-options {
      display: flex;
      gap: 1rem;
      flex-wrap: wrap;
    }

    .filter-option {
      display: flex;
      align-items: center;
      gap: 0.5rem;
      cursor: pointer;
    }

    .filter-option input {
      width: 1rem;
      height: 1rem;
      accent-color: #3b82f6;
    }

    .filter-option label {
      font-size: 0.875rem;
      color: #6b7280;
      cursor: pointer;
      user-select: none;
    }

    .projects-container {
      max-width: 1200px;
      margin: 0 auto;
      padding: 0 1rem;
      display: flex;
      flex-wrap: wrap;
      gap: 1.5rem;
    }

    /* Target slotted project-item elements */
    ::slotted(project-item) {
      flex: 1;
      min-width: 300px;
      max-width: calc(33.333% - 1rem);
    }

    @media (max-width: 1024px) {
      ::slotted(project-item) {
        max-width: calc(50% - 0.75rem);
      }
    }

    @media (max-width: 768px) {
      ::slotted(project-item) {
        max-width: 100%;
      }
    }
  `;

  @property({ type: String })
  filterAttribute = 'data-filter'; // Attribute to read filter values from

  @property({ type: String })
  filterLabel = 'Filter by';

  private filterStateManager = new FilterStateManager();

  @property({ type: Object })
  filterState: FilterState = { categories: [], activeFilters: {} };

  connectedCallback(): void {
    super.connectedCallback();
    // Initialize immediately and also listen for slot changes
    this._initializeFilters();
    this._applyFilters();
  }

  firstUpdated(changedProperties: any): void {
    super.firstUpdated(changedProperties);
    // Initialize again after first render to catch any slotted content
    this._initializeFilters();
    this._applyFilters();
  }

  private _handleSlotChange(): void {
    // Re-initialize when slot content changes
    this._initializeFilters();
    this._applyFilters();
  }

  private _initializeFilters(): void {
    // Get all elements with the filter attribute in the slotted content
    const elements = this.querySelectorAll(`[${this.filterAttribute}]`);
    console.log('Found elements with filter attribute:', elements.length);

    const parsedFiltersArray = Array.from(elements)
      .map(element => {
        const filterValue = element.getAttribute(this.filterAttribute);
        if (filterValue) {
          console.log('Filter value:', filterValue);
        }
        return filterValue ? this.filterStateManager.parseFilterAttribute(filterValue) : null;
      })
      .filter(filters => filters !== null);

    console.log('Parsed filters array:', parsedFiltersArray);

    // Initialize state manager with parsed content
    this.filterState = this.filterStateManager.initializeFromContent(parsedFiltersArray);
    console.log('Filter state after initialization:', this.filterState);
  }


  private _handleFilterChange(event: Event): void {
    const target = event.target as HTMLInputElement;
    const [categoryName, filterValue] = target.value.split(':');
    const isActive = target.checked;

    // Use state manager to handle filter toggle
    const filterChangeEvent: FilterChangeEvent = {
      categoryName,
      filterValue,
      isActive
    };

    this.filterState = this.filterStateManager.toggleFilter(filterChangeEvent);
    this._applyFilters();
    this.requestUpdate(); // Force re-render to update checkboxes
  }

  private _handleIgnoreToggle(categoryName: string): void {
    // Toggle ignore state for the category
    this.filterState = this.filterStateManager.toggleIgnoreCategory(categoryName);
    this._applyFilters();
    this.requestUpdate(); // Force re-render to update UI
  }

  private _applyFilters(): void {
    // Get all elements with the filter attribute in the light DOM
    const elements = this.querySelectorAll(`[${this.filterAttribute}]`);

    elements.forEach(element => {
      const filterValue = element.getAttribute(this.filterAttribute);
      let shouldShow: boolean;

      if (filterValue) {
        // Parse element filters and evaluate using state manager
        const elementFilters = this.filterStateManager.parseFilterAttribute(filterValue);
        const evaluationResult = this.filterStateManager.evaluateElement(elementFilters);
        shouldShow = evaluationResult.shouldShow;
      } else {
        // Use state manager to evaluate elements without filters
        shouldShow = this.filterStateManager.evaluateElementWithoutFilters();
      }

      // Use CSS display to show/hide items
      (element as HTMLElement).style.display = shouldShow ? '' : 'none';
    });
  }

  render() {
    return html`
      <!-- Filters container -->
      ${this.filterState.categories.length > 0 ? html`
        <div class="portfolio-header">
          <div class="portfolio-filters">
            ${this.filterState.categories.map(category => html`
              <div class="filter-category ${category.ignored ? 'ignored' : ''}">
                <div class="filter-category-header">
                  <span class="filter-label">${category.label}:</span>
                  <button 
                    class="ignore-button ${category.ignored ? 'active' : ''}"
                    @click=${() => this._handleIgnoreToggle(category.name)}
                    title="${category.ignored ? 'Enable filtering' : 'Ignore category'}"
                  >
                    ${category.ignored ? html`
                      <!-- Eye closed SVG -->
                      <svg width="24px" height="24px" viewBox="0 0 24 24" stroke-width="1.5" fill="none" xmlns="http://www.w3.org/2000/svg" color="currentColor">
                        <path d="M3 13C6.6 5 17.4 5 21 13" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"></path>
                        <path d="M12 17C10.3431 17 9 15.6569 9 14C9 12.3431 10.3431 11 12 11C13.6569 11 15 12.3431 15 14C15 15.6569 13.6569 17 12 17Z" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"></path>
                      </svg>
                    ` : html`
                      <!-- Eye open SVG -->
                      <?xml version="1.0" encoding="UTF-8"?><svg width="24px" height="24px" stroke-width="1.5" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" color="#000000"><path d="M3.99961 3H19.9997C20.552 3 20.9997 3.44764 20.9997 3.99987L20.9999 5.58569C21 5.85097 20.8946 6.10538 20.707 6.29295L14.2925 12.7071C14.105 12.8946 13.9996 13.149 13.9996 13.4142L13.9996 19.7192C13.9996 20.3698 13.3882 20.8472 12.7571 20.6894L10.7571 20.1894C10.3119 20.0781 9.99961 19.6781 9.99961 19.2192L9.99961 13.4142C9.99961 13.149 9.89425 12.8946 9.70672 12.7071L3.2925 6.29289C3.10496 6.10536 2.99961 5.851 2.99961 5.58579V4C2.99961 3.44772 3.44732 3 3.99961 3Z" stroke="#000000" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"></path></svg>
                    `}
                  </button>
                </div>
                <div class="filter-category-content">
                  <div class="filter-options">
                    ${category.options.map(option => html`
                      <div class="filter-option">
                        <input 
                          type="checkbox" 
                          id="filter-${category.name}-${option.value}" 
                          value="${category.name}:${option.value}"
                          .checked=${option.active}
                          @change=${this._handleFilterChange}
                        >
                        <label for="filter-${category.name}-${option.value}">${option.label}</label>
                      </div>
                    `)}
                  </div>
                </div>
              </div>
            `)}
          </div>
        </div>
      ` : ''}

      <!-- Container for slotted content -->
      <div class="projects-container">
        <slot @slotchange=${this._handleSlotChange}></slot>
      </div>
    `;
  }

}
