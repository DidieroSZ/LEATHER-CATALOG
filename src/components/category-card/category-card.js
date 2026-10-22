import { LitElement, css, html } from 'lit';
import { unsafeCSS } from 'lit';
import styles from './category-card.css?inline';

export class CategoryCard extends LitElement {
  static properties = { category: { type: Object }, image: { type: Object }, skins: { type: Array } };
  static styles = [css`${unsafeCSS(styles)}`];
  choose() { this.dispatchEvent(new CustomEvent('select-category', { detail: { id: this.category.id }, bubbles: true, composed: true })); }
  render() { return html`<article class="category-card"><img src="${this.image?.src}" alt="${this.image?.alt}" loading="lazy" /><div><h3>${this.category?.name}</h3><p>${this.category?.description}</p><small>${this.skins?.join(' · ')}</small><button @click=${this.choose}>Explorar colección <span>→</span></button></div></article>`; }
}
customElements.define('category-card', CategoryCard);
