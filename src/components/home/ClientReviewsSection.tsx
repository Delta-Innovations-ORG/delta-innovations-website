import React from 'react';
import { Quote } from 'lucide-react';
import { featuredTestimonialIds, testimonials } from '../../content/testimonials';
import { SectionHeading } from '../ui/SectionHeading';
import { Button } from '../ui/Button';
import { Reveal } from '../motion/Reveal';

export function ClientReviewsSection() {
  const featured = testimonials.filter((t) => featuredTestimonialIds.includes(t.id));

  return (
    <section className="py-20 lg:py-28 relative section-tint-violet">
      <div className="container mx-auto px-6 lg:px-8">
        <SectionHeading
          badge="Client Reviews"
          title="Trusted by growing businesses"
          description="Feedback from founders and technical leads we have partnered with on web, mobile, and cloud delivery."
        />
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
          {featured.map((item, index) => (
            <Reveal key={item.id} delay={index * 0.08}>
              <blockquote className="glass-card p-6 lg:p-8 h-full flex flex-col">
                <Quote size={28} className="text-brand-cyan/60 mb-4" aria-hidden />
                <p className="text-brand-muted text-sm leading-relaxed flex-1">&ldquo;{item.quote}&rdquo;</p>
                <footer className="mt-6 pt-4 border-t border-brand-cyan/10">
                  <cite className="not-italic">
                    <span className="block font-semibold text-brand-light">{item.author}</span>
                    <span className="block text-xs text-brand-muted mt-0.5">
                      {item.role} · {item.company} · {item.region}
                    </span>
                  </cite>
                </footer>
              </blockquote>
            </Reveal>
          ))}
        </div>
        <div className="text-center mt-10">
          <Button to="/reviews" variant="secondary">
            Read All Reviews
          </Button>
        </div>
      </div>
    </section>
  );
}
