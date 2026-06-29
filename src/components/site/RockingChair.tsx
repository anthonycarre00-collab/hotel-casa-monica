'use client';
import { useLang } from '@/lib/i18n';

// A simple SVG rocking chair that gently rocks back and forth.
// Inspired by the traditional "silla mecedora momposina".
export function RockingChair() {
  const { t } = useLang();

  return (
    <div className="flex flex-col items-center gap-2">
      <svg
        viewBox="0 0 200 200"
        className="w-32 h-32 sm:w-40 sm:h-40 text-[var(--wood)]"
        aria-hidden="true"
      >
        <g
          style={{
            transformOrigin: '100px 165px',
            animation: 'rock-chair 4s ease-in-out infinite',
          }}
        >
          {/* Backrest — vertical slats */}
          <rect x="55" y="40" width="6" height="100" rx="2" fill="currentColor" opacity="0.85" />
          <rect x="68" y="35" width="6" height="105" rx="2" fill="currentColor" opacity="0.95" />
          <rect x="81" y="40" width="6" height="100" rx="2" fill="currentColor" opacity="0.85" />
          {/* Top curved rail of backrest */}
          <path
            d="M 50 45 Q 75 28 100 45"
            stroke="currentColor"
            strokeWidth="6"
            fill="none"
            strokeLinecap="round"
          />
          {/* Seat */}
          <rect x="48" y="138" width="80" height="10" rx="2" fill="currentColor" />
          {/* Front legs */}
          <rect x="50" y="148" width="6" height="40" rx="2" fill="currentColor" opacity="0.9" />
          <rect x="120" y="148" width="6" height="40" rx="2" fill="currentColor" opacity="0.9" />
          {/* Armrests */}
          <path
            d="M 50 100 L 45 138 M 130 100 L 135 138"
            stroke="currentColor"
            strokeWidth="5"
            fill="none"
            strokeLinecap="round"
          />
          <path
            d="M 40 138 Q 50 132 60 138 M 120 138 Q 130 132 140 138"
            stroke="currentColor"
            strokeWidth="5"
            fill="none"
            strokeLinecap="round"
          />
          {/* Rocker (curved base) */}
          <path
            d="M 30 178 Q 90 198 150 178"
            stroke="currentColor"
            strokeWidth="6"
            fill="none"
            strokeLinecap="round"
          />
        </g>

        <style>{`
          @keyframes rock-chair {
            0%, 100% { transform: rotate(-4deg); }
            50%      { transform: rotate(4deg); }
          }
        `}</style>
      </svg>
      <p className="font-serif italic text-xs text-[var(--wood-soft)] text-center max-w-[180px] leading-tight">
        {t('rocking.caption')}
      </p>
    </div>
  );
}
