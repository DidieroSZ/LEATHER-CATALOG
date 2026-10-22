import { LitElement, css, html } from 'lit';
import { unsafeCSS } from 'lit';
import styles from './catalog-pagination.css?inline';
export class CatalogPagination extends LitElement {
  static properties = { page: { type: Number }, totalPages: { type: Number } };
  static styles = [css`${unsafeCSS(styles)}`];
  go(page) { if (page < 1 || page > this.totalPages || page === this.page) return; this.dispatchEvent(new CustomEvent('change-page', { detail: { page }, bubbles: true, composed: true })); }
  render() { if (this.totalPages < 2) return ''; return html`<nav aria-label="Paginación del catálogo"><button ?disabled=${this.page === 1} @click=${() => this.go(this.page - 1)}>Anterior</button>${Array.from({ length: this.totalPages }, (_, index) => index + 1).map((number) => html`<button class=${number === this.page ? 'current' : ''} aria-current=${number === this.page ? 'page' : 'false'} @click=${() => this.go(number)}>${number}</button>`)}<button ?disabled=${this.page === this.totalPages} @click=${() => this.go(this.page + 1)}>Siguiente</button></nav>`; }
}
customElements.define('catalog-pagination', CatalogPagination);
