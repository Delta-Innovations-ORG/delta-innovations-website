import React, { useMemo, useState } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, Package, Search, Star } from 'lucide-react';
import { PageHero } from '../components/ui/PageHero';
import { marketplaceConfig } from '../content/marketplace';
import { useGithubCatalog } from '../hooks/useGithubCatalog';
import { prefetchReadme } from '../lib/githubCatalogCache';
import { Reveal } from '../components/motion/Reveal';
import { Button } from '../components/ui/Button';

type SortOption = 'stars' | 'updated';

function formatDate(dateString: string) {
  return new Date(dateString).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
  });
}

export function MarketplacePage() {
  const { repos, loading, error, warning } = useGithubCatalog();
  const [sortBy, setSortBy] = useState<SortOption>(marketplaceConfig.defaultSort);
  const [filterLanguage, setFilterLanguage] = useState('All');
  const [searchQuery, setSearchQuery] = useState('');

  const languages = useMemo(
    () => ['All', ...new Set(repos.map((r) => r.language).filter(Boolean) as string[])],
    [repos],
  );

  const filteredRepos = useMemo(() => {
    let list = [...repos];

    if (filterLanguage !== 'All') {
      list = list.filter((r) => r.language === filterLanguage);
    }

    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase();
      list = list.filter(
        (r) =>
          r.name.toLowerCase().includes(q) ||
          (r.description?.toLowerCase().includes(q) ?? false),
      );
    }

    list.sort((a, b) => {
      if (sortBy === 'stars') return b.stars - a.stars;
      return new Date(b.updatedAt).getTime() - new Date(a.updatedAt).getTime();
    });

    return list;
  }, [repos, sortBy, filterLanguage, searchQuery]);

  return (
    <>
      <PageHero
        badge="Marketplace"
        title="Products & open-source projects"
        description="Explore our engineering work — templates, SaaS builds, and integration kits. Contact us for licensing, deployment, or custom extensions."
      />
      <section className="py-16 lg:py-24">
        <div className="container mx-auto px-6 lg:px-8">
          <div className="glass-card p-4 md:p-6 mb-10 flex flex-col lg:flex-row gap-4 lg:items-end lg:justify-between">
            <div className="flex-1 max-w-md">
              <label htmlFor="marketplace-search" className="block text-xs font-medium text-brand-mutedLight mb-2">
                Search projects
              </label>
              <div className="relative">
                <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-brand-muted" />
                <input
                  id="marketplace-search"
                  type="search"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Search by name or description…"
                  className="w-full pl-9 pr-4 py-2.5 rounded-xl bg-brand-navyLight/80 border border-brand-cyan/20 text-brand-light placeholder:text-brand-muted focus:border-brand-cyan focus:ring-2 focus:ring-brand-cyan/20 outline-none text-sm"
                />
              </div>
            </div>
            <div className="flex flex-wrap gap-3">
              <div>
                <label htmlFor="marketplace-sort" className="block text-xs font-medium text-brand-mutedLight mb-2">
                  Sort by
                </label>
                <select
                  id="marketplace-sort"
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value as SortOption)}
                  className="px-3 py-2.5 rounded-xl bg-brand-navyLight/80 border border-brand-cyan/20 text-brand-light text-sm outline-none focus:border-brand-cyan"
                >
                  <option value="stars">Stars (high to low)</option>
                  <option value="updated">Last updated</option>
                </select>
              </div>
              <div>
                <label htmlFor="marketplace-lang" className="block text-xs font-medium text-brand-mutedLight mb-2">
                  Language
                </label>
                <select
                  id="marketplace-lang"
                  value={filterLanguage}
                  onChange={(e) => setFilterLanguage(e.target.value)}
                  className="px-3 py-2.5 rounded-xl bg-brand-navyLight/80 border border-brand-cyan/20 text-brand-light text-sm outline-none focus:border-brand-cyan"
                >
                  {languages.map((lang) => (
                    <option key={lang} value={lang}>
                      {lang}
                    </option>
                  ))}
                </select>
              </div>
              {(searchQuery || filterLanguage !== 'All' || sortBy !== marketplaceConfig.defaultSort) && (
                <div className="flex items-end">
                  <button
                    type="button"
                    onClick={() => {
                      setSearchQuery('');
                      setFilterLanguage('All');
                      setSortBy(marketplaceConfig.defaultSort);
                    }}
                    className="px-3 py-2.5 rounded-xl border border-brand-cyan/20 text-brand-mutedLight text-sm hover:border-brand-cyan/50 hover:text-brand-cyan transition-colors"
                  >
                    Reset filters
                  </button>
                </div>
              )}
            </div>
          </div>

          {warning && (
            <div className="glass-card p-6 mb-6 border border-brand-amber/30 bg-brand-amber/5">
              <p className="text-sm font-medium text-brand-amber mb-2">{warning}</p>
              <p className="text-sm text-brand-mutedLight leading-relaxed">
                Add <code className="text-brand-cyan">GITHUB_TOKEN</code> to{' '}
                <strong className="text-brand-light">.env.local</strong> and the Vercel Dashboard
                (Development + Production). Then fully restart{' '}
                <code className="text-brand-cyan">npm run dev:api</code> — editing{' '}
                <code className="text-brand-cyan">.env.local</code> alone does not reload API env.
                Verify at{' '}
                <a href="/api/catalog/github" className="text-brand-cyan hover:underline">
                  /api/catalog/github
                </a>
                .
              </p>
            </div>
          )}

          {loading && (
            <div className="grid md:grid-cols-2 gap-6 lg:gap-8">
              {Array.from({ length: 4 }).map((_, i) => (
                <div key={i} className="glass-card p-6 lg:p-8 h-48 animate-pulse bg-brand-navyCard/50" />
              ))}
            </div>
          )}

          {!loading && error && (
            <div className="glass-card p-8 text-center">
              <p className="text-brand-light font-medium mb-2">Could not load projects</p>
              <p className="text-sm text-brand-mutedLight">{error}</p>
            </div>
          )}

          {!loading && !error && filteredRepos.length === 0 && !warning && (
            <div className="glass-card p-8 text-center">
              <p className="text-brand-light font-medium mb-2">No projects match your filters</p>
              <p className="text-sm text-brand-mutedLight">Try resetting filters or adjusting your search.</p>
            </div>
          )}

          {!loading && !error && filteredRepos.length > 0 && (
            <div className="grid md:grid-cols-2 gap-6 lg:gap-8">
              {filteredRepos.map((repo, index) => (
                <Reveal key={repo.slug} delay={index * 0.04}>
                  <article
                    className="glass-card p-6 lg:p-8 h-full flex flex-col"
                    onMouseEnter={() => prefetchReadme(repo.name, repo.slug)}
                    onFocus={() => prefetchReadme(repo.name, repo.slug)}
                  >
                    <div className="flex items-start gap-3">
                      <div className="w-10 h-10 rounded-xl bg-brand-gradient flex items-center justify-center shrink-0">
                        <Package size={20} className="text-brand-navy" />
                      </div>
                      <div className="min-w-0 flex-1">
                        <h2 className="text-xl font-bold text-brand-light truncate">{repo.name}</h2>
                        <p className="text-sm text-brand-mutedLight mt-1 line-clamp-2">
                          {repo.description || 'No description available.'}
                        </p>
                      </div>
                    </div>

                    <div className="flex flex-wrap gap-2 mt-4 text-xs">
                      {repo.language && (
                        <span className="px-2.5 py-1 rounded-lg bg-brand-cyan/10 text-brand-cyan border border-brand-cyan/20">
                          {repo.language}
                        </span>
                      )}
                      <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-lg bg-brand-navyCard border border-brand-cyan/15 text-brand-mutedLight">
                        <Star size={12} className="text-brand-amber" />
                        {repo.stars}
                      </span>
                      <span className="px-2.5 py-1 rounded-lg bg-brand-navyCard border border-brand-cyan/15 text-brand-mutedLight">
                        Updated {formatDate(repo.updatedAt)}
                      </span>
                    </div>

                    {repo.topics.length > 0 && (
                      <ul className="flex flex-wrap gap-2 mt-3">
                        {repo.topics.slice(0, 4).map((topic) => (
                          <li
                            key={topic}
                            className="text-xs px-2 py-1 rounded-lg bg-brand-navyCard border border-brand-cyan/15 text-brand-muted"
                          >
                            {topic}
                          </li>
                        ))}
                      </ul>
                    )}

                    <div className="flex flex-wrap gap-3 mt-auto pt-4">
                      <Button to={`/marketplace/${repo.slug}`} size="sm">
                        View details
                        <ArrowRight size={14} />
                      </Button>
                      <Button
                        to={`/contact?product=${repo.slug}`}
                        variant="outline"
                        size="sm"
                      >
                        Contact for access
                      </Button>
                    </div>
                  </article>
                </Reveal>
              ))}
            </div>
          )}

          <p className="text-center text-sm text-brand-mutedLight mt-12">
            Need a custom build?{' '}
            <Link to="/contact" className="text-brand-cyan hover:text-brand-emeraldLight">
              Start a project
            </Link>
          </p>
        </div>
      </section>
    </>
  );
}
