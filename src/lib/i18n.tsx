'use client';

import { createContext, useContext, useState, useEffect, ReactNode } from 'react';

export type Lang = 'es' | 'en';

type Dict = Record<string, { es: string; en: string }>;

export const t: Dict = {
  // Nav
  'nav.about':     { es: 'Nosotros',           en: 'About' },
  'nav.rooms':     { es: 'Habitaciones',       en: 'Rooms' },
  'nav.location':  { es: 'Ubicación',          en: 'Location' },
  'nav.mompox':    { es: 'Mompox',             en: 'Mompox' },
  'nav.todo':      { es: 'Qué hacer',          en: 'Things to do' },
  'nav.food':      { es: 'Sabores',            en: 'Flavours' },
  'nav.gallery':   { es: 'Galería',            en: 'Gallery' },
  'nav.reviews':   { es: 'Opiniones',          en: 'Reviews' },
  'nav.contact':   { es: 'Reservas',           en: 'Book' },

  // Hero
  'hero.eyebrow':  { es: 'Posada familiar · Mompox, Bolívar · Patrimonio UNESCO 1995', en: 'Family-run guesthouse · Mompox, Bolívar · UNESCO 1995' },
  'hero.title1':   { es: 'Siéntete como',       en: 'Feel at home,' },
  'hero.title2':   { es: 'en casa',             en: 'in Mompox' },
  'hero.subtitle': {
    es: 'Una posada sencilla, limpia y con aire acondicionado, escondida detrás de la Iglesia de Santa Bárbara en el corazón colonial de Mompox. Aquí te recibimos Fredy, Mónica y familia — sin intermediarios, sin pretensiones, con mecedora en el portal y la magia de un pueblo donde el tiempo se detiene.',
    en: 'A simple, clean, air-conditioned guesthouse tucked behind the Church of Santa Bárbara in the colonial heart of Mompox. Fredy, Mónica and family welcome you here — no middlemen, no fuss, just a rocking chair on the porch and the magic of a town where time stands still.'
  },
  'hero.cta.book':   { es: 'Reservar por WhatsApp', en: 'Book on WhatsApp' },
  'hero.cta.explore':{ es: 'Conoce la casa',       en: 'Explore the house' },

  // About
  'about.eyebrow':  { es: 'Nuestro hogar',     en: 'Our home' },
  'about.title':    { es: 'Una casa de familia, abierta a quienes llegan a Mompox', en: 'A family home, open to those who arrive in Mompox' },
  'about.p1': {
    es: 'Casa Mónica nació un día, como nacen las cosas buenas en Mompox, casi sin planearlo. Fredy y Mónica vivían aquí, en la casita de la Calle 14 detrás de Santa Bárbara, y un día decidieron abrir la puerta a los viajeros que llegaban buscando algo que los grandes hoteles no saben dar: el trato de quienes reciben en su propia casa. No hay recepción con mostrador aquí, ni uniformes — hay una puerta que se abre, una mecedora que te espera, y una conversación sobre qué visitar hoy en el pueblo.',
    en: 'Casa Mónica began one day, the way good things begin in Mompox — almost without planning it. Fredy and Mónica lived here, in the little house on Calle 14 behind Santa Bárbara, and one day they decided to open the door to the travellers who arrived looking for something the big hotels don\'t know how to give: the welcome of people who host you in their own home. There is no reception desk here, no uniforms — just an opening door, a rocking chair waiting for you, and a chat about what to see today in town.'
  },
  'about.p2': {
    es: 'La casa la llevamos nosotros, en persona. Las habitaciones son climatizadas, limpias y sencillas — pensadas para descansar de verdad después de un día de sol, río y calle empedrada. "Diferentes formas", nos gusta decir, pero todas pensadas para que te acuestes sin calor y despiertes sin prisa.',
    en: 'We run the house ourselves, in person. The rooms are air-conditioned, clean and simple — made for resting properly after a day of sun, river and cobblestones. "Different layouts", we like to say, but all of them made so you sleep cool and wake up unhurried.'
  },
  'about.p3': {
    es: 'Estamos en el barrio de Santa Bárbara, entre la Calle del Medio y la Calle de Atrás, a pasos de la Albarrada. Aquí, donde el tiempo no pasa, te ayudamos con todo lo que necesites: organizar un paseo en lancha por la Ciénaga de Pijiño, conseguir las entradas del ferry, recomendar dónde comer, o acompañarte a conocer Mompox como lo hacemos nosotros — despacio, conversando, sin apuros.',
    en: 'We are in the Santa Bárbara quarter, between Calle del Medio and Calle de Atrás, steps from the Albarrada. Here, where time doesn\'t pass, we help you with whatever you need: arranging a boat trip to the Ciénaga de Pijiño, getting the ferry tickets, recommending where to eat, or showing you Mompox the way we know it — slowly, in conversation, no rush.'
  },
  'about.owner.title': { es: 'Quienes te reciben', en: 'Who welcomes you' },
  'about.owner.quote': {
    es: '"Tuvimos el placer de recibir en nuestro hogar a este gran artista musical. Bendiciones y grandes éxitos — son los deseos de Casa Mónica." Así recibimos a cada viajero: como a alguien que llega a casa.',
    en: '"We had the pleasure of welcoming this great musical artist into our home. Blessings and great success — the wishes of Casa Mónica." This is how we welcome every traveller: as someone arriving home.'
  },
  'about.owner.name': { es: 'Fredy & Mónica — los dueños de Casa Mónica', en: 'Fredy & Mónica — the owners of Casa Mónica' },

  // Owner cards — Fredy & Mónica
  'about.fredy.name':      { es: 'Sr Fredy',  en: 'Sr Fredy' },
  'about.fredy.role':      { es: 'El anfitrión', en: 'The host' },
  'about.fredy.tagline':   {
    es: 'Lo que Fredy no sabe de Mompox, no vale la pena saberlo.',
    en: 'What Fredy doesn\'t know about Mompox isn\'t worth knowing.'
  },
  'about.fredy.bio':       {
    es: 'Mompoxero de toda la vida. Conoce cada callejón, cada iglesia, cada historia — y sobre todo, cada persona que vale la pena conocer en el pueblo. Si le preguntas por un paseo, te lo consigue; si le preguntas por la historia, te la cuenta; y si le preguntas dónde comer bien, te acompaña.',
    en: 'A momposino through and through. He knows every alley, every church, every story — and above all, every person worth knowing in town. Ask him about a tour and he\'ll arrange it; ask him about history and he\'ll tell it; ask him where to eat well and he\'ll walk you there.'
  },
  'about.monica.name':     { es: 'Sra Mónica', en: 'Sra Mónica' },
  'about.monica.role':     { es: 'La jefa de la casa', en: 'The boss of the house' },
  'about.monica.tagline':  {
    es: 'La verdadera jefa de la casa. Te va a matar de gusto — o de calorías.',
    en: 'The real boss of the casa. She\'ll kill you with kindness — or with calories.'
  },
  'about.monica.bio':      {
    es: 'Si Casa Mónica se llama así, es por ella. Mónica lleva la casa con la calma y la firmeza de las mamás caribeñas: la habitación impecable, el café a la hora justa, la conversación que te hace sentir en familia. No te extrañes si un día te llega un casabito o un vaso de jugo de corozo "por si tenías ganas de algo dulce".',
    en: 'If Casa Mónica is named after her, it\'s for a reason. Mónica runs the house with the calm and the firmness of a Caribbean mum: the spotless room, the coffee at just the right moment, the conversation that makes you feel like family. Don\'t be surprised if one day a casabito or a glass of corozo juice appears "in case you fancied something sweet".'
  },
  'about.owners.note': {
    es: '(La foto de Fredy es en persona. La de Mónica va ilustrada por mientras — sube una foto individual y la cambiamos al instante.)',
    en: '(Fredy\'s photo is the real him. Mónica\'s is illustrated for now — upload a solo shot of her and we\'ll swap it instantly.)'
  },
  'about.stats.rating': { es: '9.2 / 10 valoración', en: '9.2 / 10 rating' },
  'about.stats.reviews': { es: '55 reseñas', en: '55 reviews' },
  'about.stats.location': { es: 'A pasos de la Albarrada', en: 'Steps from the Albarrada' },
  'about.stats.parking': { es: 'Parqueadero en el lugar', en: 'On-site parking' },

  // Rooms
  'rooms.eyebrow': { es: 'Habitaciones', en: 'Rooms' },
  'rooms.title':   { es: 'Diferentes formas, todas para tu comodidad', en: 'Different layouts, all for your comfort' },
  'rooms.subtitle':{
    es: 'Habitaciones climatizadas, limpias y sin pretensiones. Nada de lujos que no vas a usar — pero todo lo que sí necesitas: cama tendida, baño limpio, aire que enfriá de verdad, y silencio para dormir. Para salir temprano a caminar Mompox con el fresco de la mañana.',
    en: 'Air-conditioned, clean, unpretentious rooms. None of the luxuries you won\'t use — but everything you do need: a made bed, a clean bathroom, air con that actually cools, and quiet for sleeping. So you can head out early to walk Mompox in the morning cool.'
  },
  'rooms.room1.title': { es: 'Habitación triple', en: 'Triple room' },
  'rooms.room1.desc':  {
    es: 'Una cama doble y dos individuales. Ideal para familias pequeñas o grupos de tres amigos que viajan juntos. Aire acondicionado, ventilador de techo y ventana con postigos de madera para regular el fresco.',
    en: 'One double bed and two singles. Perfect for small families or three friends travelling together. Air con, ceiling fan and wooden-shutter window to dial in the breeze.'
  },
  'rooms.room2.title': { es: 'Habitación doble', en: 'Twin room' },
  'rooms.room2.desc':  {
    es: 'Dos camas individuales, televisor, ventilador de techo y ventana con vista a la vegetación. Sencilla, fresca y muy limpia — como nos gusta a nosotros.',
    en: 'Two single beds, TV, ceiling fan and a window looking out onto the greenery. Simple, cool and very clean — the way we like it.'
  },
  'rooms.room3.title': { es: 'Habitación con servicios', en: 'Room with amenities' },
  'rooms.room3.desc':  {
    es: 'Dos camas, toallas dobladas con cuidado, amenities de cortesía y aire acondicionado. Esos pequeños detalles que hacen que todo se sienta atendido — como en casa de la abuela.',
    en: 'Two beds, towels folded with care, courtesy amenities and air con. Those little touches that make everything feel looked after — like at grandma\'s house.'
  },
  'rooms.features.title': { es: 'Lo que incluyen todas las habitaciones', en: 'What every room includes' },
  'rooms.features.f1': { es: 'Aire acondicionado', en: 'Air conditioning' },
  'rooms.features.f2': { es: 'Limpieza diaria', en: 'Daily housekeeping' },
  'rooms.features.f3': { es: 'Toallas y ropa de cama', en: 'Towels and linens' },
  'rooms.features.f4': { es: 'Baño privado', en: 'Private bathroom' },
  'rooms.features.f5': { es: 'Ventilador de techo', en: 'Ceiling fan' },
  'rooms.features.f6': { es: 'Fredy y Mónica en persona', en: 'Fredy & Mónica in person' },

  // Location
  'location.eyebrow': { es: 'Ubicación', en: 'Location' },
  'location.title':   { es: 'En el barrio de Santa Bárbara, a pasos de todo', en: 'In the Santa Bárbara quarter, steps from everything' },
  'location.address': { es: 'Calle 14 #2 74, Santa Cruz de Mompox, Bolívar', en: 'Calle 14 #2 74, Santa Cruz de Mompox, Bolívar' },
  'location.direction': {
    es: 'Atrás de la Iglesia de Santa Bárbara, entre la Calle del Medio y la Calle de Atrás. A pasos de la Albarrada y del río Magdalena.',
    en: 'Behind the Church of Santa Bárbara, between Calle del Medio and Calle de Atrás. Steps from the Albarrada and the Magdalena River.'
  },
  'location.cta': { es: 'Abrir en Google Maps', en: 'Open in Google Maps' },

  // Mompox
  'mompox.eyebrow': { es: 'Mompox', en: 'Mompox' },
  'mompox.title': { es: 'El pueblo donde el tiempo no pasa', en: 'The town where time does not pass' },
  'mompox.p1': {
    es: 'Mompox — Santa Cruz de Mompox — fue fundada en 1537 a orillas del río Magdalena. Prosperó como puerto fluvial y refugio de oro, y en 1810 se convirtió en la primera ciudad del Nuevo Reino de Granada en proclamar la independencia absoluta bajo el lema "Ser libres o morir". Hoy es Patrimonio de la Humanidad por la UNESCO desde 1995.',
    en: 'Mompox — Santa Cruz de Mompox — was founded in 1537 on the banks of the Magdalena River. It prospered as a river port and gold refuge, and in 1810 became the first city in the New Kingdom of Granada to proclaim absolute independence under the motto "Be free or die". Today it has been a UNESCO World Heritage Site since 1995.'
  },
  'mompox.p2': {
    es: 'Su aislamiento — cuando el río cambió de curso a comienzos del siglo XX — preservó casi intacto el centro colonial. Las calles empedradas, las iglesias, las casas-tienda de la Albarrada y las rejas de hierro forjado siguen como entonces. Gabriel García Márquez decía que en pueblos como este "el tiempo no pasa", y muchos ven en Mompox la inspiración para Macondo.',
    en: 'Its isolation — when the river changed course in the early 20th century — preserved the colonial centre almost intact. The cobblestone streets, the churches, the house-shops of the Albarrada and the wrought-iron grilles remain as they were. Gabriel García Márquez said that in towns like this "time does not pass", and many see in Mompox the inspiration for Macondo.'
  },
  'mompox.quote1': {
    es: '"Si a Caracas debo la vida, a Mompox debo la gloria." — Simón Bolívar, 1812',
    en: '"If to Caracas I owe my life, to Mompox I owe my glory." — Simón Bolívar, 1812'
  },
  'mompox.quote2': {
    es: '"Por Mompox no se pasa, a Mompox se llega." — dicho momposino',
    en: '"You don\'t pass through Mompox, you arrive at Mompox." — momposino saying'
  },
  'mompox.stat1': { es: 'Patrimonio UNESCO', en: 'UNESCO Heritage' },
  'mompox.stat1val': { es: '1995', en: '1995' },
  'mompox.stat2': { es: 'Fundación', en: 'Founded' },
  'mompox.stat2val': { es: '1537', en: '1537' },
  'mompox.stat3': { es: 'Iglesias coloniales', en: 'Colonial churches' },
  'mompox.stat3val': { es: '6', en: '6' },
  'mompox.stat4': { es: 'Independencia', en: 'Independence' },
  'mompox.stat4val': { es: '6 ago 1810', en: 'Aug 6, 1810' },

  // Things to do
  'todo.eyebrow': { es: 'Qué hacer', en: 'Things to do' },
  'todo.title':   { es: 'Paseos, río, filigrana y atardeceres', en: 'Tours, river, filigree and sunsets' },
  'todo.subtitle':{
    es: 'Desde Casa Mónica te ayudamos a organizar cada experiencia. Estos son los planes que recomendamos a nuestros huéspedes.',
    en: 'From Casa Mónica we help you arrange each experience. These are the plans we recommend to our guests.'
  },
  'todo.item1.title': { es: 'Ciénaga de Pijiño', en: 'Ciénaga de Pijiño' },
  'todo.item1.desc':  {
    es: 'Medio día en lancha por el brazo del Magdalena hasta la ciénaga. 300+ especies de aves, garzas, martín pescador, babillas y el atardecer sobre el agua. Salida 3pm desde el muelle, regreso al anochecer.',
    en: 'Half a day by boat down the arm of the Magdalena to the lagoon. 300+ bird species, herons, kingfisher, caimans and the sunset over the water. 3pm departure from the pier, return at nightfall.'
  },
  'todo.item2.title': { es: 'Paseo en champán por el Magdalena', en: 'Champán boat ride on the Magdalena' },
  'todo.item2.desc':  {
    es: 'El atardecer desde el río es la imagen que se queda de Mompox. Lanchas grandes salen los fines de semana y en temporada alta con música y cócteles.',
    en: 'The sunset from the river is the image that stays with you from Mompox. Large boats leave on weekends and in high season with music and cocktails.'
  },
  'todo.item3.title': { es: 'Taller de filigrana momposina', en: 'Mompox filigree workshop' },
  'todo.item3.desc':  {
    es: 'Tres horas con un maestro artesano tejiendo hilos de plata. Sales con tu propia pieza. Una tradición de 300 años en oro y plata que hace únicos a los talleres de Mompox.',
    en: 'Three hours with a master artisan weaving silver threads. You leave with your own piece. A 300-year tradition in gold and silver that makes Mompox workshops unique.'
  },
  'todo.item4.title': { es: 'Recorrido por las seis iglesias', en: 'Tour of the six churches' },
  'todo.item4.desc':  {
    es: 'Santa Bárbara (la nuestra), la Inmaculada, San Francisco, San Agustín, San Juan de Dios y Santo Domingo. Cada una con su propia historia y su torre mirador al río.',
    en: 'Santa Bárbara (ours), Inmaculada, San Francisco, San Agustín, San Juan de Dios and Santo Domingo. Each with its own history and its tower looking out over the river.'
  },
  'todo.item5.title': { es: 'Caminata por la Albarrada', en: 'Walk along the Albarrada' },
  'todo.item5.desc':  {
    es: 'El muro que contiene al río es también la calle más bella de Mompox. Casas-tienda del siglo XVII, faroles, rejas de hierro forjado y el atardecer golpeando la piedra.',
    en: 'The wall that holds back the river is also the most beautiful street in Mompox. 17th-century house-shops, lanterns, wrought-iron grilles and the sunset hitting the stone.'
  },
  'todo.item6.title': { es: 'Crucero a las comunidades campesinas', en: 'Boat trip to farming communities' },
  'todo.item6.desc':  {
    es: 'Cruzar el río en lancha pública hasta las comunidades que cultivan las hortalizas de Mompox. Compartir un pescado con arroz de coco con una familia local y visitar su finca.',
    en: 'Cross the river on a public boat to the communities that grow Mompox\'s vegetables. Share a fish with coconut rice with a local family and visit their farm.'
  },

  // Food
  'food.eyebrow': { es: 'Sabores momposinos', en: 'Momposino flavours' },
  'food.title':   { es: 'El sabor del Caribe fluvial', en: 'The flavour of river Caribbean' },
  'food.subtitle':{
    es: 'Bocachico del Magdalena, arroz de chorizo, casabito en la esquina, queso de capa y vino de corozo. La gastronomía de Mompox es historia viva en cada plato.',
    en: 'Bocachico from the Magdalena, chorizo rice, casabito on the corner, layered cheese and corozo wine. The gastronomy of Mompox is living history on every plate.'
  },
  'food.item1': { es: 'Bocachico y bagre — pescados del río en guisos tradicionales', en: 'Bocachico and bagre — river fish in traditional stews' },
  'food.item2': { es: 'Arroz de chorizo, mote de queso, pato guisado y butifarras', en: 'Chorizo rice, cheese stew, stewed duck and butifarras' },
  'food.item3': { es: 'Casabito — tortilla de yuca, queso, coco y azúcar', en: 'Casabito — omelette of cassava, cheese, coconut and sugar' },
  'food.item4': { es: 'Queso de capa — queso hilado con más de 100 años de tradición', en: 'Queso de capa — stretched cheese with 100+ years of tradition' },
  'food.item5': { es: 'Vino de corozo — especialidad de Mompox, fruto de una palma', en: 'Corozo wine — Mompox specialty, fruit of a palm' },
  'food.item6': { es: 'Arepa \'e huevo y carimañolas — fritos de yuca', en: 'Arepa \'e huevo and carimañolas — cassava fritters' },
  'food.restaurants': { es: 'Restaurantes cercanos que recomendamos', en: 'Nearby restaurants we recommend' },
  'food.r1': { es: 'Café 1700 — café en mecedora bajo el portal, frente al río', en: 'Café 1700 — coffee in a rocking chair under the porch, by the river' },
  'food.r2': { es: 'El Comedor Costeño — almuerzo bajo los árboles, famoso por el pato', en: 'El Comedor Costeño — lunch under the trees, famous for duck' },
  'food.r3': { es: 'Crónicas — bar-restaurante en la plaza, vista a la iglesia iluminada', en: 'Crónicas — bar-restaurant on the plaza, view of the illuminated church' },
  'food.r4': { es: 'Santa Coa — frente al río, cocina local e internacional', en: 'Santa Coa — riverside, local and international cuisine' },

  // Getting there
  'get.eyebrow': { es: 'Cómo llegar', en: 'Getting here' },
  'get.title':   { es: 'Por aire, tierra o río', en: 'By air, land or river' },
  'get.subtitle':{ es: 'Mompox está a 6h de Cartagena por tierra, con vuelos semanales desde Medellín y un nuevo puente que la conecta al resto del país sin ferry.', en: 'Mompox is 6h from Cartagena by land, with weekly flights from Medellín and a new bridge connecting it to the rest of the country without ferry.' },
  'get.air.title': { es: 'Por aire', en: 'By air' },
  'get.air.desc':  {
    es: 'Satena opera un vuelo directo Medellín (Olaya Herrera) → Mompox dos veces por semana. El aeropuerto San Bernardo de Mompox abre solo en Semana Santa y Festijazz. Alternativa anual: Las Brujas, Corozal (Sucre).',
    en: 'Satena operates a direct Medellín (Olaya Herrera) → Mompox flight twice weekly. San Bernardo airport opens only during Holy Week and the Jazz Festival. Year-round alternative: Las Brujas, Corozal (Sucre).'
  },
  'get.land.title': { es: 'Por tierra', en: 'By land' },
  'get.land.desc':  {
    es: 'Desde Cartagena: 3 buses diarios directos con Unitransco, ~6h. El Puente Roncador (2020) sobre el Magdalena conecta Mompox por tierra sin ferry. Desde el punto de buses, un tuk-tuk te trae al centro histórico en 5 minutos.',
    en: 'From Cartagena: 3 direct daily buses with Unitransco, ~6h. The Puente Roncador (2020) over the Magdalena connects Mompox by land without ferry. From the bus point, a tuk-tuk brings you to the historic centre in 5 minutes.'
  },
  'get.water.title': { es: 'Por agua', en: 'By water' },
  'get.water.desc':  {
    es: 'Mompox tiene terminal fluvial. Llegan embarcaciones desde Magangué, El Banco, Santa Ana y Barrancabermeja. La ruta histórica Cartagena → Magangué → chalupa por el Magdalena sigue siendo una aventura.',
    en: 'Mompox has a river terminal. Vessels arrive from Magangué, El Banco, Santa Ana and Barrancabermeja. The historic route Cartagena → Magangué → chalupa on the Magdalena is still an adventure.'
  },
  'get.around.title': { es: 'Cómo moverse', en: 'Getting around' },
  'get.around.desc':  {
    es: 'A pie — el centro histórico es compacto y empedrado. En tuk-tuk — barato, ubicuo y divertido. En lancha — para cruzar el río a las comunidades campesinas.',
    en: 'On foot — the historic centre is compact and cobblestoned. By tuk-tuk — cheap, ubiquitous and fun. By boat — to cross the river to the farming communities.'
  },

  // Climate
  'climate.eyebrow': { es: 'Clima y cuándo venir', en: 'Climate & when to visit' },
  'climate.title':   { es: 'Calor todo el año, magia en cada estación', en: 'Heat all year, magic in every season' },
  'climate.desc': {
    es: 'Mompox es calurosa y húmeda todo el año (24–37°C). La mejor época es de mediados de diciembre a finales de febrero: cielo despejado, menos lluvia y fiestas patronales. Octubre es el mes más lluvioso; marzo el más caluroso. En Semana Santa y el Festijazz (septiembre) la demanda se dispara — reserva con tiempo.',
    en: 'Mompox is hot and humid year-round (24–37°C). The best time is mid-December to late February: clear skies, less rain and patron saint festivals. October is the wettest month; March the hottest. During Holy Week and Festijazz (September) demand spikes — book ahead.'
  },
  'climate.best':   { es: 'Mejor época', en: 'Best time' },
  'climate.bestVal':{ es: 'Dic–Feb', en: 'Dec–Feb' },
  'climate.hottest':{ es: 'Más caluroso', en: 'Hottest' },
  'climate.hottestVal': { es: 'Marzo · 37°C', en: 'March · 37°C' },
  'climate.wettest':{ es: 'Más lluvia', en: 'Wettest' },
  'climate.wettestVal': { es: 'Octubre', en: 'October' },
  'climate.festivals': { es: 'Festivales', en: 'Festivals' },
  'climate.festivalsVal': { es: 'Semana Santa · Festijazz', en: 'Holy Week · Festijazz' },

  // Reviews
  'reviews.eyebrow': { es: 'Opiniones', en: 'Reviews' },
  'reviews.title':   { es: 'Lo que dicen quienes se han quedado en casa', en: 'What guests say after staying with us' },
  'reviews.subtitle':{ es: '9.2 / 10 en 55 reseñas · fuente: hotelesbeijing.com.co', en: '9.2 / 10 from 55 reviews · source: hotelesbeijing.com.co' },
  'reviews.r1': { es: '"Hotel Casa Mónica, callejón de Santa Bárbara. Súper recomendado."', en: '"Hotel Casa Mónica, Santa Bárbara alley. Highly recommended."' },
  'reviews.r1.author': { es: 'Viajero en grupo de Facebook', en: 'Traveller in a Facebook group' },
  'reviews.r2': { es: '"Atención cercana y cordial de los propietarios, con un trato que recuerda al de una posada familiar."', en: '"Close and cordial attention from the owners, with a treatment reminiscent of a family inn."' },
  'reviews.r2.author': { es: 'Reseña agregada', en: 'Aggregated review' },
  'reviews.r3': { es: '"Buena climatización, ubicación práctica a pocas cuadras de todo, ambiente seguro y familiar. Limpieza y orden."', en: '"Good air conditioning, practical location a few blocks from everything, safe and family atmosphere. Cleanliness and order."' },
  'reviews.r3.author': { es: 'Reseña agregada', en: 'Aggregated review' },
  'reviews.r4': { es: '"Hotel Casa Mónica en Google aparece queda detrás de la Iglesia de Santa Bárbara. Llegas caminando a todo."', en: '"Hotel Casa Mónica on Google shows it is behind the Church of Santa Bárbara. You can walk everywhere."' },
  'reviews.r4.author': { es: 'Viajero motociclista', en: 'Motorcycle traveller' },

  // Gallery
  'gallery.eyebrow': { es: 'Galería', en: 'Gallery' },
  'gallery.title':   { es: 'Mompox en imágenes', en: 'Mompox in pictures' },

  // Contact
  'contact.eyebrow': { es: 'Reservas', en: 'Bookings' },
  'contact.title':   { es: 'Hablemos. Reserva directa, sin intermediarios.', en: 'Let\'s talk. Direct booking, no middlemen.' },
  'contact.subtitle':{
    es: 'No estamos en Booking ni en Expedia, y no queremos estarlo. Cada viajero es distinto, así que cada reserva la conversamos — y la confirmamos a mano. Escríbenos por WhatsApp: del otro lado estás tú, y de este lado, Fredy o Mónica en persona.',
    en: 'We\'re not on Booking or Expedia, and we don\'t want to be. Every traveller is different, so we talk through every reservation — and confirm it by hand. Message us on WhatsApp: on your side is you, on our side, Fredy or Mónica in person.'
  },
  'contact.whatsapp': { es: 'WhatsApp: +57 300 310 0299', en: 'WhatsApp: +57 300 310 0299' },
  'contact.instagram': { es: 'Instagram: @casamonicamompox', en: 'Instagram: @casamonicamompox' },
  'contact.address':   { es: 'Calle 14 #2 74, Santa Cruz de Mompox, Bolívar', en: 'Calle 14 #2 74, Santa Cruz de Mompox, Bolívar' },
  'contact.cta':       { es: 'Escríbenos por WhatsApp', en: 'Message us on WhatsApp' },
  'contact.directory': { es: 'También en hotelesbeijing.com.co', en: 'Also on hotelesbeijing.com.co' },

  // Footer
  'footer.tagline': { es: 'Siéntete como en casa, en el corazón patrimonial de Mompox. Fredy, Mónica y familia te esperan.', en: 'Feel at home, in the heritage heart of Mompox. Fredy, Mónica and family are waiting for you.' },
  'footer.unesco':  { es: 'Patrimonio de la Humanidad UNESCO 1995', en: 'UNESCO World Heritage 1995' },
  'footer.valerosa':{ es: 'Ciudad Valerosa · Pueblo Patrimonio', en: 'Courageous City · Heritage Town' },
  'footer.rights':  { es: 'Hotel Casa Mónica · Mompox, Bolívar, Colombia', en: 'Hotel Casa Mónica · Mompox, Bolívar, Colombia' },
  'footer.built':   { es: 'Hecho con cariño desde Mompox', en: 'Made with care from Mompox' },
};

type Ctx = {
  lang: Lang;
  setLang: (l: Lang) => void;
  t: (key: string) => string;
};

const LangContext = createContext<Ctx | null>(null);

export function LangProvider({ children }: { children: ReactNode }) {
  const [lang, setLangState] = useState<Lang>('es');

  useEffect(() => {
    const url = new URL(window.location.href);
    const q = url.searchParams.get('lang');
    // eslint-disable-next-line react-hooks/set-state-in-effect
    if (q === 'en' || q === 'es') setLangState(q);
    else {
      const stored = window.localStorage.getItem('cm-lang');
      if (stored === 'en' || stored === 'es') setLangState(stored);
    }
  }, []);

  const setLang = (l: Lang) => {
    setLangState(l);
    try { window.localStorage.setItem('cm-lang', l); } catch {}
    try {
      const url = new URL(window.location.href);
      url.searchParams.set('lang', l);
      window.history.replaceState({}, '', url.toString());
    } catch {}
  };

  const translate = (key: string) => t[key]?.[lang] ?? key;

  return (
    <LangContext.Provider value={{ lang, setLang, t: translate }}>
      {children}
    </LangContext.Provider>
  );
}

export function useLang() {
  const ctx = useContext(LangContext);
  if (!ctx) throw new Error('useLang must be used within LangProvider');
  return ctx;
}

// WhatsApp link helper
export const WHATSAPP_NUMBER = '573003100299';
export const WHATSAPP_MESSAGE_ES = 'Hola Casa Mónica! Quisiera consultar disponibilidad y tarifas para una habitación en Mompox.';
export const WHATSAPP_MESSAGE_EN = 'Hi Casa Mónica! I would like to ask about availability and rates for a room in Mompox.';

export function whatsappLink(lang: Lang) {
  const msg = lang === 'es' ? WHATSAPP_MESSAGE_ES : WHATSAPP_MESSAGE_EN;
  return `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(msg)}`;
}
