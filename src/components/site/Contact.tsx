'use client';
import { useLang, whatsappLink } from '@/lib/i18n';
import { Reveal, FiligreeDivider, Eyebrow } from './Reveal';
import { MessageCircle, Instagram, MapPin, ExternalLink, Phone } from 'lucide-react';

export function Contact() {
  const { t, lang } = useLang();

  return (
    <section id="contact" className="relative py-20 sm:py-28 overflow-hidden">
      <div className="absolute inset-0 z-0 overflow-hidden">
        <img
          src="/mompox-night.png"
          alt="Calle colonial de Mompox de noche"
          className="w-full h-full object-cover animate-boat-drift"
          onError={(e) => ((e.target as HTMLImageElement).style.display = 'none')}
        />
        <div className="absolute inset-0 bg-[var(--wood)]/92" />
      </div>

      <div className="relative z-10 max-w-5xl mx-auto px-4 sm:px-6 text-[var(--cream-100)]">
        <Reveal className="text-center">
          <Eyebrow>
            <span className="text-[var(--gold-soft)]">{t('contact.eyebrow')}</span>
          </Eyebrow>
          <h2 className="font-serif text-4xl sm:text-5xl text-white leading-tight max-w-3xl mx-auto">
            {t('contact.title')}
          </h2>
          <p className="mt-4 text-[var(--cream-100)]/85 max-w-2xl mx-auto text-base sm:text-lg leading-relaxed">
            {t('contact.subtitle')}
          </p>
          <FiligreeDivider />
        </Reveal>

        {/* Big WhatsApp CTA */}
        <Reveal className="mt-8">
          <a
            href={whatsappLink(lang)}
            target="_blank"
            rel="noopener noreferrer"
            className="group flex flex-col sm:flex-row items-center justify-center gap-4 sm:gap-6 px-6 sm:px-10 py-6 sm:py-8 bg-[#25D366] hover:bg-[#1da851] text-white rounded-2xl shadow-2xl hover:-translate-y-1 transition-all max-w-3xl mx-auto"
          >
            <div className="w-16 h-16 rounded-full bg-white/20 flex items-center justify-center group-hover:scale-110 transition-transform">
              <MessageCircle className="w-8 h-8" />
            </div>
            <div className="text-center sm:text-left">
              <div className="text-xs uppercase tracking-[0.25em] text-white/80 mb-1">
                {lang === 'es' ? 'Reserva directa' : 'Direct booking'}
              </div>
              <div className="font-serif text-2xl sm:text-3xl">{t('contact.whatsapp')}</div>
              <div className="text-sm text-white/85 mt-1">{t('contact.cta')}</div>
            </div>
          </a>
        </Reveal>

        {/* Contact methods grid */}
        <Reveal className="mt-8">
          <div className="grid sm:grid-cols-3 gap-4 max-w-3xl mx-auto">
            <a
              href="https://www.instagram.com/casamonicamompox/"
              target="_blank"
              rel="noopener noreferrer"
              className="flex flex-col items-center gap-2 p-5 rounded-xl bg-white/5 border border-white/10 hover:bg-white/10 transition-colors text-center"
            >
              <Instagram className="w-6 h-6 text-[var(--gold-soft)]" />
              <div className="text-sm font-medium">@casamonicamompox</div>
              <div className="text-xs text-[var(--cream-100)]/60">Instagram</div>
            </a>

            <a
              href="https://hotelesbeijing.com.co/hotel/hotel-casa-monica/"
              target="_blank"
              rel="noopener noreferrer"
              className="flex flex-col items-center gap-2 p-5 rounded-xl bg-white/5 border border-white/10 hover:bg-white/10 transition-colors text-center"
            >
              <ExternalLink className="w-6 h-6 text-[var(--gold-soft)]" />
              <div className="text-sm font-medium">hotelesbeijing.com.co</div>
              <div className="text-xs text-[var(--cream-100)]/60">{t('contact.directory')}</div>
            </a>

            <div className="flex flex-col items-center gap-2 p-5 rounded-xl bg-white/5 border border-white/10 text-center">
              <MapPin className="w-6 h-6 text-[var(--gold-soft)]" />
              <div className="text-sm font-medium leading-tight">
                Calle 14 #2 74<br />Santa Cruz de Mompox
              </div>
              <div className="text-xs text-[var(--cream-100)]/60">Bolívar, Colombia</div>
            </div>
          </div>
        </Reveal>

        {/* Phone */}
        <Reveal className="mt-6 text-center">
          <a
            href="tel:+573003100299"
            className="inline-flex items-center gap-2 text-[var(--gold-soft)] hover:text-white transition-colors"
          >
            <Phone className="w-4 h-4" />
            <span className="font-serif text-lg">+57 300 310 0299</span>
          </a>
        </Reveal>
      </div>
    </section>
  );
}
