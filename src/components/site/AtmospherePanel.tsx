'use client';
import { useState } from 'react';
import { useLang } from '@/lib/i18n';
import { MompoxWeather } from './MompoxWeather';
import { AmbientSound } from './AmbientSound';
import { Cloud, X } from 'lucide-react';

// Collapsible floating panel — sits bottom-left (opposite WhatsApp at bottom-right).
// Closed by default so it never blocks content. Opens on click.
export function AtmospherePanel() {
  const { t, lang } = useLang();
  const [open, setOpen] = useState(false);

  return (
    <>
      {/* Floating button — always visible */}
      <button
        onClick={() => setOpen(!open)}
        className={`fixed bottom-5 left-5 z-50 flex items-center justify-center w-14 h-14 sm:w-16 sm:h-16 rounded-full shadow-2xl transition-all hover:scale-110 ${
          open
            ? 'bg-[var(--terracotta)] text-white'
            : 'bg-[var(--wood)] text-[var(--gold-soft)] hover:bg-[var(--terracotta)] hover:text-white'
        }`}
        aria-label={lang === 'es' ? 'Abrir panel de Mompox' : 'Open Mompox panel'}
        title={lang === 'es' ? 'Clima y sonidos de Mompox' : 'Weather & sounds of Mompox'}
      >
        <Cloud className="w-6 h-6 sm:w-7 sm:h-7" />
        {/* Subtle pulse ring when closed to invite discovery */}
        {!open && (
          <span className="absolute inset-0 rounded-full border-2 border-[var(--gold-soft)] animate-ping opacity-30" />
        )}
      </button>

      {/* Panel — opens above the button */}
      {open && (
        <div className="fixed bottom-24 left-5 z-50 w-[calc(100vw-2.5rem)] sm:w-72 max-w-sm animate-soft-fade">
          <div className="bg-[var(--cream-50)]/95 backdrop-blur-md rounded-2xl shadow-2xl border border-[var(--border)] overflow-hidden">
            {/* Header */}
            <div className="flex items-center justify-between px-4 py-2.5 bg-[var(--wood)] text-[var(--cream-100)]">
              <span className="text-[10px] uppercase tracking-[0.25em] text-[var(--gold-soft)] font-medium">
                {lang === 'es' ? 'Atmósfera de Mompox' : 'Mompox atmosphere'}
              </span>
              <button
                onClick={() => setOpen(false)}
                className="text-[var(--cream-100)]/60 hover:text-[var(--cream-100)] transition-colors"
                aria-label="Close"
              >
                <X className="w-4 h-4" />
              </button>
            </div>
            {/* Body — weather + sound stacked */}
            <div className="p-3 space-y-3 max-h-[70vh] overflow-y-auto">
              <MompoxWeather />
              <AmbientSound />
            </div>
          </div>
        </div>
      )}
    </>
  );
}
