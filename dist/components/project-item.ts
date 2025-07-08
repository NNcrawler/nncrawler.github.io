import { LitElement, html, css } from 'lit';
import { customElement, property } from 'lit/decorators.js';

type ComplexityLevel = 'low' | 'medium' | 'high';

@customElement('project-item')
export class ProjectItem extends LitElement {
  static styles = css`
    :host {
      display: block;
      margin-bottom: 1.5rem;
    }

    .project-card {
      background: white;
      border: 1px solid #e5e7eb;
      border-radius: 0.75rem;
      padding: 1.5rem;
      box-shadow: 0 1px 3px 0 rgba(0, 0, 0, 0.1);
      transition: all 0.2s ease;
      position: relative;
      height: 100%;
    }

    .project-card:hover {
      box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1);
      transform: translateY(-2px);
    }

    .complexity-badge {
      position: absolute;
      top: 1rem;
      right: 1rem;
      padding: 0.25rem 0.75rem;
      border-radius: 9999px;
      font-size: 0.75rem;
      font-weight: 600;
      text-transform: uppercase;
      letter-spacing: 0.05em;
    }

    .complexity-low {
      background: #dcfce7;
      color: #166534;
    }

    .complexity-medium {
      background: #fef3c7;
      color: #92400e;
    }

    .complexity-high {
      background: #fee2e2;
      color: #991b1b;
    }

    .project-title {
      font-size: 1.25rem;
      font-weight: 700;
      color: #111827;
      margin: 0 0 0.75rem 0;
      line-height: 1.4;
      padding-right: 4rem; /* Space for complexity badge */
    }

    .project-description {
      color: #6b7280;
      line-height: 1.6;
      margin: 0;
    }

    /* Grid layout styles */
    :host(.grid-item) {
      break-inside: avoid;
    }

    @media (min-width: 768px) {
      :host {
        width: calc(50% - 0.75rem);
        display: inline-block;
        vertical-align: top;
      }
    }

    @media (min-width: 1024px) {
      :host {
        width: calc(33.333% - 1rem);
      }
    }
  `;

  @property({ type: String })
  title = '';

  @property({ type: String })
  complexity: ComplexityLevel = 'medium';

  @property({ type: String })
  description = '';

  render() {
    return html`
      <div class="project-card">
        <!-- Complexity Badge -->
        <div class="complexity-badge complexity-${this.complexity}">
          ${this.complexity}
        </div>
        
        <!-- Project Content -->
        <h3 class="project-title">${this.title}</h3>
        <p class="project-description">${this.description}</p>
      </div>
    `;
  }
}
