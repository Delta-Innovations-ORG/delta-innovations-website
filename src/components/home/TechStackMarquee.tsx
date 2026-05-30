import React from 'react';
import { motion } from 'framer-motion';
import { techStackItems } from '../../content/techStack';
import { SectionHeading } from '../ui/SectionHeading';

export function TechStackMarquee() {
  const doubled = [...techStackItems, ...techStackItems];

  return (
    <section className="py-16 lg:py-20 relative overflow-hidden border-y border-brand-cyan/10 bg-brand-navy/50">
      <div className="container mx-auto px-6 lg:px-8 mb-10">
        <SectionHeading
          badge="Tech Stack"
          title="Tools we ship with"
          description="Modern, proven technologies across web, mobile, cloud, AI, and DevOps."
          align="center"
        />
      </div>
      <div className="relative">
        <motion.div
          className="flex gap-4 w-max"
          animate={{ x: ['0%', '-50%'] }}
          transition={{ duration: 40, repeat: Infinity, ease: 'linear' }}
        >
          {doubled.map((item, index) => (
            <div
              key={`${item.name}-${index}`}
              className="shrink-0 px-5 py-3 rounded-xl glass-card border border-brand-cyan/15 min-w-[140px] text-center"
            >
              <span className="block text-sm font-semibold text-brand-light">{item.name}</span>
              <span className="block text-xs text-brand-muted mt-0.5">{item.category}</span>
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
