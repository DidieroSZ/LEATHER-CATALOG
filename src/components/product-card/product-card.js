import { LitElement, css, html } from 'lit';
import { unsafeCSS } from 'lit';
import { gsap } from 'gsap';
import styles from './product-card.css?inline';
import generalStyles from '../../styles/globalStyles.css?inline';

export class ProductCard extends LitElement {
  static properties = {
    product:{type:Object}, image:{type:Object}, skin:{type:Object}, category:{type:Object},
  };
  static styles = [css`${unsafeCSS(generalStyles)}`,css`${unsafeCSS(styles)}`];
  get materialLine() {
    const product=this.product||{};
    const isHat=['sombreros','texanas'].includes(product.categoryId);
    const material=isHat?(product.material||this.skin?.name):(product.leather||product.material||this.skin?.name);
    if(!material) return '';
    const categoryId=product.categoryId;
    if(categoryId==='sombreros'||categoryId==='texanas') return `${this.category?.name||'Producto'} en ${material}`;
    return `Piel de ${material}`;
  }
  handlePointerEnter() { this.animateCard(true); }
  handlePointerLeave() { this.animateCard(false); }
  handleFocus() { this.animateCard(true); }
  handleBlur() { this.animateCard(false); }
  animateCard(active) {
    if(matchMedia('(prefers-reduced-motion: reduce)').matches) return;
    const card=this.renderRoot.querySelector('.card'), image=this.renderRoot.querySelector('.product-image');
    if(!card||!image) return;
    gsap.to(card,{y:active?-3:0,duration:.24,ease:'power2.out',overwrite:true});
    gsap.to(image,{scale:active?1.035:1,duration:.38,ease:'power2.out',overwrite:true});
  }
  render() {
    const product=this.product||{};
    const price=Number.isFinite(product.price)
      ? new Intl.NumberFormat('es-MX',{style:'currency',currency:product.currency||'MXN',maximumFractionDigits:0}).format(product.price)
      : 'Consultar precio';
    const badge=typeof product.badge==='string'&&product.badge.trim()?product.badge.trim():null;
    const description=this.materialLine;
    return html`<article class="card" @pointerenter=${this.handlePointerEnter} @pointerleave=${this.handlePointerLeave} @focusin=${this.handleFocus} @focusout=${this.handleBlur}>
      <button class="product-action" @click=${this.openDetails} aria-label="Ver detalles de ${product.name||'producto'}">
        <span class="image-wrap"><img class="product-image" src="${this.image?.src||''}" alt="${this.image?.alt||product.name||''}" loading="lazy" />${badge?html`<span class="badge">${badge}</span>`:''}</span>
        <span class="copy"><span class="category">${this.category?.name||''}</span><span class="name">${product.name||''}</span>${description?html`<span class="description">${description}</span>`:''}<span class="footer"><span class="price">${price}</span></span></span>
      </button>
    </article>`;
  }
  openDetails() {
    this.dispatchEvent(new CustomEvent('open-product',{detail:{id:this.product.id,trigger:this.renderRoot.querySelector('.product-action')},bubbles:true,composed:true}));
  }
}
customElements.define('product-card',ProductCard);
