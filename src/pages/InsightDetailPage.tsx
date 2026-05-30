import React from 'react';
import { useParams } from 'react-router-dom';
import { Clock } from 'lucide-react';
import { getInsightBySlug } from '../content/insights';
import { PageHero } from '../components/ui/PageHero';
import { Button } from '../components/ui/Button';

export function InsightDetailPage() {
  const { slug } = useParams<{ slug: string }>();
  const article = slug ? getInsightBySlug(slug) : undefined;

  if (!article) {
    return (
      <section className="py-24 container mx-auto px-6 text-center">
        <h1 className="text-2xl font-bold text-brand-light mb-4">Article not found</h1>
        <Button to="/insights" variant="secondary">
          Back to Insights
        </Button>
      </section>
    );
  }

  return (
    <>
      <PageHero
        badge={article.category}
        title={article.title}
        description={article.excerpt}
      />
      <section className="py-16 lg:py-24">
        <div className="container mx-auto px-6 lg:px-8 max-w-3xl">
          <p className="flex items-center gap-2 text-sm text-brand-muted mb-8">
            <Clock size={14} aria-hidden />
            {article.publishedAt} · {article.readMinutes} min read
          </p>
          <div className="space-y-6">
            {article.body.map((paragraph) => (
              <p key={paragraph} className="text-brand-muted leading-relaxed">
                {paragraph}
              </p>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
