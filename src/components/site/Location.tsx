'use client';
import { useLang } from '@/lib/i18n';
import { Reveal, FiligreeDivider, Eyebrow } from './Reveal';
import { MapPin, ExternalLink, Navigation } from 'lucide-react';

export function Location() {
  const { t, lang } = useLang();

  const mapsLink = 'https://www.google.com/maps/search/?api=1&query=Hotel+Casa+M%C3%B3nica+Calle+14+%232-74+Mompox+Bol%C3%ADvar+Colombia';
  const embedSrc = 'https://www.google.com/maps?q=Calle+14+%232-74,+Santa+Cruz+de+Mompox,+Bol%C3%ADvar,+Colombia&output=embed';

  return (
    <section id="location" className="bg-cal py-20 sm:py-28">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <Reveal className="text-center">
          <Eyebrow>{t('location.eyebrow')}</Eyebrow>
          <h2 className="font-serif text-4xl sm:text-5xl text-[var(--wood)] leading-tight max-w-4xl mx-auto">
            {t('location.title')}
          </h2>
          <FiligreeDivider />
        </Reveal>

        <div className="grid lg:grid-cols-5 gap-8 lg:gap-12 items-stretch">
          {/* Map */}
          <Reveal className="lg:col-span-3">
            <div className="relative rounded-2xl overflow-hidden shadow-xl border-4 border-white h-[400px] lg:h-full min-h-[400px]">
              <iframe
                title="Mapa — Hotel Casa Mónica, Mompox"
                src={embedSrc}
                className="w-full h-full"
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                allowFullScreen
              />
            </div>
          </Reveal>

          {/* Address card */}
          <Reveal delay={120} className="lg:col-span-2">
            <div className="bg-[var(--wood)] text-[var(--cream-100)] rounded-2xl p-6 sm:p-8 h-full flex flex-col justify-between">
              <div>
                <div className="w-14 h-14 rounded-full bg-[var(--terracotta)]/30 flex items-center justify-center mb-5">
                  <MapPin className="w-6 h-6 text-[var(--gold-soft)]" />
                </div>
                <h3 className="font-serif text-2xl text-[var(--gold-soft)] mb-3">
                  {lang === 'es' ? 'Dirección' : 'Address'}
                </h3>
                <p className="text-lg leading-relaxed mb-5">
                  {t('location.address')}
                </p>
                <div className="pt-5 border-t border-white/15">
                  <p className="text-sm text-[var(--cream-100)]/80 leading-relaxed italic">
                    {t('location.direction')}
                  </p>
                </div>
              </div>

              <a
                href={mapsLink}
                target="_blank"
                rel="noopener noreferrer"
                className="mt-6 inline-flex items-center justify-center gap-2 px-5 py-3 bg-[var(--terracotta)] hover:bg-[var(--terracotta-dark)] text-white rounded-full font-medium transition-colors"
              >
                <Navigation className="w-4 h-4" />
                {t('location.cta')}
                <ExternalLink className="w-3.5 h-3.5 opacity-70" />
              </a>
            </div>
          </Reveal>
        </div>

        {/* Walking-distance strip */}
        <Reveal className="mt-8">
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
            {[
              { es: 'Iglesia de Santa Bárbara', en: 'Church of Santa Bárbara', dist: '1 min' },
              { es: 'La Albarrada (río)',        en: 'La Albarrada (river)',     dist: '3 min' },
              { es: 'Plaza Bolívar',             en: 'Bolívar Plaza',            dist: '5 min' },
              { es: 'Iglesia de la Inmaculada',  en: 'Inmaculada Church',        dist: '6 min' },
            ].map((p, i) => (
              <div key={i} className="bg-white rounded-xl p-4 border border-[var(--border)] text-center">
                <div className="text-[var(--terracotta)] font-serif text-lg">{p.dist}</div>
                <div className="text-xs text-[var(--wood-soft)] mt-1">{lang === 'es' ? p.es : p.en}</div>
              </div>
            ))}
          </div>
        </Reveal>
      </div>
    </section>
  );
}
