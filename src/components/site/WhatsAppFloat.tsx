'use client';
import { useEffect, useState } from 'react';
import { useLang, whatsappLink } from '@/lib/i18n';
import { MessageCircle, X } from 'lucide-react';

export function WhatsAppFloat() {
  const { lang } = useLang();
  const [show, setShow] = useState(false);
  const [bubble, setBubble] = useState(false);

  useEffect(() => {
    const onScroll = () => {
      setShow(window.scrollY > 400);
    };
    window.addEventListener('scroll', onScroll, { passive: true });
    onScroll();
    // Show bubble after 6 seconds, then hide after 8 more
    const t1 = setTimeout(() => setBubble(true), 6000);
    const t2 = setTimeout(() => setBubble(false), 14000);
    return () => {
      window.removeEventListener('scroll', onScroll);
      clearTimeout(t1);
      clearTimeout(t2);
    };
  }, []);

  return (
    <div
      className={`fixed bottom-5 right-5 z-50 transition-all duration-500 ${
        show ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10 pointer-events-none'
      }`}
    >
      {/* Bubble */}
      {bubble && (
        <div className="absolute bottom-16 right-0 mb-2 max-w-[240px] bg-white rounded-2xl shadow-2xl p-4 pr-8 border border-[var(--border)] animate-gentle-float">
          <button
            onClick={() => setBubble(false)}
            className="absolute top-2 right-2 text-[var(--wood-soft)] hover:text-[var(--wood)]"
            aria-label="Close"
          >
            <X className="w-3.5 h-3.5" />
          </button>
          <div className="flex items-start gap-2">
            <div className="w-8 h-8 rounded-full bg-[#25D366] flex items-center justify-center flex-shrink-0">
              <MessageCircle className="w-4 h-4 text-white" />
            </div>
            <div>
              <div className="font-serif text-sm text-[var(--wood)]">
                {lang === 'es' ? '¿Planeas venir a Mompox?' : 'Planning to visit Mompox?'}
              </div>
              <div className="text-xs text-[var(--wood-soft)] mt-1">
                {lang === 'es'
                  ? 'Escríbenos por WhatsApp y te ayudamos a organizar tu estadía.'
                  : 'Message us on WhatsApp and we will help you plan your stay.'}
              </div>
            </div>
          </div>
          <span className="absolute -bottom-1.5 right-6 w-3 h-3 bg-white border-r border-b border-[var(--border)] rotate-45" />
        </div>
      )}

      {/* Button */}
      <a
        href={whatsappLink(lang)}
        target="_blank"
        rel="noopener noreferrer"
        className="flex items-center justify-center w-14 h-14 sm:w-16 sm:h-16 rounded-full bg-[#25D366] hover:bg-[#1da851] text-white shadow-2xl hover:scale-110 transition-all"
        aria-label="Chat on WhatsApp"
      >
        <MessageCircle className="w-7 h-7 sm:w-8 sm:h-8" />
        <span className="absolute top-0 right-0 w-3 h-3 bg-[var(--brick)] rounded-full border-2 border-white animate-pulse" />
      </a>
    </div>
  );
}
