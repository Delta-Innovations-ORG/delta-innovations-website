import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, Clock } from 'lucide-react';
import { PageHero } from '../components/ui/PageHero';
import { insightArticles } from '../content/insights';
import { Reveal } from '../components/motion/Reveal';

export function InsightsPage() {
  return (
    <>
      <PageHero
        badge="Insights"
        title="Engineering notes & delivery practices"
        description="Articles on scope, security, and transparent delivery from the Delta Innovations team."
      />
      <section className="py-16 lg:py-24">
        <div className="container mx-auto px-6 lg:px-8 max-w-4xl">
          <ul className="space-y-6">
            {insightArticles.map((article, index) => (
              <Reveal key={article.slug} delay={index * 0.06}>
                <li>
                  <Link
                    to={`/insights/${article.slug}`}
                    className="glass-card block p-6 lg:p-8 group hover:border-brand-cyan/40 transition-colors"
                  >
                    <span className="text-xs font-medium text-brand-cyan uppercase tracking-wide">
                      {article.category}
                    </span>
                    <h2 className="text-xl font-bold text-brand-light mt-2 group-hover:text-brand-cyan transition-colors">
                      {article.title}
                    </h2>
                    <p className="text-brand-muted text-sm mt-2 leading-relaxed">{article.excerpt}</p>
                    <div className="flex items-center gap-4 mt-4 text-xs text-brand-muted">
                      <span>{article.publishedAt}</span>
                      <span className="flex items-center gap-1">
                        <Clock size={12} aria-hidden />
                        {article.readMinutes} min read
                      </span>
                      <span className="inline-flex items-center gap-1 text-brand-cyan ml-auto">
                        Read more
                        <ArrowRight size={14} className="group-hover:translate-x-0.5 transition-transform" />
                      </span>
                    </div>
                  </Link>
                </li>
              </Reveal>
            ))}
          </ul>
        </div>
      </section>
    </>
  );
}
