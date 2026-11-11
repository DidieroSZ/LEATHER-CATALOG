import { LitElement, css, html } from "lit";
import { unsafeCSS } from "lit";
import { gsap } from "gsap";
import styles from "./heritage-view.css?inline";
import generalStyles from "../../styles/globalStyles.css?inline";
import rancho from "../../assets/propuesta_1/01_marca_rancho_real.png";
import potro from "../../assets/propuesta_1/02_marca_el_potro.png";
import sierra from "../../assets/propuesta_1/03_marca_sierra_brava.png";
import cuero from "../../assets/propuesta_1/04_marca_cuero_fino.png";
import altos from "../../assets/propuesta_1/05_marca_los_altos.png";
import valle from "../../assets/propuesta_1/06_marca_valle_dorado.png";
import "../../components/skin-explorer/skin-explorer.js";
import "../../components/footer-component/footer-component.js";
import "../../components/contact-section/contact-section.js";
import "../../components/story-section/story-section.js";

const brands = [
  [rancho, "Rancho Real"],
  [potro, "El Potro"],
  [sierra, "Sierra Brava"],
  [cuero, "Cuero Fino"],
  [altos, "Los Altos"],
  [valle, "Valle Dorado"],
];
export class HeritageView extends LitElement {
  static styles = [
    css`
      ${unsafeCSS(generalStyles)}
    `,
    css`
      ${unsafeCSS(styles)}
    `,
  ];
  firstUpdated() {
    if (!matchMedia("(prefers-reduced-motion: reduce)").matches) {
      const o = new IntersectionObserver(
        ([e]) => {
          if (e.isIntersecting) {
            gsap.from(this.renderRoot.querySelectorAll(".brand"), {
              opacity: 0,
              y: 20,
              stagger: 0.08,
              duration: 0.55,
              ease: "power2.out",
            });
            o.disconnect();
          }
        },
        { threshold: 0.2 },
      );
      o.observe(this);
    }
  }
  render() {
    return html`<section id="pieles" class="textures">
        <skin-explorer></skin-explorer>
      </section>
      <!-- 
      <story-section id="historia"></story-section>
      -->
      <section id="marcas" class="brands page-shell">
        <h2>Marcas disponibles</h2>
        <p>
          Una selección de casas reconocidas por la calidad de sus botas y
          accesorios.
        </p>
        <div class="brand-grid">
          ${brands.map(
            ([img, name]) =>
              html`<article class="brand">
                <img src="${img}" alt="${name}" />
                <h3>${name}</h3>
                <span>Ver selección →</span>
              </article>`,
          )}
        </div>
      </section>
      <contact-section id="contacto"></contact-section>
      <footer-component></footer-component>`;
  }
}
customElements.define("heritage-view", HeritageView);
