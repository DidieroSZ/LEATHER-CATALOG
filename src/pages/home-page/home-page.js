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
import '../../views/catalog-view/catalog-view.js';
import '../../views/heritage-view/heritage-view.js';
/* --- VIEWS --- */


export class HomePage extends LitElement {
    static styles = [
        css`${unsafeCSS(generalStyles)}`, 
        css`${unsafeCSS(styles)}`
    ];

    render() {
        return html`
            <main id="contenido-principal" @navigate-section=${this.handleSectionNavigation}>
                <nav-component></nav-component>
                <header-view id="inicio"></header-view>
                <catalog-view id="catalogo"></catalog-view>
                <heritage-view></heritage-view>
            </main>
        `;
    }
    handleSectionNavigation(event) {
        this.renderRoot.querySelector('nav-component')?.navigateTo(event.detail.id);
    }
}
customElements.define('home-page', HomePage);
