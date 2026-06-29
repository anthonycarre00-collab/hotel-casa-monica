'use client';
import { useState } from 'react';
import { useLang } from '@/lib/i18n';
import { Reveal, FiligreeDivider, Eyebrow } from './Reveal';
import { X, ChevronLeft, ChevronRight, Camera } from 'lucide-react';

type Img = { src: string; captionEs: string; captionEn: string; real?: boolean };

// Gallery now prioritizes REAL uploaded images (marked real:true) over AI-generated ones.
// Real images are: drone views, river, churches, streets, evening patio, couple shots.
// AI images kept for variety where no real equivalent exists (filigree, food, cienaga).
const GALLERY: Img[] = [
  // --- Real photos first (the authentic Mompox) ---
  { src: '/mompox-river-sunset-real.jpg',  captionEs: 'Atardecer sobre el río Magdalena con barca',  captionEn: 'Sunset over the Magdalena River with a boat',     real: true },
  { src: '/mompox-patio-sunset-real.jpg',  captionEs: 'Atardecer desde el patio — arco de flores',  captionEn: 'Sunset from the patio — floral arch',             real: true },
  { src: '/owners-couple.jpg',             captionEs: 'Fredy & Mónica en la puerta de Casa Mónica',  captionEn: 'Fredy & Mónica at the door of Casa Mónica',     real: true },
  { src: '/mompox-plaza-real.jpg',         captionEs: 'Plaza colonial de Mompox',                     captionEn: 'Colonial plaza in Mompox',                      real: true },
  { src: '/mompox-drone-1.jpg',            captionEs: 'Mompox desde el aire — vista de dron',         captionEn: 'Mompox from above — drone view',              real: true },
  { src: '/mompox-river-colonial.jpg',     captionEs: 'Edificio colonial junto al río Magdalena',     captionEn: 'Colonial building by the Magdalena River',    real: true },
  { src: '/hotel-patio-evening.jpg',       captionEs: 'Atardecer en el patio — luces y mesas',        captionEn: 'Evening on the patio — lights and tables',    real: true },
  { src: '/mompox-santa-barbara-night.jpg', captionEs: 'Iglesia de Santa Bárbara iluminada de noche', captionEn: 'Church of Santa Bárbara lit up at night',   real: true },
  { src: '/mompox-church-red.jpg',         captionEs: 'Iglesia colonial roja en la plaza',            captionEn: 'Red colonial church in the plaza',            real: true },
  { src: '/mompox-street-colonial.jpg',    captionEs: 'Calle colonial de Mompox',                     captionEn: 'Colonial street in Mompox',                   real: true },
  { src: '/mompox-drone-2.jpg',            captionEs: 'Otra vista aérea del centro histórico',        captionEn: 'Another aerial view of the historic centre',  real: true },
  { src: '/owners-arch.jpg',               captionEs: 'Bajo el arco de flores de Casa Mónica',        captionEn: 'Under the floral arch at Casa Mónica',        real: true },
  { src: '/mompox-street-banners.jpg',       captionEs: 'Calle de Mompox con banderines de colores',  captionEn: 'Mompox street with colorful pennant banners',  real: true },
  // --- AI-generated atmospheric images (kept for variety) ---
  { src: '/filigree-artisan.png',        captionEs: 'Manos tejiendo filigrana momposina',           captionEn: 'Hands weaving momposino filigree' },
  { src: '/momposina-food.png',          captionEs: 'Mesa de sabores momposinos',                   captionEn: 'Table of momposino flavours' },
  { src: '/cienaga-pijino.png',          captionEs: 'Ciénaga de Pijiño al amanecer',                captionEn: 'Ciénaga de Pijiño at dawn' },
];

export function Gallery() {
  const { t, lang } = useLang();
  const [lightbox, setLightbox] = useState<number | null>(null);

  const open = (i: number) => setLightbox(i);
  const close = () => setLightbox(null);
  const prev = () => setLightbox((i) => (i === null ? null : (i - 1 + GALLERY.length) % GALLERY.length));
  const next = () => setLightbox((i) => (i === null ? null : (i + 1) % GALLERY.length));

  return (
    <section id="gallery" className="bg-sunset-wash py-20 sm:py-28">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <Reveal className="text-center">
          <Eyebrow>{t('gallery.eyebrow')}</Eyebrow>
          <h2 className="font-serif text-4xl sm:text-5xl text-[var(--wood)] leading-tight">
            {t('gallery.title')}
          </h2>
          <p className="mt-3 text-sm text-[var(--wood-soft)] flex items-center justify-center gap-2">
            <Camera className="w-4 h-4" />
            {lang === 'es'
              ? 'Fotos reales de Mompox y Casa Mónica'
              : 'Real photos of Mompox and Casa Mónica'}
          </p>
          <FiligreeDivider />
        </Reveal>

        {/* Masonry-like grid using column-count */}
        <div className="columns-2 md:columns-3 lg:columns-4 gap-3 [column-fill:_balance]">
          {GALLERY.map((img, i) => (
            <Reveal
              key={i}
              delay={(i % 4) * 60}
              className="mb-3 break-inside-avoid"
            >
              <button
                onClick={() => open(i)}
                className="block w-full rounded-xl overflow-hidden shadow-md hover:shadow-xl transition-all group relative"
              >
                <img
                  src={img.src}
                  alt={lang === 'es' ? img.captionEs : img.captionEn}
                  className="w-full h-auto object-cover group-hover:scale-105 transition-transform duration-500"
                  loading="lazy"
                />
                {/* "Real" badge for authentic photos */}
                {img.real && (
                  <div className="absolute top-2 left-2 px-2 py-0.5 rounded-full bg-[var(--terracotta)] text-white text-[9px] tracking-wider uppercase font-medium shadow">
                    {lang === 'es' ? 'Real' : 'Real'}
                  </div>
                )}
                <div className="absolute inset-0 bg-gradient-to-t from-[var(--wood)]/70 to-transparent opacity-0 group-hover:opacity-100 transition-opacity flex items-end p-3">
                  <p className="text-white text-xs font-medium leading-tight">
                    {lang === 'es' ? img.captionEs : img.captionEn}
                  </p>
                </div>
              </button>
            </Reveal>
          ))}
        </div>
      </div>

      {/* Lightbox */}
      {lightbox !== null && (
        <div
          className="fixed inset-0 z-[100] bg-[var(--wood)]/95 backdrop-blur-md flex items-center justify-center p-4 sm:p-8"
          onClick={close}
        >
          <button
            onClick={close}
            className="absolute top-4 right-4 w-12 h-12 rounded-full bg-white/10 hover:bg-white/20 text-white flex items-center justify-center transition-colors"
            aria-label="Close"
          >
            <X className="w-6 h-6" />
          </button>

          <button
            onClick={(e) => { e.stopPropagation(); prev(); }}
            className="absolute left-2 sm:left-6 top-1/2 -translate-y-1/2 w-12 h-12 rounded-full bg-white/10 hover:bg-white/20 text-white flex items-center justify-center transition-colors"
            aria-label="Previous"
          >
            <ChevronLeft className="w-6 h-6" />
          </button>

          <button
            onClick={(e) => { e.stopPropagation(); next(); }}
            className="absolute right-2 sm:right-6 top-1/2 -translate-y-1/2 w-12 h-12 rounded-full bg-white/10 hover:bg-white/20 text-white flex items-center justify-center transition-colors"
            aria-label="Next"
          >
            <ChevronRight className="w-6 h-6" />
          </button>

          <figure className="max-w-5xl w-full" onClick={(e) => e.stopPropagation()}>
            <img
              src={GALLERY[lightbox].src}
              alt={lang === 'es' ? GALLERY[lightbox].captionEs : GALLERY[lightbox].captionEn}
              className="w-full max-h-[80vh] object-contain rounded-lg shadow-2xl"
            />
            <figcaption className="text-center mt-4 text-[var(--cream-100)] font-serif italic">
              {lang === 'es' ? GALLERY[lightbox].captionEs : GALLERY[lightbox].captionEn}
            </figcaption>
          </figure>
        </div>
      )}
    </section>
  );
}
