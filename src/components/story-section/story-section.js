import { LitElement, css, html } from 'lit';
import { unsafeCSS } from 'lit';
import { gsap } from 'gsap';
import styles from './story-section.css?inline';
import generalStyles from '../../styles/globalStyles.css?inline';
import { storyConfig } from '../../data/story-config.js';
import { hydrateIcons } from '../../utils/icons.js';

export class StorySection extends LitElement {
  static styles = [css`${unsafeCSS(generalStyles)}`, css`${unsafeCSS(styles)}`];

  firstUpdated() {
    hydrateIcons(this.renderRoot);

    if (matchMedia('(prefers-reduced-motion: reduce)').matches) return;

    this.animationObserver = new IntersectionObserver(([entry]) => {
      if (!entry.isIntersecting) return;

      gsap.from(this.renderRoot.querySelectorAll('.story-photo, .story-copy'), {
        opacity: 0,
        y: 14,
        duration: 0.65,
        stagger: 0.1,
        ease: 'power2.out',
      });
      this.animationObserver.disconnect();
      this.animationObserver = null;
    }, { threshold: 0.15 });
    this.animationObserver.observe(this);
  }

  disconnectedCallback() {
    this.animationObserver?.disconnect();
    super.disconnectedCallback();
  }

  navigateToStory(event) {
    event.preventDefault();
    this.dispatchEvent(new CustomEvent('navigate-section', {
      detail: { id: storyConfig.id },
      bubbles: true,
      composed: true,
    }));
  }

  render() {
    const { eyebrow, title, description, actionLabel, actionHref, images } = storyConfig;

    return html`<section class="story-section" aria-labelledby="story-title">
      <figure class="story-photo story-photo-main">
        <img src=${images.artisan.src} alt=${images.artisan.alt} loading="lazy" decoding="async" />
      </figure>

      <div class="story-copy">
        <p class="story-eyebrow">${eyebrow}</p>
        <h2 id="story-title">${title}</h2>
        <p class="story-description">${description}</p>
        <a class="story-action" href=${actionHref} @click=${this.navigateToStory}>
          <span>${actionLabel}</span>
          <i data-lucide="arrow-right" aria-hidden="true"></i>
        </a>
      </div>

    </section>`;
  }
}

customElements.define('story-section', StorySection);
