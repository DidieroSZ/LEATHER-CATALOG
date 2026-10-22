import { LitElement, css, html } from "lit";
import { unsafeCSS } from "lit";
import { gsap } from "gsap";
import styles from "./header-view.css?inline";
import hero from "../../assets/landscape.png";

export class HeaderView extends LitElement {
    static styles = [
        css`
      ${unsafeCSS(styles)}
    `,
    ];
    firstUpdated() {
        if (!matchMedia("(prefers-reduced-motion: reduce)").matches)
            gsap.from(this.renderRoot.querySelectorAll(".hero-copy > *"), {
                opacity: 0,
                y: 28,
                duration: 0.8,
                stagger: 0.12,
                ease: "power3.out",
            });
    }
    requestNavigation(event, id) {
        event.preventDefault();
        this.dispatchEvent(new CustomEvent('navigate-section', { detail: { id }, bubbles: true, composed: true }));
    }
    render() {
        return html`
        <header id="inicio" class="hero">
            <img src="${hero}" alt="Paisaje desértico al atardecer" />
            <div class="shade"></div>
            <div class="hero-copy">
                <p>CASA LORAM · HECHO PARA DURAR</p>
                <h1>Estilo que<br />se hereda</h1>
                <span>Piel exótica y tradición vaquera.</span
                ><a href="#catalogo" @click=${(event) => this.requestNavigation(event, 'catalogo')}>Explorar el catálogo <b>→</b></a>
            </div>
        </header>
        `;
    }
}
customElements.define("header-view", HeaderView);
