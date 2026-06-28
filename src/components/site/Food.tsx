'use client';
import { useLang } from '@/lib/i18n';
import { Reveal, FiligreeDivider, Eyebrow } from './Reveal';
import { Fish, Soup, Cookie, CakeSlice, Wine, Croissant } from 'lucide-react';

export function Food() {
  const { t, lang } = useLang();

  const dishes = [
    { icon: Fish,      text: t('food.item1') },
    { icon: Soup,      text: t('food.item2') },
    { icon: Cookie,    text: t('food.item3') },
    { icon: CakeSlice, text: t('food.item4') },
    { icon: Wine,      text: t('food.item5') },
    { icon: Croissant, text: t('food.item6') },
  ];

  const restaurants = [
    t('food.r1'), t('food.r2'), t('food.r3'), t('food.r4'),
  ];

  return (
    <section id="food" className="bg-cal py-20 sm:py-28">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <Reveal className="text-center">
          <Eyebrow>{t('food.eyebrow')}</Eyebrow>
          <h2 className="font-serif text-4xl sm:text-5xl text-[var(--wood)] leading-tight max-w-4xl mx-auto">
            {t('food.title')}
          </h2>
          <p className="mt-4 text-[var(--wood-soft)] max-w-2xl mx-auto text-base sm:text-lg">
            {t('food.subtitle')}
          </p>
          <FiligreeDivider />
        </Reveal>

        <div className="grid lg:grid-cols-2 gap-8 lg:gap-12 items-stretch">
          {/* Image */}
          <Reveal className="relative">
            <div className="rounded-2xl overflow-hidden shadow-xl h-full min-h-[400px]">
              <img
                src="/momposina-food.png"
                alt="Mesa de comida momposina: bocachico, arroz de chorizo, carimañolas y vino de corozo"
                className="w-full h-full object-cover"
              />
            </div>
            <div className="absolute -top-3 -right-3 bg-[var(--terracotta)] text-white text-xs tracking-wider uppercase px-4 py-2 rounded-full shadow-lg">
              {lang === 'es' ? 'Especialidad' : 'Local specialty'}
            </div>
          </Reveal>

          {/* Dish list */}
          <Reveal delay={120} className="space-y-3">
            {dishes.map((d, i) => (
              <div
                key={i}
                className="flex items-start gap-4 p-4 rounded-xl bg-white/70 border border-[var(--border)] hover:border-[var(--terracotta)] hover:shadow-md transition-all"
              >
                <div className="w-10 h-10 rounded-full bg-[var(--gold-soft)] flex items-center justify-center flex-shrink-0">
                  <d.icon className="w-5 h-5 text-[var(--terracotta-dark)]" />
                </div>
                <p className="text-[var(--wood)] text-base leading-snug pt-2">{d.text}</p>
              </div>
            ))}

            {/* Restaurants */}
            <div className="mt-6 p-5 rounded-xl bg-[var(--wood)] text-[var(--cream-100)]">
              <h3 className="font-serif text-lg text-[var(--gold-soft)] mb-3">
                {t('food.restaurants')}
              </h3>
              <ul className="space-y-2 text-sm text-[var(--cream-100)]/90">
                {restaurants.map((r, i) => (
                  <li key={i} className="flex items-start gap-2">
                    <span className="text-[var(--gold-soft)] mt-1">·</span>
                    <span>{r}</span>
                  </li>
                ))}
              </ul>
            </div>
          </Reveal>
        </div>

        {/* Corozo berry accent card */}
        <Reveal className="mt-8">
          <div className="grid sm:grid-cols-3 gap-4">
            <div className="sm:col-span-1 rounded-2xl overflow-hidden shadow-md aspect-square sm:aspect-auto">
              <img
                src="/corozo-fruit.png"
                alt="Frutos de corozo y vino de corozo momposino"
                className="w-full h-full object-cover"
              />
            </div>
            <div className="sm:col-span-2 p-6 sm:p-8 rounded-2xl bg-[var(--brick)] text-white flex flex-col justify-center">
              <h3 className="font-script text-3xl sm:text-4xl text-[var(--gold-soft)] mb-2">
                Vino de corozo
              </h3>
              <p className="text-white/90 leading-relaxed">
                {lang === 'es'
                  ? 'El corozo es el fruto de una palma del Caribe colombiano. En Mompox se transforma en un vino dulce y profundo, color rubí, que se sirve frío en las tardes de calor. Pruébalo en los talleres de cata del centro histórico.'
                  : 'Corozo is the fruit of a Caribbean Colombian palm. In Mompox it is transformed into a sweet, deep, ruby-coloured wine served cold on hot afternoons. Try it at the tasting workshops in the historic centre.'}
              </p>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
