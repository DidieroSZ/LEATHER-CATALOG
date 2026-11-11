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
  { id: "cocodrilo-panza", name: "Cocodrilo (panza)" },
  { id: "cocodrilo-cola", name: "Cocodrilo (cola)" },
  { id: "avestruz", name: "Avestruz" },
  { id: "piton", name: "Pitón" },
  { id: "res", name: "Res" },
  { id: "venado", name: "Venado" },
  { id: "cuello-toro", name: "Cuello de toro" },
  { id: "pelo-vaca", name: "Pelo de vaca" },
  { id: "pescado", name: "Pescado" },
  { id: "jirafa", name: "Jirafa" },
  { id: "palmilla", name: "Palmilla" },
  { id: "papel-arroz", name: "Papel arroz" },
  { id: "papel-arroz-japones", name: "Papel arroz japonés" },
  { id: "master-telar", name: "Master telar" },
  { id: "bangora", name: "Bangora" },
  { id: "sisol", name: "Sisol" },
  { id: "shantung", name: "Shantung" },
  { id: "palma-natural", name: "Palma natural" },
  { id: "paja-natural", name: "Paja natural" },
  { id: "lana", name: "Lana" },
  { id: "pelo-conejo", name: "Pelo de conejo" },
  { id: "pelo-liebre", name: "Pelo de liebre" },
  { id: "pelo-castor", name: "Pelo de castor" },
  { id: "pelo-nutria", name: "Pelo de nutria" },
  { id: "mezcla-lana-pelo", name: "Mezclas de lana y pelo" },
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

const makeProduct = (id, name, categoryId, skinId, imageId, price, colors, details = {}) => ({
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
  availability: "available",
  ...details,
});

const existingProducts = [
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

const productInfo = {
  'bota-clasica-cocodrilo': ['CL-BOT-001','Ariat','Cocodrilo (panza)','Cocodrilo (panza)','exotic','Negro','Botas de piel de cocodrilo con perfil clásico y acabado de escama natural.','Limpiar con paño suave y seco; consultar al equipo antes de aplicar productos de conservación.'],
  'bota-avestruz-cognac': ['CL-BOT-002','Malcreado','Avestruz','Avestruz','exotic','Nutria','Bota de avestruz en tono cognac, con textura natural como protagonista.','Retirar el polvo con un paño suave y seco; solicitar orientación para el cuidado de la piel.'],
  'bota-piton': ['CL-BOT-003','Correcaminos','Pitón','Pitón','exotic','Natural','Silueta de bota con piel de pitón y patrón natural de presencia singular.','Conservar en un sitio seco y consultar al equipo antes de usar tratamientos.'],
  'bota-negra-exotica': ['CL-BOT-004','Almeida','Novillo','Res','common','Negro','Bota negra de línea sobria y piel bovina de apariencia marcada.','Limpiar con paño suave y seco; evitar productos sin validar para la piel.'],
  'bota-bicolor': ['CL-BOT-005','Ariat','Ternera','Res','common','Chocolate','Diseño bicolor de inspiración western, pensado para combinar tonos contrastantes.','Retirar el polvo con un paño seco y guardar lejos de humedad prolongada.'],
  'botin-avestruz': ['CL-BOTI-001','Malcreado','Avestruz','Avestruz','exotic','Café','Botín de avestruz que combina una silueta compacta con relieve natural.','Consultar al equipo para recomendaciones específicas de esta piel.'],
  'botin-ternera': ['CL-BOTI-002','Correcaminos','Ternera','Res','common','Chocolate','Botín de ternera de perfil versátil y acabado de apariencia lisa.','Limpiar con paño suave y seco; evitar tratamientos no confirmados.'],
  'botin-cognac': ['CL-BOTI-003','Almeida','Novillo','Res','common','Nutria','Botín en tono cognac con una silueta de carácter clásico.','Guardar en lugar seco y consultar antes de aplicar productos de cuidado.'],
  'texana-palmilla': ['CL-TEX-001','Tombstone','Palma natural','Palma natural','natural','Natural','Texana de palma natural con una forma tradicional y textura ligera.','Retirar el polvo con cepillo suave y conservar en un lugar seco.'],
  'texana-flecos': ['CL-TEX-002','Morcón','Lana','Lana','15X','Arena','Texana con flecos que aporta movimiento a una silueta de inspiración ranchera.','Guardar en sitio seco y seguir las indicaciones del fabricante del material.'],
  'texana-reserva': ['CL-TEX-003','Indomables','Paja natural','Paja natural','natural','Almendra','Texana de paja natural con una presencia cálida y líneas limpias.','Evitar humedad y conservar apoyada sobre una superficie que mantenga su forma.'],
  'sombrero-chihuahua': ['CL-SOM-001','Tombstone','Palma natural','Palma natural','natural','Natural','Sombrero Chihuahua de palma natural, con copa definida y carácter tradicional.','Retirar el polvo con cepillo suave y guardar en lugar seco.'],
  'sombrero-ibiza': ['CL-SOM-002','Morcón','Shantung','Shantung','20X','Almendra','Sombrero Ibiza en Shantung, de acabado uniforme y silueta elegante.','Conservar en sitio seco y consultar al equipo ante manchas o humedad.'],
  'sombrero-noche': ['CL-SOM-003','Zargon','Lana','Lana','10X','Negro','Sombrero de lana en tono negro, con una línea sobria para uso western.','Cepillar suavemente en el sentido del material y mantener alejado de humedad.'],
  'cinturon-hebilla-plata': ['CL-CIN-001','Ariat','Cocodrilo (panza)','Cocodrilo (panza)','exotic','Chocolate','Cinturón de piel de cocodrilo con textura distintiva y presencia clásica.','Limpiar con paño suave y seco; pedir orientación antes de aplicar productos.'],
  'cinturon-piton': ['CL-CIN-002','Malcreado','Pitón','Pitón','exotic','Arena','Cinturón de pitón que destaca el patrón natural de la piel.','Conservar seco y consultar al equipo para recomendaciones específicas.'],
  'cinturon-reserva': ['CL-CIN-003','Almeida','Novillo','Res','common','Café','Cinturón de piel bovina de tono cálido y estilo versátil.','Retirar el polvo con paño seco y evitar productos no validados.'],
};

const qualityValues = ['6X','10X','15X','20X','30X','50X','100X','1000X','5000X','10,000X'];
const hatStyles = ['Sinaloa','Rancher','Roper','Rodeo','Este-Oeste','Chaparral','Johnson','Maverick','Ranger','Sonora'];
const bootLasts = ['Bulldog','Dubái','Oval'];
const nextSkuByCategory = { botas: 6, botines: 4, texanas: 4, sombreros: 4, cinturones: 4 };
const leatherGroup = (group) => group;
const hexColors = { Negro:'#201815', Blanco:'#f5f1e9', Natural:'#d8c29e', Almendra:'#d2b48c', Arena:'#c8ad86', Nutria:'#80583e', Chocolate:'#493126', Café:'#68452e', Gris:'#88857f' };
const enrichProduct = (product) => {
  const [sku, brand, material, leather, group, color, description, care] = productInfo[product.id];
  const hat = ['sombreros','texanas'].includes(product.categoryId);
  const colorNames = [color, ...(product.colors.length > 1 ? [product.categoryId === 'botas' ? 'Café' : 'Chocolate'] : [])];
  const attrs = {
    sku, brand, material, color, colorNames, leather, leatherGroup: leatherGroup(group),
    shortDescription: description, description,
    sizes: hat ? ['55','56','57','58','59','60'] : product.categoryId === 'cinturones' ? ['32','34','36','38','40','42'] : ['25','26','27','28','29','30'],
    colors: [...new Set(colorNames.map((name) => hexColors[name]))],
    availability: 'available', care, validatedCare: care,
    features: [material, hat ? 'Confección western' : `Piel ${leather.toLowerCase()}`, color],
  };
  if (hat) { attrs.quality = productInfo[product.id][4] === 'natural' ? undefined : productInfo[product.id][4]; attrs.style = hatStyles[product.id.length % hatStyles.length]; attrs.materialGroup = productInfo[product.id][4] === 'natural' ? 'lightweight' : 'felt'; attrs.skinId = productInfo[product.id][2].toLowerCase().replaceAll(' ','-').normalize('NFD').replace(/[\u0300-\u036f]/g,''); }
  else if (product.categoryId !== 'cinturones') attrs.last = bootLasts[product.id.length % bootLasts.length];
  return { ...product, ...attrs };
};

const newProducts = [
  ['bota-rodeo-res','Bota Rodeo Res','botas','res','boot-bicolor',8200,'Res','Ariat','Res','common','Café'],
  ['bota-venado-arena','Bota Venado Arena','botas','venado','boot-ostrich',9400,'Venado','Malcreado','Venado','common','Arena'],
  ['bota-cuello-toro','Bota Cuello de Toro','botas','cuello-toro','boot-black',8700,'Cuello de toro','Correcaminos','Cuello de toro','common','Negro'],
  ['bota-pelo-vaca','Bota Pelo de Vaca','botas','pelo-vaca','boot-croc',7900,'Pelo de vaca','Almeida','Pelo de vaca','common','Chocolate'],
  ['bota-cocodrilo-cola','Bota Cocodrilo Cola','botas','cocodrilo-cola','boot-croc',13900,'Cocodrilo (cola)','Ariat','Cocodrilo (cola)','exotic','Negro'],
  ['botin-res-clasico','Botín Res Clásico','botines','res','bootie-leather',5600,'Res','Correcaminos','Res','common','Café'],
  ['botin-venado-cafe','Botín Venado Café','botines','venado','bootie-leather',6400,'Venado','Malcreado','Venado','common','Café'],
  ['botin-cuello-toro','Botín Cuello de Toro','botines','cuello-toro','bootie-ostrich',7200,'Cuello de toro','Almeida','Cuello de toro','common','Nutria'],
  ['botin-pelo-vaca','Botín Pelo de Vaca','botines','pelo-vaca','bootie-leather',6100,'Pelo de vaca','Ariat','Pelo de vaca','common','Chocolate'],
  ['botin-cocodrilo-panza','Botín Cocodrilo Panza','botines','cocodrilo-panza','bootie-ostrich',10900,'Cocodrilo (panza)','Correcaminos','Cocodrilo (panza)','exotic','Negro'],
  ['botin-piton-negro','Botín Pitón Negro','botines','piton','boot-python',9800,'Pitón','Malcreado','Pitón','exotic','Negro'],
  ['botin-avestruz-arena','Botín Avestruz Arena','botines','avestruz','boot-ostrich',8800,'Avestruz','Almeida','Avestruz','exotic','Arena'],
  ['texana-bangora','Texana Bangora','texanas','bangora','texana-palmilla',3600,'Bangora','Zargon','Bangora','lightweight','Natural'],
  ['texana-papel-arroz','Texana Papel Arroz','texanas','papel-arroz','texana-fringe',3300,'Papel arroz','Tombstone','Papel arroz','lightweight','Almendra'],
  ['texana-shantung','Texana Shantung','texanas','shantung','texana-palmilla',6200,'Shantung','Morcón','Shantung','20X','Arena'],
  ['texana-sisol','Texana Sisol','texanas','sisol','texana-fringe',4100,'Sisol','Indomables','Sisol','lightweight','Natural'],
  ['texana-pelo-conejo','Texana Pelo de Conejo','texanas','pelo-conejo','texana-palmilla',8900,'Pelo de conejo','Zargon','Pelo de conejo','30X','Negro'],
  ['texana-mix-fieltro','Texana Mezcla Lana y Pelo','texanas','mezcla-lana-pelo','texana-fringe',7600,'Mezclas de lana y pelo','Tombstone','Mezclas de lana y pelo','15X','Gris'],
  ['texana-rodeo-palma','Texana Rodeo Palma','texanas','palma-natural','texana-palmilla',3900,'Palma natural','Morcón','Palma natural','lightweight','Natural'],
  ['sombrero-bangora','Sombrero Bangora','sombreros','bangora','hat-palmilla',2900,'Bangora','Indomables','Bangora','lightweight','Arena'],
  ['sombrero-papel-arroz-japones','Sombrero Papel Arroz Japonés','sombreros','papel-arroz-japones','hat-palmilla',3700,'Papel arroz japonés','Zargon','Papel arroz japonés','lightweight','Natural'],
  ['sombrero-master-telar','Sombrero Master Telar','sombreros','master-telar','hat-palmilla',3400,'Master telar','Tombstone','Master telar','lightweight','Almendra'],
  ['sombrero-paja-natural','Sombrero Paja Natural','sombreros','paja-natural','hat-palmilla',2800,'Paja natural','Morcón','Paja natural','lightweight','Natural'],
  ['sombrero-lana','Sombrero Lana','sombreros','lana','hat-black',4900,'Lana','Indomables','Lana','10X','Negro'],
  ['sombrero-pelo-liebre','Sombrero Pelo de Liebre','sombreros','pelo-liebre','hat-black',9800,'Pelo de liebre','Zargon','Pelo de liebre','50X','Chocolate'],
  ['sombrero-pelo-castor','Sombrero Pelo de Castor','sombreros','pelo-castor','hat-black',14800,'Pelo de castor','Tombstone','Pelo de castor','100X','Negro'],
  ['cinturon-res-cafe','Cinturón Res Café','cinturones','res','belt-croc',2400,'Res','Correcaminos','Res','common','Café'],
  ['cinturon-venado','Cinturón Venado','cinturones','venado','belt-python',2700,'Venado','Ariat','Venado','common','Nutria'],
  ['cinturon-cuello-toro','Cinturón Cuello de Toro','cinturones','cuello-toro','belt-croc',3200,'Cuello de toro','Almeida','Cuello de toro','common','Chocolate'],
  ['cinturon-pelo-vaca','Cinturón Pelo de Vaca','cinturones','pelo-vaca','belt-python',2900,'Pelo de vaca','Malcreado','Pelo de vaca','common','Café'],
  ['cinturon-cocodrilo-cola','Cinturón Cocodrilo Cola','cinturones','cocodrilo-cola','belt-croc',5200,'Cocodrilo (cola)','Correcaminos','Cocodrilo (cola)','exotic','Negro'],
  ['cinturon-avestruz','Cinturón Avestruz','cinturones','avestruz','belt-python',4100,'Avestruz','Ariat','Avestruz','exotic','Nutria'],
  ['cinturon-pescado','Cinturón Pescado','cinturones','pescado','belt-croc',4500,'Pescado','Almeida','Pescado','exotic','Gris'],
].map(([id,name,category,skin,image,price,material,brand,leather,group,color], index) => {
  const shades = { Negro:'#201815', Blanco:'#f5f1e9', Natural:'#d8c29e', Almendra:'#d2b48c', Arena:'#c8ad86', Nutria:'#80583e', Chocolate:'#493126', Café:'#68452e', Gris:'#88857f' };
  const description = `${name}: pieza Casa Loram en ${material.toLowerCase()}, con diseño western y acabado seleccionado para una presencia auténtica. El tono ${color.toLowerCase()} completa su carácter y versatilidad.`;
  const care = group === 'exotic' ? 'Conservar en lugar seco, retirar el polvo con paño suave y consultar al equipo antes de aplicar productos de cuidado.' : 'Limpiar con paño suave y seco, guardar en un lugar ventilado y evitar tratamientos no indicados para el material.';
  const isHat = ['sombreros','texanas'].includes(category), isBelt = category === 'cinturones';
  const d = { sku:`CL-${{sombreros:'SOM',texanas:'TEX',botas:'BOT',botines:'BOTI',cinturones:'CIN'}[category]}-${String(nextSkuByCategory[category]++).padStart(3,'0')}`, brand, material, leather, leatherGroup:group, color, colorNames:[color], description, shortDescription:description, care, validatedCare:care, features:[material, isHat ? 'Diseño western' : `Piel ${leather.toLowerCase()}`, color], sizes:isHat ? ['55','56','57','58','59','60'] : isBelt ? ['32','34','36','38','40','42'] : ['25','26','27','28','29','30'], availability:'available', colors:[shades[color]] };
  if (isHat) { d.skinId = skin; d.materialGroup = ['Bangora','Papel arroz','Papel arroz japonés','Master telar','Sisol','Palma natural','Paja natural'].includes(material) ? 'lightweight' : 'felt'; if (qualityValues.includes(group)) d.quality = group; d.style = hatStyles[(index + 2) % hatStyles.length]; }
  else if (!isBelt) d.last = bootLasts[index % bootLasts.length];
  return makeProduct(id,name,category,skin,image,price,[shades[color]],d);
});

export const products = [...existingProducts.map(enrichProduct), ...newProducts];

export const getImage = (id) => images.find((image) => image.id === id);
export const getSkin = (id) => skins.find((skin) => skin.id === id);

// Optional commercial attributes. Keep these lists as the shared source of
// truth; product filters are still populated exclusively from real products.
export const leatherGroups = {
  common: ['Res', 'Venado', 'Cuello de toro', 'Pelo de vaca'],
  exotic: ['Pitón', 'Cocodrilo (panza)', 'Cocodrilo (cola)', 'Avestruz', 'Pescado', 'Jirafa'],
  beltExotic: ['Pitón', 'Cocodrilo (panza)', 'Cocodrilo (cola)', 'Avestruz', 'Pescado'],
};

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
