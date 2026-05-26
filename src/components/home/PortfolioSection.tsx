import React, { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronLeft, ChevronRight, ExternalLink } from 'lucide-react';
import { SectionHeading } from '../ui/SectionHeading';
import { HoverGlowCard } from '../effects/HoverGlowCard';
import { useTiltHover } from '../../hooks/useTiltHover';
import {
  portfolioCategories,
  portfolioItems,
  type PortfolioAccent,
  type PortfolioItem,
} from '../../content/portfolio';

const statusColors = {
  live: 'bg-brand-emerald/20 text-brand-emeraldLight border-brand-emerald/30',
  demo: 'bg-brand-cyan/20 text-brand-cyan border-brand-cyan/30',
  internal: 'bg-brand-muted/20 text-brand-muted border-brand-muted/30',
};

const accentBorder: Record<PortfolioAccent, string> = {
  cyan: 'border-t-brand-cyan',
  emerald: 'border-t-brand-emerald',
  violet: 'border-t-brand-violet',
  amber: 'border-t-brand-amber',
  rose: 'border-t-brand-rose',
};

const accentGlow: Record<PortfolioAccent, string> = {
  cyan: 'rgba(34, 211, 238, 0.18)',
  emerald: 'rgba(16, 185, 129, 0.18)',
  violet: 'rgba(139, 92, 246, 0.2)',
  amber: 'rgba(245, 158, 11, 0.18)',
  rose: 'rgba(244, 63, 94, 0.18)',
};

const accentTag: Record<PortfolioAccent, string> = {
  cyan: 'bg-brand-cyan/10 text-brand-cyan',
  emerald: 'bg-brand-emerald/10 text-brand-emeraldLight',
  violet: 'bg-brand-violet/10 text-brand-violetLight',
  amber: 'bg-brand-amber/10 text-brand-amberLight',
  rose: 'bg-brand-rose/10 text-brand-roseLight',
};

function PortfolioCard({ item }: { item: PortfolioItem }) {
  const { ref, transform, onMouseMove, onMouseLeave } = useTiltHover(8);

  return (
    <HoverGlowCard
      glowColor={accentGlow[item.accent]}
      className={`min-w-[320px] lg:min-w-[380px] max-w-[380px] shrink-0 snap-start border-t-4 ${accentBorder[item.accent]} glass-card p-6 lg:p-8 flex flex-col`}
    >
      <article
        ref={ref}
        data-card
        onMouseMove={onMouseMove}
        onMouseLeave={onMouseLeave}
        style={{ transform, transition: 'transform 0.15s ease-out' }}
        className="flex flex-col h-full"
      >
        <div className="flex justify-between items-start mb-4">
          <span className={`text-xs font-medium px-2 py-1 rounded-full ${accentTag[item.accent]}`}>
            {item.category}
          </span>
          <span className={`text-xs px-2 py-1 rounded-full border capitalize ${statusColors[item.status]}`}>
            {item.status}
          </span>
        </div>
        <h3 className="text-xl font-bold text-brand-light mb-3 font-display">{item.title}</h3>
        <p className="text-sm text-brand-muted mb-2">
          <strong className="text-brand-light">Problem:</strong> {item.problem}
        </p>
        <p className="text-sm text-brand-muted mb-4 flex-1">
          <strong className="text-brand-light">Solution:</strong> {item.solution}
        </p>
        <div className="flex flex-wrap gap-2 mb-4">
          {item.stack.map((tech) => (
            <span key={tech} className={`text-xs px-2 py-1 rounded ${accentTag[item.accent]}`}>
              {tech}
            </span>
          ))}
        </div>
        <span className="inline-flex items-center gap-1 text-sm text-brand-cyan">
          <ExternalLink size={14} />
          Case study available on request
        </span>
      </article>
    </HoverGlowCard>
  );
}

export function PortfolioSection() {
  const scrollRef = useRef<HTMLDivElement>(null);
  const [activeFilter, setActiveFilter] = useState('All');
  const [isPaused, setIsPaused] = useState(false);

  const filtered = useMemo(
    () =>
      activeFilter === 'All'
        ? portfolioItems
        : portfolioItems.filter((p) => p.category === activeFilter),
    [activeFilter]
  );

  const loopItems = activeFilter === 'All' && filtered.length > 1;
  const displayItems = useMemo(
    () => (loopItems ? [...filtered, ...filtered] : filtered),
    [loopItems, filtered]
  );

  useEffect(() => {
    if (scrollRef.current) scrollRef.current.scrollLeft = 0;
  }, [activeFilter]);

  useEffect(() => {
    if (isPaused) return;
    const el = scrollRef.current;
    if (!el) return;

    const tick = () => {
      el.scrollLeft += 1.2;
      if (loopItems) {
        const half = el.scrollWidth / 2;
        if (half > 0 && el.scrollLeft >= half) el.scrollLeft = 0;
      } else if (el.scrollLeft + el.clientWidth >= el.scrollWidth - 2) {
        el.scrollLeft = 0;
      }
    };

    const id = window.setInterval(tick, 20);
    return () => window.clearInterval(id);
  }, [isPaused, loopItems, displayItems.length]);

  const scrollByCard = useCallback((direction: -1 | 1) => {
    const el = scrollRef.current;
    if (!el) return;
    const card = el.querySelector('[data-card]') as HTMLElement | null;
    const step = (card?.offsetWidth ?? 380) + 32;
    el.scrollBy({ left: direction * step, behavior: 'smooth' });
  }, []);

  return (
    <section className="py-20 lg:py-28 section-tint-violet relative overflow-hidden">
      <div className="absolute inset-0 bg-mesh-violet opacity-60 pointer-events-none" />
      <div className="container mx-auto px-6 lg:px-8 relative z-10">
        <SectionHeading
          badge="Portfolio"
          title="Projects that demonstrate our craft"
          description="From enterprise platforms to AI-powered portals — serious engineering with measurable outcomes."
        />

        <div className="flex flex-wrap justify-center gap-2 mb-10">
          {portfolioCategories.map((cat) => (
            <button
              key={cat}
              type="button"
              onClick={() => setActiveFilter(cat)}
              className={`px-4 py-2 rounded-full text-sm font-medium transition-all duration-300 hover-lift-glow ${
                activeFilter === cat
                  ? 'bg-brand-gradient text-brand-navy shadow-glow'
                  : 'bg-brand-navyCard/80 text-brand-muted border border-brand-cyan/20 hover:border-brand-cyan/50 hover:text-brand-cyan'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        <div
          className="relative -mx-6 lg:-mx-8"
          onMouseEnter={() => setIsPaused(true)}
          onMouseLeave={() => setIsPaused(false)}
        >
          <div
            ref={scrollRef}
            className="flex gap-8 overflow-x-auto scroll-smooth snap-x snap-mandatory px-6 lg:px-8 pb-2"
            style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
          >
            <AnimatePresence mode="popLayout">
              {displayItems.map((item, i) => (
                <motion.div
                  key={`${item.id}-${i}`}
                  layout
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  transition={{ duration: 0.3 }}
                >
                  <PortfolioCard item={item} />
                </motion.div>
              ))}
            </AnimatePresence>
          </div>
        </div>

        <div className="flex items-center justify-center gap-4 mt-10">
          <button
            type="button"
            onClick={() => scrollByCard(-1)}
            aria-label="Previous projects"
            className="group flex items-center gap-2 px-5 py-3 rounded-xl bg-brand-navyCard border border-brand-cyan/30 text-brand-cyan font-semibold hover:border-brand-cyan hover:shadow-glow animate-pulseBtn btn-shine transition-all hover:scale-105"
          >
            <ChevronLeft size={20} className="group-hover:-translate-x-0.5 transition-transform" />
            Prev
          </button>
          <button
            type="button"
            onClick={() => scrollByCard(1)}
            aria-label="Next projects"
            className="group flex items-center gap-2 px-5 py-3 rounded-xl bg-brand-gradient text-brand-navy font-semibold shadow-glow btn-shine transition-all hover:scale-105"
          >
            Next
            <ChevronRight size={20} className="group-hover:translate-x-0.5 transition-transform" />
          </button>
        </div>
      </div>
    </section>
  );
}
