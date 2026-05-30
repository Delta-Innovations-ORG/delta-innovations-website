import React from 'react';
import { motion } from 'framer-motion';
import type { Service } from '../../content/services';
import { Clock } from 'lucide-react';
import { HoverGlowCard } from '../effects/HoverGlowCard';

type ServiceCardProps = {
  service: Service;
  index?: number;
};

export function ServiceCard({ service, index = 0 }: ServiceCardProps) {
  return (
    <motion.article
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-40px' }}
      transition={{ duration: 0.5, delay: index * 0.06 }}
      whileHover={{ y: -6 }}
      className="h-full"
    >
      <HoverGlowCard
        className={`relative hover-border-trace p-6 lg:p-8 group h-full ${
          service.comingSoon ? 'border-brand-emerald/30' : ''
        }`}
      >
        {service.comingSoon && (
          <span className="absolute top-4 right-4 z-20 inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-semibold bg-brand-emerald/20 text-brand-emeraldLight border border-brand-emerald/30">
            <Clock size={12} />
            Coming Soon
          </span>
        )}
        <div className="w-12 h-12 rounded-xl bg-brand-gradient flex items-center justify-center mb-5 shadow-glow group-hover:shadow-glow-green transition-shadow">
          <span className="text-brand-navy font-bold text-lg">{service.title.charAt(0)}</span>
        </div>
        <h3 className="text-xl font-bold text-brand-light mb-3 pr-16 font-display">{service.title}</h3>
        <p className="text-brand-muted text-sm leading-relaxed mb-5">{service.description}</p>
        <ul className="flex flex-wrap gap-2">
          {service.features.map((feature) => (
            <li
              key={feature}
              className="text-xs font-medium px-3 py-1 rounded-full bg-brand-cyan/10 text-brand-cyan border border-brand-cyan/20"
            >
              {feature}
            </li>
          ))}
        </ul>
      </HoverGlowCard>
    </motion.article>
  );
}
