import { LitElement, css, html, nothing } from 'lit';
import { unsafeCSS } from 'lit';
import { gsap } from 'gsap';
import { hydrateIcons } from '../../utils/icons.js';
import { whatsappPhone } from '../../data/catalog-config.js';
import styles from './product-drawer.css?inline';
import generalStyles from '../../styles/globalStyles.css?inline';
import { getImage, getSkin, categories } from '../../data/catalog-data.js';

export class ProductDrawer extends LitElement {
  static properties = {
    product: { type: Object }, open: { type: Boolean },
    selectedImageId: { state: true }, selectedColor: { state: true }, selectedSize: { state: true },
  };
  static styles = [css`${unsafeCSS(generalStyles)}`, css`${unsafeCSS(styles)}`];
  constructor() {
    super(); this.open = false; this.product = null; this.selectedImageId = null;
    this.selectedColor = null; this.selectedSize = null; this.lastFocused = null;
    this.handleKeydown = this.handleKeydown.bind(this);
  }
  updated(changed) {
    if (changed.has('open') && this.open) {
      document.body.style.overflow = 'hidden';
      this.selectedImageId = this.product?.imageIds?.[0] ?? null;
      this.selectedColor = null; this.selectedSize = null;
      requestAnimationFrame(() => {
        const panel = this.renderRoot.querySelector('aside');
        if (panel && !matchMedia('(prefers-reduced-motion: reduce)').matches) gsap.fromTo(panel, { x: 42, opacity: .7 }, { x: 0, opacity: 1, duration: .32, ease: 'power2.out' });
        this.renderRoot.querySelector('[data-close]')?.focus();
      });
    } else if (changed.has('open') && !this.open) {
      document.body.style.overflow = ''; this.lastFocused?.focus();
    }
    hydrateIcons(this.renderRoot);
  }
  disconnectedCallback() { document.body.style.overflow = ''; window.removeEventListener('keydown', this.handleKeydown); super.disconnectedCallback(); }
  connectedCallback() { super.connectedCallback(); window.addEventListener('keydown', this.handleKeydown); }
  handleKeydown(event) {
    if (!this.open) return;
    if (event.key === 'Escape') { this.close(); return; }
    if (event.key !== 'Tab') return;
    const focusable = [...this.renderRoot.querySelectorAll('aside button, aside [href]')].filter((el) => !el.disabled);
    const first = focusable[0], last = focusable.at(-1);
    if (event.shiftKey && this.renderRoot.activeElement === first) { event.preventDefault(); last.focus(); }
    if (!event.shiftKey && this.renderRoot.activeElement === last) { event.preventDefault(); first.focus(); }
  }
  close() { this.open = false; this.dispatchEvent(new CustomEvent('close-drawer', { bubbles: true, composed: true })); }
  selectImage(id) { this.selectedImageId = id; }
  whatsappUrl(product, price) {
    const lines = ['Hola, me gustaría solicitar más información sobre este producto de Casa Loram.', '', `Producto: ${product.name}`];
    if (product.brand) lines.push(`Marca: ${product.brand}`);
    if (product.sku) lines.push(`SKU: ${product.sku}`);
    if (Number.isFinite(product.price)) lines.push(`Precio: ${price}`);
    if (this.selectedColor) lines.push(`Color seleccionado: ${this.selectedColor}`);
    if (this.selectedSize) lines.push(`Talla seleccionada: ${this.selectedSize}`);
    lines.push('', 'Me gustaría conocer más detalles sobre sus características y disponibilidad.', '', '¡Gracias!');
    return `https://wa.me/${whatsappPhone}?text=${encodeURIComponent(lines.join('\n'))}`;
  }
  render() {
    if (!this.open || !this.product) return nothing;
    const p = this.product, images = (p.imageIds || []).map(getImage).filter(Boolean);
    const image = getImage(this.selectedImageId ?? p.imageIds?.[0]);
    const skin = getSkin(p.skinId), category = categories.find(({ id }) => id === p.categoryId);
    const price = Number.isFinite(p.price) ? new Intl.NumberFormat('es-MX', { style: 'currency', currency: p.currency || 'MXN', minimumFractionDigits: 2 }).format(p.price) : 'Consultar precio';
    const details = [['Marca', p.brand], ['SKU', p.sku], ['Material', p.material || skin?.name], ['Calidad', p.quality], ['Horma o estilo', p.style || p.last], ['Tipo de piel', p.leather]].filter(([, value]) => value);
    const hasConfirmedVariants = p.availability !== 'pending';
    const colors = hasConfirmedVariants ? (p.variants?.colors || p.colors || []) : [];
    const sizes = hasConfirmedVariants ? (p.variants?.sizes || p.sizes || []) : [];
    const confirmedDescription = p.commercialDescription || (p.description && !/demostrativa|información comercial demostrativa/i.test(p.description) ? p.description : null);
    const features = (p.features || []).filter((feature) => !/demostrativ|pendiente/i.test(feature));
    return html`<div class="backdrop" @click=${this.close}></div><aside role="dialog" aria-modal="true" aria-label="Detalles de ${p.name}" @click=${(e) => e.stopPropagation()}>
      <button data-close class="close" @click=${this.close} aria-label="Cerrar detalle"><i data-lucide="x"></i><span>Cerrar</span></button>
      <div class="editorial-layout">
        <div class="gallery"><div class="hero-wrap"><img class="hero" src="${image?.src || ''}" alt="${image?.alt || p.name}" />${images.length > 1 ? html`<div class="gallery-count">${images.findIndex((item) => item.id === image?.id) + 1} / ${images.length}</div>` : nothing}</div>
        ${images.length > 1 ? html`<div class="thumbnails" aria-label="Galería del producto">${images.map((item) => html`<button class=${item.id === image?.id ? 'selected' : ''} aria-label="Ver ${item.alt}" aria-pressed=${item.id === image?.id} @click=${() => this.selectImage(item.id)}><img src=${item.src} alt="" /></button>`)}</div>` : nothing}</div>
        <div class="content"><p class="eyebrow">${category?.name || 'Casa Loram'}${p.brand ? html` · ${p.brand}` : nothing}</p><h2>${p.name}</h2>
          ${p.sku ? html`<p class="sku">SKU: ${p.sku}</p>` : nothing}<p class="price">${price}<small>MXN</small></p>
          <p class="description">${confirmedDescription || 'Consulta con nuestro equipo para conocer más detalles de esta pieza.'}</p>
          ${colors.length ? html`<section class="variant-section"><h3>Color${colors.length > 1 ? 'es' : ''}</h3><div class="swatches">${colors.map((color) => html`<button class=${this.selectedColor === color ? 'chosen' : ''} style="--swatch:${color}" aria-label="Seleccionar color ${color}" aria-pressed=${this.selectedColor === color} @click=${() => { this.selectedColor = color; }}></button>`)}</div></section>` : nothing}
          ${sizes.length ? html`<section class="variant-section"><h3>Tallas disponibles</h3><div class="sizes">${sizes.map((size) => html`<button class=${this.selectedSize === size ? 'chosen' : ''} aria-pressed=${this.selectedSize === size} @click=${() => { this.selectedSize = size; }}>${size}</button>`)}</div></section>` : nothing}
          ${details.length || features.length ? html`<section><h3>Detalles del producto</h3>${details.length ? html`<dl>${details.map(([label, value]) => html`<div class="detail"><dt>${label}</dt><dd>${value}</dd></div>`)}</dl>` : nothing}${features.length ? html`<ul>${features.map((item) => html`<li>${item}</li>`)}</ul>` : nothing}</section>` : nothing}
          <section><h3>Cuidados y conservación</h3><p>${p.validatedCare || 'Consulta con nuestro equipo para conocer los cuidados recomendados para este material.'}</p></section>
          <a class="quote" href=${this.whatsappUrl(p, price)} target="_blank" rel="noopener noreferrer"><i data-lucide="message-circle"></i><span>Solicitar información por WhatsApp</span></a>
          <p class="availability">La disponibilidad de tallas y colores se confirma al cotizar.</p>
        </div>
      </div></aside>`;
  }
}
customElements.define('product-drawer', ProductDrawer);
