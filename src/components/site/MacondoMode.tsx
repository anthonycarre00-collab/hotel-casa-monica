'use client';
import { useState, useEffect, useRef } from 'react';
import { useLang } from '@/lib/i18n';
import { Sparkles } from 'lucide-react';

// "Macondo Mode" toggle — adds magical realism easter eggs:
// - Yellow butterflies (García Márquez homage)
// - Hummingbirds (common in Mompox gardens)
// - Dragonflies (seen by the river)
// Organic flight paths, not linear.
export function MacondoMode() {
  const { t, lang } = useLang();
  const [on, setOn] = useState(false);
  const [showTip, setShowTip] = useState(false);
  const tipTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

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

  // Tooltip handlers — show on hover, hide on leave
  function handleEnter() {
    setShowTip(true);
    if (tipTimer.current) clearTimeout(tipTimer.current);
  }
  function handleLeave() {
    tipTimer.current = setTimeout(() => setShowTip(false), 200);
  }

  const tooltipText = lang === 'es'
    ? 'Modo Macondo: activa el realismo mágico. Mariposas amarillas, colibríes y libélulas cruzarán la pantalla — inspirado en García Márquez y la naturaleza de Mompox.'
    : 'Macondo Mode: activates magical realism. Yellow butterflies, hummingbirds and dragonflies will drift across the screen — inspired by García Márquez and the nature of Mompox.';

  return (
    <>
      <div
        className="relative"
        onMouseEnter={handleEnter}
        onMouseLeave={handleLeave}
      >
        <button
          onClick={toggle}
          className={`flex items-center gap-1.5 px-3 py-2 rounded-full border text-sm font-medium transition-colors ${
            on
              ? 'bg-[var(--gold-soft)]/30 border-[var(--gold)] text-[var(--wood)]'
              : 'border-[var(--border)] text-[var(--wood)] hover:border-[var(--gold)] hover:text-[var(--gold)]'
          }`}
          aria-label={t('macondoMode.toggle')}
          aria-pressed={on}
        >
          <Sparkles className={`w-4 h-4 ${on ? 'text-[var(--gold)] animate-pulse' : ''}`} />
          <span className="hidden sm:inline text-xs uppercase tracking-wider">
            {t('macondoMode.toggle')}
          </span>
        </button>

        {/* Tooltip */}
        {showTip && (
          <div className="absolute top-full right-0 mt-2 w-64 bg-[var(--wood)] text-[var(--cream-100)] text-xs leading-relaxed rounded-lg shadow-xl p-3 z-50 animate-soft-fade">
            <div className="font-serif text-sm text-[var(--gold-soft)] mb-1">
              {lang === 'es' ? '¿Qué es Modo Macondo?' : 'What is Macondo Mode?'}
            </div>
            <p>{tooltipText}</p>
            <span className="absolute -top-1 right-6 w-2 h-2 bg-[var(--wood)] rotate-45" />
          </div>
        )}
      </div>

      {on && <MacondoFauna />}
    </>
  );
}

// ===== CREATURES =====

type Creature = {
  id: number;
  type: 'butterfly' | 'hummingbird' | 'dragonfly';
  delay: number;
  duration: number;
  top: number;
  size: number;
  path: number; // which flight path variant
};

function MacondoFauna() {
  // Mix of creatures — butterflies most common, hummingbirds and dragonflies less so
  const creatures: Creature[] = [
    { id: 0,  type: 'butterfly',   delay: 0,   duration: 22, top: 15, size: 28, path: 0 },
    { id: 1,  type: 'butterfly',   delay: 5,   duration: 28, top: 45, size: 22, path: 1 },
    { id: 2,  type: 'butterfly',   delay: 12,  duration: 25, top: 70, size: 32, path: 2 },
    { id: 3,  type: 'butterfly',   delay: 18,  duration: 30, top: 30, size: 24, path: 0 },
    { id: 4,  type: 'butterfly',   delay: 25,  duration: 24, top: 60, size: 26, path: 1 },
    { id: 5,  type: 'hummingbird', delay: 8,   duration: 12, top: 25, size: 20, path: 0 },
    { id: 6,  type: 'hummingbird', delay: 20,  duration: 14, top: 55, size: 18, path: 1 },
    { id: 7,  type: 'dragonfly',   delay: 15,  duration: 10, top: 40, size: 30, path: 0 },
    { id: 8,  type: 'dragonfly',   delay: 30,  duration: 8,  top: 75, size: 26, path: 1 },
  ];

  return (
    <div className="fixed inset-0 z-[60] pointer-events-none" aria-hidden="true">
      {creatures.map(c => (
        <CreatureElement key={c.id} creature={c} />
      ))}
    </div>
  );
}

function CreatureElement({ creature: c }: { creature: Creature }) {
  const pathClass = `fly-path-${c.type}-${c.path}`;

  return (
    <div
      className={`absolute ${pathClass}`}
      style={{
        top: `${c.top}%`,
        left: '-50px',
        animationDelay: `${c.delay}s`,
        animationDuration: `${c.duration}s`,
        animationIterationCount: 'infinite',
        animationTimingFunction: 'ease-in-out',
      }}
    >
      {c.type === 'butterfly' && <ButterflySVG size={c.size} />}
      {c.type === 'hummingbird' && <HummingbirdSVG size={c.size} />}
      {c.type === 'dragonfly' && <DragonflySVG size={c.size} />}
    </div>
  );
}

// ===== SVG CREATURES =====

// Yellow butterfly — proper 4-wing shape with veins, inspired by García Márquez
function ButterflySVG({ size }: { size: number }) {
  return (
    <svg
      width={size}
      height={size * 0.85}
      viewBox="0 0 50 42"
      style={{
        filter: 'drop-shadow(0 2px 4px rgba(201, 169, 97, 0.3))',
      }}
    >
      <g style={{ animation: 'butterfly-flap 0.25s ease-in-out infinite', transformOrigin: '25px 21px' }}>
        {/* Upper wings — left */}
        <path
          d="M 25 21 Q 8 4 3 14 Q 1 22 8 24 Q 18 25 25 21 Z"
          fill="#E8C547"
          opacity="0.92"
        />
        {/* Upper wings — right */}
        <path
          d="M 25 21 Q 42 4 47 14 Q 49 22 42 24 Q 32 25 25 21 Z"
          fill="#E8C547"
          opacity="0.92"
        />
        {/* Lower wings — left */}
        <path
          d="M 25 21 Q 14 26 10 36 Q 8 40 14 38 Q 22 33 25 21 Z"
          fill="#D4A834"
          opacity="0.88"
        />
        {/* Lower wings — right */}
        <path
          d="M 25 21 Q 36 26 40 36 Q 42 40 36 38 Q 28 33 25 21 Z"
          fill="#D4A834"
          opacity="0.88"
        />
        {/* Wing veins */}
        <path d="M 25 21 L 5 12 M 25 21 L 45 12 M 25 21 L 12 34 M 25 21 L 38 34"
              stroke="#B8862F" strokeWidth="0.5" fill="none" opacity="0.4" />
        {/* Body */}
        <ellipse cx="25" cy="21" rx="1.5" ry="9" fill="#3D2817" />
        {/* Head */}
        <circle cx="25" cy="11" r="2" fill="#3D2817" />
        {/* Antennae */}
        <path d="M 25 10 Q 22 6 20 4 M 25 10 Q 28 6 30 4"
              stroke="#3D2817" strokeWidth="0.5" fill="none" />
      </g>

      <style>{`
        @keyframes butterfly-flap {
          0%, 100% { transform: scaleX(1); }
          50%      { transform: scaleX(0.35); }
        }
      `}</style>
    </svg>
  );
}

// Hummingbird — small, iridescent green, hovering
function HummingbirdSVG({ size }: { size: number }) {
  return (
    <svg
      width={size}
      height={size * 0.7}
      viewBox="0 0 50 35"
      style={{ filter: 'drop-shadow(0 2px 4px rgba(0,0,0,0.2))' }}
    >
      {/* Body */}
      <ellipse cx="22" cy="18" rx="6" ry="4" fill="#2E7D5B" />
      {/* Head */}
      <circle cx="16" cy="16" r="3.5" fill="#2E7D5B" />
      {/* Eye */}
      <circle cx="15" cy="15" r="1" fill="#1a1a1a" />
      {/* Beak */}
      <path d="M 13 16 L 5 14" stroke="#1a1a1a" strokeWidth="1" stroke-linecap="round" />
      {/* Wings — blurred motion (vibrating fast) */}
      <g style={{ animation: 'hover-wings 0.05s linear infinite', transformOrigin: '22px 16px' }}>
        <ellipse cx="28" cy="14" rx="8" ry="2" fill="#5CB88A" opacity="0.4" />
        <ellipse cx="28" cy="14" rx="6" ry="1.5" fill="#5CB88A" opacity="0.6" />
      </g>
      {/* Tail */}
      <path d="M 27 19 L 33 21 L 30 18 Z" fill="#2E7D5B" />

      <style>{`
        @keyframes hover-wings {
          0%, 100% { transform: scaleY(1); }
          50%      { transform: scaleY(0.5); }
        }
      `}</style>
    </svg>
  );
}

// Dragonfly — long body, 4 transparent wings, iridescent blue
function DragonflySVG({ size }: { size: number }) {
  return (
    <svg
      width={size}
      height={size * 0.6}
      viewBox="0 0 50 30"
      style={{ filter: 'drop-shadow(0 2px 3px rgba(0,0,0,0.15))' }}
    >
      {/* Wings — 4 transparent ovals, vibrating */}
      <g style={{ animation: 'dragonfly-wings 0.08s linear infinite' }}>
        <ellipse cx="18" cy="10" rx="10" ry="3" fill="#4A90D9" opacity="0.3" />
        <ellipse cx="18" cy="20" rx="9" ry="2.5" fill="#4A90D9" opacity="0.3" />
        <ellipse cx="28" cy="10" rx="9" ry="3" fill="#4A90D9" opacity="0.3" />
        <ellipse cx="28" cy="20" rx="8" ry="2.5" fill="#4A90D9" opacity="0.3" />
      </g>
      {/* Body — long segmented abdomen */}
      <rect x="20" y="13" width="25" height="3" rx="1.5" fill="#2E5F8C" />
      {/* Thorax */}
      <ellipse cx="22" cy="14.5" rx="3" ry="3" fill="#1E4A6E" />
      {/* Head — large eyes */}
      <circle cx="18" cy="14" r="3" fill="#1E4A6E" />
      <circle cx="17" cy="13" r="1.5" fill="#4A90D9" opacity="0.7" />

      <style>{`
        @keyframes dragonfly-wings {
          0%, 100% { transform: scaleY(1); opacity: 0.3; }
          50%      { transform: scaleY(0.6); opacity: 0.5; }
        }
      `}</style>
    </svg>
  );
}

