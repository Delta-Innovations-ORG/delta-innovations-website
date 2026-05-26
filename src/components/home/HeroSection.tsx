import React from 'react';
import { motion } from 'framer-motion';
import { ArrowRight, Globe, Shield, Zap } from 'lucide-react';
import { heroContent } from '../../content/siteConfig';
import { Button } from '../ui/Button';
import { OrbitalBackground } from '../effects/OrbitalBackground';
import { HeroLogoShowcase } from './HeroLogoShowcase';

export function HeroSection() {
  return (
    <section className="relative min-h-screen flex items-center overflow-hidden pt-20">
      <OrbitalBackground />
      <div className="absolute inset-0 bg-grid-dark opacity-40" />

      <div className="container mx-auto px-6 lg:px-8 relative z-10 py-16 lg:py-24">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7 }}
          >
            <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full text-sm font-semibold mb-6 bg-brand-cyan/10 text-brand-cyan border border-brand-cyan/25">
              <Zap size={16} />
              {heroContent.badge}
            </span>
            <h1 className="text-4xl lg:text-5xl xl:text-6xl font-bold text-brand-light leading-tight mb-6">
              Build scalable digital products with{' '}
              <span className="text-gradient-brand">clarity, security, and speed</span>.
            </h1>
            <p className="text-lg text-brand-muted leading-relaxed mb-8 max-w-xl">
              {heroContent.description}
            </p>
            <div className="flex flex-wrap gap-4 mb-10">
              <Button to={heroContent.primaryCta.path} size="lg">
                {heroContent.primaryCta.label}
                <ArrowRight size={18} />
              </Button>
              <Button to={heroContent.secondaryCta.path} variant="outline" size="lg">
                {heroContent.secondaryCta.label}
              </Button>
            </div>
            <div className="flex flex-wrap gap-6 text-sm text-brand-muted">
              <span className="flex items-center gap-2">
                <Globe size={16} className="text-brand-cyan" />
                Pakistan & Egypt
              </span>
              <span className="flex items-center gap-2">
                <Shield size={16} className="text-brand-emerald" />
                Secure Engineering
              </span>
            </div>
          </motion.div>

          <div className="relative hidden lg:flex justify-center">
            <HeroLogoShowcase />
          </div>
        </div>
      </div>
    </section>
  );
}
