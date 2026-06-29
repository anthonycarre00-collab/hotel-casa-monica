'use client';
import { useState } from 'react';
import { useLang } from '@/lib/i18n';
import { MOMPOX_DICTIONARY, DictEntry } from '@/lib/v2-data';
import { Reveal, FiligreeDivider, Eyebrow } from './Reveal';
import { BookOpen, X } from 'lucide-react';

const CATEGORY_LABELS: Record<DictEntry['category'], { es: string; en: string; icon: string }> = {
  food:          { es: 'Comida',          en: 'Food',          icon: '🍴' },
  architecture:  { es: 'Arquitectura',    en: 'Architecture',  icon: '🏛️' },
  river:         { es: 'Río',             en: 'River',         icon: '⛵' },
  expressions:   { es: 'Expresiones',     en: 'Expressions',   icon: '💬' },
};

export function MompoxDictionary() {
  const { t, lang } = useLang();
  const [selected, setSelected] = useState<DictEntry | null>(null);

  return (
    <section id="dictionary" className="bg-cal py-20 sm:py-28">
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        <Reveal className="text-center">
          <Eyebrow>
            <span className="flex items-center justify-center gap-2">
              <BookOpen className="w-3.5 h-3.5" />
              {lang === 'es' ? 'Diccionario' : 'Dictionary'}
            </span>
          </Eyebrow>
          <h2 className="font-serif text-4xl sm:text-5xl text-[var(--wood)] leading-tight">
            {t('dict.title')}
          </h2>
          <p className="mt-3 text-[var(--wood-soft)] text-base sm:text-lg">
            {t('dict.subtitle')}
          </p>
          <FiligreeDivider />
        </Reveal>

        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3 mt-8">
          {MOMPOX_DICTIONARY.map((entry, i) => (
            <Reveal key={entry.word} delay={(i % 5) * 60}>
              <button
                onClick={() => setSelected(entry)}
                className="group w-full text-left p-4 rounded-xl bg-white/80 border border-[var(--border)] hover:border-[var(--terracotta)] hover:shadow-md hover:-translate-y-0.5 transition-all"
              >
                <div className="text-2xl mb-1.5">{CATEGORY_LABELS[entry.category].icon}</div>
                <div className="font-serif text-base text-[var(--wood)] group-hover:text-[var(--terracotta-dark)] transition-colors leading-tight">
                  {entry.word}
                </div>
                <div className="text-[10px] uppercase tracking-wider text-[var(--wood-soft)] mt-1">
                  {lang === 'es' ? CATEGORY_LABELS[entry.category].es : CATEGORY_LABELS[entry.category].en}
                </div>
              </button>
            </Reveal>
          ))}
        </div>
      </div>

      {/* Detail modal */}
      {selected && (
        <div
          className="fixed inset-0 z-[100] bg-[var(--wood)]/80 backdrop-blur-md flex items-center justify-center p-4 animate-soft-fade"
          onClick={() => setSelected(null)}
        >
          <div
            className="bg-[var(--cream-50)] rounded-2xl shadow-2xl max-w-md w-full overflow-hidden"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="bg-[var(--wood)] text-[var(--cream-100)] p-5 relative">
              <button
                onClick={() => setSelected(null)}
                className="absolute top-3 right-3 w-8 h-8 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center transition-colors"
                aria-label="Close"
              >
                <X className="w-4 h-4" />
              </button>
              <div className="text-3xl mb-1">{CATEGORY_LABELS[selected.category].icon}</div>
              <div className="text-[10px] uppercase tracking-[0.25em] text-[var(--gold-soft)] mb-1">
                {lang === 'es' ? CATEGORY_LABELS[selected.category].es : CATEGORY_LABELS[selected.category].en}
              </div>
              <h3 className="font-script text-4xl text-[var(--gold-soft)]">
                {selected.word}
              </h3>
            </div>
            <div className="p-5">
              <p className="text-[var(--wood)] leading-relaxed">
                {lang === 'es' ? selected.es : selected.en}
              </p>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
