import React from 'react';
import { SectionHeading } from '../ui/SectionHeading';
import { ServiceCard } from '../ui/ServiceCard';
import { services } from '../../content/services';
import { Button } from '../ui/Button';
import { ArrowRight } from 'lucide-react';

const outcomeHighlights: Record<string, string> = {
  web: 'Launch faster with SEO-ready, conversion-focused websites.',
  mobile: 'Reach customers on iOS, Android, and cross-platform apps.',
  backend: 'Power your product with secure, scalable APIs.',
  devops: 'Ship confidently with CI/CD and cloud deployment.',
  ai: 'Automate decisions with AI integrated into your workflow.',
  data: 'Turn data into dashboards and actionable business insights.',
};

export function ServicesPreview() {
  const featured = services.filter((s) => !s.comingSoon).slice(0, 6).map((s) => ({
    ...s,
    description: outcomeHighlights[s.id] || s.description,
  }));

  return (
    <section className="py-20 lg:py-28 relative">
      <div className="container mx-auto px-6 lg:px-8">
        <SectionHeading
          badge="Our Services"
          title="Technology that drives business outcomes"
          description="We lead with business value — web, mobile, AI, cloud, data, and security delivered with written scope and transparent milestones."
        />
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8 mb-12">
          {featured.map((service, index) => (
            <ServiceCard key={service.id} service={service} index={index} />
          ))}
        </div>
        <div className="text-center">
          <Button to="/services" variant="secondary">
            View All Services
            <ArrowRight size={18} />
          </Button>
        </div>
      </div>
    </section>
  );
}
