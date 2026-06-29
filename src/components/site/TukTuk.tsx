'use client';
import { useLang } from '@/lib/i18n';

// Animated tuk-tuk (auto-rickshaw) — the iconic way to get around Mompox.
// Drives across the bottom of the "Getting There" section with bouncing wheels
// and a little exhaust puff. Fun, lightweight, on-theme.
export function TukTuk() {
  const { t, lang } = useLang();

  return (
    <div className="relative h-24 sm:h-32 my-6 overflow-hidden">
      {/* Road line */}
      <div className="absolute bottom-6 left-0 right-0 h-px bg-[var(--wood)]/30" />
      {/* Dashed center line for movement feel */}
      <div className="absolute bottom-5 left-0 right-0 h-px border-t-2 border-dashed border-[var(--wood)]/20" />

      {/* The tuk-tuk */}
      <div className="tuktuk-drive absolute bottom-4">
        <svg
          width="120"
          height="80"
          viewBox="0 0 120 80"
          className="text-[var(--terracotta)]"
          aria-hidden="true"
        >
          {/* Exhaust puff */}
          <g className="tuktuk-puff">
            <circle cx="10" cy="60" r="4" fill="#999" opacity="0.3" />
            <circle cx="6" cy="56" r="3" fill="#999" opacity="0.25" />
            <circle cx="3" cy="52" r="2.5" fill="#999" opacity="0.2" />
          </g>

          {/* Body — main cabin (rounded, like a real tuk-tuk) */}
          <g className="tuktuk-bounce">
            {/* Cabin roof */}
            <path
              d="M 30 20 Q 30 10 45 10 L 80 10 Q 95 10 95 20 L 95 35 L 30 35 Z"
              fill="currentColor"
            />
            {/* Roof highlight */}
            <path
              d="M 35 15 Q 40 12 50 12 L 75 12 Q 85 12 88 15"
              stroke="#fff"
              strokeWidth="1"
              fill="none"
              opacity="0.3"
            />
            {/* Windows */}
            <rect x="38" y="16" width="18" height="14" rx="2" fill="#B3E5FC" opacity="0.8" />
            <rect x="64" y="16" width="18" height="14" rx="2" fill="#B3E5FC" opacity="0.8" />
            {/* Window dividers */}
            <line x1="60" y1="16" x2="60" y2="30" stroke="currentColor" strokeWidth="1.5" />

            {/* Lower body */}
            <path
              d="M 25 35 L 100 35 L 100 55 L 25 55 Z"
              fill="currentColor"
              opacity="0.9"
            />
            {/* Side stripe */}
            <rect x="25" y="42" width="75" height="2" fill="#FFD700" opacity="0.8" />

            {/* Front (driver area) */}
            <path
              d="M 100 35 L 112 40 L 112 55 L 100 55 Z"
              fill="currentColor"
            />
            {/* Headlight */}
            <circle cx="108" cy="48" r="2.5" fill="#FFEB3B" />
            {/* Headlight glow */}
            <circle cx="108" cy="48" r="4" fill="#FFEB3B" opacity="0.3" />

            {/* Rear mirror */}
            <circle cx="28" cy="25" r="2" fill="currentColor" />

            {/* Wheels — they spin */}
            <g className="tuktuk-wheel" style={{ transformOrigin: '35px 60px' }}>
              <circle cx="35" cy="60" r="9" fill="#1a1a1a" />
              <circle cx="35" cy="60" r="5" fill="#444" />
              {/* Spokes — visible when spinning */}
              <line x1="35" y1="55" x2="35" y2="65" stroke="#666" strokeWidth="1" />
              <line x1="30" y1="60" x2="40" y2="60" stroke="#666" strokeWidth="1" />
              <line x1="32" y1="57" x2="38" y2="63" stroke="#666" strokeWidth="1" />
              <line x1="38" y1="57" x2="32" y2="63" stroke="#666" strokeWidth="1" />
            </g>
            <g className="tuktuk-wheel" style={{ transformOrigin: '95px 60px' }}>
              <circle cx="95" cy="60" r="9" fill="#1a1a1a" />
              <circle cx="95" cy="60" r="5" fill="#444" />
              <line x1="95" y1="55" x2="95" y2="65" stroke="#666" strokeWidth="1" />
              <line x1="90" y1="60" x2="100" y2="60" stroke="#666" strokeWidth="1" />
              <line x1="92" y1="57" x2="98" y2="63" stroke="#666" strokeWidth="1" />
              <line x1="98" y1="57" x2="92" y2="63" stroke="#666" strokeWidth="1" />
            </g>
          </g>
        </svg>

        {/* "Tuk-tuk!" label that bounces with the vehicle */}
        <div className="absolute -top-2 left-1/2 -translate-x-1/2 tuktuk-bounce">
          <span className="font-script text-sm text-[var(--terracotta-dark)] whitespace-nowrap">
            ¡Tuk-tuk!
          </span>
        </div>
      </div>

      {/* Caption */}
      <p className="absolute bottom-0 left-0 right-0 text-center font-serif italic text-xs text-[var(--wood-soft)]">
        {lang === 'es'
          ? 'El mejor modo de moverse por Mompox: en tuk-tuk, fresco y barato.'
          : 'The best way to get around Mompox: by tuk-tuk, cool and cheap.'}
      </p>

      <style>{`
        .tuktuk-drive {
          animation: tuktuk-drive 18s linear infinite;
          will-change: transform;
        }
        @keyframes tuktuk-drive {
          0%   { transform: translateX(-130px); }
          100% { transform: translateX(100vw); }
        }
        .tuktuk-bounce {
          animation: tuktuk-bounce 0.4s ease-in-out infinite;
          transform-origin: center;
        }
        @keyframes tuktuk-bounce {
          0%, 100% { transform: translateY(0); }
          50%      { transform: translateY(-2px); }
        }
        .tuktuk-wheel {
          animation: tuktuk-spin 0.3s linear infinite;
        }
        @keyframes tuktuk-spin {
          0%   { transform: rotate(0deg); }
          100% { transform: rotate(360deg); }
        }
        .tuktuk-puff {
          animation: tuktuk-puff 1.2s ease-out infinite;
          transform-origin: center;
        }
        @keyframes tuktuk-puff {
          0%   { opacity: 0.4; transform: translateX(0) scale(0.8); }
          100% { opacity: 0; transform: translateX(-15px) scale(1.5); }
        }
      `}</style>
    </div>
  );
}
