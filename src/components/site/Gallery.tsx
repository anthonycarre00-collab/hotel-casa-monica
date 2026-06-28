'use client';
import { useState } from 'react';
import { useLang } from '@/lib/i18n';
import { Reveal, FiligreeDivider, Eyebrow } from './Reveal';
import { X, ChevronLeft, ChevronRight } from 'lucide-react';

type Img = { src: string; captionEs: string; captionEn: string };

const GALLERY: Img[] = [
  { src: '/magdalena-sunset.png',     captionEs: 'Atardecer sobre el río Magdalena',         captionEn: 'Sunset over the Magdalena River' },
  { src: '/mompox-street.png',         captionEs: 'Calle colonial al amanecer',               captionEn: 'Colonial street at dawn' },
  { src: '/santa-barbara-tower.png',   captionEs: 'Torre barroca de Santa Bárbara',           captionEn: 'Baroque tower of Santa Bárbara' },
  { src: '/ceiba-tree.png',            captionEs: 'Ceiba centenaria en la plaza',             captionEn: 'Centennial ceiba in the plaza' },
  { src: '/filigree-artisan.png',      captionEs: 'Manos tejiendo filigrana',                 captionEn: 'Hands weaving filigree' },
  { src: '/momposina-food.png',        captionEs: 'Mesa de sabores momposinos',               captionEn: 'Table of momposino flavours' },
  { src: '/cienaga-pijino.png',        captionEs: 'Ciénaga de Pijiño al amanecer',            captionEn: 'Ciénaga de Pijiño at dawn' },
  { src: '/champan-boat.png',          captionEs: 'Champán en el Magdalena',                  captionEn: 'Champán on the Magdalena' },
  { src: '/corozo-fruit.png',          captionEs: 'Corozo, fruto del Caribe',                 captionEn: 'Corozo, fruit of the Caribbean' },
  { src: '/rocking-chair-porch.png',   captionEs: 'Mecedoras momposinas',                     captionEn: 'Momposino rocking chairs' },
  { src: '/mompox-night.png',          captionEs: 'Mompox de noche',                          captionEn: 'Mompox at night' },
  { src: '/mompox-church.png',         captionEs: 'Iglesia colonial amarilla',                captionEn: 'Yellow colonial church' },
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
                  onError={(e) => ((e.target as HTMLImageElement).style.opacity = '0.3')}
                />
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
