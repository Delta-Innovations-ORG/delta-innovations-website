import React from 'react';
import { useParams } from 'react-router-dom';
import { getRepoBySlug } from '../content/marketplace';
import { useGithubCatalog, useGithubReadme } from '../hooks/useGithubCatalog';
import { PageHero } from '../components/ui/PageHero';
import { Button } from '../components/ui/Button';
import { MarkdownContent } from '../components/ui/MarkdownContent';

function slugToTitle(slug: string): string {
  return slug.replace(/-/g, ' ').replace(/\b\w/g, (c) => c.toUpperCase());
}

export function MarketplaceDetailPage() {
  const { slug } = useParams<{ slug: string }>();
  const { repos } = useGithubCatalog();
  const repo = slug ? getRepoBySlug(repos, slug) : undefined;
  const { markdown, loading: readmeLoading, error: readmeError } = useGithubReadme(slug, repos);

  const displayName = repo?.name ?? (slug ? slugToTitle(slug) : 'Project');
  const displayDescription =
    repo?.description ??
    'Explore this project and contact us for deployment or customization.';
  const displayBadge = repo?.language ?? 'Project';

  if (slug && repos.length > 0 && !repo) {
    return (
      <section className="py-24 container mx-auto px-6 text-center">
        <h1 className="text-2xl font-bold text-brand-light mb-4">Project not found</h1>
        <Button to="/marketplace" variant="secondary">
          Back to Marketplace
        </Button>
      </section>
    );
  }

  return (
    <>
      <PageHero badge={displayBadge} title={displayName} description={displayDescription} />
      <section className="py-16 lg:py-24">
        <div className="container mx-auto px-6 lg:px-8 max-w-3xl">
          {repo && repo.topics.length > 0 && (
            <ul className="flex flex-wrap gap-2 mb-8">
              {repo.topics.map((topic) => (
                <li
                  key={topic}
                  className="text-xs px-2.5 py-1 rounded-lg bg-brand-cyan/10 text-brand-cyan border border-brand-cyan/20"
                >
                  {topic}
                </li>
              ))}
            </ul>
          )}

          <div className="flex flex-wrap gap-4 mb-10">
            <Button to={`/contact?product=${slug ?? ''}`} size="lg">
              Contact for {displayName}
            </Button>
            <Button to="/marketplace" variant="outline" size="lg">
              All projects
            </Button>
          </div>

          <h2 className="text-lg font-bold text-brand-light mb-4 font-display">About this project</h2>

          {readmeLoading && (
            <div className="glass-card p-8 animate-pulse">
              <div className="h-4 bg-brand-navyCard rounded w-3/4 mb-3" />
              <div className="h-4 bg-brand-navyCard rounded w-full mb-3" />
              <div className="h-4 bg-brand-navyCard rounded w-5/6" />
            </div>
          )}

          {!readmeLoading && readmeError && (
            <div className="glass-card p-6 text-sm text-brand-mutedLight">{readmeError}</div>
          )}

          {!readmeLoading && markdown && (
            <div className="glass-card p-6 lg:p-8">
              <MarkdownContent markdown={markdown} />
            </div>
          )}

          {!readmeLoading && !markdown && !readmeError && (
            <div className="glass-card p-6 text-sm text-brand-mutedLight">
              No README content available for this project.
            </div>
          )}
        </div>
      </section>
    </>
  );
}
