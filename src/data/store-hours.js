export const storeHours = [
  { days: 'Lunes a viernes', hours: '10:00 a 19:00 h', open: 10 * 60, close: 19 * 60, weekdays: [1, 2, 3, 4, 5] },
  { days: 'Sábado', hours: '10:00 a 16:00 h', open: 10 * 60, close: 16 * 60, weekdays: [6] },
  { days: 'Domingo', hours: 'Cerrado', open: null, close: null, weekdays: [0] },
];

export const storeTimeZone = 'America/Mexico_City';

export const storeSchedule = storeHours.map(({ days, hours }) => ({ days, hours }));
