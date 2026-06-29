// v2.0 data: Macondo quotes, momposino dictionary, weather codes

export type MacondoQuote = {
  es: string;
  en: string;
  author: string;
  authorEn?: string;
};

// 9 verified quotes — García Márquez, Bolívar, momposino sayings
export const MACONDO_QUOTES: MacondoQuote[] = [
  {
    es: 'Mompox no existe, a veces soñamos con ella pero no existe.',
    en: 'Mompox doesn\'t exist; sometimes we dream of her, but she doesn\'t exist.',
    author: 'Gabriel García Márquez',
    authorEn: 'Gabriel García Márquez',
  },
  {
    es: 'Por Mompox no se pasa, a Mompox se llega.',
    en: 'You don\'t pass through Mompox — you arrive at Mompox.',
    author: 'Dicho momposino',
    authorEn: 'Momposino saying',
  },
  {
    es: 'Si a Caracas debo la vida, a Mompox debo la gloria.',
    en: 'If to Caracas I owe my life, to Mompox I owe the glory.',
    author: 'Simón Bolívar',
    authorEn: 'Simón Bolívar',
  },
  {
    es: 'La vida no es la que uno vivió, sino la que uno recuerda y cómo la recuerda para contarla.',
    en: 'Life is not what one lived, but what one remembers and how one remembers it to tell it.',
    author: 'Gabriel García Márquez',
    authorEn: 'Gabriel García Márquez',
  },
  {
    es: 'Mompox tierra de Dios, en donde se acuesta uno y amanecen dos. Y si sopla el viento amanecen cientos.',
    en: 'Mompox, land of God, where one lies down and two wake up. And if the wind blows, hundreds wake up.',
    author: 'Refrán momposino',
    authorEn: 'Momposino refrain',
  },
  {
    es: 'A mí siempre me empieza la nostalgia por el sancocho, por la carimañola, por el bocachico, por la arepa de huevo.',
    en: 'Nostalgia always starts for me with the sancocho, the carimañola, the bocachico, the arepa de huevo.',
    author: 'Gabriel García Márquez',
    authorEn: 'Gabriel García Márquez',
  },
  {
    es: 'Quien se queda en Mompox no se quiere ir.',
    en: 'He who stays in Mompox doesn\'t want to leave.',
    author: 'Dicho momposino',
    authorEn: 'Momposino saying',
  },
  {
    es: 'Macondo era entonces una aldea de veinte casas de barro y cañabrava construidas a la orilla de un río de aguas diáfanas.',
    en: 'Macondo was then a village of twenty adobe and wild cane houses built on the bank of a river of clear waters.',
    author: 'Gabriel García Márquez',
    authorEn: 'Gabriel García Márquez',
  },
  {
    es: 'Dicen que yo he inventado el realismo mágico, pero solo soy el notario de la realidad.',
    en: 'They say I invented magical realism, but I am only the notary of reality.',
    author: 'Gabriel García Márquez',
    authorEn: 'Gabriel García Márquez',
  },
];

export type DictEntry = {
  word: string;
  category: 'food' | 'architecture' | 'expressions' | 'river';
  es: string;
  en: string;
};

// 15 momposino dialect words
export const MOMPOX_DICTIONARY: DictEntry[] = [
  { word: 'Casabito', category: 'food',
    es: 'Tortilla de yuca cruda, queso, coco rallado y azúcar. El snack callejero por excelencia.',
    en: 'Pancake of raw cassava, cheese, ground coconut and sugar. The quintessential street snack.' },
  { word: 'Queso de capa', category: 'food',
    es: 'Queso hilado, elástico, con más de 100 años de tradición artesanal en Mompox.',
    en: 'Stretched, elastic cheese with over 100 years of artisanal tradition in Mompox.' },
  { word: 'Butifarra', category: 'food',
    es: 'Salchicha seca y curada de origen español, adaptada al Caribe colombiano.',
    en: 'Dry cured sausage of Spanish origin, adapted to the Colombian Caribbean.' },
  { word: 'Corozo', category: 'food',
    es: 'Fruto de una palma del Caribe. Se hace vino, jugo y dulce. Color rubí intenso.',
    en: 'Fruit of a Caribbean palm. Made into wine, juice and sweets. Deep ruby color.' },
  { word: 'Arepa \'e huevo', category: 'food',
    es: 'Arepa frita rellena de huevo. Patrimonio caribe. Peligrosamente adictiva.',
    en: 'Fried arepa stuffed with egg. Caribbean heritage. Dangerously addictive.' },
  { word: 'Bocachico', category: 'food',
    es: 'Pescado del río Magdalena, base de la cocina momposina. En guiso, asado o frito.',
    en: 'River fish from the Magdalena, staple of momposino cuisine. In stew, grilled or fried.' },
  { word: 'Arroz de chorizo', category: 'food',
    es: 'Arroz cocinado con chorizo y sus jugos. Plato de domingo en Mompox.',
    en: 'Rice cooked with chorizo and its juices. A Sunday dish in Mompox.' },
  { word: 'Posta negra', category: 'food',
    es: 'Carne guisada en salsa oscura de panela y especias. Posta negra momposina, única.',
    en: 'Beef stewed in dark panela and spice sauce. Momposino posta negra, unique.' },
  { word: 'Albarrada', category: 'architecture',
    es: 'El muro de contención a orillas del río. También la calle más bella de Mompox.',
    en: 'The retaining wall along the river. Also the most beautiful street in Mompox.' },
  { word: 'Portales', category: 'architecture',
    es: 'Galerías cubiertas frente a las casas coloniales. Donde se toma el fresco y se conversa.',
    en: 'Covered galleries in front of colonial houses. Where you take the cool air and chat.' },
  { word: 'Champán', category: 'river',
    es: 'Embarcación tradicional de madera del Magdalena con techo de palma. NO la bebida.',
    en: 'Traditional wooden boat of the Magdalena with palm-leaf roof. NOT the drink.' },
  { word: 'Boga', category: 'river',
    es: 'El remero del río Magdalena. Profesión ancestral que sobrevive en Mompox.',
    en: 'The oarsman of the Magdalena River. Ancestral profession that survives in Mompox.' },
  { word: 'Planchón', category: 'river',
    es: 'Barcaza grande y plana para cruzar el río con personas, motos y mercancía.',
    en: 'Large flat barge for crossing the river with people, motorcycles and cargo.' },
  { word: 'Ajá', category: 'expressions',
    es: 'Interjección caribeña que lo mismo sirve para asentir que para dudar.',
    en: 'Caribbean interjection that works for both agreeing and doubting.' },
  { word: 'Vaina', category: 'expressions',
    es: 'La palabra más versátil del Caribe. Significa "cosa", "problema", "situación".',
    en: 'The most versatile word in the Caribbean. Means "thing", "problem", "situation".' },
];

// WMO Weather interpretation codes (https://open-meteo.com/en/docs)
export const WMO_CODES: Record<number, { label: string; labelEn: string; icon: string }> = {
  0:  { label: 'Despejado',                labelEn: 'Clear sky',         icon: '☀️' },
  1:  { label: 'Mayormente despejado',     labelEn: 'Mainly clear',      icon: '🌤️' },
  2:  { label: 'Parcialmente nublado',     labelEn: 'Partly cloudy',     icon: '⛅' },
  3:  { label: 'Nublado',                  labelEn: 'Overcast',          icon: '☁️' },
  45: { label: 'Niebla',                   labelEn: 'Fog',               icon: '🌫️' },
  48: { label: 'Niebla con escarcha',      labelEn: 'Rime fog',          icon: '🌫️' },
  51: { label: 'Llovizna ligera',          labelEn: 'Light drizzle',     icon: '🌦️' },
  53: { label: 'Llovizna',                 labelEn: 'Drizzle',           icon: '🌦️' },
  55: { label: 'Llovizna fuerte',          labelEn: 'Dense drizzle',     icon: '🌧️' },
  61: { label: 'Lluvia ligera',            labelEn: 'Light rain',        icon: '🌦️' },
  63: { label: 'Lluvia',                   labelEn: 'Rain',              icon: '🌧️' },
  65: { label: 'Lluvia fuerte',            labelEn: 'Heavy rain',        icon: '🌧️' },
  71: { label: 'Nieve ligera',             labelEn: 'Light snow',        icon: '🌨️' },
  73: { label: 'Nieve',                    labelEn: 'Snow',              icon: '🌨️' },
  75: { label: 'Nieve fuerte',             labelEn: 'Heavy snow',        icon: '❄️' },
  80: { label: 'Chubascos',                labelEn: 'Rain showers',      icon: '🌦️' },
  81: { label: 'Chubascos fuertes',        labelEn: 'Heavy showers',     icon: '🌧️' },
  82: { label: 'Chubascos violentos',      labelEn: 'Violent showers',   icon: '⛈️' },
  95: { label: 'Tormenta',                 labelEn: 'Thunderstorm',      icon: '⛈️' },
  96: { label: 'Tormenta con granizo',     labelEn: 'Thunderstorm w/ hail', icon: '⛈️' },
  99: { label: 'Tormenta severa',          labelEn: 'Severe thunderstorm', icon: '⛈️' },
};

export function getWmo(code: number) {
  return WMO_CODES[code] || { label: 'Clima raro', labelEn: 'Unusual weather', icon: '🌈' };
}
