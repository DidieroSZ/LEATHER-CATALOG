import { storeSchedule } from './store-hours.js';

export const footerConfig = {
  brand: {
    name: 'Casa Loram',
    tagline: 'Tradición en cada paso',
    description:
      'Botas, sombreros y accesorios de marcas seleccionadas. Calidad para que tú escribas la historia.',
    slogan: 'Buenas marcas llevan a grandes destinos',
  },
  contact: {
    phone: '+52 479 103 1689',
    phoneLink: '+524791031689',
    whatsapp: '524791031689',
    email: 'contacto@casaloram.com',
    whatsappMessage:
      'Hola, me gustaría recibir información sobre sus productos y colecciones.',
  },
  location: {
    title: 'Atención comercial',
    description: 'Con gusto te atendemos por teléfono o correo electrónico.',
    notice: 'La dirección de tienda está pendiente de confirmación.',
    address: '',
    city: '',
    state: '',
    postalCode: '',
    googleMapsUrl: '',
    googleMapsEmbedUrl: '',
  },
  schedule: storeSchedule,
  benefits: [
    {
      icon: 'badge-check',
      title: 'Marcas seleccionadas',
      description: 'Calidad y tradición en cada colección.',
    },
    {
      icon: 'messages-square',
      title: 'Atención directa',
      description: 'Comunícate con Casa Loram por teléfono o correo.',
    },
    {
      icon: 'book-open-check',
      title: 'Catálogo especializado',
      description: 'Explora botas, sombreros y accesorios.',
    },
  ],
  social: { instagram: '', facebook: '' },
  links: [
    { label: 'Términos y condiciones', url: '' },
    { label: 'Política de privacidad', url: '' },
    { label: 'Envíos y devoluciones', url: '' },
    { label: 'Preguntas frecuentes', url: '' },
  ],
};
