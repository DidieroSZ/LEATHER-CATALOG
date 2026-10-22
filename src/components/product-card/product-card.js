import { LitElement, css, html } from 'lit';
import { unsafeCSS } from 'lit';
import styles from './product-card.css?inline';

export class ProductCard extends LitElement {
  static properties = { product: { type: Object } };
  static styles = [css`${unsafeCSS(styles)}`];

  render() {
    const { name, material, image } = this.product || {};
    return html`
      <article class="card">
        <div class="image-wrap"><img src="${image}" alt="${name}" loading="lazy" /></div>
        <div class="copy"><h3>${name}</h3><span>${material}</span></div>
      </article>`;
  }
}
customElements.define('product-card', ProductCard);
