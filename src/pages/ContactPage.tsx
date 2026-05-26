import React from 'react';
import { MapPin, Phone, Mail, Clock, MessageCircle } from 'lucide-react';
import { usePageTitle } from '../hooks/usePageTitle';
import { PageHero } from '../components/ui/PageHero';
import { ContactForm } from '../components/contact/ContactForm';
import { siteConfig } from '../content/siteConfig';
import { toWhatsAppUrl } from '../utils/phone';

export function ContactPage() {
  usePageTitle('Contact');
  const { pakistan, egypt } = siteConfig.phones;

  return (
    <>
      <PageHero
        badge="Contact"
        title="Let's discuss your project"
        description="Share your requirements and we will respond with a clear scope, timeline, and proposal."
      />
      <section className="py-16 lg:py-24">
        <div className="container mx-auto px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12 lg:gap-16">
            <div>
              <h2 className="text-2xl font-bold text-brand-light mb-6">Send us a message</h2>
              <ContactForm />
            </div>
            <div className="space-y-6">
              <h2 className="text-2xl font-bold text-brand-light mb-2">Get in touch</h2>
              <p className="text-brand-muted text-sm mb-8">
                Prefer WhatsApp or email? Reach us directly using the details below.
              </p>

              <div className="flex gap-4 p-5 glass-card">
                <div className="w-12 h-12 rounded-xl bg-brand-gradient flex items-center justify-center shrink-0">
                  <MapPin size={22} className="text-brand-navy" />
                </div>
                <div>
                  <h3 className="font-semibold text-brand-light mb-1">Locations</h3>
                  <p className="text-sm text-brand-muted">{siteConfig.locations.join(' & ')}</p>
                </div>
              </div>

              <div className="flex gap-4 p-5 glass-card">
                <div className="w-12 h-12 rounded-xl bg-brand-gradient flex items-center justify-center shrink-0">
                  <Phone size={22} className="text-brand-navy" />
                </div>
                <div>
                  <h3 className="font-semibold text-brand-light mb-1">Call / SMS</h3>
                  <p className="text-sm text-brand-muted">
                    <a href={`tel:${pakistan.call}`} className="hover:text-brand-cyan block">
                      PK: {pakistan.call}
                    </a>
                    <a href={`tel:${egypt.call}`} className="hover:text-brand-cyan block">
                      EG: {egypt.call}
                    </a>
                  </p>
                </div>
              </div>

              <div className="flex gap-4 p-5 glass-card">
                <div className="w-12 h-12 rounded-xl bg-brand-emerald/20 flex items-center justify-center shrink-0">
                  <MessageCircle size={22} className="text-brand-emeraldLight" />
                </div>
                <div>
                  <h3 className="font-semibold text-brand-light mb-1">WhatsApp</h3>
                  <p className="text-sm text-brand-muted">
                    <a
                      href={toWhatsAppUrl(pakistan.whatsapp)}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="hover:text-brand-emeraldLight block"
                    >
                      PK: {pakistan.whatsapp}
                    </a>
                    <a
                      href={toWhatsAppUrl(egypt.whatsapp)}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="hover:text-brand-emeraldLight block"
                    >
                      EG: {egypt.whatsapp}
                    </a>
                  </p>
                </div>
              </div>

              <div className="flex gap-4 p-5 glass-card">
                <div className="w-12 h-12 rounded-xl bg-brand-gradient flex items-center justify-center shrink-0">
                  <Mail size={22} className="text-brand-navy" />
                </div>
                <div>
                  <h3 className="font-semibold text-brand-light mb-1">Email</h3>
                  <p className="text-sm text-brand-muted">
                    <a href={`mailto:${siteConfig.emails.contact}`} className="hover:text-brand-cyan block">
                      {siteConfig.emails.contact}
                    </a>
                    <a href={`mailto:${siteConfig.emails.projects}`} className="hover:text-brand-cyan block">
                      {siteConfig.emails.projects}
                    </a>
                  </p>
                </div>
              </div>

              <div className="flex gap-4 p-5 glass-card">
                <div className="w-12 h-12 rounded-xl bg-brand-gradient flex items-center justify-center shrink-0">
                  <Clock size={22} className="text-brand-navy" />
                </div>
                <div>
                  <h3 className="font-semibold text-brand-light mb-1">Business Hours</h3>
                  <p className="text-sm text-brand-muted">Mon – Fri: 9:00 AM – 6:00 PM</p>
                  <p className="text-xs text-brand-muted">PK & EG time zones</p>
                </div>
              </div>

              <div className="grid sm:grid-cols-2 gap-3">
                <a
                  href={toWhatsAppUrl(pakistan.whatsapp)}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-center gap-2 py-4 rounded-xl bg-brand-emerald text-white font-semibold hover:bg-brand-emeraldLight transition-colors"
                >
                  <MessageCircle size={20} />
                  WhatsApp — PK
                </a>
                <a
                  href={toWhatsAppUrl(egypt.whatsapp)}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-center gap-2 py-4 rounded-xl bg-brand-emerald/80 text-white font-semibold hover:bg-brand-emeraldLight transition-colors"
                >
                  <MessageCircle size={20} />
                  WhatsApp — EG
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
