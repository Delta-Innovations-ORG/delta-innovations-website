export type InsightArticle = {
  slug: string;
  title: string;
  excerpt: string;
  category: string;
  publishedAt: string;
  readMinutes: number;
  body: string[];
};

export const insightArticles: InsightArticle[] = [
  {
    slug: 'written-requirements-before-code',
    title: 'Why Written Requirements Come Before Code',
    excerpt:
      'Clear scope documents prevent timeline disputes, reduce rework, and set fair expectations for both clients and engineering teams.',
    category: 'Delivery',
    publishedAt: '2025-03-01',
    readMinutes: 5,
    body: [
      'Every successful project starts with documented goals, features, constraints, and acceptance criteria.',
      'Verbal agreements are useful for discovery, but written requirements become the contract for delivery.',
      'Delta Innovations uses a structured requirements template so clients know exactly what to provide before development begins.',
    ],
  },
  {
    slug: 'secure-defaults-for-saas',
    title: 'Secure Defaults for SaaS and Client Portals',
    excerpt:
      'Environment variables, HTTPS, least-privilege access, and secret hygiene are non-negotiable for production systems.',
    category: 'Security',
    publishedAt: '2025-04-12',
    readMinutes: 6,
    body: [
      'Never commit API keys or private credentials to repositories.',
      'Use server-side handlers for sensitive operations like email and payments.',
      'Apply authentication, rate limiting, and monitoring from day one—not as an afterthought.',
    ],
  },
  {
    slug: 'github-workflow-for-clients',
    title: 'A Transparent GitHub Workflow Clients Can Trust',
    excerpt:
      'Version control, pull requests, and milestone branches give clients visibility into progress without micromanaging.',
    category: 'Process',
    publishedAt: '2025-05-08',
    readMinutes: 4,
    body: [
      'We organize work in GitHub with clear branches, reviews, and release tags.',
      'Clients receive updates tied to tangible commits and demo-ready milestones.',
      'This approach scales from MVPs to long-term product partnerships.',
    ],
  },
];

export function getInsightBySlug(slug: string): InsightArticle | undefined {
  return insightArticles.find((a) => a.slug === slug);
}
