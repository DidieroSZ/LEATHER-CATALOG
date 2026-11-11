import { LitElement, css, html } from 'lit';
import { unsafeCSS } from 'lit';
import { gsap } from 'gsap';
import styles from './header-view.css?inline';
import generalStyles from '../../styles/globalStyles.css?inline';
import hero from '../../assets/landscape.jpg';
import { contactConfig } from '../../data/contact-config.js';
import { storeHours, storeTimeZone } from '../../data/store-hours.js';
import { hydrateIcons } from '../../utils/icons.js';

function isStoreOpen(date = new Date()) {
  const parts = new Intl.DateTimeFormat('en-US', {
    timeZone: storeTimeZone, weekday: 'short', hour: '2-digit', minute: '2-digit', hourCycle: 'h23',
  }).formatToParts(date);
  const values = Object.fromEntries(parts.map(({ type, value }) => [type, value]));
  const day = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].indexOf(values.weekday);
  const minute = Number(values.hour) * 60 + Number(values.minute);
  const schedule = storeHours.find(({ weekdays }) => weekdays.includes(day));
  return Boolean(schedule && schedule.open !== null && minute >= schedule.open && minute < schedule.close);
}

export class HeaderView extends LitElement {
  static properties = { storeOpen: { type: Boolean } };
  static styles = [css`${unsafeCSS(generalStyles)}`, css`${unsafeCSS(styles)}`];

  constructor() {
    super();
    this.storeOpen = isStoreOpen();
    this.updateStoreStatus = () => { this.storeOpen = isStoreOpen(); };
  }

  connectedCallback() {
    super.connectedCallback();
    this.statusTimer = window.setInterval(this.updateStoreStatus, 60_000);
    document.addEventListener('visibilitychange', this.updateStoreStatus);
  }

  disconnectedCallback() {
    window.clearInterval(this.statusTimer);
    document.removeEventListener('visibilitychange', this.updateStoreStatus);
    super.disconnectedCallback();
  }

  firstUpdated() {
    hydrateIcons(this.renderRoot);
    if (!matchMedia('(prefers-reduced-motion: reduce)').matches) {
      gsap.from(this.renderRoot.querySelectorAll('.hero-copy > *, .hero-meta > *'), {
        opacity: 0, y: 18, duration: 0.7, stagger: 0.08, ease: 'power3.out',
      });
    }
  }

  requestNavigation(event, id) {
    event.preventDefault();
    this.dispatchEvent(new CustomEvent('navigate-section', { detail: { id }, bubbles: true, composed: true }));
  }

  render() {
    const city = [contactConfig.location.city, contactConfig.location.state].filter(Boolean).join(', ') || 'León, Guanajuato';
    return html`<header id="inicio" class="hero">
      <img class="hero-image" src="${hero}" alt="Paisaje de tierras abiertas al atardecer, evocando la tradición western" />
      <div class="shade"></div>
      <div class="hero-layout">
        <div class="hero-copy">
          <p class="brand-mark">CASA LORAM</p>
          <span class="eyebrow">RANCH SIGNATURE · LEÓN, MÉXICO</span>
          <h1>Tradición, carácter<br />y estilo <em>en cada paso.</em></h1>
          <p class="hero-description">Descubre nuestra selección de botas, botines, texanas, sombreros y accesorios, elaborados para quienes aprecian la calidad, los materiales y la tradición del estilo western.</p>
          <p class="hero-note">Calidad y estilo con esencia vaquera. Piezas que reflejan personalidad, tradición y autenticidad.</p>
          <div class="hero-actions">
            <a class="button button-primary" href="#catalogo" @click=${(event) => this.requestNavigation(event, 'catalogo')}>Explorar catálogo <span aria-hidden="true">↗</span></a>
            <a class="button button-secondary" href="#contacto" @click=${(event) => this.requestNavigation(event, 'contacto')}><i data-lucide="map-pin" aria-hidden="true"></i> Visítanos en tienda</a>
          </div>
        </div>
        <aside class="hero-meta" aria-label="Información de la tienda">
          <div class="store-status"><span class="status-dot ${this.storeOpen ? 'is-open' : 'is-closed'}"></span><span>${this.storeOpen ? 'Tienda abierta' : 'Tienda cerrada'}</span></div>
          <div class="meta-item"><i data-lucide="package-check" aria-hidden="true"></i><span>Enviamos a todo México y Estados Unidos</span></div>
          <a class="meta-item meta-location" href="#contacto" @click=${(event) => this.requestNavigation(event, 'contacto')}><i data-lucide="map-pin" aria-hidden="true"></i><span>${city}</span><span class="meta-arrow" aria-hidden="true">↗</span></a>
          <details class="hours-details"><summary><i data-lucide="clock-3" aria-hidden="true"></i><span>Horarios de atención</span><span class="hours-toggle" aria-hidden="true">+</span></summary><div class="hours-list">${storeHours.map((item) => html`<p><span>${item.days}</span><span>${item.hours}</span></p>`)}</div></details>
        </aside>
      </div>
      <div class="hero-caption"><span>Tradición que se lleva puesta</span><span>01 — 06</span></div>
    </header>`;
  }
}
customElements.define('header-view', HeaderView);
