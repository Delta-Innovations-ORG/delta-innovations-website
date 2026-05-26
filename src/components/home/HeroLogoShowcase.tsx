import React, { useCallback, useRef } from 'react';
import { motion } from 'framer-motion';
import { siteConfig } from '../../content/siteConfig';
import { useTiltHover } from '../../hooks/useTiltHover';

const PARTICLES = [
  { color: '#22D3EE', orbit: '150px', duration: '10s', delay: '0s' },
  { color: '#10B981', orbit: '165px', duration: '12s', delay: '-2s' },
  { color: '#8B5CF6', orbit: '135px', duration: '9s', delay: '-4s' },
  { color: '#22D3EE', orbit: '175px', duration: '11s', delay: '-1s' },
  { color: '#F59E0B', orbit: '145px', duration: '13s', delay: '-3s' },
  { color: '#34D399', orbit: '160px', duration: '10s', delay: '-5s' },
] as const;

export function HeroLogoShowcase() {
  const { ref, transform, onMouseMove, onMouseLeave } = useTiltHover(14);
  const glowRef = useRef<HTMLDivElement>(null);

  const handleGlowMove = useCallback((e: React.MouseEvent<HTMLDivElement>) => {
    if (!glowRef.current) return;
    const rect = glowRef.current.getBoundingClientRect();
    glowRef.current.style.setProperty('--mouse-x', `${e.clientX - rect.left}px`);
    glowRef.current.style.setProperty('--mouse-y', `${e.clientY - rect.top}px`);
  }, []);

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.88 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.9, delay: 0.2, ease: 'easeOut' }}
      className="group relative w-full max-w-[400px]"
    >
      <div
        ref={ref}
        onMouseMove={(e) => {
          onMouseMove(e);
          handleGlowMove(e);
        }}
        onMouseLeave={onMouseLeave}
        style={{ transform }}
        className="hero-logo-stage transition-transform duration-200 ease-out"
      >
        <div className="hero-logo-halo" aria-hidden />
        <div className="hero-logo-ring-outer" aria-hidden />
        <div className="hero-logo-ring-inner" aria-hidden />

        <div className="hero-logo-particle-wrap" aria-hidden>
          {PARTICLES.map((p, i) => (
            <span
              key={i}
              className="hero-logo-particle"
              style={
                {
                  '--orbit-r': p.orbit,
                  background: p.color,
                  boxShadow: `0 0 12px ${p.color}`,
                  animationDuration: p.duration,
                  animationDelay: p.delay,
                } as React.CSSProperties
              }
            />
          ))}
        </div>

        <div
          ref={glowRef}
          className="hero-logo-glass hover-glow-card hover-shine hover-border-trace"
          style={{ '--glow-color': 'rgba(34, 211, 238, 0.2)' } as React.CSSProperties}
        >
          <img
            src={siteConfig.logo}
            alt={siteConfig.name}
            className="hero-logo-img"
            draggable={false}
          />
        </div>
      </div>
    </motion.div>
  );
}
