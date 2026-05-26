import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import {
  ArrowUp,
  ArrowRight,
  Github,
  Linkedin,
  Mail,
  MapPin,
  MessageCircle,
  Phone,
} from 'lucide-react';
import { footerPolicyLinks, navLinks, siteConfig } from '../../content/siteConfig';
import { services } from '../../content/services';
import { toWhatsAppUrl } from '../../utils/phone';
import { Button } from '../ui/Button';
import { Reveal } from '../motion/Reveal';
import { FooterSectionHeading } from './footer/FooterSectionHeading';
import { FooterTextLink, FooterRouterTextLink } from './footer/FooterTextLink';
import { FooterContactCompact } from './footer/FooterContactCompact';

const socialLinks = [
  { icon: Linkedin, href: siteConfig.social.linkedin, label: 'LinkedIn' },
  { icon: Github, href: siteConfig.social.github, label: 'GitHub' },
];

const SERVICE_PREVIEW_COUNT = 4;

export function Footer() {
  const scrollToTop = () => window.scrollTo({ top: 0, behavior: 'smooth' });
  const currentYear = new Date().getFullYear();
  const whatsappPk = toWhatsAppUrl(siteConfig.phones.pakistan.whatsapp);
  const whatsappEg = toWhatsAppUrl(siteConfig.phones.egypt.whatsapp);

  return (
    <footer className="relative overflow-hidden border-t border-brand-cyan/10 bg-brand-navyLight">
      <div className="footer-top-glow" aria-hidden />
      <div className="absolute inset-0 bg-grid-dark opacity-20" aria-hidden />
      <div
        className="pointer-events-none absolute -right-24 top-0 h-48 w-48 rounded-full bg-brand-violet/10 blur-3xl"
        aria-hidden
      />

      {/* Zone A — Compact main grid */}
      <div className="container relative z-10 mx-auto px-6 py-8 lg:px-8 lg:py-10">
        <div className="grid grid-cols-2 gap-6 sm:gap-8 lg:grid-cols-12 lg:gap-8">
          {/* Brand */}
          <Reveal className="col-span-2 lg:col-span-4">
            <Link to="/" className="group inline-flex items-center gap-2.5">
              <img
                src={siteConfig.logo}
                alt=""
                className="h-9 w-auto object-contain transition-transform duration-300 group-hover:scale-105"
              />
              <div className="leading-tight">
                <span className="block font-display text-base font-bold tracking-tight text-brand-light">
                  Delta
                </span>
                <span className="block font-display text-base font-bold tracking-tight text-gradient-brand -mt-0.5">
                  Innovations
                </span>
              </div>
            </Link>
            <p className="mt-3 max-w-xs text-xs leading-relaxed text-brand-muted">
              {siteConfig.tagline}
            </p>
            <p className="mt-1 flex items-center gap-1.5 text-xs text-brand-muted/80">
              <MapPin size={12} className="text-brand-cyan" aria-hidden />
              {siteConfig.locations.join(' · ')}
            </p>
            <div className="mt-4 flex gap-2">
              {socialLinks.map(({ icon: Icon, href, label }) => (
                <motion.a
                  key={label}
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={label}
                  className="footer-social-btn h-9 w-9"
                  whileHover={{ scale: 1.06 }}
                  whileTap={{ scale: 0.96 }}
                >
                  <Icon size={16} />
                </motion.a>
              ))}
            </div>
          </Reveal>

          {/* Explore */}
          <div className="lg:col-span-2">
            <FooterSectionHeading title="Explore" id="footer-explore" />
            <nav aria-labelledby="footer-explore">
              <ul className="flex flex-col gap-1.5">
                {navLinks.map((link) => (
                  <li key={link.path}>
                    <FooterTextLink to={link.path} end={link.path === '/'}>
                      {link.name}
                    </FooterTextLink>
                  </li>
                ))}
              </ul>
            </nav>
          </div>

          {/* Services */}
          <div className="lg:col-span-3">
            <FooterSectionHeading title="Services" id="footer-services" />
            <nav aria-labelledby="footer-services">
              <ul className="flex flex-col gap-1.5">
                {services.slice(0, SERVICE_PREVIEW_COUNT).map((service) => (
                  <li key={service.id}>
                    <FooterRouterTextLink to="/services">{service.title}</FooterRouterTextLink>
                  </li>
                ))}
                <li>
                  <Link
                    to="/services"
                    className="footer-text-link inline-flex items-center gap-1 text-brand-cyan hover:text-brand-emeraldLight"
                  >
                    All services
                    <ArrowRight size={14} aria-hidden />
                  </Link>
                </li>
              </ul>
            </nav>
          </div>

          {/* Contact */}
          <div className="col-span-2 lg:col-span-3">
            <FooterSectionHeading title="Contact" id="footer-contact" />
            <div className="space-y-2">
              <FooterContactCompact icon={Mail}>
                <a
                  href={`mailto:${siteConfig.emails.contact}`}
                  className="break-all text-brand-light hover:text-brand-cyan transition-colors"
                >
                  {siteConfig.emails.contact}
                </a>
              </FooterContactCompact>
              <FooterContactCompact icon={Phone}>
                <span>
                  <a
                    href={`tel:${siteConfig.phones.pakistan.call}`}
                    className="hover:text-brand-cyan transition-colors"
                  >
                    PK {siteConfig.phones.pakistan.call}
                  </a>
                  <span className="mx-1.5 text-brand-muted/40">·</span>
                  <a
                    href={`tel:${siteConfig.phones.egypt.call}`}
                    className="hover:text-brand-cyan transition-colors"
                  >
                    EG {siteConfig.phones.egypt.call}
                  </a>
                </span>
              </FooterContactCompact>
            </div>
            <div className="mt-3 flex flex-wrap items-center gap-2">
              <Button
                href={`mailto:${siteConfig.emails.contact}`}
                variant="secondary"
                size="sm"
                className="!px-3 !py-1.5 !text-xs"
              >
                <Mail size={14} />
                Email
              </Button>
              <Button
                href={whatsappPk}
                variant="outline"
                size="sm"
                className="!px-3 !py-1.5 !text-xs border-brand-emeraldLight/40 text-brand-emeraldLight hover:bg-brand-emeraldLight/10"
              >
                <MessageCircle size={14} />
                WhatsApp
              </Button>
              <a
                href={whatsappEg}
                target="_blank"
                rel="noopener noreferrer"
                className="footer-text-link text-xs text-brand-emeraldLight/90"
              >
                EG WhatsApp
              </a>
            </div>
          </div>
        </div>
      </div>

      {/* Zone B — Bottom bar with inline legal */}
      <div className="relative z-10 border-t border-brand-cyan/10 bg-brand-navy/50">
        <div className="container mx-auto px-6 py-4 lg:px-8">
          <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between lg:gap-6">
            <p className="shrink-0 text-xs text-brand-muted">
              © {currentYear} {siteConfig.name}. All rights reserved.
            </p>

            <nav
              aria-label="Legal and policies"
              className="footer-legal-inline flex flex-1 flex-wrap items-center justify-center gap-x-1 gap-y-2 lg:justify-center"
            >
              {footerPolicyLinks.map((link, index) => (
                <React.Fragment key={link.path}>
                  {index > 0 && (
                    <span className="hidden text-brand-muted/40 md:inline" aria-hidden>
                      ·
                    </span>
                  )}
                  <Link to={link.path} className="footer-legal-link">
                    {link.name}
                  </Link>
                </React.Fragment>
              ))}
            </nav>

            <button
              type="button"
              onClick={scrollToTop}
              aria-label="Scroll to top"
              className="btn-shine hidden shrink-0 items-center gap-1.5 rounded-lg border border-brand-cyan/25 bg-brand-navyCard px-3 py-1.5 text-xs font-medium text-brand-light transition-all duration-300 hover:border-brand-cyan hover:shadow-glow lg:inline-flex"
            >
              <ArrowUp size={16} />
              Top
            </button>
          </div>
        </div>
      </div>

      <button
        type="button"
        onClick={scrollToTop}
        aria-label="Scroll to top"
        className="btn-shine fixed bottom-6 right-6 z-40 flex h-11 w-11 items-center justify-center rounded-xl bg-brand-gradient text-brand-navy shadow-glow transition-all duration-300 hover:scale-105 hover:opacity-95 lg:hidden"
      >
        <ArrowUp size={18} />
      </button>
    </footer>
  );
}
