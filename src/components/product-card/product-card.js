import { LitElement, css, html } from 'lit';
import { unsafeCSS } from 'lit';
import styles from './product-card.css?inline';

export class ProductCard extends LitElement {
  static properties = { product: { type: Object }, image: { type: Object }, skin: { type: Object }, category: { type: Object } };
  static styles = [css`${unsafeCSS(styles)}`];

  render() {
    const { name, price, colors = [] } = this.product || {};
    return html`
      <article class="card">
        <button class="product-action" @click=${this.openDetails} aria-label="Consultar ${name}">
          <div class="image-wrap"><img src="${this.image?.src}" alt="${this.image?.alt}" loading="lazy" /></div>
          <div class="copy"><p>${this.category?.name}</p><h3>${name}</h3><span>${this.skin?.name}</span><div class="footer"><strong>${new Intl.NumberFormat('es-MX', { style: 'currency', currency: 'MXN', maximumFractionDigits: 0 }).format(price)}</strong><i>${colors.map((color) => html`<b style="background:${color}"></b>`)}</i></div></div>
        </button>
      </article>`;
  }
  openDetails() { this.dispatchEvent(new CustomEvent('open-product', { detail: { id: this.product.id, trigger: this.renderRoot.querySelector('.product-action') }, bubbles: true, composed: true })); }
}
customElements.define('product-card', ProductCard);
