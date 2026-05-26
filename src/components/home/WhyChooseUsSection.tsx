import React from 'react';
import { motion } from 'framer-motion';
import { CheckCircle } from 'lucide-react';
import { SectionHeading } from '../ui/SectionHeading';
import { stats, whyChooseUs } from '../../content/siteConfig';
import { OrbitalBackground } from '../effects/OrbitalBackground';

export function WhyChooseUsSection() {
  return (
    <section className="py-20 lg:py-28 relative overflow-hidden bg-brand-navyLight/40 section-tint-emerald">
      <OrbitalBackground className="opacity-50" />
      <div className="container mx-auto px-6 lg:px-8 relative z-10">
        <SectionHeading
          badge="Why Delta Innovations"
          title="We do not just write code — we engineer products properly"
          description="Clear scope, secure development, transparent delivery, and long-term support."
        />

        <div className="grid md:grid-cols-2 gap-6 lg:gap-8 mb-16">
          {whyChooseUs.map((item, index) => (
            <motion.div
              key={item.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              className="glass-card p-6 lg:p-8 hover-border-trace hover-lift-glow transition-colors"
            >
              <h3 className="text-xl font-bold text-brand-cyan mb-3">{item.title}</h3>
              <p className="text-brand-muted text-sm leading-relaxed mb-4">{item.description}</p>
              <ul className="space-y-2">
                {item.features.map((feature) => (
                  <li key={feature} className="flex items-center gap-2 text-sm text-brand-muted">
                    <CheckCircle size={14} className="text-brand-emerald shrink-0" />
                    {feature}
                  </li>
                ))}
              </ul>
            </motion.div>
          ))}
        </div>

        <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
          {stats.map((stat, index) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.08 }}
              className="text-center p-6 rounded-2xl bg-brand-cyan/5 border border-brand-cyan/20"
            >
              <div className="text-3xl lg:text-4xl font-bold text-gradient-brand mb-2">{stat.value}</div>
              <p className="text-sm text-brand-muted">{stat.label}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
