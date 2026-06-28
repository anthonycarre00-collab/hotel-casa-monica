'use client';
import { useLang } from '@/lib/i18n';
import { Reveal, FiligreeDivider, Eyebrow } from './Reveal';
import { Waves, Ship, Gem, Church, Footprints, Anchor } from 'lucide-react';

export function ThingsToDo() {
  const { t, lang } = useLang();

  const items = [
    { icon: Waves,    img: '/cienaga-pijino.png',    title: t('todo.item1.title'), desc: t('todo.item1.desc') },
    { icon: Ship,     img: '/champan-boat.png',      title: t('todo.item2.title'), desc: t('todo.item2.desc') },
    { icon: Gem,      img: '/filigree-artisan.png',  title: t('todo.item3.title'), desc: t('todo.item3.desc') },
    { icon: Church,   img: '/santa-barbara-tower.png', title: t('todo.item4.title'), desc: t('todo.item4.desc') },
    { icon: Footprints, img: '/mompox-street.png',   title: t('todo.item5.title'), desc: t('todo.item5.desc') },
    { icon: Anchor,   img: '/magdalena-sunset.png',  title: t('todo.item6.title'), desc: t('todo.item6.desc') },
  ];

  return (
    <section id="todo" className="bg-sunset-wash py-20 sm:py-28">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <Reveal className="text-center">
          <Eyebrow>{t('todo.eyebrow')}</Eyebrow>
          <h2 className="font-serif text-4xl sm:text-5xl text-[var(--wood)] leading-tight max-w-4xl mx-auto">
            {t('todo.title')}
          </h2>
          <p className="mt-4 text-[var(--wood-soft)] max-w-2xl mx-auto text-base sm:text-lg">
            {t('todo.subtitle')}
          </p>
          <FiligreeDivider />
        </Reveal>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {items.map((item, i) => (
            <Reveal key={i} delay={(i % 3) * 100}>
              <article className="group relative overflow-hidden rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-500 hover:-translate-y-1 h-[420px]">
                <img
                  src={item.img}
                  alt={item.title}
                  className="absolute inset-0 w-full h-full object-cover group-hover:scale-110 transition-transform duration-1000"
                  onError={(e) => ((e.target as HTMLImageElement).style.opacity = '0.4')}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[var(--wood)] via-[var(--wood)]/60 to-transparent" />
                <div className="relative h-full flex flex-col justify-end p-6 text-white">
                  <div className="w-12 h-12 rounded-full bg-[var(--terracotta)] flex items-center justify-center mb-3 group-hover:scale-110 transition-transform">
                    <item.icon className="w-5 h-5 text-white" />
                  </div>
                  <h3 className="font-serif text-2xl mb-2">{item.title}</h3>
                  <p className="text-sm text-white/85 leading-relaxed line-clamp-4">
                    {item.desc}
                  </p>
                </div>
              </article>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
