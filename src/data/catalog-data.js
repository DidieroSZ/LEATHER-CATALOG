import bootCroc from "../assets/propuesta_1/02_bota_clasica_cocodrilo.png";
import bootOstrich from "../assets/propuesta_1/01_bota_avestruz_cognac.png";
import bootPython from "../assets/propuesta_1/05_bota_piton.png";
import bootBlack from "../assets/propuesta_1/02_bota_negra_exotica.png";
import bootBicolor from "../assets/propuesta_1/02_bota_bicolor.png";
import bootieOstrich from "../assets/propuesta_1/03_botin_avestruz.png";
import bootieLeather from "../assets/propuesta_1/08_botin_ternera.png";
import texanaPalmilla from "../assets/propuesta_1/04_texana_palmilla.png";
import texanaFringe from "../assets/propuesta_1/07_texana_flecos.png";
import hatPalmilla from "../assets/propuesta_1/06_sombrero_beige.png";
import hatBlack from "../assets/propuesta_1/09_sombrero_negro.png";
import beltCroc from "../assets/propuesta_1/04_cinturon_cocodrilo.png";
import beltPython from "../assets/propuesta_1/05_cinturon_piton.png";
import categoryBoots from "../assets/propuesta_1/02_categoria_botas.png";
import categoryBooties from "../assets/propuesta_1/03_categoria_botines.png";
import categoryHats from "../assets/propuesta_1/04_categoria_sombreros.png";
import categoryBelts from "../assets/propuesta_1/05_categoria_cinturones.png";
import skinCrocodile from "../assets/propuesta_1/01_piel_cocodrilo.png";
import skinOstrich from "../assets/propuesta_1/02_piel_avestruz.png";
import skinPython from "../assets/propuesta_1/04_piel_piton.png";
import skinNovillo from "../assets/propuesta_1/05_piel_novillo_grabado.png";

export const skins = [
  { id: "cocodrilo", name: "Cocodrilo" },
  { id: "avestruz", name: "Avestruz" },
  { id: "piton", name: "Pitón" },
  { id: "palmilla", name: "Palmilla" },
  { id: "ternera", name: "Ternera" },
  { id: "novillo", name: "Novillo" },
];

export const images = [
  ["boot-croc", bootCroc, "Bota clásica de cocodrilo"],
  ["boot-ostrich", bootOstrich, "Bota de avestruz cognac"],
  ["boot-python", bootPython, "Bota de pitón"],
  ["boot-black", bootBlack, "Bota negra artesanal"],
  ["boot-bicolor", bootBicolor, "Bota bicolor"],
  ["bootie-ostrich", bootieOstrich, "Botín de avestruz"],
  ["bootie-leather", bootieLeather, "Botín de ternera"],
  ["texana-palmilla", texanaPalmilla, "Texana de palmilla"],
  ["texana-fringe", texanaFringe, "Texana con flecos"],
  ["hat-palmilla", hatPalmilla, "Sombrero de palmilla"],
  ["hat-black", hatBlack, "Sombrero negro"],
  ["belt-croc", beltCroc, "Cinturón de cocodrilo"],
  ["belt-python", beltPython, "Cinturón de pitón"],
  ["category-boots", categoryBoots, "Colección de botas"],
  ["category-booties", categoryBooties, "Colección de botines"],
  ["category-texanas", texanaPalmilla, "Colección de texanas"],
  ["category-hats", categoryHats, "Colección de sombreros"],
  ["category-belts", categoryBelts, "Colección de cinturones"],
].map(([id, src, alt]) => ({ id, src, alt }));

export const categories = [
  {
    id: "botas",
    name: "Botas",
    description: "Carácter artesanal para cada paso.",
    imageId: "category-boots",
  },
  {
    id: "botines",
    name: "Botines",
    description: "Siluetas precisas de tradición vaquera.",
    imageId: "category-booties",
  },
  {
    id: "texanas",
    name: "Texanas",
    description: "Piezas de presencia y oficio.",
    imageId: "category-texanas",
  },
  {
    id: "sombreros",
    name: "Sombreros",
    description: "Sombra, forma y distinción.",
    imageId: "category-hats",
  },
  {
    id: "cinturones",
    name: "Cinturones",
    description: "El detalle que completa el conjunto.",
    imageId: "category-belts",
  },
];

const makeProduct = (id, name, categoryId, skinId, imageId, price, colors) => ({
  id,
  name,
  slug: id,
  categoryId,
  skinId,
  price,
  currency: "MXN",
  imageIds: [imageId],
  colors,
  sizes: ["25", "26", "27", "28"],
  availability: "pending",
  shortDescription: "Pieza demostrativa de la colección Casa Loram.",
  description:
    "Información comercial demostrativa. Cada pieza está concebida para celebrar el oficio, la presencia y la tradición de la piel.",
  features: [
    "Acabado artesanal",
    "Material seleccionado",
    "Ficha comercial pendiente",
  ],
  care: "Recomendaciones específicas pendientes de confirmación comercial.",
});

export const products = [
  makeProduct(
    "bota-clasica-cocodrilo",
    "Bota clásica cocodrilo",
    "botas",
    "cocodrilo",
    "boot-croc",
    12900,
    ["#402a1b", "#211713"],
  ),
  makeProduct(
    "bota-avestruz-cognac",
    "Bota avestruz cognac",
    "botas",
    "avestruz",
    "boot-ostrich",
    9800,
    ["#a45d2d", "#6a351c"],
  ),
  makeProduct(
    "bota-piton",
    "Bota pitón",
    "botas",
    "piton",
    "boot-python",
    11800,
    ["#d9c9aa", "#493826"],
  ),
  makeProduct(
    "bota-negra-exotica",
    "Bota negra exótica",
    "botas",
    "novillo",
    "boot-black",
    8900,
    ["#1e1815"],
  ),
  makeProduct(
    "bota-bicolor",
    "Bota bicolor",
    "botas",
    "ternera",
    "boot-bicolor",
    7600,
    ["#663a24", "#ded2bd"],
  ),
  makeProduct(
    "botin-avestruz",
    "Botín avestruz",
    "botines",
    "avestruz",
    "bootie-ostrich",
    6900,
    ["#b66832", "#754022"],
  ),
  makeProduct(
    "botin-ternera",
    "Botín ternera",
    "botines",
    "ternera",
    "bootie-leather",
    5800,
    ["#39241a", "#7a4e31"],
  ),
  makeProduct(
    "botin-cognac",
    "Botín cognac",
    "botines",
    "novillo",
    "bootie-ostrich",
    6100,
    ["#9a552d"],
  ),
  makeProduct(
    "texana-palmilla",
    "Texana palmilla",
    "texanas",
    "palmilla",
    "texana-palmilla",
    4500,
    ["#ead8b6"],
  ),
  makeProduct(
    "texana-flecos",
    "Texana flecos",
    "texanas",
    "ternera",
    "texana-fringe",
    5200,
    ["#9a6b3e"],
  ),
  makeProduct(
    "texana-reserva",
    "Texana reserva",
    "texanas",
    "novillo",
    "texana-palmilla",
    4800,
    ["#c4a77a"],
  ),
  makeProduct(
    "sombrero-chihuahua",
    "Sombrero Chihuahua",
    "sombreros",
    "palmilla",
    "hat-palmilla",
    3900,
    ["#e4cfaa"],
  ),
  makeProduct(
    "sombrero-ibiza",
    "Sombrero Ibiza",
    "sombreros",
    "palmilla",
    "hat-palmilla",
    4200,
    ["#e7d8ba"],
  ),
  makeProduct(
    "sombrero-noche",
    "Sombrero noche",
    "sombreros",
    "ternera",
    "hat-black",
    4700,
    ["#201815"],
  ),
  makeProduct(
    "cinturon-hebilla-plata",
    "Cinturón hebilla plata",
    "cinturones",
    "cocodrilo",
    "belt-croc",
    3200,
    ["#352117"],
  ),
  makeProduct(
    "cinturon-piton",
    "Cinturón pitón",
    "cinturones",
    "piton",
    "belt-python",
    3400,
    ["#8a755d"],
  ),
  makeProduct(
    "cinturon-reserva",
    "Cinturón reserva",
    "cinturones",
    "novillo",
    "belt-croc",
    2800,
    ["#563b2a"],
  ),
];

export const getImage = (id) => images.find((image) => image.id === id);
export const getSkin = (id) => skins.find((skin) => skin.id === id);

export const skinExplorerCategories = [
  { id: "exoticas", name: "Pieles exóticas", description: "Texturas naturales de presencia singular.", skinIds: ["cocodrilo", "avestruz", "piton"], order: 1, active: true },
  { id: "bovinas", name: "Pieles bovinas", description: "Materiales clásicos elegidos para la colección.", skinIds: ["ternera", "novillo"], order: 2, active: true },
  { id: "especiales", name: "Acabados especiales", description: "Denominaciones comerciales y acabados de la casa.", skinIds: ["palmilla"], order: 3, active: true },
];

export const skinExplorerImages = [
  { id: "skin-cocodrilo", src: skinCrocodile, alt: "Textura de piel de cocodrilo", skinId: "cocodrilo", role: "texture" },
  { id: "skin-avestruz", src: skinOstrich, alt: "Textura de piel de avestruz", skinId: "avestruz", role: "texture" },
  { id: "skin-piton", src: skinPython, alt: "Textura de piel de pitón", skinId: "piton", role: "texture" },
  { id: "skin-ternera", src: bootieLeather, alt: "Botín de ternera de la colección", skinId: "ternera", role: "editorial" },
  { id: "skin-novillo", src: skinNovillo, alt: "Piel de novillo con grabado", skinId: "novillo", role: "texture" },
  { id: "skin-palmilla", src: texanaPalmilla, alt: "Texana de palmilla de la colección", skinId: "palmilla", role: "editorial" },
];

const generalCare = { cleaning: "Información específica pendiente de validación del proveedor.", storage: "Conservar en un entorno seco y ventilado.", precaution: "Consultar al fabricante antes de aplicar productos." };
export const skinExplorerDetails = {
  cocodrilo: { materialType: "Reptil", description: "Una textura de escamas definidas, seleccionada por su presencia visual en piezas de carácter.", characteristics: ["Textura natural distintiva", "Uso demostrativo en botas y cinturones"], care: generalCare },
  avestruz: { materialType: "Ave", description: "El relieve característico aporta una lectura táctil y cálida a la silueta de cada pieza.", characteristics: ["Relieve natural reconocible", "Acabado demostrativo en calzado"], care: { ...generalCare, storage: "Evitar la humedad prolongada." } },
  piton: { materialType: "Reptil", description: "Una superficie de patrón natural que aporta contraste y una expresión singular a la colección.", characteristics: ["Patrón natural variable", "Presencia visual marcada"], care: { ...generalCare, storage: "Guardar alejada del sol directo." } },
  ternera: { materialType: "Piel bovina", description: "Una piel bovina de apariencia lisa, presente en líneas de botines y sombreros de la colección.", characteristics: ["Acabado demostrativo de apariencia lisa", "Uso en siluetas de línea clásica"], care: generalCare },
  novillo: { materialType: "Piel bovina", description: "El novillo aparece en la colección con un lenguaje cálido y acabados que priorizan la textura.", characteristics: ["Base bovina", "Acabados comerciales por validar"], care: { ...generalCare, storage: "Evitar fuentes directas de calor." } },
  palmilla: { materialType: "Acabado comercial", description: "Palmilla se presenta como una denominación comercial de la colección; su composición debe confirmarse con el proveedor.", characteristics: ["Denominación comercial", "Aplicación demostrativa en texanas y sombreros"], care: { cleaning: "Consultar las indicaciones del fabricante.", storage: "Guardar en un sitio seco y protegido.", precaution: "No aplicar tratamientos sin confirmar el material base." } },
};
export const getSkinExplorerImage = (skinId) => skinExplorerImages.find((image) => image.skinId === skinId);
