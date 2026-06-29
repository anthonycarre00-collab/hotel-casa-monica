'use client';

// A small wooden champán boat silhouette that drifts slowly across the bottom
// of the hero section, evoking the Magdalena river traffic.
export function BoatDrift() {
  return (
    <div
      className="absolute bottom-[18%] left-0 right-0 z-[5] pointer-events-none overflow-hidden"
      aria-hidden="true"
    >
      <div className="boat-drift-track">
        <svg
          viewBox="0 0 200 80"
          className="w-24 sm:w-32 h-auto opacity-70"
          style={{ filter: 'drop-shadow(0 4px 6px rgba(0,0,0,0.4))' }}
        >
          {/* Boat hull — traditional champán shape */}
          <path
            d="M 20 50 Q 30 65 100 65 Q 170 65 180 50 L 175 45 L 25 45 Z"
            fill="#3D2817"
          />
          {/* Palm-leaf canopy supports */}
          <line x1="55" y1="45" x2="55" y2="20" stroke="#3D2817" strokeWidth="2" />
          <line x1="145" y1="45" x2="145" y2="20" stroke="#3D2817" strokeWidth="2" />
          {/* Palm-leaf canopy (curved) */}
          <path
            d="M 40 22 Q 100 8 160 22 L 155 28 Q 100 14 45 28 Z"
            fill="#5A8C5A"
            opacity="0.85"
          />
          {/* Small figure poling the boat */}
          <line x1="100" y1="45" x2="100" y2="25" stroke="#3D2817" strokeWidth="2" />
          <circle cx="100" cy="22" r="3" fill="#3D2817" />
          {/* Long pole */}
          <line x1="100" y1="30" x2="115" y2="58" stroke="#8B4513" strokeWidth="1.5" />
        </svg>
      </div>

      <style>{`
        .boat-drift-track {
          animation: drift-across 40s linear infinite;
          will-change: transform;
        }
        @keyframes drift-across {
          0%   { transform: translateX(-30vw); }
          100% { transform: translateX(100vw); }
        }
      `}</style>
    </div>
  );
}
