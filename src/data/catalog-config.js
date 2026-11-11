// Catálogos permitidos. Solo se ofrecen en filtros los valores presentes en productos.
export const brandGroups = {
  general: ['Malcreado', 'Correcaminos', 'Ariat', 'Almeida'],
  hatsAndTexanas: ['Tombstone', 'Morcón', 'Indomables', 'Zargon'],
};

// Mantener vacío hasta confirmar qué marcas trabajan cada categoría.
export const brandCategoryAssignments = {};

// Replace with Casa Loram's verified WhatsApp number before launch.
export const whatsappPhone = '1234567890';

export const attributeOptions = {
  materials: {
    lightweight: ['Papel arroz', 'Papel arroz japonés', 'Master telar', 'Bangora', 'Sisol', 'Shantung', 'Palma natural', 'Paja natural'],
    felt: ['Lana', 'Pelo de conejo', 'Pelo de liebre', 'Pelo de castor', 'Pelo de nutria', 'Mezclas de lana y pelo'],
  },
  qualities: ['6X', '10X', '15X', '20X', '30X', '50X', '100X', '1000X', '5000X', '10,000X'],
  hatStyles: ['Sinaloa', 'Rancher', 'Roper', 'Rodeo', 'Este-Oeste', 'Chaparral', 'Johnson', 'Maverick', 'Ranger', 'Sonora'],
  footwearLasts: ['Bulldog', 'Dubái', 'Oval'],
  colors: ['Negro', 'Blanco', 'Natural', 'Almendra', 'Arena', 'Nutria', 'Chocolate', 'Café', 'Gris'],
  commonLeathers: ['Res', 'Venado', 'Cuello de toro', 'Pelo de vaca'],
  exoticLeathers: ['Pitón', 'Cocodrilo (panza)', 'Cocodrilo (cola)', 'Avestruz', 'Pescado', 'Jirafa'],
  beltExoticLeathers: ['Pitón', 'Cocodrilo (panza)', 'Cocodrilo (cola)', 'Avestruz', 'Pescado'],
};

export const categoryFilters = {
  sombreros: ['brand', 'materialGroup', 'material', 'quality', 'style', 'color'],
  texanas: ['brand', 'materialGroup', 'material', 'quality', 'style', 'color'],
  botas: ['brand', 'last', 'leatherGroup', 'leather', 'color'],
  botines: ['brand', 'last', 'leatherGroup', 'leather', 'color'],
  cinturones: ['brand', 'leatherGroup', 'leather', 'color'],
};

export const filterLabels = {
  brand: 'Marca', materialGroup: 'Grupo de material', material: 'Material', quality: 'Calidad', style: 'Horma o estilo',
  last: 'Horma', leatherGroup: 'Grupo de piel', leather: 'Tipo de piel', color: 'Color',
};
