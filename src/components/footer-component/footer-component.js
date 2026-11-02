import { LitElement, css, html, nothing } from 'lit';
import { unsafeCSS } from 'lit';
import { gsap } from 'gsap';
import styles from './footer-component.css?inline';
import generalStyles from '../../styles/globalStyles.css?inline';
import banner from '../../assets/cowboy-horse.jpg';
import { footerConfig } from '../../data/footer-config.js';
import { hydrateIcons } from '../../utils/icons.js';

export class FooterComponent extends LitElement {
  static styles = [css`${unsafeCSS(generalStyles)}`, css`${unsafeCSS(styles)}`];

  firstUpdated() {
    hydrateIcons(this.renderRoot);

    if (matchMedia('(prefers-reduced-motion: reduce)').matches) return;

    this.animationObserver = new IntersectionObserver(([entry]) => {
      if (!entry.isIntersecting) return;

      gsap.from(this.renderRoot.querySelectorAll('.editorial-copy > *, .footer-column'), {
        opacity: 0,
        y: 16,
        duration: 0.65,
        stagger: 0.07,
        ease: 'power2.out',
      });
      this.animationObserver.disconnect();
      this.animationObserver = null;
    });
    this.animationObserver.observe(this);
  }

  disconnectedCallback() {
    this.animationObserver?.disconnect();
    super.disconnectedCallback();
  }

  renderContactLink({ icon, label, href, external = false }) {
    return html`<a
      class="contact-link"
      href=${href}
      target=${external ? '_blank' : nothing}
      rel=${external ? 'noreferrer' : undefined}
    >
      <i data-lucide=${icon} aria-hidden="true"></i>
      <span>${label}</span>
    </a>`;
  }

  navigateSection(event, id) {
    event.preventDefault();
    this.dispatchEvent(
      new CustomEvent('navigate-section', {
        detail: { id },
        bubbles: true,
        composed: true,
      }),
    );
  }

  render() {
    const { brand, contact, location, schedule, links, benefits } = footerConfig;
    const whatsappMessage = encodeURIComponent(contact.whatsappMessage);
    const socials = [
      { id: 'instagram', label: 'Instagram', icon: 'instagram' },
      { id: 'facebook', label: 'Facebook', icon: 'facebook' },
    ].filter(({ id }) => footerConfig.social[id]);

    return html`
      <section class="editorial-banner" id="nosotros" aria-labelledby="footer-slogan">
        <img class="editorial-image" src=${banner} alt="" loading="lazy" decoding="async" aria-hidden="true" />
        <div class="editorial-copy">
          <p class="eyebrow">Casa Loram</p>
          <h2 id="footer-slogan">${brand.slogan}</h2>
          <span class="editorial-rule" aria-hidden="true"></span>
          <p class="editorial-signature">${brand.name}</p>
        </div>
      </section>

      <footer class="footer-main" id="footer">
        <div class="footer-benefits" aria-label="Lo que encontrarás en Casa Loram">
          ${benefits.map(
            ({ icon, title, description }) => html`<div class="benefit">
              <i data-lucide=${icon} aria-hidden="true"></i>
              <p><strong>${title}</strong><span>${description}</span></p>
            </div>`,
          )}
        </div>

        <div class="footer-columns">
          <section class="footer-column footer-brand" aria-labelledby="footer-brand-title">
            <h2 id="footer-brand-title">${brand.name}</h2>
            <p class="tagline">${brand.tagline}</p>
            <p class="brand-description">${brand.description}</p>
            <a class="catalog-link" href="#catalogo" @click=${(event) => this.navigateSection(event, 'catalogo')}>
              Explorar catálogo <span aria-hidden="true">↗</span>
            </a>
            ${socials.length
              ? html`<nav class="social-links" aria-label="Redes sociales">
                  ${socials.map(
                    ({ id, label, icon }) => html`<a href=${footerConfig.social[id]} target="_blank" rel="noreferrer" aria-label=${label}>
                      <i data-lucide=${icon} aria-hidden="true"></i>
                    </a>`,
                  )}
                </nav>`
              : ''}
          </section>

          <section class="footer-column" aria-labelledby="footer-contact-title">
            <h3 id="footer-contact-title">Contáctanos</h3>
            <div class="footer-link-list">
              ${this.renderContactLink({ icon: 'phone', label: contact.phone, href: `tel:${contact.phoneLink}` })}
              ${this.renderContactLink({
                icon: 'message-circle',
                label: 'Escríbenos por WhatsApp',
                href: `https://wa.me/${contact.whatsapp}?text=${whatsappMessage}`,
                external: true,
              })}
              ${this.renderContactLink({ icon: 'mail', label: contact.email, href: `mailto:${contact.email}` })}
            </div>
          </section>

          <section class="footer-column" aria-labelledby="footer-location-title">
            <h3 id="footer-location-title">${location.title}</h3>
            <p class="column-copy">${location.description}</p>
            <p class="location-note">${location.notice}</p>
          </section>

          <section class="footer-column" aria-labelledby="footer-hours-title">
            <h3 id="footer-hours-title">Horario de atención</h3>
            <div class="schedule-list">
              ${schedule.map(
                (item) => html`<p class="schedule-row"><span>${item.days}</span><strong>${item.hours}</strong></p>`,
              )}
            </div>
          </section>
        </div>

        <div class="footer-bottom">
          <nav class="legal-links" aria-label="Información legal">
            ${links.map(
              ({ label, url }) =>
                url
                  ? html`<a href=${url}>${label}</a>`
                  : html`<span title="Enlace pendiente de configuración">${label}</span>`,
            )}
          </nav>
          <div class="copyright-row">
            <p>© ${new Date().getFullYear()} ${brand.name}. Todos los derechos reservados.</p>
            <p class="made-in-mexico">Hecho en México</p>
          </div>
        </div>
      </footer>
    `;
  }
}

customElements.define('footer-component', FooterComponent);
