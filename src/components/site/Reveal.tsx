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

// Decorative SVG filigree divider — inspired by momposina filigrana spiral motifs
export function FiligreeDivider({ className = '' }: { className?: string }) {
  return (
    <div className={`flex items-center justify-center gap-4 my-8 ${className}`}>
      <span className="h-px flex-1 max-w-[140px] bg-gradient-to-r from-transparent via-[var(--gold)] to-transparent" />
      <svg
        width="48"
        height="48"
        viewBox="0 0 48 48"
        fill="none"
        className="text-[var(--gold)]"
        aria-hidden
      >
        <path
          d="M24 6c-3 4-7 7-7 12 0 4 3 7 7 7s7-3 7-7c0-5-4-8-7-12z"
          stroke="currentColor"
          strokeWidth="1.2"
          fill="none"
        />
        <circle cx="24" cy="20" r="2.2" fill="currentColor" />
        <path
          d="M14 26c2 5 5 8 10 8s8-3 10-8"
          stroke="currentColor"
          strokeWidth="1.2"
          fill="none"
        />
        <path
          d="M24 34c-2 3-4 5-4 8h8c0-3-2-5-4-8z"
          stroke="currentColor"
          strokeWidth="1.2"
          fill="none"
        />
      </svg>
      <span className="h-px flex-1 max-w-[140px] bg-gradient-to-r from-transparent via-[var(--gold)] to-transparent" />
    </div>
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
