import { LitElement, css, html, nothing } from 'lit';
import { unsafeCSS } from 'lit';
import styles from './nav-component.css?inline';

const steps = [
  { id: 'inicio', number: '01', label: 'Explora', name: 'Inicio' },
  { id: 'catalogo', number: '02', label: 'Selecciona', name: 'Catálogo' },
  { id: 'pieles', number: '03', label: 'Conoce', name: 'Pieles' },
  { id: 'marcas', number: '04', label: 'Descubre', name: 'Marcas' },
  { id: 'contacto', number: '05', label: 'Conecta', name: 'Contacto' },
];

export class NavComponent extends LitElement {
  static properties = { activeId: { type: String } };
  static styles = [css`${unsafeCSS(styles)}`];
  constructor() {
    super();
    this.activeId = 'inicio';
    this.observer = null;
    this.pendingTargetId = null;
    this.observerRetryTimer = null;
    this.pendingScrollTimer = null;
    this.handleScrollEnd = this.handleScrollEnd.bind(this);
    this.cancelPendingNavigation = this.cancelPendingNavigation.bind(this);
  }
  connectedCallback() {
    super.connectedCallback();
    requestAnimationFrame(() => this.connectSectionObserver());
    window.addEventListener('scrollend', this.handleScrollEnd);
    window.addEventListener('wheel', this.cancelPendingNavigation, { passive: true });
    window.addEventListener('touchstart', this.cancelPendingNavigation, { passive: true });
  }
  disconnectedCallback() {
    this.observer?.disconnect();
    clearTimeout(this.observerRetryTimer);
    clearTimeout(this.pendingScrollTimer);
    window.removeEventListener('scrollend', this.handleScrollEnd);
    window.removeEventListener('wheel', this.cancelPendingNavigation);
    window.removeEventListener('touchstart', this.cancelPendingNavigation);
    super.disconnectedCallback();
  }
  getSection(id) { const pageRoot = this.getRootNode(); if (id === 'inicio' || id === 'catalogo') return pageRoot.querySelector(`#${id}`); return pageRoot.querySelector('heritage-view')?.shadowRoot?.querySelector(`#${id}`); }
  connectSectionObserver() {
    const sections = steps.map(({ id }) => this.getSection(id)).filter(Boolean);
    if (sections.length !== steps.length) {
      clearTimeout(this.observerRetryTimer);
      this.observerRetryTimer = setTimeout(() => this.connectSectionObserver(), 50);
      return;
    }
    this.observer?.disconnect();
    this.observer = new IntersectionObserver(() => {
      const nextId = this.getCurrentSectionId(sections);
      if (!nextId) return;
      if (this.pendingTargetId) {
        if (nextId !== this.pendingTargetId) return;
        this.finishPendingNavigation();
      }
      this.activeId = nextId;
    }, { rootMargin: '-18% 0px -62% 0px', threshold: [0, .12, .5] });
    sections.forEach((section) => this.observer.observe(section));
  }
  getCurrentSectionId(sections) {
    const activationLine = this.offsetHeight + (window.innerHeight * .18);
    const positions = sections.map((section) => ({ id: section.id, top: section.getBoundingClientRect().top }));
    const passed = positions.filter(({ top }) => top <= activationLine);
    return (passed.at(-1) ?? positions[0])?.id;
  }
  finishPendingNavigation() {
    this.pendingTargetId = null;
    clearTimeout(this.pendingScrollTimer);
  }
  handleScrollEnd() {
    if (!this.pendingTargetId) return;
    this.finishPendingNavigation();
    const sections = steps.map(({ id }) => this.getSection(id)).filter(Boolean);
    this.activeId = this.getCurrentSectionId(sections) ?? this.activeId;
  }
  cancelPendingNavigation() { this.finishPendingNavigation(); }
  navigate(event, id) { event.preventDefault(); this.navigateTo(id); }
  navigateTo(id) {
    const section = this.getSection(id); if (!section) return;
    this.activeId = id;
    this.pendingTargetId = id;
    clearTimeout(this.pendingScrollTimer);
    section.scrollIntoView({ behavior: matchMedia('(prefers-reduced-motion: reduce)').matches ? 'auto' : 'smooth', block: 'start' });
    this.pendingScrollTimer = setTimeout(() => this.handleScrollEnd(), 3000);
  }
  updated(changed) {
    if (changed.has('activeId') && matchMedia('(max-width: 760px)').matches) this.renderRoot.querySelector(`[data-step="${this.activeId}"]`)?.scrollIntoView({ block: 'nearest', inline: 'center', behavior: matchMedia('(prefers-reduced-motion: reduce)').matches ? 'auto' : 'smooth' });
  }
  render() { return html`<nav aria-label="Secciones de Casa Loram"><div class="steps">${steps.map((step) => html`<a class="step ${this.activeId === step.id ? 'is-active' : ''}" data-step="${step.id}" href="#${step.id}" @click=${(event) => this.navigate(event, step.id)} aria-current=${this.activeId === step.id ? 'location' : nothing}><span class="number">${step.number}</span><span class="label">${step.label}</span><strong>${step.name}</strong></a>`)}</div></nav>`; }
}
customElements.define('nav-component', NavComponent);
