import { footerConfig } from './footer-config.js';

export const contactConfig = {
  eyebrow: 'Estamos para atenderte',
  title: 'Hablemos de tu próximo gran estilo',
  description:
    'En Casa Loram creemos que cada detalle importa. Nuestro equipo está listo para ayudarte a encontrar las piezas ideales, resolver tus dudas y brindarte atención personalizada.',
  contact: footerConfig.contact,
  location: {
    name: footerConfig.brand.name,
    address: footerConfig.location.address,
    city: footerConfig.location.city,
    state: footerConfig.location.state,
    postalCode: footerConfig.location.postalCode,
    mapsUrl: footerConfig.location.googleMapsUrl,
    embedUrl: footerConfig.location.googleMapsEmbedUrl,
  },
  schedule: footerConfig.schedule,
};
