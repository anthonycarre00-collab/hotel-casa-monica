'use client';
import { useLang } from '@/lib/i18n';
import { Reveal, FiligreeDivider, Eyebrow } from './Reveal';
import { Wind, Sparkles, Tv, Fan, Bath, Heart, Check } from 'lucide-react';

export function Rooms() {
  const { t, lang } = useLang();

  const rooms = [
    {
      img: '/room-triple.png',
      title: t('rooms.room1.title'),
      desc: t('rooms.room1.desc'),
      capacity: lang === 'es' ? '3 personas' : '3 guests',
    },
    {
      img: '/room-twin.png',
      title: t('rooms.room2.title'),
      desc: t('rooms.room2.desc'),
      capacity: lang === 'es' ? '2 personas' : '2 guests',
    },
    {
      img: '/room-twin-amenities.png',
      title: t('rooms.room3.title'),
      desc: t('rooms.room3.desc'),
      capacity: lang === 'es' ? '2 personas' : '2 guests',
    },
  ];

  const features = [
    { icon: Wind,     label: t('rooms.features.f1') },
    { icon: Sparkles, label: t('rooms.features.f2') },
    { icon: Heart,    label: t('rooms.features.f3') },
    { icon: Bath,     label: t('rooms.features.f4') },
    { icon: Fan,      label: t('rooms.features.f5') },
    { icon: Heart,    label: t('rooms.features.f6') },
  ];

  return (
    <section id="rooms" className="bg-sunset-wash py-20 sm:py-28">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <Reveal className="text-center">
          <Eyebrow>{t('rooms.eyebrow')}</Eyebrow>
          <h2 className="font-serif text-4xl sm:text-5xl text-[var(--wood)] leading-tight max-w-4xl mx-auto">
            {t('rooms.title')}
          </h2>
          <p className="mt-4 text-[var(--wood-soft)] max-w-2xl mx-auto text-base sm:text-lg">
            {t('rooms.subtitle')}
          </p>
          <FiligreeDivider />
        </Reveal>

        {/* Room cards */}
        <div className="grid md:grid-cols-3 gap-6 lg:gap-8">
          {rooms.map((room, i) => (
            <Reveal key={i} delay={i * 120}>
              <article className="group bg-white rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-500 hover:-translate-y-1 h-full flex flex-col">
                <div className="relative aspect-[4/3] overflow-hidden">
                  <img
                    src={room.img}
                    alt={room.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                  />
                  <div className="absolute top-3 right-3 bg-[var(--terracotta)] text-white text-xs font-medium px-3 py-1.5 rounded-full shadow">
                    {room.capacity}
                  </div>
                </div>
                <div className="p-6 flex-1 flex flex-col">
                  <h3 className="font-serif text-2xl text-[var(--wood)] mb-2">{room.title}</h3>
                  <p className="text-[var(--wood-soft)] text-sm leading-relaxed flex-1">{room.desc}</p>
                  <div className="mt-4 pt-4 border-t border-[var(--border)] flex items-center gap-2 text-[var(--terracotta)] text-sm font-medium">
                    <Check className="w-4 h-4" />
                    <span>{lang === 'es' ? 'Aire acondicionado · Limpieza diaria' : 'A/C · Daily housekeeping'}</span>
                  </div>
                </div>
              </article>
            </Reveal>
          ))}
        </div>

        {/* Features strip */}
        <Reveal className="mt-12">
          <div className="bg-[var(--wood)] rounded-2xl p-6 sm:p-8 text-center">
            <h3 className="font-serif text-xl text-[var(--gold-soft)] mb-6">
              {t('rooms.features.title')}
            </h3>
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4">
              {features.map((f, i) => (
                <div key={i} className="flex flex-col items-center gap-2 text-[var(--cream-100)]">
                  <div className="w-12 h-12 rounded-full bg-[var(--terracotta)]/20 flex items-center justify-center">
                    <f.icon className="w-5 h-5 text-[var(--gold-soft)]" />
                  </div>
                  <span className="text-xs sm:text-sm text-center leading-tight">{f.label}</span>
                </div>
              ))}
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
