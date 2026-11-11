import { LitElement, css, html, nothing } from 'lit';
import { unsafeCSS } from 'lit';
import { gsap } from 'gsap';
import general from '../../styles/globalStyles.css?inline';
import styles from './catalog-view.css?inline';
import { categories, getImage, getSkin, products } from '../../data/catalog-data.js';
import { hydrateIcons } from '../../utils/icons.js';
import '../../components/category-card/category-card.js';
import '../../components/product-card/product-card.js';
import '../../components/catalog-pagination/catalog-pagination.js';
import '../../components/product-drawer/product-drawer.js';

const PAGE_SIZE = 6;
const swatchColors = { Negro:'#201815', Blanco:'#f5f1e9', Natural:'#d8c29e', Almendra:'#d2b48c', Arena:'#c8ad86', Nutria:'#80583e', Chocolate:'#493126', Café:'#68452e', Gris:'#88857f' };
const money = (value) => new Intl.NumberFormat('es-MX', { style:'currency', currency:'MXN', maximumFractionDigits:0 }).format(value);

export class CatalogView extends LitElement {
  static properties = {
    categoryId:{type:String}, selectedSkins:{state:true}, selectedColors:{state:true}, selectedBrands:{state:true},
    minPrice:{type:Number}, maxPrice:{type:Number}, page:{type:Number}, selectedProduct:{type:Object}, drawerOpen:{type:Boolean},
  };
  static styles = [css`${unsafeCSS(general)}${unsafeCSS(styles)}`];
  constructor() {
    super();
    this.categoryId='all'; this.selectedSkins=[]; this.selectedColors=[]; this.selectedBrands=[];
    this.priceBounds={ min:Math.min(...products.map(p=>p.price)), max:Math.max(...products.map(p=>p.price)) };
    this.minPrice=this.priceBounds.min; this.maxPrice=this.priceBounds.max; this.page=1;
    this.selectedProduct=null; this.drawerOpen=false; this.drawerTrigger=null;
  }
  updated(changed) {
    hydrateIcons(this.renderRoot);
    const filterKeys=['categoryId','selectedSkins','selectedColors','selectedBrands','minPrice','maxPrice','page'];
    if (filterKeys.some(key=>changed.has(key))&&!matchMedia('(prefers-reduced-motion: reduce)').matches) {
      const cards=this.renderRoot.querySelectorAll('.product-area product-card');
      if (cards.length) gsap.fromTo(cards,{opacity:0,y:8},{opacity:1,y:0,duration:.22,stagger:.025,ease:'power2.out',overwrite:true});
    }
  }
  get categoryProducts() { return products.filter(p=>this.categoryId==='all'||p.categoryId===this.categoryId); }
  get filteredProducts() {
    return this.categoryProducts.filter(p=>{
      const skin=p.material||getSkin(p.skinId)?.name;
      const colors=p.colorNames||[p.color].filter(Boolean);
      return (!this.selectedSkins.length||this.selectedSkins.includes(skin)) &&
        (!this.selectedColors.length||this.selectedColors.some(c=>colors.includes(c))) &&
        (!this.selectedBrands.length||this.selectedBrands.includes(p.brand)) &&
        p.price>=this.minPrice&&p.price<=this.maxPrice;
    });
  }
  get totalPages() { return Math.max(1,Math.ceil(this.filteredProducts.length/PAGE_SIZE)); }
  get visibleProducts() { const page=Math.min(this.page,this.totalPages); return this.filteredProducts.slice((page-1)*PAGE_SIZE,page*PAGE_SIZE); }
  get facetSkins() { return [...new Set(this.categoryProducts.map(p=>p.material||getSkin(p.skinId)?.name).filter(Boolean))].sort((a,b)=>a.localeCompare(b,'es')); }
  get facetColors() { return [...new Set(this.categoryProducts.flatMap(p=>p.colorNames||[p.color].filter(Boolean)))].sort((a,b)=>a.localeCompare(b,'es')); }
  get facetBrands() { return [...new Set(this.categoryProducts.map(p=>p.brand).filter(Boolean))].sort((a,b)=>a.localeCompare(b,'es')); }
  toggleSelection(key,value) { const current=this[key]; this[key]=current.includes(value)?current.filter(v=>v!==value):[...current,value]; this.page=1; }
  selectCategory(event) { this.categoryId=this.categoryId===event.detail.id?'all':event.detail.id; this.selectedSkins=[]; this.selectedColors=[]; this.selectedBrands=[]; this.resetPrice(); this.page=1; }
  resetPrice() { this.minPrice=this.priceBounds.min; this.maxPrice=this.priceBounds.max; }
  clearFilters() { this.categoryId='all'; this.selectedSkins=[]; this.selectedColors=[]; this.selectedBrands=[]; this.resetPrice(); this.page=1; }
  setPrice(key,event) { const value=Number(event.target.value); if(key==='minPrice') this.minPrice=Math.min(value,this.maxPrice-100); else this.maxPrice=Math.max(value,this.minPrice+100); this.page=1; }
  openProduct(event) { this.selectedProduct=products.find(p=>p.id===event.detail.id); this.drawerTrigger=event.detail.trigger; this.drawerOpen=true; }
  closeDrawer() { this.drawerOpen=false; requestAnimationFrame(()=>this.drawerTrigger?.focus()); }
  removeChip(type,value) { if(type==='category') this.categoryId='all'; else if(type==='skin') this.toggleSelection('selectedSkins',value); else if(type==='color') this.toggleSelection('selectedColors',value); else if(type==='brand') this.toggleSelection('selectedBrands',value); else this.resetPrice(); }
  renderFacet(title,values,selected,key) {
    return html`<section class="facet" aria-label="Filtro ${title}"><h3>${title}</h3>${values.length?html`<div class="facet-options">${values.map(value=>{
      const active=selected.includes(value); const hex=key==='selectedColors'?swatchColors[value]:null;
      return html`<button class="facet-option ${active?'selected':''}" aria-pressed=${active} @click=${()=>this.toggleSelection(key,value)}>${hex?html`<i class="swatch" style="--swatch:${hex}" aria-hidden="true"></i>`:nothing}<span>${value}</span></button>`;
    })}</div>`:html`<p class="no-options">Sin opciones disponibles</p>`}</section>`;
  }
  render() {
    const activeCategory=categories.find(c=>c.id===this.categoryId);
    const min=this.priceBounds.min,max=this.priceBounds.max;
    const hasPriceFilter=this.minPrice!==min||this.maxPrice!==max;
    const active=Boolean(activeCategory||this.selectedSkins.length||this.selectedColors.length||this.selectedBrands.length||hasPriceFilter);
    return html`<section id="catalogo" class="catalog page-shell">
      <header class="filter-section inner--shell"><p class="rule">TRADICIÓN EN CADA DETALLE</p><h2>Nuestro catálogo</h2><p class="intro">Piezas de piel seleccionadas para acompañar historias que perduran.</p></header>
      <div class="category-filter" aria-label="Tipo de producto"><div class="section-heading"><span>01</span><h3>Tipo de producto</h3></div><div class="category-grid" @select-category=${this.selectCategory}>${categories.map(category=>html`<category-card .category=${category} .image=${getImage(category.imageId)} .selected=${this.categoryId===category.id}></category-card>`)}</div></div>
      <div class="filters" aria-label="Filtros del catálogo">
        ${this.renderFacet('Pieles',this.facetSkins,this.selectedSkins,'selectedSkins')}
        ${this.renderFacet('Color',this.facetColors,this.selectedColors,'selectedColors')}
        <section class="facet price-facet" aria-label="Filtro Precio"><h3>Precio</h3><div class="price-values"><label>Desde <output>${money(this.minPrice)}</output></label><label>Hasta <output>${money(this.maxPrice)}</output></label></div><div class="range-controls"><input aria-label="Precio mínimo" type="range" min=${min} max=${max} step="100" .value=${String(this.minPrice)} @input=${e=>this.setPrice('minPrice',e)}><input aria-label="Precio máximo" type="range" min=${min} max=${max} step="100" .value=${String(this.maxPrice)} @input=${e=>this.setPrice('maxPrice',e)}></div><div class="range-limits"><span>${money(min)}</span><span>${money(max)}</span></div></section>
        ${this.renderFacet('Marca',this.facetBrands,this.selectedBrands,'selectedBrands')}
      </div>
      <section class="product-area" @open-product=${this.openProduct}>
        <div class="results"><div class="chips">${activeCategory?html`<button @click=${()=>this.removeChip('category')}>${activeCategory.name}<span>×</span></button>`:nothing}${this.selectedSkins.map(v=>html`<button @click=${()=>this.removeChip('skin',v)}>${v}<span>×</span></button>`)}${this.selectedColors.map(v=>html`<button @click=${()=>this.removeChip('color',v)}>${v}<span>×</span></button>`)}${this.selectedBrands.map(v=>html`<button @click=${()=>this.removeChip('brand',v)}>${v}<span>×</span></button>`)}${hasPriceFilter?html`<button @click=${()=>this.removeChip('price')}>${money(this.minPrice)} – ${money(this.maxPrice)}<span>×</span></button>`:nothing}${active?html`<button class="clear" @click=${this.clearFilters}><i data-lucide="rotate-ccw"></i> Limpiar filtros</button>`:nothing}</div><span>Mostrando ${this.filteredProducts.length} de ${products.length} productos</span></div>
        ${this.visibleProducts.length?html`<div class="grid">${this.visibleProducts.map(product=>html`<product-card .product=${product} .image=${getImage(product.imageIds[0])} .skin=${getSkin(product.skinId)} .category=${categories.find(c=>c.id===product.categoryId)}></product-card>`)}</div><catalog-pagination .page=${this.page} .totalPages=${this.totalPages} @change-page=${e=>this.page=e.detail.page}></catalog-pagination>`:html`<div class="empty"><h3>No encontramos piezas con esa selección.</h3><p>Prueba otra combinación o vuelve a explorar el catálogo completo.</p><button @click=${this.clearFilters}>Restablecer filtros</button></div>`}
      </section></section><product-drawer .product=${this.selectedProduct} .open=${this.drawerOpen} @close-drawer=${this.closeDrawer}></product-drawer>`;
  }
}
customElements.define('catalog-view',CatalogView);
