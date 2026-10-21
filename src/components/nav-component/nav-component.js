import { LitElement, css, html } from "lit";
import { unsafeCSS } from 'lit';

/* --- STYLES --- */
import generalStyles from '../../styles/globalStyles.css?inline';
import innerStyles from './nav-component.css?inline';
/* --- STYLES --- */

/* --- ICONS --- */
import { hydrateIcons } from '../../utils/icons.js';
/* --- ICONS --- */

/* --- ASSETS --- */
import logo from '../../assets/CasaLoram.png';
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
            <nav class="nav--container d-flexx d-row" aria-label="Navegación principal">
                <div class="inner--shell grid--nav">

                    <div class="item--nav large--item d-flexx d-row">
                        <button class="btn-gen">Inicio</button>
                        <button class="btn-gen btn-sec">Productos</button>
                        <button class="btn-gen btn-sec">Pieles</button>
                        <button class="btn-gen btn-sec">Marcas</button>
                        <button class="btn-gen btn-sec">Contacto</button>
                    </div>

                    <div class="item--nav center--item">
                    
                        <a class="brand" href="#Inicio" data-target="Inicio" @click=${this.handleNavigation}>
                            <img src="${logo}" alt="Logo Casa Loram">
                        </a>
                    
                    <!-- 
                        <a class="brand d-flexx" href="#Inicio" data-target="Inicio" @click=${this.handleNavigation}>
                            <p class="logo--text font--cursiva">C L</p>
                        </a>
                        -->
                    </div>

                    <div class="item--nav rigth--item d-flexx">
                        <p class="font--normal">479-103-1689</p>
                        <button class="btn-gen btn-cta">Catálogo</button>
                    </div>
                    
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
