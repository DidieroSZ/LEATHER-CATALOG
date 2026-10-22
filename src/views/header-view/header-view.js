import { LitElement, css, html } from "lit";
import { unsafeCSS } from 'lit';

/* --- STYLES --- */
import generalStyles from '../../styles/globalStyles.css?inline';
import innerStyles from './header-view.css?inline';
/* --- STYLES --- */

/* --- ICONS --- */
import { hydrateIcons } from '../../utils/icons.js';
/* --- ICONS --- */

/* --- ASSETS --- */
import logo from '../../assets/CasaLoram.png';
/* --- ASSETS --- */

export class HeaderView extends LitElement {

    static styles = [
        css`${unsafeCSS(generalStyles)}`,
        css`${unsafeCSS(innerStyles)}`,
    ];
        
    render() {
        return html`
            <header class="header--container d-flexx d-row">
                <div class="inner--shell">

                    <div class="cta--container d-flexx d-col">
                        <h1 class="font--bold ">Estilo que se hereda.</h1>
                        <p>Piel exótica y tradición vaquera.</p>
                        <button class="btn-gen btn-cta">Explorar el catálogo</button>
                    </div>

                </div>
            </header>
        `;
    };
}
customElements.define('header-view', HeaderView);
