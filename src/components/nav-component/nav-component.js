import { LitElement, css, html } from 'lit';
import { unsafeCSS } from 'lit';
import styles from './nav-component.css?inline';
import logo from '../../assets/CasaLoram.png';

export class NavComponent extends LitElement {
  static properties = { menuOpen: { type: Boolean } };
  static styles = [css`${unsafeCSS(styles)}`];
  constructor() { super(); this.menuOpen = false; }
  render() { const links = [['Inicio','inicio'],['Catálogo','catalogo'],['Pieles','pieles'],['Marcas','marcas'],['Contacto','contacto']]; return html`
    <nav aria-label="Navegación principal"><a class="brand" href="#inicio"><img src="${logo}" alt="Casa Loram" /></a><button class="toggle" @click=${() => this.menuOpen = !this.menuOpen} aria-expanded=${this.menuOpen} aria-label="Abrir menú">☰</button><div class="links ${this.menuOpen ? 'open' : ''}">${links.map(([label,target]) => html`<a href="#${target}" @click=${() => this.menuOpen=false}>${label}</a>`)}</div><a class="catalog-link" href="#catalogo">Ver catálogo <span>↗</span></a></nav>`; }
}
customElements.define('nav-component', NavComponent);
