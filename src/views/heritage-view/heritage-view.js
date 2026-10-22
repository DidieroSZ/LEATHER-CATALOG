import { LitElement, css, html } from 'lit';
import { unsafeCSS } from 'lit';
import { gsap } from 'gsap';
import styles from './heritage-view.css?inline';
import crocodile from '../../assets/propuesta_1/01_piel_cocodrilo.png';
import ostrich from '../../assets/propuesta_1/02_piel_avestruz.png';
import python from '../../assets/propuesta_1/04_piel_piton.png';
import angora from '../../assets/propuesta_1/04_piel_angora.png';
import engraved from '../../assets/propuesta_1/05_piel_novillo_grabado.png';
import artisan from '../../assets/propuesta_1/06_artesano_taller.png';
import rancho from '../../assets/propuesta_1/01_marca_rancho_real.png';
import potro from '../../assets/propuesta_1/02_marca_el_potro.png';
import sierra from '../../assets/propuesta_1/03_marca_sierra_brava.png';
import cuero from '../../assets/propuesta_1/04_marca_cuero_fino.png';
import altos from '../../assets/propuesta_1/05_marca_los_altos.png';
import valle from '../../assets/propuesta_1/06_marca_valle_dorado.png';
import banner from '../../assets/propuesta_1/07_banner_vaquero_atardecer.png';

const hides = [[crocodile,'Cocodrilo'],[ostrich,'Avestruz'],[python,'Pitón'],[angora,'Angora'],[engraved,'Novillo grabado']];
const brands = [[rancho,'Rancho Real'],[potro,'El Potro'],[sierra,'Sierra Brava'],[cuero,'Cuero Fino'],[altos,'Los Altos'],[valle,'Valle Dorado']];
export class HeritageView extends LitElement {
  static styles=[css`${unsafeCSS(styles)}`];
  firstUpdated(){if(!matchMedia('(prefers-reduced-motion: reduce)').matches){const o=new IntersectionObserver(([e])=>{if(e.isIntersecting){gsap.from(this.renderRoot.querySelectorAll('.hide,.brand'),{opacity:0,y:20,stagger:.08,duration:.55,ease:'power2.out'});o.disconnect()}},{threshold:.2});o.observe(this)}}
  requestNavigation(event, id){event.preventDefault();this.dispatchEvent(new CustomEvent('navigate-section',{detail:{id},bubbles:true,composed:true}));}
  render(){return html`<section id="pieles" class="textures page-shell"><h2>Pieles de lujo</h2><p>Texturas que cuentan historias</p><div class="hides">${hides.map(([img,name])=>html`<figure class="hide"><img src="${img}" alt="Piel de ${name}"/><figcaption>${name}</figcaption></figure>`)}</div></section><section class="story"><div class="story-in page-shell"><img src="${artisan}" alt="Artesano trabajando piel"/><div><p class="mini">NUESTRAS RAÍCES</p><h2>Historia y tradición</h2><p>Somos herederos de una cultura vaquera que ha moldeado nuestras identidades. En cada pieza vive la historia de generaciones que han sabido valorar lo auténtico.</p><a href="#contacto" @click=${(event)=>this.requestNavigation(event,'contacto')}>Más que piel, es historia <span>→</span></a></div></div></section><section id="marcas" class="brands page-shell"><h2>Marcas disponibles</h2><p>Una selección de casas reconocidas por la calidad de sus botas y accesorios.</p><div class="brand-grid">${brands.map(([img,name])=>html`<article class="brand"><img src="${img}" alt="${name}"/><h3>${name}</h3><span>Ver selección →</span></article>`)}</div></section><section id="contacto" class="contact"><div class="contact-bg" style="background-image:url(${banner})"></div><div class="contact-copy"><p>BUENAS MARCAS</p><h2>Llevan a grandes destinos</h2><a href="mailto:contacto@casaloram.com">Solicitar catálogo <span>→</span></a></div></section><footer><div><strong>CASA LORAM</strong><span>Tradición en cada paso.</span></div><div><span>Contacto</span><a href="tel:+524791031689">+52 479 103 1689</a></div><div><span>Horarios</span><p>Lun–Vie · 10:00–19:00</p></div></footer>`}
}
customElements.define('heritage-view',HeritageView);
