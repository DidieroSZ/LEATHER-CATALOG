import { LitElement, css, html } from 'lit';
import { unsafeCSS } from 'lit';
import styles from './category-card.css?inline';
import generalStyles from '../../styles/globalStyles.css?inline';

export class CategoryCard extends LitElement {
  static properties = { category: { type: Object }, image: { type: Object }, selected: { type: Boolean, reflect: true } };
  static styles = [css`${unsafeCSS(generalStyles)}`, css`${unsafeCSS(styles)}`];
  constructor() { super(); this.selected = false; }
  choose() { this.dispatchEvent(new CustomEvent('select-category', { detail: { id: this.category.id }, bubbles: true, composed: true })); }
  render() { return html`<button class="category-card ${this.selected ? 'selected' : ''}" aria-pressed=${this.selected} aria-label="Filtrar por ${this.category?.name}" @click=${this.choose}><img src="${this.image?.src}" alt="" loading="lazy" /><span>${this.category?.name}</span></button>`; }
}
customElements.define('category-card', CategoryCard);
