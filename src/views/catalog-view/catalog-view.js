import { LitElement, css, html } from 'lit';
import { unsafeCSS } from 'lit';
import styles from './catalog-view.css?inline';
import '../../components/product-card/product-card.js';
import boot from '../../assets/propuesta_1/02_bota_clasica_cocodrilo.png';
import bootie from '../../assets/propuesta_1/03_botin_avestruz.png';
import texana from '../../assets/propuesta_1/04_texana_palmilla.png';
import belt from '../../assets/propuesta_1/04_cinturon_cocodrilo.png';
import blackBoot from '../../assets/propuesta_1/05_bota_piton.png';
import darkBootie from '../../assets/propuesta_1/08_botin_ternera.png';
import fringe from '../../assets/propuesta_1/07_texana_flecos.png';
import hat from '../../assets/propuesta_1/09_sombrero_negro.png';

const products = [
  ['Bota clásica cocodrilo', 'Piel de cocodrilo', boot], ['Botín avestruz', 'Piel de avestruz', bootie], ['Texana palmilla', 'Piel de palmilla', texana], ['Cinturón hebilla plata', 'Piel de cocodrilo', belt], ['Bota pitón', 'Piel de pitón', blackBoot], ['Botín ternera', 'Piel de ternera', darkBootie], ['Texana flecos', 'Piel gamuza', fringe], ['Sombrero ibiza', 'Piel palmilla', hat]
].map(([name, material, image]) => ({ name, material, image }));

export class CatalogView extends LitElement {
  static styles = [css`${unsafeCSS(styles)}`];
  constructor() { super(); this.active = 'Todo'; }
  render() { const filters = ['Todo', 'Botas', 'Botines', 'Sombreros', 'Cinturones', 'Cocodrilo', 'Avestruz', 'Pitón', 'Angora', 'Novillo']; return html`
    <section id="catalogo" class="catalog page-shell">
      <p class="rule">TRADICIÓN EN CADA DETALLE</p><h2>Nuestro catálogo</h2>
      <div class="filters" role="toolbar" aria-label="Filtrar catálogo">${filters.map(f => html`<button class=${this.active === f ? 'active' : ''} @click=${() => this.active = f}>${f}</button>`)}</div>
      <div class="featured">${products.slice(0, 4).map(product => html`<div><img src="${product.image}" alt="${product.name}" /><span>${product.name.split(' ')[0]}</span></div>`)}</div>
      <div class="catalog-meta"><span>24 productos seleccionados</span><span>Ordenar: <b>Destacados</b></span></div>
      <div class="grid">${products.map(product => html`<product-card .product=${product}></product-card>`)}</div>
      <button class="more">Ver catálogo completo <span>→</span></button>
    </section>`; }
}
customElements.define('catalog-view', CatalogView);
