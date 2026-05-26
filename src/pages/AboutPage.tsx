import React from 'react';
import { motion } from 'framer-motion';
import { usePageTitle } from '../hooks/usePageTitle';
import { PageHero } from '../components/ui/PageHero';
import { aboutContent, siteConfig } from '../content/siteConfig';
import { Button } from '../components/ui/Button';
import { HoverGlowCard } from '../components/effects/HoverGlowCard';
import { Reveal } from '../components/motion/Reveal';

export function AboutPage() {
  usePageTitle('About');

  return (
    <>
      <PageHero
        badge="About Us"
        title="Engineering digital products with clarity, security, and scale"
        description={aboutContent.overview}
      />
      <section className="py-16 lg:py-24 section-tint-cyan">
        <div className="container mx-auto px-6 lg:px-8 max-w-4xl">
          <div className="space-y-12">
            <Reveal>
              <HoverGlowCard className="glass-card p-8">
                <h2 className="text-2xl font-bold text-brand-light mb-4 font-display">What We Do</h2>
                <p className="text-brand-muted leading-relaxed">{aboutContent.servicesSummary}</p>
              </HoverGlowCard>
            </Reveal>
            <div className="grid md:grid-cols-2 gap-8">
              <Reveal delay={0.1}>
                <HoverGlowCard className="glass-card p-6 h-full">
                  <h3 className="text-lg font-bold text-brand-cyan mb-3">Mission</h3>
                  <p className="text-brand-muted text-sm leading-relaxed">{aboutContent.mission}</p>
                </HoverGlowCard>
              </Reveal>
              <Reveal delay={0.15}>
                <HoverGlowCard className="glass-card p-6 h-full">
                  <h3 className="text-lg font-bold text-brand-cyan mb-3">Vision</h3>
                  <p className="text-brand-muted text-sm leading-relaxed">{aboutContent.vision}</p>
                </HoverGlowCard>
              </Reveal>
            </div>
            <Reveal delay={0.1}>
              <h2 className="text-2xl font-bold text-brand-light mb-4 font-display">Core Values</h2>
              <ul className="grid sm:grid-cols-2 gap-3">
                {aboutContent.values.map((value, index) => (
                  <motion.li
                    key={value}
                    initial={{ opacity: 0, x: -12 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: index * 0.05 }}
                    className="flex items-start gap-2 text-sm text-brand-muted p-3 rounded-lg bg-brand-cyan/5 border border-brand-cyan/15 hover-lift-glow"
                  >
                    <span className="text-brand-cyan font-bold">•</span>
                    {value}
                  </motion.li>
                ))}
              </ul>
            </Reveal>
            <Reveal delay={0.2}>
              <div className="text-center pt-4">
                <p className="text-brand-muted mb-6">
                  Based in {siteConfig.locations.join(' and ')} — serving clients worldwide.
                </p>
                <Button to="/contact">Discuss Your Project</Button>
              </div>
            </Reveal>
          </div>
        </div>
      </section>
    </>
  );
}
