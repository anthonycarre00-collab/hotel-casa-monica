'use client';
import { useEffect, useState } from 'react';
import { useLang } from '@/lib/i18n';
import { Menu, X, Globe } from 'lucide-react';
import { MacondoMode } from './MacondoMode';

const NAV_LINKS = [
  { id: 'about',    key: 'nav.about' },
  { id: 'rooms',    key: 'nav.rooms' },
  { id: 'location', key: 'nav.location' },
  { id: 'mompox',   key: 'nav.mompox' },
  { id: 'todo',     key: 'nav.todo' },
  { id: 'food',     key: 'nav.food' },
  { id: 'gallery',  key: 'nav.gallery' },
  { id: 'reviews',  key: 'nav.reviews' },
  { id: 'contact',  key: 'nav.contact' },
];

export function Nav() {
  const { t, lang, setLang } = useLang();
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const scrollTo = (id: string) => {
    setOpen(false);
    const el = document.getElementById(id);
    if (el) {
      const y = el.getBoundingClientRect().top + window.scrollY - 80;
      window.scrollTo({ top: y, behavior: 'smooth' });
    }
  };

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        scrolled
          ? 'bg-[var(--cream-50)]/95 backdrop-blur-md shadow-[0_8px_30px_-12px_rgba(61,40,23,0.25)] py-2'
          : 'bg-transparent py-4'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 flex items-center justify-between gap-4">
        {/* Logo */}
        <button
          onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
          className="flex items-center gap-3 group"
          aria-label="Hotel Casa Mónica — inicio"
        >
          <img
            src="/casa-monica-logo.png"
            alt="Logo Hotel Casa Mónica Mompox"
            className={`transition-all duration-500 ${scrolled ? 'w-10 h-10' : 'w-12 h-12'} object-contain`}
          />
          <div className="hidden sm:flex flex-col items-start leading-tight">
            <span className={`font-script ${scrolled ? 'text-2xl' : 'text-3xl'} text-[var(--terracotta-dark)] transition-all`}>
              Casa Mónica
            </span>
            <span className="text-[10px] tracking-[0.32em] uppercase text-[var(--wood-soft)] font-medium">
              Mompox · Bolívar
            </span>
          </div>
        </button>

        {/* Desktop nav */}
        <nav className="hidden lg:flex items-center gap-1">
          {NAV_LINKS.map((l) => (
            <button
              key={l.id}
              onClick={() => scrollTo(l.id)}
              className="px-3 py-2 text-sm font-medium text-[var(--wood)] hover:text-[var(--terracotta)] transition-colors relative group"
            >
              {t(l.key)}
              <span className="absolute bottom-0 left-1/2 -translate-x-1/2 w-0 h-px bg-[var(--terracotta)] group-hover:w-2/3 transition-all duration-300" />
            </button>
          ))}
        </nav>

        {/* Right: Macondo mode + language toggle + WhatsApp */}
        <div className="flex items-center gap-2">
          <div className="hidden sm:block">
            <MacondoMode />
          </div>
          <button
            onClick={() => setLang(lang === 'es' ? 'en' : 'es')}
            className="flex items-center gap-1.5 px-3 py-2 rounded-full border border-[var(--border)] hover:border-[var(--terracotta)] text-sm font-medium text-[var(--wood)] hover:text-[var(--terracotta)] transition-colors"
            aria-label="Switch language"
          >
            <Globe className="w-4 h-4" />
            <span className="uppercase tracking-wider text-xs">{lang === 'es' ? 'ES' : 'EN'}</span>
          </button>
          <button
            onClick={() => scrollTo('contact')}
            className="hidden sm:inline-flex items-center gap-2 px-4 py-2 rounded-full bg-[var(--terracotta)] hover:bg-[var(--terracotta-dark)] text-white text-sm font-medium shadow-md hover:shadow-lg transition-all"
          >
            {t('nav.contact')}
          </button>
          <button
            onClick={() => setOpen(!open)}
            className="lg:hidden p-2 text-[var(--wood)]"
            aria-label="Menu"
          >
            {open ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* Mobile nav drawer */}
      {open && (
        <div className="lg:hidden bg-[var(--cream-50)]/98 backdrop-blur-md border-t border-[var(--border)] mt-2">
          <nav className="max-w-7xl mx-auto px-4 py-4 grid grid-cols-2 gap-1">
            {NAV_LINKS.map((l) => (
              <button
                key={l.id}
                onClick={() => scrollTo(l.id)}
                className="px-3 py-3 text-left text-sm font-medium text-[var(--wood)] hover:bg-[var(--cream-100)] hover:text-[var(--terracotta)] rounded-lg transition-colors"
              >
                {t(l.key)}
              </button>
            ))}
          </nav>
          <div className="px-4 pb-4 pt-2 border-t border-[var(--border)]">
            <MacondoMode />
          </div>
        </div>
      )}
    </header>
  );
}
