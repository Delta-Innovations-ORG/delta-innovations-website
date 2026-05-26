import React from 'react';
import { OrbitalBackground } from '../effects/OrbitalBackground';
import { Reveal } from '../motion/Reveal';

type PageHeroProps = {
  title: string;
  description?: string;
  badge?: string;
};

export function PageHero({ title, description, badge }: PageHeroProps) {
  return (
    <section className="relative bg-dark-gradient text-brand-light overflow-hidden pt-24 pb-16 lg:pb-20">
      <OrbitalBackground />
      <div className="absolute inset-0 bg-grid-dark opacity-50" />
      <div className="container mx-auto px-6 lg:px-8 relative z-10">
        {badge && (
          <Reveal>
            <span className="inline-block px-4 py-1.5 rounded-full text-sm font-semibold mb-6 bg-brand-cyan/10 text-brand-cyan border border-brand-cyan/25">
              {badge}
            </span>
          </Reveal>
        )}
        <Reveal delay={0.08}>
          <h1 className="text-4xl lg:text-5xl xl:text-6xl font-bold leading-tight mb-6 max-w-4xl font-display">
            {title}
          </h1>
        </Reveal>
        {description && (
          <Reveal delay={0.16}>
            <p className="text-lg lg:text-xl text-brand-muted max-w-2xl leading-relaxed">{description}</p>
          </Reveal>
        )}
      </div>
    </section>
  );
}
