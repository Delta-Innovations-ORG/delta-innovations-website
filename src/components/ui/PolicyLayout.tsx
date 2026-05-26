import React from 'react';
import { PageHero } from './PageHero';
import type { PolicyPage } from '../../content/policies';

type PolicyLayoutProps = {
  policy: PolicyPage;
};

export function PolicyLayout({ policy }: PolicyLayoutProps) {
  return (
    <>
      <PageHero
        title={policy.title}
        description={policy.description}
        badge={policy.effectiveDate ? `Effective ${policy.effectiveDate}` : 'Legal'}
      />
      <section className="py-16 lg:py-24 bg-brand-navy">
        <div className="container mx-auto px-6 lg:px-8 max-w-3xl">
          <div className="space-y-10">
            {policy.sections.map((section) => (
              <div key={section.title} className="glass-card p-6 lg:p-8">
                <h2 className="text-xl font-bold text-brand-light mb-4">{section.title}</h2>
                {Array.isArray(section.content) ? (
                  <ul className="space-y-2 text-brand-muted leading-relaxed list-disc list-inside">
                    {section.content.map((item) => (
                      <li key={item}>{item}</li>
                    ))}
                  </ul>
                ) : (
                  <p className="text-brand-muted leading-relaxed">{section.content}</p>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
