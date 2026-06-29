'use client';
import { useEffect, useRef, useState } from 'react';
import { useLang } from '@/lib/i18n';
import { MACONDO_QUOTES } from '@/lib/v2-data';
import { X, Sparkles } from 'lucide-react';

const QUOTE_INTERVAL_MS = 45000; // 45 seconds between quotes
const QUOTE_VISIBLE_MS = 12000;  // each quote visible for 12s

export function MacondoQuotes() {
  const { t, lang } = useLang();
  const [current, setCurrent] = useState<number | null>(null);
  const [dismissed, setDismissed] = useState(false);
  const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    if (dismissed) return;

    let isMounted = true;

    function showRandomQuote() {
      if (!isMounted) return;
      const idx = Math.floor(Math.random() * MACONDO_QUOTES.length);
      setCurrent(idx);
      timerRef.current = setTimeout(() => {
        if (isMounted) setCurrent(null);
        timerRef.current = setTimeout(showRandomQuote, QUOTE_INTERVAL_MS - QUOTE_VISIBLE_MS);
      }, QUOTE_VISIBLE_MS);
    }

    // First quote after 20 seconds
    const initial = setTimeout(showRandomQuote, 20000);
    return () => {
      isMounted = false;
      clearTimeout(initial);
      if (timerRef.current) clearTimeout(timerRef.current);
    };
  }, [dismissed]);

  if (dismissed || current === null) return null;

  const q = MACONDO_QUOTES[current];
  if (!q) return null;

  return (
    <div
      className="fixed bottom-24 left-4 right-4 sm:left-5 sm:right-auto sm:max-w-md z-40 animate-soft-fade"
      role="status"
      aria-live="polite"
    >
      <div className="bg-[var(--wood)]/95 backdrop-blur-md text-[var(--cream-100)] rounded-2xl shadow-2xl border border-[var(--gold)]/30 overflow-hidden">
        <div className="flex items-center gap-2 px-4 pt-3 pb-1.5 border-b border-white/10">
          <Sparkles className="w-3.5 h-3.5 text-[var(--gold-soft)]" />
          <span className="text-[10px] uppercase tracking-[0.25em] text-[var(--gold-soft)] font-medium">
            {t('macondo.title')}
          </span>
          <button
            onClick={() => setDismissed(true)}
            className="ml-auto text-[var(--cream-100)]/50 hover:text-[var(--cream-100)] transition-colors"
            aria-label="Dismiss"
          >
            <X className="w-3.5 h-3.5" />
          </button>
        </div>
        <blockquote className="px-4 py-3">
          <p className="font-serif italic text-base sm:text-lg leading-relaxed text-[var(--cream-100)]">
            “{lang === 'es' ? q.es : q.en}”
          </p>
          <footer className="mt-2 text-xs text-[var(--gold-soft)] font-medium">
            — {lang === 'es' ? q.author : (q.authorEn || q.author)}
          </footer>
        </blockquote>
      </div>
    </div>
  );
}
