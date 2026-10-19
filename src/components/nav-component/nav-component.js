import { LitElement, css, html } from "lit";
import { unsafeCSS } from 'lit';

/* --- STYLES --- */
import generalStyles from '../../styles/globalStyles.css?inline';
import innerStyles from './nav-component.css?inline';
/* --- STYLES --- */

/* --- ICONS --- */
import { hydrateIcons } from '../../utils/icons.js';
import { animatePage } from '../../utils/animations.js';
/* --- ICONS --- */

/* --- ASSETS --- */
import logo from '../../assets/CPM/cpm-logo.png';
/* --- ASSETS --- */

export class NavComponent extends LitElement {

    static properties = {
        menuOpen: { type: Boolean },
    };

    constructor() {
        super();
        this.menuOpen = false;
        this.handleKeydown = this.handleKeydown.bind(this);
        this.handleResize = this.handleResize.bind(this);
    }

    connectedCallback() {
        super.connectedCallback();
        window.addEventListener('keydown', this.handleKeydown);
        window.addEventListener('resize', this.handleResize);
    }

    disconnectedCallback() {
        window.removeEventListener('keydown', this.handleKeydown);
        window.removeEventListener('resize', this.handleResize);
        super.disconnectedCallback();
    }

    static styles = [
        css`${unsafeCSS(generalStyles)}`,
        css`${unsafeCSS(innerStyles)}`,
    ];

    firstUpdated() { 
        hydrateIcons(this.renderRoot); 
    }
    updated() { 
        hydrateIcons(this.renderRoot); 
    }
        
    render() {
        return html`
            <nav class="site-nav-container d-flexx d-row" aria-label="Navegación principal">

                <a class="brand" href="#Inicio" data-target="Inicio" @click=${this.handleNavigation}>
                    <img src=${logo} alt="Caja Popular Mexicana">
                    <span>CARRERA CPM<strong>75 AÑOS</strong></span>
                </a>
                <div class="desktop-nav d-flexx d-row">
                    <a href="#Inicio" data-target="Inicio" @click=${this.handleNavigation}>Inicio</a>
                    <a href="#Carrera" data-target="Carrera" @click=${this.handleNavigation}>La carrera</a>
                    <a href="#Convocatoria" data-target="Convocatoria" @click=${this.handleNavigation}>Convocatoria</a>
                    <a href="#Distancias" data-target="Distancias" @click=${this.handleNavigation}>Distancias</a>
                    <a href="#Kit" data-target="Kit" @click=${this.handleNavigation}>Kit de Corredor</a>
                    <a href="#Registro" data-target="Registro" @click=${this.handleNavigation}>Registro</a>
                    <a href="#Premiacion" data-target="Premiacion" @click=${this.handleNavigation}>Premiación</a>
                    <a href="#FAQS" data-target="FAQS" @click=${this.handleNavigation}>Faq´s</a>
                </div>
                <a class="button button-lime header-cta" href="#Registro" data-target="Registro" @click=${this.handleNavigation}>
                    Regístrate <i data-lucide="arrow-up-right" aria-hidden="true"></i>
                </a>
                    
                <button
                    class="menu-link"
                    type="button"
                    @click=${this.toggleMenu}
                    aria-label="Abrir menú de navegación"
                    aria-controls="mobile-navigation"
                    aria-expanded=${this.menuOpen}
                >
                    <i data-lucide=${this.menuOpen ? 'x' : 'menu'} aria-hidden="true"></i>
                </button>

                <div id="mobile-navigation" class=${this.menuOpen ? 'mobile-menu is-open' : 'mobile-menu'} role="navigation" aria-label="Navegación móvil">
                    <a href="#Inicio" data-target="Inicio" @click=${this.handleNavigation}>Inicio</a>
                    <a href="#Carrera" data-target="Carrera" @click=${this.handleNavigation}>La carrera</a>
                    <a href="#Convocatoria" data-target="Convocatoria" @click=${this.handleNavigation}>Convocatoria</a>
                    <a href="#Distancias" data-target="Distancias" @click=${this.handleNavigation}>Distancias</a>
                    <a href="#Kit" data-target="Kit" @click=${this.handleNavigation}>Kit de corredor</a>
                    <a href="#Registro" data-target="Registro" @click=${this.handleNavigation}>Registro</a>
                    <a href="#Premiacion" data-target="Premiacion" @click=${this.handleNavigation}>Premiación</a>
                    <a href="#FAQS" data-target="FAQS" @click=${this.handleNavigation}>FAQ's</a>
                </div>

            </nav>
        `;
    };

    handleNavigation(event) {
        const target = event.currentTarget.dataset.target;
        this.menuOpen = false;

        this.dispatchEvent(
            new CustomEvent('navigate-section', {
                detail: {
                    target
                },
                bubbles: true,
                composed: true
            })
        );
    }

    toggleMenu() {
        this.menuOpen = !this.menuOpen;
    }

    handleKeydown(event) {
        if (event.key === 'Escape' && this.menuOpen) {
            this.menuOpen = false;
        }
    }

    handleResize() {
        if (window.innerWidth > 800 && this.menuOpen) {
            this.menuOpen = false;
        }
    }

}
customElements.define('nav-component', NavComponent);
