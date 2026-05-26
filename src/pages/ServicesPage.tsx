import React from 'react';
import { PageHero } from '../components/ui/PageHero';
import { SectionHeading } from '../components/ui/SectionHeading';
import { ServiceCard } from '../components/ui/ServiceCard';
import { services } from '../content/services';
import { Button } from '../components/ui/Button';

export function ServicesPage() {
  return (
    <>
      <PageHero
        badge="Services"
        title="End-to-end software solutions for growing businesses"
        description="Web, mobile, cloud, AI, data, DevOps, security, and design — delivered with written scope and transparent milestones."
      />
      <section className="py-16 lg:py-24">
        <div className="container mx-auto px-6 lg:px-8">
          <SectionHeading
            title="Our service catalog"
            description="Ten specialized areas to support your product from idea to production."
            align="left"
          />
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
            {services.map((service, index) => (
              <ServiceCard key={service.id} service={service} index={index} />
            ))}
          </div>
          <div className="mt-16 glass-card p-8 lg:p-12 text-center">
            <h3 className="text-2xl font-bold text-brand-light mb-4">Not sure which service you need?</h3>
            <p className="text-brand-muted mb-6 max-w-xl mx-auto">
              Send us your requirements and we will recommend the right approach, stack, and timeline.
            </p>
            <Button to="/contact">Request a Consultation</Button>
          </div>
        </div>
      </section>
    </>
  );
}
