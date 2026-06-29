'use client';
import { useLang } from '@/lib/i18n';
import { Reveal, FiligreeDivider, Eyebrow } from './Reveal';
import { Instagram, ExternalLink, Heart, MessageCircle } from 'lucide-react';

export function InstagramFeed() {
  const { t, lang } = useLang();

  // Instagram handle — links to their public profile
  const INSTAGRAM_HANDLE = 'casamonicamompox';
  const INSTAGRAM_URL = `https://www.instagram.com/${INSTAGRAM_HANDLE}/`;
  const INSTAGRAM_REELS_URL = `https://www.instagram.com/${INSTAGRAM_HANDLE}/reels/`;

  return (
    <section id="instagram" className="bg-sunset-wash py-20 sm:py-28">
      <div className="max-w-5xl mx-auto px-4 sm:px-6">
        <Reveal className="text-center">
          <Eyebrow>
            <span className="flex items-center justify-center gap-2">
              <Instagram className="w-3.5 h-3.5" />
              Instagram
            </span>
          </Eyebrow>
          <h2 className="font-serif text-4xl sm:text-5xl text-[var(--wood)] leading-tight">
            {t('instagram.title')}
          </h2>
          <p className="mt-3 text-[var(--wood-soft)] text-base sm:text-lg max-w-2xl mx-auto">
            {t('instagram.subtitle')}
          </p>
          <FiligreeDivider />
        </Reveal>

        {/* Profile card + CTA */}
        <Reveal delay={120} className="mt-8 max-w-2xl mx-auto">
          <div className="bg-gradient-to-br from-[var(--wood)] to-[#2A1F12] text-[var(--cream-100)] rounded-2xl p-6 sm:p-8 shadow-xl">
            <div className="flex flex-col sm:flex-row items-center gap-5">
              {/* Profile "avatar" — uses the Casa Mónica logo */}
              <div className="w-20 h-20 sm:w-24 sm:h-24 rounded-full bg-white p-1.5 flex-shrink-0">
                <img
                  src="/casa-monica-logo.png"
                  alt="Casa Mónica logo"
                  className="w-full h-full object-contain rounded-full"
                />
              </div>

              {/* Profile info */}
              <div className="flex-1 text-center sm:text-left">
                <div className="flex items-center justify-center sm:justify-start gap-2 mb-1">
                  <span className="font-serif text-xl sm:text-2xl text-white">
                    @{INSTAGRAM_HANDLE}
                  </span>
                  <span className="px-2 py-0.5 rounded-full bg-[var(--terracotta)] text-white text-[10px] uppercase tracking-wider font-medium">
                    {lang === 'es' ? 'Oficial' : 'Official'}
                  </span>
                </div>
                <p className="text-sm text-[var(--cream-100)]/80 mb-4">
                  {lang === 'es'
                    ? 'Vida diaria en Casa Mónica, atardeceres del Magdalena, festival de jazz, Semana Santa, y los momentos de Fredy y Mónica.'
                    : 'Daily life at Casa Mónica, Magdalena sunsets, jazz festival, Holy Week, and moments with Fredy and Mónica.'}
                </p>

                {/* Stats */}
                <div className="flex justify-center sm:justify-start gap-6 text-center mb-4">
                  <div>
                    <div className="font-serif text-lg text-[var(--gold-soft)]">★</div>
                    <div className="text-[10px] uppercase tracking-wider text-[var(--cream-100)]/60">
                      {lang === 'es' ? 'Publicaciones' : 'Posts'}
                    </div>
                  </div>
                  <div>
                    <div className="font-serif text-lg text-[var(--gold-soft)]">▶</div>
                    <div className="text-[10px] uppercase tracking-wider text-[var(--cream-100)]/60">
                      {lang === 'es' ? 'Reels' : 'Reels'}
                    </div>
                  </div>
                  <div>
                    <div className="font-serif text-lg text-[var(--gold-soft)]">♥</div>
                    <div className="text-[10px] uppercase tracking-wider text-[var(--cream-100)]/60">
                      {lang === 'es' ? 'Historias' : 'Stories'}
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* CTAs */}
            <div className="flex flex-wrap gap-3 justify-center mt-4 pt-4 border-t border-white/10">
              <a
                href={INSTAGRAM_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-5 py-2.5 bg-gradient-to-r from-[#E1306C] to-[#F77737] text-white rounded-full font-medium text-sm shadow-md hover:shadow-lg hover:-translate-y-0.5 transition-all"
              >
                <Instagram className="w-4 h-4" />
                {t('instagram.follow')}
                <ExternalLink className="w-3 h-3 opacity-70" />
              </a>
              <a
                href={INSTAGRAM_REELS_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-5 py-2.5 bg-white/10 hover:bg-white/20 backdrop-blur-sm border border-white/20 text-white rounded-full font-medium text-sm transition-all"
              >
                <span className="text-sm">▶</span>
                {lang === 'es' ? 'Ver reels' : 'Watch reels'}
              </a>
            </div>
          </div>
        </Reveal>

        {/* Embed note */}
        <Reveal className="mt-6 text-center">
          <p className="text-xs text-[var(--wood-soft)] italic max-w-md mx-auto">
            {lang === 'es'
              ? 'Las fotos y videos más recientes se ven directo en Instagram — hacemos tap para no perdernos nada.'
              : 'The latest photos and videos are on Instagram directly — we tap through so we don\'t miss anything.'}
          </p>
        </Reveal>

        {/* Decorative IG-style grid (using existing gallery images as a teaser) */}
        <Reveal className="mt-8">
          <div className="grid grid-cols-3 gap-2 max-w-md mx-auto">
            {[
              { src: '/owners-couple.jpg', alt: 'Fredy & Mónica' },
              { src: '/mompox-river-sunset-real.jpg', alt: 'River sunset' },
              { src: '/mompox-santa-barbara-night.jpg', alt: 'Santa Bárbara at night' },
              { src: '/mompox-street-banners.jpg', alt: 'Colonial street' },
              { src: '/hotel-patio-evening.jpg', alt: 'Evening patio' },
              { src: '/mompox-drone-1.jpg', alt: 'Drone view' },
            ].map((img, i) => (
              <a
                key={i}
                href={INSTAGRAM_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="aspect-square rounded-lg overflow-hidden group relative"
              >
                <img
                  src={img.src}
                  alt={img.alt}
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                  loading="lazy"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#E1306C]/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity flex items-end justify-center p-2">
                  <Instagram className="w-5 h-5 text-white" />
                </div>
              </a>
            ))}
          </div>
        </Reveal>
      </div>
    </section>
  );
}
