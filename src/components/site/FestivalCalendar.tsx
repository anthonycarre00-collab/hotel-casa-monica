'use client';
import { useLang } from '@/lib/i18n';
import { Reveal, FiligreeDivider, Eyebrow } from './Reveal';
import { Calendar, MapPin } from 'lucide-react';

type Festival = {
  id: string;
  name: { es: string; en: string };
  date: { es: string; en: string };
  month: number; // 0-11 for "next upcoming" calculation
  description: { es: string; en: string };
  bookAhead: boolean;
  icon: string;
};

// Major Mompox festivals — dates are approximate (moveable feasts noted)
const FESTIVALS: Festival[] = [
  {
    id: 'semana-santa',
    name: { es: 'Semana Santa', en: 'Holy Week' },
    date: { es: 'Marzo o Abril (variable)', en: 'March or April (variable)' },
    month: 3, // typically March/April
    description: {
      es: 'La segunda más importante de Colombia después de Popayán. Serenata a los Difuntos, procesiones de las siete iglesias, Paso Robado.',
      en: 'Colombia\'s second most important Holy Week after Popayán. Serenade to the Dead, processions of the seven churches, the Stolen Effigy.',
    },
    bookAhead: true,
    icon: '🙏',
  },
  {
    id: 'totó-la-momposina',
    name: { es: 'Festival Totó la Momposina', en: 'Totó la Momposina Festival' },
    date: { es: '19-21 de Julio', en: 'July 19-21' },
    month: 6,
    description: {
      es: 'Homenaje a la legendaria cantante momposina. Cumbia, bullerengue, porro y mapalé en las plazas del centro histórico.',
      en: 'Tribute to the legendary momposina singer. Cumbia, bullerengue, porro and mapalé in the historic centre plazas.',
    },
    bookAhead: true,
    icon: '🎵',
  },
  {
    id: 'festijazz',
    name: { es: 'Festijazz Mompox', en: 'Mompox Jazz Festival' },
    date: { es: 'Septiembre u Octubre', en: 'September or October' },
    month: 9,
    description: {
      es: 'Festival de jazz que llena las iglesias y plazas coloniales con música. Conciertos al aire libre junto al río Magdalena.',
      en: 'Jazz festival that fills the colonial churches and plazas with music. Open-air concerts by the Magdalena River.',
    },
    bookAhead: true,
    icon: '🎷',
  },
  {
    id: 'cumbion',
    name: { es: 'El Cumbión', en: 'The Cumbión' },
    date: { es: 'Todo el año, pero especial en diciembre', en: 'Year-round, but special in December' },
    month: 11,
    description: {
      es: 'Desfile pueblo-entero al ritmo de cumbia. La música no para, la gente baila en la calle, y todos son bienvenidos.',
      en: 'Whole-town parade to the rhythm of cumbia. The music doesn\'t stop, people dance in the street, everyone is welcome.',
    },
    bookAhead: false,
    icon: '💃',
  },
  {
    id: 'navidad',
    name: { es: 'Navidad momposina', en: 'Mompox Christmas' },
    date: { es: 'Diciembre', en: 'December' },
    month: 11,
    description: {
      es: 'Luces, novenas, puestos de comida y música en la plaza. El pueblo entero se vuelca a la calle cada noche.',
      en: 'Lights, novenas, food stalls and music in the plaza. The whole town takes to the streets every night.',
    },
    bookAhead: false,
    icon: '✨',
  },
  {
    id: 'independencia',
    name: { es: 'Independencia de Mompox', en: 'Mompox Independence Day' },
    date: { es: '6 de Agosto', en: 'August 6' },
    month: 7,
    description: {
      es: 'Mompox fue la primera ciudad del Nuevo Reino de Granada en proclamar la independencia (1810) bajo el lema "Ser libres o morir".',
      en: 'Mompox was the first city in the New Kingdom of Granada to proclaim independence (1810) under the motto "Be free or die".',
    },
    bookAhead: false,
    icon: '🇨🇴',
  },
];

export function FestivalCalendar() {
  const { t, lang } = useLang();

  // Determine which festival is "next" based on current month
  const now = new Date();
  const currentMonth = now.getMonth();
  const nextFestival = [...FESTIVALS].sort((a, b) => {
    const aDiff = ((a.month - currentMonth) + 12) % 12;
    const bDiff = ((b.month - currentMonth) + 12) % 12;
    return aDiff - bDiff;
  })[0];

  return (
    <section id="festivals" className="bg-cal py-20 sm:py-28">
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        <Reveal className="text-center">
          <Eyebrow>{t('festival.title')}</Eyebrow>
          <h2 className="font-serif text-4xl sm:text-5xl text-[var(--wood)] leading-tight">
            {t('festival.title')}
          </h2>
          <p className="mt-3 text-[var(--wood-soft)] text-base sm:text-lg max-w-2xl mx-auto">
            {t('festival.subtitle')}
          </p>
          <FiligreeDivider />
        </Reveal>

        {/* Next festival highlight */}
        {nextFestival && (
          <Reveal delay={100} className="mb-10">
            <div className="bg-gradient-to-br from-[var(--terracotta)] to-[var(--brick)] text-white rounded-2xl p-6 sm:p-8 shadow-xl">
              <div className="flex items-start gap-4">
                <div className="text-5xl flex-shrink-0">{nextFestival.icon}</div>
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-1">
                    <span className="text-[10px] uppercase tracking-[0.25em] text-[var(--gold-soft)] font-medium">
                      {t('festival.upcoming')}
                    </span>
                    {nextFestival.bookAhead && (
                      <span className="text-[10px] uppercase tracking-wider bg-white/20 px-2 py-0.5 rounded-full">
                        {t('festival.bookAhead')}
                      </span>
                    )}
                  </div>
                  <h3 className="font-serif text-2xl sm:text-3xl mb-1">
                    {lang === 'es' ? nextFestival.name.es : nextFestival.name.en}
                  </h3>
                  <div className="flex items-center gap-2 text-white/80 text-sm mb-3">
                    <Calendar className="w-4 h-4" />
                    {lang === 'es' ? nextFestival.date.es : nextFestival.date.en}
                  </div>
                  <p className="text-white/90 text-sm sm:text-base leading-relaxed">
                    {lang === 'es' ? nextFestival.description.es : nextFestival.description.en}
                  </p>
                </div>
              </div>
            </div>
          </Reveal>
        )}

        {/* All festivals grid */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {FESTIVALS.map((f, i) => (
            <Reveal key={f.id} delay={(i % 3) * 80}>
              <article className="bg-white rounded-2xl p-5 shadow-md hover:shadow-lg transition-all h-full border border-[var(--border)]">
                <div className="flex items-start gap-3 mb-3">
                  <div className="text-3xl flex-shrink-0">{f.icon}</div>
                  <div className="flex-1 min-w-0">
                    <h4 className="font-serif text-lg text-[var(--wood)] leading-tight">
                      {lang === 'es' ? f.name.es : f.name.en}
                    </h4>
                    <div className="flex items-center gap-1.5 text-xs text-[var(--wood-soft)] mt-0.5">
                      <Calendar className="w-3 h-3" />
                      {lang === 'es' ? f.date.es : f.date.en}
                    </div>
                  </div>
                  {f.bookAhead && (
                    <span className="text-[9px] uppercase tracking-wider bg-[var(--terracotta)]/10 text-[var(--terracotta-dark)] px-2 py-0.5 rounded-full flex-shrink-0">
                      ★
                    </span>
                  )}
                </div>
                <p className="text-xs text-[var(--wood-soft)] leading-relaxed">
                  {lang === 'es' ? f.description.es : f.description.en}
                </p>
              </article>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
