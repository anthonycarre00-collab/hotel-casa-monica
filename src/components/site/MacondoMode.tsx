'use client';
import { useState, useEffect } from 'react';
import { useLang } from '@/lib/i18n';
import { Sparkles, X } from 'lucide-react';

// "Macondo Mode" toggle — adds magical realism easter eggs:
// - Yellow butterflies drift across the screen
// - The toggle lives in the nav next to the language switch
export function MacondoMode() {
  const { t } = useLang();
  const [on, setOn] = useState(false);

  useEffect(() => {
    try {
      const stored = window.localStorage.getItem('cm-macondo');
      // eslint-disable-next-line react-hooks/set-state-in-effect
      if (stored === '1') setOn(true);
    } catch {}
  }, []);

  function toggle() {
    const next = !on;
    setOn(next);
    try { window.localStorage.setItem('cm-macondo', next ? '1' : '0'); } catch {}
  }

  return (
    <>
      <button
        onClick={toggle}
        className={`flex items-center gap-1.5 px-3 py-2 rounded-full border text-sm font-medium transition-colors ${
          on
            ? 'bg-[var(--gold-soft)]/30 border-[var(--gold)] text-[var(--wood)]'
            : 'border-[var(--border)] text-[var(--wood)] hover:border-[var(--gold)] hover:text-[var(--gold)]'
        }`}
        aria-label={t('macondoMode.toggle')}
        title={t('macondoMode.toggle')}
      >
        <Sparkles className={`w-4 h-4 ${on ? 'text-[var(--gold)] animate-pulse' : ''}`} />
        <span className="hidden sm:inline text-xs uppercase tracking-wider">
          {t('macondoMode.toggle')}
        </span>
      </button>

      {on && <MacondoButterflies />}
    </>
  );
}

// Yellow butterflies — homage to García Márquez's "100 years of solitude"
// (Remedios the Beauty ascends surrounded by yellow butterflies)
function MacondoButterflies() {
  const butterflies = Array.from({ length: 8 }).map((_, i) => ({
    id: i,
    delay: i * 2.5,
    duration: 14 + (i % 3) * 4,
    startTop: 10 + (i * 11) % 80,
    size: 16 + (i % 4) * 4,
  }));

  return (
    <div className="fixed inset-0 z-[60] pointer-events-none" aria-hidden="true">
      {butterflies.map(b => (
        <div
          key={b.id}
          className="absolute"
          style={{
            top: `${b.startTop}%`,
            left: '-30px',
            animation: `fly-across ${b.duration}s linear ${b.delay}s infinite`,
          }}
        >
          <svg
            width={b.size}
            height={b.size * 0.85}
            viewBox="0 0 40 34"
            style={{
              filter: 'drop-shadow(0 2px 3px rgba(201, 169, 97, 0.4))',
              animation: `flap 0.18s ease-in-out infinite`,
            }}
          >
            {/* Butterfly wings — yellow, Mompox/García Márquez style */}
            <path
              d="M 20 17 Q 5 5 2 17 Q 5 28 20 17 Q 35 5 38 17 Q 35 28 20 17 Z"
              fill="#E8C547"
              opacity="0.9"
            />
            <ellipse cx="20" cy="17" rx="1.5" ry="8" fill="#3D2817" />
          </svg>
        </div>
      ))}

      <style>{`
        @keyframes fly-across {
          0%   { transform: translateX(0) translateY(0); }
          25%  { transform: translateX(25vw) translateY(-30px); }
          50%  { transform: translateX(50vw) translateY(20px); }
          75%  { transform: translateX(75vw) translateY(-20px); }
          100% { transform: translateX(105vw) translateY(0); }
        }
        @keyframes flap {
          0%, 100% { transform: scaleX(1); }
          50%      { transform: scaleX(0.4); }
        }
      `}</style>
    </div>
  );
}
