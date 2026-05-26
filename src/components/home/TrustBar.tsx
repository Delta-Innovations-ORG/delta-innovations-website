import React from 'react';
import { motion } from 'framer-motion';
import { trustBarItems } from '../../content/siteConfig';

export function TrustBar() {
  return (
    <section className="py-8 border-y border-brand-cyan/10 bg-brand-navyLight/50 section-tint-cyan">
      <div className="container mx-auto px-6 lg:px-8">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
          {trustBarItems.map((item, index) => (
            <motion.div
              key={item.label}
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              className="text-center"
            >
              <p className="text-sm font-semibold text-brand-light">{item.label}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
