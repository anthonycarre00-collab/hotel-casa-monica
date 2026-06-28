'use client';
import { useLang } from '@/lib/i18n';
import { Reveal, FiligreeDivider, Eyebrow } from './Reveal';
import { Star, Quote } from 'lucide-react';

export function Reviews() {
  const { t, lang } = useLang();

  const reviews = [
    { text: t('reviews.r1'), author: t('reviews.r1.author') },
    { text: t('reviews.r2'), author: t('reviews.r2.author') },
    { text: t('reviews.r3'), author: t('reviews.r3.author') },
    { text: t('reviews.r4'), author: t('reviews.r4.author') },
  ];

  return (
    <section id="reviews" className="bg-cal py-20 sm:py-28">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <Reveal className="text-center">
          <Eyebrow>{t('reviews.eyebrow')}</Eyebrow>
          <h2 className="font-serif text-4xl sm:text-5xl text-[var(--wood)] leading-tight max-w-4xl mx-auto">
            {t('reviews.title')}
          </h2>
          <p className="mt-4 text-[var(--wood-soft)] text-base sm:text-lg">
            {t('reviews.subtitle')}
          </p>
          <FiligreeDivider />
        </Reveal>

        {/* Big rating */}
        <Reveal className="text-center mb-12">
          <div className="inline-flex items-center gap-6 bg-white rounded-2xl px-8 py-5 shadow-lg border border-[var(--border)]">
            <div className="text-center">
              <div className="font-serif text-5xl text-[var(--terracotta)]">9.2</div>
              <div className="text-xs uppercase tracking-wider text-[var(--wood-soft)] mt-1">
                / 10
              </div>
            </div>
            <div className="h-12 w-px bg-[var(--border)]" />
            <div className="text-left">
              <div className="flex text-[var(--gold)] gap-0.5 mb-1">
                {Array.from({ length: 5 }).map((_, i) => (
                  <Star key={i} className="w-4 h-4 fill-current" />
                ))}
              </div>
              <div className="text-sm text-[var(--wood)]">
                <strong>55</strong> {lang === 'es' ? 'reseñas verificadas' : 'verified reviews'}
              </div>
            </div>
          </div>
        </Reveal>

        {/* Reviews grid */}
        <div className="grid md:grid-cols-2 gap-6">
          {reviews.map((r, i) => (
            <Reveal key={i} delay={(i % 2) * 120}>
              <figure className="bg-white rounded-2xl p-6 sm:p-8 shadow-md border border-[var(--border)] hover:shadow-lg transition-all h-full">
                <Quote className="w-8 h-8 text-[var(--gold)] mb-3" />
                <blockquote className="font-serif italic text-lg sm:text-xl text-[var(--wood)] leading-relaxed">
                  {r.text}
                </blockquote>
                <figcaption className="mt-4 pt-4 border-t border-[var(--border)] text-sm text-[var(--wood-soft)]">
                  — {r.author}
                </figcaption>
              </figure>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
