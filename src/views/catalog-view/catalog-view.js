import { LitElement, css, html } from 'lit';
import { unsafeCSS } from 'lit';
import styles from './catalog-view.css?inline';
import { categories, getImage, getSkin, products, skins } from '../../data/catalog-data.js';
import '../../components/category-card/category-card.js';
import '../../components/product-card/product-card.js';
import '../../components/catalog-pagination/catalog-pagination.js';
import '../../components/product-drawer/product-drawer.js';

const PAGE_SIZE = 6;
const allOption = { id: 'all', name: 'Todos' };

export class CatalogView extends LitElement {
  static properties = { categoryId: { type: String }, skinId: { type: String }, page: { type: Number }, selectedProduct: { type: Object }, drawerOpen: { type: Boolean } };
  static styles = [css`${unsafeCSS(styles)}`];
  constructor() { super(); this.categoryId = 'all'; this.skinId = 'all'; this.page = 1; this.selectedProduct = null; this.drawerOpen = false; this.drawerTrigger = null; }
  get filteredProducts() { return products.filter((product) => (this.categoryId === 'all' || product.categoryId === this.categoryId) && (this.skinId === 'all' || product.skinId === this.skinId)); }
  get totalPages() { return Math.max(1, Math.ceil(this.filteredProducts.length / PAGE_SIZE)); }
  get visibleProducts() { const safePage = Math.min(this.page, this.totalPages); return this.filteredProducts.slice((safePage - 1) * PAGE_SIZE, safePage * PAGE_SIZE); }
  get availableSkins() { const ids = new Set(products.map(({ skinId }) => skinId)); return skins.filter(({ id }) => ids.has(id)); }
  updateFilters(key, value) { this[key] = value; this.page = 1; }
  clearFilters() { this.categoryId = 'all'; this.skinId = 'all'; this.page = 1; }
  selectCategory(event) { this.categoryId = event.detail.id; this.skinId = 'all'; this.page = 1; requestAnimationFrame(() => this.renderRoot.querySelector('.product-area')?.scrollIntoView({ behavior: matchMedia('(prefers-reduced-motion: reduce)').matches ? 'auto' : 'smooth', block: 'start' })); }
  openProduct(event) { this.selectedProduct = products.find(({ id }) => id === event.detail.id); this.drawerTrigger = event.detail.trigger; this.drawerOpen = true; }
  closeDrawer() { this.drawerOpen = false; requestAnimationFrame(() => this.drawerTrigger?.focus()); }
  renderFilter(label, options, activeId, key) { return html`<div class="filter-group"><span>${label}</span><div role="toolbar" aria-label="Filtrar por ${label}">${options.map((option) => html`<button class=${activeId === option.id ? 'active' : ''} @click=${() => this.updateFilters(key, option.id)}>${option.name}</button>`)}</div></div>`; }
  render() { const activeCategory = categories.find(({ id }) => id === this.categoryId); const activeSkin = getSkin(this.skinId); return html`
    <section id="catalogo" class="catalog page-shell">
      <header><p class="rule">TRADICIÓN EN CADA DETALLE</p><h2>Nuestro catálogo</h2><p class="intro">Piezas de piel seleccionadas para acompañar historias que perduran.</p></header>
      <div class="filters">${this.renderFilter('Producto', [allOption, ...categories], this.categoryId, 'categoryId')}${this.renderFilter('Piel', [{ id: 'all', name: 'Todas las pieles' }, ...this.availableSkins], this.skinId, 'skinId')}</div>
      <div class="category-grid" @select-category=${this.selectCategory}>${categories.map((category) => { const skinsForCategory = [...new Set(products.filter((product) => product.categoryId === category.id).map((product) => getSkin(product.skinId)?.name))]; return html`<category-card .category=${category} .image=${getImage(category.imageId)} .skins=${skinsForCategory}></category-card>`; })}</div>
      <div class="product-area" @select-category=${this.selectCategory} @open-product=${this.openProduct}>
        <div class="results"><div class="chips">${activeCategory ? html`<button @click=${() => this.updateFilters('categoryId', 'all')}>${activeCategory.name}<span>×</span></button>` : ''}${activeSkin ? html`<button @click=${() => this.updateFilters('skinId', 'all')}>${activeSkin.name}<span>×</span></button>` : ''}${(activeCategory || activeSkin) ? html`<button class="clear" @click=${this.clearFilters}>Limpiar filtros</button>` : ''}</div><span>Mostrando ${this.filteredProducts.length} de ${products.length} productos</span></div>
        ${this.visibleProducts.length ? html`<div class="grid">${this.visibleProducts.map((product) => html`<product-card .product=${product} .image=${getImage(product.imageIds[0])} .skin=${getSkin(product.skinId)} .category=${categories.find(({ id }) => id === product.categoryId)}></product-card>`)}</div><catalog-pagination .page=${this.page} .totalPages=${this.totalPages} @change-page=${(event) => this.page = event.detail.page}></catalog-pagination>` : html`<div class="empty"><h3>No encontramos piezas con esa selección.</h3><p>Prueba otra combinación o vuelve a explorar el catálogo completo.</p><button @click=${this.clearFilters}>Restablecer filtros</button></div>`}
      </div>
    </section>
    <product-drawer .product=${this.selectedProduct} .open=${this.drawerOpen} @close-drawer=${this.closeDrawer}></product-drawer>`; }
}
customElements.define('catalog-view', CatalogView);
