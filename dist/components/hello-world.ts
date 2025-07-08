import { LitElement, html, css } from 'lit';
import { customElement, property } from 'lit/decorators.js';

@customElement('hello-world')
export class HelloWorld extends LitElement {
  static styles = css`
    :host {
      display: block;
      padding: 1rem;
      background: #f3f4f6;
      border-radius: 8px;
      margin: 1rem 0;
    }

    h1 {
      color: #1f2937;
      font-size: 1.5rem;
      margin: 0 0 0.5rem 0;
    }

    p {
      color: #6b7280;
      margin: 0;
    }

    button {
      background: #3b82f6;
      color: white;
      border: none;
      padding: 0.5rem 1rem;
      border-radius: 4px;
      cursor: pointer;
      margin-top: 1rem;
    }

    button:hover {
      background: #2563eb;
    }
  `;

  @property({ type: String })
  name = 'World';

  @property({ type: Number })
  count = 0;

  private _handleClick(): void {
    this.count++;
  }

  render() {
    return html`
      <h1>Hello, ${this.name}!</h1>
      <p>This is a Lit.js component running in your Hugo site.</p>
      <p>Button clicked: ${this.count} times</p>
      <button @click=${this._handleClick}>Click me!</button>
    `;
  }
}
