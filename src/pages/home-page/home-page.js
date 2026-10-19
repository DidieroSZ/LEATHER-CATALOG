import { LitElement, css, html } from 'lit';
import { unsafeCSS } from 'lit';

/* --- STYLES --- */
import generalStyles from '../../styles/globalStyles.css?inline';
import styles from './home-page.css?inline';
/* --- STYLES --- */

/* --- COMPONENTS --- */
import '../../components/nav-component/nav-component.js';
import '../../components/counter-component/counter-component.js';
import '../../components/overview-component/overview-component.js';
import '../../components/faq-component/faq-component.js';
import '../../components/footer-component/footer-component.js';
/* --- COMPONENTS --- */

/* --- VIEWS --- */
import '../../views/header-view/header-view.js';
import '../../views/history-view/history-view.js';
import '../../views/convocatoria-view/convocatoria-view.js';
import '../../views/distancias-view/distancias-view.js';
import '../../views/benefits-view/benefits-view.js';
import '../../views/register-view/register-view.js';
import '../../views/prizes-view/prizes-view.js';
/* --- VIEWS --- */


export class HomePage extends LitElement {
    static styles = [
        css`${unsafeCSS(generalStyles)}`, 
        css`${unsafeCSS(styles)}`
    ];

    connectedCallback() {
        super.connectedCallback();

        this.addEventListener(
            'navigate-section',
            this.handleNavigation
        );
    }

    disconnectedCallback() {
        this.removeEventListener(
            'navigate-section',
            this.handleNavigation
        );

        super.disconnectedCallback();
    }

    render() {
        return html`
            <main id="contenido-principal">
                <nav-component></nav-component>
                <header-view id="Inicio"></header-view>
                <counter-component></counter-component>
                <overview-component></overview-component>
                <history-view id="Carrera"></history-view>
                <convocatoria-view id="Convocatoria"></convocatoria-view>
                <distancias-view id="Distancias"></distancias-view>
                <benefits-view id="Kit"></benefits-view>
                <register-view id="Registro"></register-view>
                <prizes-view id="Premiacion"></prizes-view>
                <faq-component id="FAQS"></faq-component>
                <footer-component></footer-component>
            </main>
        `;
    }

    handleNavigation(event) {
        const target = event.detail.target;

        const section = this.renderRoot.querySelector(
            `#${target}`
        );

        if (!section) return;

        section.scrollIntoView({
            behavior: 'smooth',
            block: 'start'
        });
    }
}
customElements.define('home-page', HomePage);
