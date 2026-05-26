import React from 'react';
import { motion } from 'framer-motion';
import { howWeWorkSteps } from '../../content/siteConfig';
import { SectionHeading } from '../ui/SectionHeading';

export function HowWeWork() {
  return (
    <section className="py-20 lg:py-28 bg-brand-navyLight/30 relative">
      <div className="container mx-auto px-6 lg:px-8">
        <SectionHeading
          badge="How We Work"
          title="A disciplined process from idea to production"
          description="Five clear steps — so you always know where your project stands."
        />
        <div className="grid md:grid-cols-2 lg:grid-cols-5 gap-6">
          {howWeWorkSteps.map((step, index) => (
            <motion.div
              key={step.step}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.08 }}
              className="glass-card p-6 relative group hover:border-brand-cyan/40 transition-colors"
            >
              <span className="text-3xl font-bold text-gradient-brand mb-3 block">{step.step}</span>
              <h3 className="text-lg font-bold text-brand-light mb-2">{step.title}</h3>
              <p className="text-sm text-brand-muted leading-relaxed">{step.description}</p>
              {index < howWeWorkSteps.length - 1 && (
                <div className="hidden lg:block absolute top-1/2 -right-3 w-6 h-0.5 bg-brand-cyan/30" />
              )}
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
