'use client';
import Link from 'next/link';
import { LangProvider, useLang } from '@/lib/i18n';
import { Home, MapPin, MessageCircle } from 'lucide-react';

function NotFoundContent() {
  const { lang } = useLang();

  const eyebrow = lang === 'es'
    ? 'Esta página se perdió por la Albarrada'
    : lang === 'pt'
    ? 'Esta página se perdeu pela Albarrada'
    : lang === 'fr'
    ? 'Cette page s\'est perdue dans l\'Albarrada'
    : 'This page wandered off into the Albarrada';

  const message = lang === 'es'
    ? 'Como en Mompox, a veces uno se pierde por las calles empedradas y termina encontrando algo mejor. Volvamos al inicio.'
    : lang === 'pt'
    ? 'Como em Mompox, às vezes a gente se perde pelas ruas de paralelepípedos e acaba encontrando algo melhor. Vamos voltar ao início.'
    : lang === 'fr'
    ? 'Comme à Mompox, parfois on se perd dans les rues pavées et on trouve mieux. Revenons au début.'
    : 'Like in Mompox, sometimes you get lost on the cobblestone streets and end up finding something better. Let\'s head back.';

  const backHome = lang === 'es'
    ? 'Volver al inicio'
    : lang === 'pt'
    ? 'Voltar ao início'
    : lang === 'fr'
    ? 'Retour à l\'accueil'
    : 'Back home';

  return (
    <div className="min-h-screen bg-sunset-wash flex items-center justify-center px-4 py-20">
      <div className="max-w-lg w-full text-center">
        {/* Logo */}
        <Link href="/" className="inline-block mb-8 group">
          <img
            src="/casa-monica-logo.png"
            alt="Hotel Casa Mónica"
            className="w-20 h-20 mx-auto object-contain group-hover:scale-110 transition-transform"
          />
        </Link>

        {/* 404 with script font */}
        <div className="mb-6">
          <span className="font-script text-7xl sm:text-8xl text-[var(--terracotta-dark)]">404</span>
        </div>

        {/* Filigree divider */}
        <div className="flex items-center justify-center gap-3 mb-6">
          <span className="h-px w-12 bg-[var(--gold)]" />
          <span className="text-[var(--gold)] text-xs">★</span>
          <span className="h-px w-12 bg-[var(--gold)]" />
        </div>

        {/* Eyebrow */}
        <p className="text-xs uppercase tracking-[0.3em] text-[var(--terracotta)] font-medium mb-3">
          {eyebrow}
        </p>

        {/* Message */}
        <p className="font-serif text-lg sm:text-xl text-[var(--wood)] leading-relaxed mb-8 italic">
          {message}
        </p>

        {/* CTAs */}
        <div className="flex flex-wrap gap-3 justify-center">
          <Link
            href="/"
            className="inline-flex items-center gap-2 px-6 py-3 bg-[var(--terracotta)] hover:bg-[var(--terracotta-dark)] text-white rounded-full font-medium shadow-lg hover:shadow-xl hover:-translate-y-0.5 transition-all"
          >
            <Home className="w-4 h-4" />
            {backHome}
          </Link>
          <a
            href="https://wa.me/573003100299"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-6 py-3 bg-[#25D366] hover:bg-[#1da851] text-white rounded-full font-medium shadow-lg hover:shadow-xl hover:-translate-y-0.5 transition-all"
          >
            <MessageCircle className="w-4 h-4" />
            WhatsApp
          </a>
        </div>

        {/* Address footnote */}
        <div className="mt-10 pt-6 border-t border-[var(--border)] flex items-center justify-center gap-2 text-xs text-[var(--wood-soft)]">
          <MapPin className="w-3 h-3" />
          <span>Calle 14 #2 74, Santa Cruz de Mompox, Bolívar</span>
        </div>
      </div>
    </div>
  );
}

export default function NotFound() {
  return (
    <LangProvider>
      <NotFoundContent />
    </LangProvider>
  );
}
