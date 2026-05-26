import React, { useCallback, useRef } from 'react';

type HoverGlowCardProps = {
  children: React.ReactNode;
  className?: string;
  glowColor?: string;
};

export function HoverGlowCard({ children, className = '', glowColor = 'rgba(34, 211, 238, 0.15)' }: HoverGlowCardProps) {
  const ref = useRef<HTMLDivElement>(null);

  const handleMove = useCallback((e: React.MouseEvent<HTMLDivElement>) => {
    if (!ref.current) return;
    const rect = ref.current.getBoundingClientRect();
    ref.current.style.setProperty('--mouse-x', `${e.clientX - rect.left}px`);
    ref.current.style.setProperty('--mouse-y', `${e.clientY - rect.top}px`);
    ref.current.style.setProperty('--glow-color', glowColor);
  }, [glowColor]);

  return (
    <div
      ref={ref}
      onMouseMove={handleMove}
      className={`hover-glow-card hover-shine hover-lift-glow ${className}`}
    >
      {children}
    </div>
  );
}
