import React from 'react';
import { Quote } from 'lucide-react';
import { PageHero } from '../components/ui/PageHero';
import { testimonials } from '../content/testimonials';
import { Reveal } from '../components/motion/Reveal';

export function ReviewsPage() {
  return (
    <>
      <PageHero
        badge="Reviews"
        title="What clients say"
        description="Feedback from partners we have supported on web, mobile, cloud, and AI delivery."
      />
      <section className="py-16 lg:py-24">
        <div className="container mx-auto px-6 lg:px-8">
          <div className="grid md:grid-cols-2 gap-6 lg:gap-8 max-w-5xl mx-auto">
            {testimonials.map((item, index) => (
              <Reveal key={item.id} delay={index * 0.06}>
                <blockquote className="glass-card p-6 lg:p-8">
                  <Quote size={24} className="text-brand-cyan/60 mb-3" aria-hidden />
                  <p className="text-brand-muted text-sm leading-relaxed">&ldquo;{item.quote}&rdquo;</p>
                  <footer className="mt-5 pt-4 border-t border-brand-cyan/10">
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
        </div>
      </section>
    </>
  );
}
