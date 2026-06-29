'use client';
import { useEffect, useRef, useState, ReactNode } from 'react';

export function Reveal({
  children,
  delay = 0,
  className = '',
  as: Tag = 'div',
}: {
  children: ReactNode;
  delay?: number;
  className?: string;
  as?: React.ElementType;
}) {
  const ref = useRef<HTMLElement | null>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setVisible(true);
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.12, rootMargin: '0px 0px -10% 0px' }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return (
    <Tag
      ref={ref as any}
      className={`reveal ${visible ? 'is-visible' : ''} ${className}`}
      style={{ transitionDelay: `${delay}ms` }}
    >
      {children}
    </Tag>
  );
}

// Decorative SVG filigree divider — inspired by momposina filigrana spiral motifs.
// v2.0: Self-drawing path animation when scrolled into view.
export function FiligreeDivider({ className = '' }: { className?: string }) {
  return (
    <div className={`flex items-center justify-center gap-4 my-8 ${className}`}>
      <span className="h-px flex-1 max-w-[140px] bg-gradient-to-r from-transparent via-[var(--gold)] to-transparent" />
      <FiligreeOrnament />
      <span className="h-px flex-1 max-w-[140px] bg-gradient-to-r from-transparent via-[var(--gold)] to-transparent" />
    </div>
  );
}

// Self-drawing filigree ornament using stroke-dasharray animation.
// Triggered on scroll-into-view via IntersectionObserver.
function FiligreeOrnament() {
  const ref = useRef<SVGSVGElement | null>(null);
  const [drawn, setDrawn] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) {
            setDrawn(true);
            observer.unobserve(e.target);
          }
        });
      },
      { threshold: 0.4 }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return (
    <svg
      ref={ref}
      width="56"
      height="56"
      viewBox="0 0 56 56"
      fill="none"
      className="text-[var(--gold)]"
      aria-hidden
    >
      {/* Six-petal central rosette */}
      <g
        stroke="currentColor"
        strokeWidth="1.2"
        fill="none"
        strokeLinecap="round"
        style={{
          strokeDasharray: 200,
          strokeDashoffset: drawn ? 0 : 200,
          transition: 'stroke-dashoffset 1.4s ease-out',
        }}
      >
        {/* Center spiral */}
        <path d="M 28 28 m -3 0 a 3 3 0 1 0 6 0 a 3 3 0 1 0 -6 0" />
        {/* Six petals */}
        <path d="M 28 28 L 28 14" />
        <path d="M 28 28 L 40 21" />
        <path d="M 28 28 L 40 35" />
        <path d="M 28 28 L 28 42" />
        <path d="M 28 28 L 16 35" />
        <path d="M 28 28 L 16 21" />
        {/* Outer scrollwork */}
        <path d="M 28 14 Q 22 8 16 14 Q 12 20 18 24" />
        <path d="M 40 21 Q 46 16 44 8" />
        <path d="M 40 35 Q 48 38 50 32" />
        <path d="M 28 42 Q 24 50 18 48" />
        <path d="M 16 35 Q 8 38 6 32" />
        <path d="M 16 21 Q 10 16 12 8" />
      </g>
      {/* Granulation dots */}
      <g
        fill="currentColor"
        style={{
          opacity: drawn ? 1 : 0,
          transition: 'opacity 0.8s ease-out 1.2s',
        }}
      >
        <circle cx="28" cy="6" r="1.2" />
        <circle cx="48" cy="14" r="1.2" />
        <circle cx="50" cy="38" r="1.2" />
        <circle cx="28" cy="50" r="1.2" />
        <circle cx="6" cy="38" r="1.2" />
        <circle cx="8" cy="14" r="1.2" />
      </g>
    </svg>
  );
}

// Small section eyebrow with ornament
export function Eyebrow({ children }: { children: ReactNode }) {
  return (
    <div className="flex items-center justify-center gap-3 mb-3">
      <span className="text-[var(--terracotta)] text-sm tracking-[0.3em] uppercase font-medium">
        {children}
      </span>
    </div>
  );
}
