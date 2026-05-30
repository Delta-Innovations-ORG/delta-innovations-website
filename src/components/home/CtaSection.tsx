import React from 'react';
import { motion } from 'framer-motion';
import { MessageCircle, Package } from 'lucide-react';
import { Button } from '../ui/Button';
import { siteConfig } from '../../content/siteConfig';
import { toWhatsAppUrl } from '../../utils/phone';

export function CtaSection() {
  const whatsappUrl = toWhatsAppUrl(siteConfig.phones.pakistan.whatsapp);

  return (
    <section className="py-20 lg:py-24 relative overflow-hidden section-tint-emerald">
      <motion.div
        className="absolute inset-0 bg-brand-gradient-subtle animate-gradientShift"
        style={{ backgroundSize: '200% 200%' }}
        aria-hidden
      />
      <div className="container mx-auto px-6 lg:px-8 text-center max-w-3xl relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          <h2 className="text-3xl lg:text-4xl font-bold text-brand-light mb-4 font-display">
            Ready to build your digital product?
          </h2>
        </motion.div>
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.1 }}
          className="text-brand-muted text-lg mb-4 leading-relaxed"
        >
          Share your requirements for a custom build, or explore our marketplace for starter kits
          and integration packs.
        </motion.p>
        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.15 }}
          className="text-sm text-brand-muted mb-8"
        >
          {siteConfig.emails.contact} · {siteConfig.emails.projects}
        </motion.p>
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.2 }}
          className="flex flex-wrap justify-center gap-4"
        >
          <Button to="/contact" size="lg" className="hover-border-trace">
            Start Your Project
          </Button>
          <Button to="/marketplace" variant="secondary" size="lg" className="hover-border-trace">
            <Package size={18} />
            Browse Marketplace
          </Button>
          <Button href={whatsappUrl} variant="outline" size="lg" className="hover-border-trace">
            <MessageCircle size={18} />
            WhatsApp Us
          </Button>
        </motion.div>
      </div>
    </section>
  );
}
