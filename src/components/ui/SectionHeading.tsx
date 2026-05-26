import React from 'react';
import { motion } from 'framer-motion';

type SectionHeadingProps = {
  badge?: string;
  title: string;
  description?: string;
  align?: 'left' | 'center';
};

export function SectionHeading({
  badge,
  title,
  description,
  align = 'center',
}: SectionHeadingProps) {
  const alignClass = align === 'center' ? 'text-center mx-auto' : 'text-left';

  return (
    <div className={`max-w-3xl mb-12 lg:mb-16 ${alignClass}`}>
      {badge && (
        <motion.span
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.45 }}
          className="inline-block px-4 py-1.5 rounded-full text-sm font-semibold mb-4 bg-brand-cyan/10 text-brand-cyan border border-brand-cyan/25"
        >
          {badge}
        </motion.span>
      )}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
      >
        <h2 className="text-3xl lg:text-4xl xl:text-5xl font-bold leading-tight mb-4 text-brand-light font-display">
          {title}
        </h2>
      </motion.div>
      {description && (
        <motion.p
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.16 }}
          className="text-lg leading-relaxed text-brand-muted"
        >
          {description}
        </motion.p>
      )}
    </div>
  );
}
