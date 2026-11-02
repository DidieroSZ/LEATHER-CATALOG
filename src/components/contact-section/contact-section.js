import { LitElement, css, html, nothing } from 'lit';
import { unsafeCSS } from 'lit';
import { gsap } from 'gsap';
import styles from './contact-section.css?inline';
import generalStyles from '../../styles/globalStyles.css?inline';
import { contactConfig } from '../../data/contact-config.js';
import { hydrateIcons } from '../../utils/icons.js';

export class ContactSection extends LitElement {
  static styles = [css`${unsafeCSS(generalStyles)}`, css`${unsafeCSS(styles)}`];

  firstUpdated() {
    hydrateIcons(this.renderRoot);

    if (matchMedia('(prefers-reduced-motion: reduce)').matches) return;

    this.animationObserver = new IntersectionObserver(([entry]) => {
      if (!entry.isIntersecting) return;

      gsap.from(this.renderRoot.querySelectorAll('.contact-information, .location-card'), {
        opacity: 0,
        y: 14,
        duration: 0.6,
        stagger: 0.1,
        ease: 'power2.out',
      });
      this.animationObserver.disconnect();
      this.animationObserver = null;
    }, { threshold: 0.12 });
    this.animationObserver.observe(this);
  }

  disconnectedCallback() {
    this.animationObserver?.disconnect();
    super.disconnectedCallback();
  }

  renderContactMethod({ icon, label, value, href, external = false }) {
    return html`<a
      class="contact-method"
      href=${href}
      target=${external ? '_blank' : nothing}
      rel=${external ? 'noreferrer' : nothing}
    >
      <span class="method-icon"><i data-lucide=${icon} aria-hidden="true"></i></span>
      <span class="method-copy"><small>${label}</small><strong>${value}</strong></span>
    </a>`;
  }

  renderLocation() {
    const { location } = contactConfig;
    const hasAddress = Boolean(location.address || location.city || location.state || location.postalCode);
    const address = [location.address, location.city, location.state, location.postalCode]
      .filter(Boolean)
      .join(', ');

    if (location.embedUrl) {
      return html`<iframe
        class="map-frame"
        src=${location.embedUrl}
        title=${`Mapa de ubicación de ${location.name}`}
        loading="lazy"
        referrerpolicy="no-referrer-when-downgrade"
        allowfullscreen
      ></iframe>`;
    }

    return html`<div class="map-pending" role="status" aria-label="Mapa pendiente de ubicación">
      <span class="map-pin"><i data-lucide="map-pin" aria-hidden="true"></i></span>
      <strong>${hasAddress ? address : 'Ubicación por confirmar'}</strong>
      <span>${hasAddress ? 'Completa la URL del mapa para habilitar la vista interactiva.' : 'El mapa se habilitará cuando se confirme la dirección de la sucursal.'}</span>
    </div>`;
  }

  render() {
    const { eyebrow, title, description, contact, location, schedule } = contactConfig;
    const whatsappMessage = encodeURIComponent(contact.whatsappMessage);
    const whatsappUrl = `https://wa.me/${contact.whatsapp}?text=${whatsappMessage}`;
    const mapsHref = location.mapsUrl || nothing;

    return html`<section class="contact-section" aria-labelledby="contact-title">
      <div class="contact-layout">
        <div class="contact-information">
          <p class="contact-eyebrow">${eyebrow}</p>
          <h2 id="contact-title">${title}</h2>
          <p class="contact-description">${description}</p>

          <div class="contact-methods" aria-label="Medios de contacto">
            ${this.renderContactMethod({
              icon: 'phone',
              label: 'Línea de atención',
              value: contact.phone,
              href: `tel:${contact.phoneLink}`,
            })}
            ${this.renderContactMethod({
              icon: 'message-circle',
              label: 'WhatsApp',
              value: 'Escríbenos directamente',
              href: whatsappUrl,
              external: true,
            })}
            ${this.renderContactMethod({
              icon: 'mail',
              label: 'Correo electrónico',
              value: contact.email,
              href: `mailto:${contact.email}`,
            })}
          </div>

          <a class="whatsapp-action" href=${whatsappUrl} target="_blank" rel="noreferrer">
            <i data-lucide="message-circle" aria-hidden="true"></i>
            <span>Contactar por WhatsApp</span>
            <i class="action-arrow" data-lucide="arrow-up-right" aria-hidden="true"></i>
          </a>

          <div class="contact-hours">
            <i data-lucide="clock-3" aria-hidden="true"></i>
            <div>
              <strong>Horario de atención</strong>
              ${schedule.map((item) => html`<p><span>${item.days}</span><span>${item.hours}</span></p>`)}
            </div>
          </div>
        </div>

        <section class="location-card" aria-labelledby="location-title">
          <div class="location-heading">
            <div>
              <p class="location-eyebrow">Visítanos</p>
              <h3 id="location-title">${location.name}</h3>
              <p>${location.address || 'Dirección pendiente de confirmación'}</p>
            </div>
            ${location.mapsUrl
              ? html`<a class="directions-link" href=${location.mapsUrl} target="_blank" rel="noreferrer" aria-label="Cómo llegar a ${location.name}">
                  <i data-lucide="arrow-up-right" aria-hidden="true"></i>
                </a>`
              : nothing}
          </div>
          <div class="map-container">${this.renderLocation()}</div>
          ${location.mapsUrl
            ? html`<a class="directions-button" href=${location.mapsUrl} target="_blank" rel="noreferrer">
                <i data-lucide="map" aria-hidden="true"></i> Cómo llegar
              </a>`
            : html`<p class="map-note">La dirección y el enlace de Google Maps se agregarán al confirmarse los datos de la sucursal.</p>`}
        </section>
      </div>
    </section>`;
  }
}

customElements.define('contact-section', ContactSection);
