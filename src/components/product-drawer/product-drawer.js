import { LitElement, css, html, nothing } from 'lit';
import { unsafeCSS } from 'lit';
import styles from './product-drawer.css?inline';
import { getImage, getSkin, categories } from '../../data/catalog-data.js';

export class ProductDrawer extends LitElement {
  static properties = { product: { type: Object }, open: { type: Boolean } };
  static styles = [css`${unsafeCSS(styles)}`];
  constructor() { super(); this.open = false; this.product = null; this.selectedImageId = null; this.lastFocused = null; this.handleKeydown = this.handleKeydown.bind(this); }
  updated(changed) { if (changed.has('open')) { document.body.style.overflow = this.open ? 'hidden' : ''; if (this.open) { this.selectedImageId = this.product?.imageIds[0]; requestAnimationFrame(() => this.renderRoot.querySelector('[data-close]')?.focus()); } else this.lastFocused?.focus(); } }
  disconnectedCallback() { document.body.style.overflow = ''; super.disconnectedCallback(); }
  handleKeydown(event) {
    if (!this.open) return;
    if (event.key === 'Escape') { this.close(); return; }
    if (event.key !== 'Tab') return;
    const focusable = [...this.renderRoot.querySelectorAll('aside button, aside [href], aside input, aside select, aside textarea')].filter((element) => !element.disabled);
    if (!focusable.length) return;
    const first = focusable[0];
    const last = focusable.at(-1);
    if (event.shiftKey && this.renderRoot.activeElement === first) { event.preventDefault(); last.focus(); }
    if (!event.shiftKey && this.renderRoot.activeElement === last) { event.preventDefault(); first.focus(); }
  }
  connectedCallback() { super.connectedCallback(); window.addEventListener('keydown', this.handleKeydown); }
  close() { this.open = false; this.dispatchEvent(new CustomEvent('close-drawer', { bubbles: true, composed: true })); }
  selectImage(id) { this.selectedImageId = id; }
  render() { if (!this.open || !this.product) return nothing; const image = getImage(this.selectedImageId); const skin = getSkin(this.product.skinId); const category = categories.find(({ id }) => id === this.product.categoryId); const price = new Intl.NumberFormat('es-MX', { style: 'currency', currency: 'MXN', maximumFractionDigits: 0 }).format(this.product.price); return html`<div class="backdrop" @click=${this.close}></div><aside role="dialog" aria-modal="true" aria-label="Detalles de ${this.product.name}" @click=${(event) => event.stopPropagation()}><button data-close class="close" @click=${this.close}>Cerrar</button><img class="hero" src="${image?.src}" alt="${image?.alt}"/><div class="content"><p class="eyebrow">${category?.name} · ${skin?.name}</p><h2>${this.product.name}</h2><p class="price">${price} <small>Precio demostrativo</small></p><p>${this.product.description}</p><section><h3>Acabados</h3><ul>${this.product.features.map((feature) => html`<li>${feature}</li>`)}</ul></section><section><h3>Variantes demostrativas</h3><div class="swatches">${this.product.colors.map((color) => html`<i style="background:${color}"></i>`)}</div><p>Tallas: ${this.product.sizes.join(' · ')}</p></section><section><h3>Cuidados</h3><p>${this.product.care}</p></section><p class="reference">Ref. ${this.product.id}</p></div></aside>`; }
}
customElements.define('product-drawer', ProductDrawer);
