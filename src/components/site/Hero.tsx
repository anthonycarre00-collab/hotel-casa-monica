'use client';
import { useLang, whatsappLink } from '@/lib/i18n';
import { MessageCircle, ChevronDown } from 'lucide-react';

export function Hero() {
  const { t, lang } = useLang();

  const scrollTo = (id: string) => {
    const el = document.getElementById(id);
    if (el) {
      const y = el.getBoundingClientRect().top + window.scrollY - 80;
      window.scrollTo({ top: y, behavior: 'smooth' });
    }
  };

  return (
    <section className="relative min-h-[100svh] flex items-end overflow-hidden">
      {/* Background image with Ken Burns + window-zoom on first paint */}
      <div className="absolute inset-0 z-0 overflow-hidden">
        <img
          src="/magdalena-sunset.png"
          alt="Atardecer sobre el río Magdalena en Mompox"
          className="w-full h-full object-cover animate-window-zoom animate-ken-burns"
          onError={(e) => {
            // Fallback to hotel-exterior-day if magdalena-sunset hasn't generated yet
            (e.target as HTMLImageElement).src = '/hotel-exterior-day.png';
          }}
        />
        {/* Layered gradient — warm dusk wash + readability */}
        <div className="absolute inset-0 bg-gradient-to-t from-[#2A1F12]/95 via-[#2A1F12]/50 to-[#2A1F12]/20" />
        <div className="absolute inset-0 bg-gradient-to-r from-[#2A1F12]/70 via-transparent to-transparent" />
      </div>

      {/* Content */}
      <div className="relative z-10 w-full max-w-7xl mx-auto px-4 sm:px-6 pb-16 sm:pb-24 pt-32">
        <div className="max-w-3xl">
          <div className="flex items-center gap-3 mb-5">
            <span className="h-px w-12 bg-[var(--gold)]" />
            <span className="text-[var(--gold-soft)] text-xs sm:text-sm tracking-[0.25em] uppercase font-medium">
              {t('hero.eyebrow')}
            </span>
          </div>

          <h1 className="font-serif text-white text-5xl sm:text-6xl lg:text-7xl leading-[0.95] font-semibold mb-2">
            {t('hero.title1')}{' '}
            <span className="font-script text-[var(--gold-soft)] font-normal text-6xl sm:text-7xl lg:text-8xl block sm:inline">
              {t('hero.title2')}
            </span>
          </h1>

          <p className="text-[var(--cream-100)]/90 text-base sm:text-lg leading-relaxed mt-6 max-w-2xl">
            {t('hero.subtitle')}
          </p>

          <div className="mt-8 flex flex-wrap gap-3">
            <a
              href={whatsappLink(lang)}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2.5 px-6 py-3.5 bg-[#25D366] hover:bg-[#1da851] text-white rounded-full font-medium shadow-lg hover:shadow-xl hover:-translate-y-0.5 transition-all"
            >
              <MessageCircle className="w-5 h-5" />
              {t('hero.cta.book')}
            </a>
            <button
              onClick={() => scrollTo('about')}
              className="inline-flex items-center gap-2.5 px-6 py-3.5 bg-white/10 hover:bg-white/20 backdrop-blur-md border border-white/30 text-white rounded-full font-medium transition-all"
            >
              {t('hero.cta.explore')}
              <ChevronDown className="w-4 h-4" />
            </button>
          </div>

          {/* Rating badge */}
          <div className="mt-8 flex items-center gap-4 text-white/80 text-sm">
            <div className="flex items-center gap-2">
              <span className="text-[var(--gold-soft)] font-bold text-base">9.2</span>
              <span className="text-xs">/ 10</span>
            </div>
            <span className="h-4 w-px bg-white/30" />
            <span>55 {lang === 'es' ? 'reseñas' : 'reviews'}</span>
            <span className="h-4 w-px bg-white/30" />
            <span>·</span>
            <span className="text-[var(--gold-soft)]">★★★★★</span>
          </div>
        </div>
      </div>

      {/* Scroll hint */}
      <div className="absolute bottom-4 left-1/2 -translate-x-1/2 z-10 hidden sm:flex flex-col items-center text-white/60 animate-gentle-float">
        <span className="text-[10px] tracking-[0.3em] uppercase mb-1">Scroll</span>
        <ChevronDown className="w-4 h-4" />
      </div>
    </section>
  );
}
