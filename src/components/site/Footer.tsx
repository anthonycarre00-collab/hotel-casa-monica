'use client';
import { useLang, whatsappLink } from '@/lib/i18n';
import { MessageCircle, Instagram, MapPin, Heart } from 'lucide-react';

export function Footer() {
  const { t, lang } = useLang();

  const scrollTo = (id: string) => {
    const el = document.getElementById(id);
    if (el) {
      const y = el.getBoundingClientRect().top + window.scrollY - 80;
      window.scrollTo({ top: y, behavior: 'smooth' });
    }
  };

  return (
    <footer className="bg-[var(--wood)] text-[var(--cream-100)] mt-auto">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-12 sm:py-16">
        <div className="grid md:grid-cols-4 gap-8 lg:gap-12">
          {/* Brand */}
          <div className="md:col-span-2">
            <div className="flex items-center gap-3 mb-4">
              <img
                src="/casa-monica-logo.png"
                alt="Logo Casa Mónica"
                className="w-12 h-12 object-contain bg-white/5 rounded-full p-1"
              />
              <div>
                <div className="font-script text-3xl text-[var(--gold-soft)]">Casa Mónica</div>
                <div className="text-[10px] tracking-[0.3em] uppercase text-[var(--cream-100)]/60">
                  Mompox · Bolívar · Colombia
                </div>
              </div>
            </div>
            <p className="text-[var(--cream-100)]/80 text-sm leading-relaxed max-w-md">
              {t('footer.tagline')}
            </p>

            <div className="flex flex-wrap gap-2 mt-5">
              <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-white/5 border border-white/10 text-xs">
                <span className="w-2 h-2 rounded-full bg-[var(--gold)]" />
                {t('footer.unesco')}
              </span>
              <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-white/5 border border-white/10 text-xs">
                <span className="w-2 h-2 rounded-full bg-[var(--terracotta)]" />
                {t('footer.valerosa')}
              </span>
            </div>
          </div>

          {/* Quick links */}
          <div>
            <h4 className="font-serif text-[var(--gold-soft)] text-lg mb-4">
              {lang === 'es' ? 'Secciones' : 'Sections'}
            </h4>
            <ul className="space-y-2 text-sm">
              {[
                { id: 'about', k: 'nav.about' },
                { id: 'rooms', k: 'nav.rooms' },
                { id: 'mompox', k: 'nav.mompox' },
                { id: 'todo', k: 'nav.todo' },
                { id: 'gallery', k: 'nav.gallery' },
                { id: 'contact', k: 'nav.contact' },
              ].map((l) => (
                <li key={l.id}>
                  <button
                    onClick={() => scrollTo(l.id)}
                    className="text-[var(--cream-100)]/75 hover:text-[var(--gold-soft)] transition-colors"
                  >
                    {t(l.k)}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="font-serif text-[var(--gold-soft)] text-lg mb-4">
              {lang === 'es' ? 'Contacto' : 'Contact'}
            </h4>
            <ul className="space-y-3 text-sm">
              <li>
                <a
                  href={whatsappLink(lang)}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-start gap-2.5 text-[var(--cream-100)]/80 hover:text-[var(--gold-soft)] transition-colors"
                >
                  <MessageCircle className="w-4 h-4 mt-0.5 flex-shrink-0 text-[#25D366]" />
                  <span>+57 300 310 0299</span>
                </a>
              </li>
              <li>
                <a
                  href="https://www.instagram.com/casamonicamompox/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-start gap-2.5 text-[var(--cream-100)]/80 hover:text-[var(--gold-soft)] transition-colors"
                >
                  <Instagram className="w-4 h-4 mt-0.5 flex-shrink-0 text-[var(--terracotta)]" />
                  <span>@casamonicamompox</span>
                </a>
              </li>
              <li className="flex items-start gap-2.5 text-[var(--cream-100)]/80">
                <MapPin className="w-4 h-4 mt-0.5 flex-shrink-0 text-[var(--gold-soft)]" />
                <span>Calle 14 #2 74, Santa Cruz de Mompox, Bolívar</span>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="mt-10 pt-6 border-t border-white/10 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-[var(--cream-100)]/60">
          <div>© {new Date().getFullYear()} {t('footer.rights')}</div>
          <div className="flex items-center gap-1.5">
            <span>{t('footer.built')}</span>
            <Heart className="w-3 h-3 text-[var(--terracotta)] fill-current" />
          </div>
        </div>
      </div>
    </footer>
  );
}
