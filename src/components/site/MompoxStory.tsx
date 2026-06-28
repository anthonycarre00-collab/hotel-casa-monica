'use client';
import { useLang } from '@/lib/i18n';
import { Reveal, FiligreeDivider, Eyebrow } from './Reveal';
import { Quote } from 'lucide-react';

export function MompoxStory() {
  const { t, lang } = useLang();

  const stats = [
    { label: t('mompox.stat1'), value: t('mompox.stat1val') },
    { label: t('mompox.stat2'), value: t('mompox.stat2val') },
    { label: t('mompox.stat3'), value: t('mompox.stat3val') },
    { label: t('mompox.stat4'), value: t('mompox.stat4val') },
  ];

  return (
    <section id="mompox" className="relative py-20 sm:py-28 overflow-hidden">
      {/* Background image with overlay */}
      <div className="absolute inset-0 z-0">
        <img
          src="/mompox-street.png"
          alt="Calle colonial de Mompox al amanecer"
          className="w-full h-full object-cover"
          onError={(e) => ((e.target as HTMLImageElement).style.display = 'none')}
        />
        <div className="absolute inset-0 bg-[var(--wood)]/88" />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 text-[var(--cream-100)]">
        <Reveal className="text-center">
          <Eyebrow>
            <span className="text-[var(--gold-soft)]">{t('mompox.eyebrow')}</span>
          </Eyebrow>
          <h2 className="font-serif text-4xl sm:text-5xl text-white leading-tight max-w-4xl mx-auto">
            {t('mompox.title')}
          </h2>
          <FiligreeDivider />
        </Reveal>

        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center mt-8">
          {/* Text */}
          <Reveal className="space-y-5 text-base sm:text-lg leading-relaxed text-[var(--cream-100)]/90">
            <p>{t('mompox.p1')}</p>
            <p>{t('mompox.p2')}</p>
          </Reveal>

          {/* Image with quote overlay */}
          <Reveal delay={120} className="relative">
            <div className="relative rounded-2xl overflow-hidden shadow-2xl">
              <img
                src="/santa-barbara-tower.png"
                alt="Torre octagonal barroca de la Iglesia de Santa Bárbara en Mompox"
                className="w-full aspect-[4/5] object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[var(--wood)]/80 to-transparent" />
              <div className="absolute bottom-0 left-0 right-0 p-6">
                <Quote className="w-8 h-8 text-[var(--gold-soft)] mb-2" />
                <p className="font-serif italic text-white text-lg leading-snug">
                  {t('mompox.quote2')}
                </p>
              </div>
            </div>
          </Reveal>
        </div>

        {/* Bolívar quote — large pull quote */}
        <Reveal className="mt-16 text-center">
          <blockquote className="max-w-3xl mx-auto">
            <p className="font-serif italic text-2xl sm:text-3xl text-[var(--gold-soft)] leading-relaxed">
              {t('mompox.quote1')}
            </p>
          </blockquote>
        </Reveal>

        {/* Stats */}
        <Reveal className="mt-12">
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
            {stats.map((s, i) => (
              <div key={i} className="text-center p-5 rounded-xl bg-white/5 backdrop-blur-sm border border-white/10">
                <div className="font-serif text-3xl sm:text-4xl text-[var(--gold-soft)]">{s.value}</div>
                <div className="text-xs tracking-wider uppercase text-[var(--cream-100)]/70 mt-2 leading-tight">
                  {s.label}
                </div>
              </div>
            ))}
          </div>
        </Reveal>
      </div>
    </section>
  );
}
