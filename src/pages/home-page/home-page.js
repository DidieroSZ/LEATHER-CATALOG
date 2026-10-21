import { LitElement, css, html } from 'lit';
import { unsafeCSS } from 'lit';

/* --- STYLES --- */
import generalStyles from '../../styles/globalStyles.css?inline';
import styles from './home-page.css?inline';
/* --- STYLES --- */

/* --- COMPONENTS --- */
import '../../components/nav-component/nav-component.js';
/* --- COMPONENTS --- */

/* --- VIEWS --- */
import '../../views/header-view/header-view.js';
/* --- VIEWS --- */


export class HomePage extends LitElement {
    static styles = [
        css`${unsafeCSS(generalStyles)}`, 
        css`${unsafeCSS(styles)}`
    ];

    render() {
        return html`
            <main id="contenido-principal">
                <nav-component></nav-component>
                <header-view id="Inicio"></header-view>
            </main>
        `;
    }
}
customElements.define('home-page', HomePage);
