'use client';
import { useLang } from '@/lib/i18n';
import { Reveal, FiligreeDivider, Eyebrow } from './Reveal';
import { Wind, MapPin, Car, Star } from 'lucide-react';

export function About() {
  const { t } = useLang();

  const stats = [
    { icon: Star,  label: t('about.stats.rating'),   value: '9.2/10' },
    { icon: Star,  label: t('about.stats.reviews'),  value: '55' },
    { icon: MapPin,label: t('about.stats.location'), value: '★' },
    { icon: Car,   label: t('about.stats.parking'),  value: '✓' },
  ];

  return (
    <section id="about" className="bg-cal py-20 sm:py-28">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <Reveal className="text-center">
          <Eyebrow>{t('about.eyebrow')}</Eyebrow>
          <h2 className="font-serif text-4xl sm:text-5xl text-[var(--wood)] leading-tight max-w-4xl mx-auto">
            {t('about.title')}
          </h2>
          <FiligreeDivider />
        </Reveal>

        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center mt-8">
          {/* Image collage */}
          <Reveal className="relative">
            <div className="relative grid grid-cols-2 gap-4">
              <div className="space-y-4 mt-8">
                <img
                  src="/hotel-exterior-day.png"
                  alt="Fachada de Hotel Casa Mónica con un músico tocando acordeón"
                  className="rounded-2xl shadow-xl w-full aspect-[4/5] object-cover img-lift"
                />
                <img
                  src="/rocking-chair-porch.png"
                  alt="Mecedoras momposinas en un portal colonial"
                  className="rounded-2xl shadow-xl w-full aspect-square object-cover img-lift"
                  onError={(e) => ((e.target as HTMLImageElement).style.opacity = '0.3')}
                />
              </div>
              <div className="space-y-4">
                <img
                  src="/hotel-exterior-night.png"
                  alt="Fachada de Hotel Casa Mónica iluminada en la noche"
                  className="rounded-2xl shadow-xl w-full aspect-square object-cover img-lift"
                />
                <img
                  src="/hotel-patio.png"
                  alt="Patio interior colonial de la casa"
                  className="rounded-2xl shadow-xl w-full aspect-[4/5] object-cover img-lift"
                  onError={(e) => ((e.target as HTMLImageElement).style.opacity = '0.3')}
                />
              </div>
            </div>

            {/* Floating ornament */}
            <div className="absolute -top-4 -right-4 w-24 h-24 rounded-full bg-[var(--gold-soft)]/30 -z-10 blur-2xl" />
            <div className="absolute -bottom-6 -left-6 w-32 h-32 rounded-full bg-[var(--terracotta)]/15 -z-10 blur-3xl" />
          </Reveal>

          {/* Text */}
          <Reveal delay={120}>
            <div className="space-y-5 text-[var(--wood)] text-base sm:text-lg leading-relaxed">
              <p>{t('about.p1')}</p>
              <p>{t('about.p2')}</p>
              <p>{t('about.p3')}</p>
            </div>

            {/* Owner quote */}
            <div className="mt-8 p-6 sm:p-8 rounded-2xl bg-white/70 backdrop-blur-sm border-l-4 border-[var(--terracotta)] shadow-md">
              <p className="font-serif italic text-[var(--wood)] text-lg leading-relaxed">
                {t('about.owner.quote')}
              </p>
              <p className="mt-3 text-sm text-[var(--wood-soft)] font-medium">
                — {t('about.owner.name')}
              </p>
            </div>

            {/* Stats */}
            <div className="mt-8 grid grid-cols-2 sm:grid-cols-4 gap-4">
              {stats.map((s, i) => (
                <Reveal key={i} delay={i * 80} className="text-center p-4 rounded-xl bg-[var(--cream-100)]/60 border border-[var(--border)]">
                  <s.icon className="w-5 h-5 text-[var(--terracotta)] mx-auto mb-2" />
                  <div className="font-serif text-xl text-[var(--wood)]">{s.value}</div>
                  <div className="text-[10px] tracking-wider uppercase text-[var(--wood-soft)] mt-1 leading-tight">{s.label}</div>
                </Reveal>
              ))}
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
