import type { VercelRequest, VercelResponse } from '@vercel/node';
import { marketplaceConfig } from '../_lib/marketplaceConfig';
import { getGithubToken } from '../_lib/loadEnv';
import { CACHE_TTL, getCached, setCached } from '../_lib/memoryCache';
import { getClientIp, isRateLimited } from '../_lib/rateLimit';

type GithubApiRepo = {
  name: string;
  full_name: string;
  description: string | null;
  language: string | null;
  stargazers_count: number;
  forks_count: number;
  open_issues_count: number;
  updated_at: string;
  topics?: string[];
  fork: boolean;
  archived: boolean;
};

type CatalogRepo = {
  slug: string;
  name: string;
  fullName: string;
  description: string | null;
  language: string | null;
  stars: number;
  forks: number;
  openIssues: number;
  updatedAt: string;
  topics: string[];
};

const CACHE_KEY = `catalog:${marketplaceConfig.githubUsername}`;

function parseNextLink(linkHeader: string | null): string | null {
  if (!linkHeader) return null;
  const match = linkHeader.match(/<([^>]+)>;\s*rel="next"/);
  return match?.[1] ?? null;
}

async function fetchAllUserRepos(username: string, headers: HeadersInit): Promise<GithubApiRepo[]> {
  const all: GithubApiRepo[] = [];
  let url: string | null =
    `https://api.github.com/users/${username}/repos?per_page=100&sort=updated&type=all`;

  while (url) {
    const response = await fetch(url, { headers });
    if (!response.ok) {
      throw new Error(`GitHub API error: ${response.status}`);
    }
    const page = (await response.json()) as GithubApiRepo[];
    all.push(...page);
    url = parseNextLink(response.headers.get('Link'));
  }

  return all;
}

export default async function handler(req: VercelRequest, res: VercelResponse) {
  if (req.method !== 'GET') {
    res.setHeader('Allow', 'GET');
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const ip = getClientIp(req);
  if (isRateLimited(ip)) {
    return res.status(429).json({ repos: [], error: 'Too many requests. Please try again later.' });
  }

  const cached = getCached<CatalogRepo[]>(CACHE_KEY);
  if (cached) {
    res.setHeader('Cache-Control', 'public, s-maxage=3600, stale-while-revalidate=86400');
    res.setHeader('X-Cache', 'HIT');
    return res.status(200).json({ repos: cached });
  }

  const token = getGithubToken();
  if (!token) {
    return res.status(200).json({ repos: [], warning: 'GITHUB_TOKEN not configured' });
  }

  const headers: HeadersInit = {
    Accept: 'application/vnd.github+json',
    'X-GitHub-Api-Version': '2022-11-28',
    Authorization: `Bearer ${token}`,
    'User-Agent': 'Delta-Innovations-Website',
  };

  try {
    const raw = await fetchAllUserRepos(marketplaceConfig.githubUsername, headers);
    const exclude = new Set(marketplaceConfig.excludeRepos.map((n) => n.toLowerCase()));

    const repos = raw
      .filter((repo) => !repo.fork && !repo.archived && !exclude.has(repo.name.toLowerCase()))
      .map((repo) => ({
        slug: repo.name.toLowerCase(),
        name: repo.name,
        fullName: repo.full_name,
        description: repo.description,
        language: repo.language,
        stars: repo.stargazers_count,
        forks: repo.forks_count,
        openIssues: repo.open_issues_count,
        updatedAt: repo.updated_at,
        topics: repo.topics ?? [],
      }));

    setCached(CACHE_KEY, repos, CACHE_TTL.catalog);
    res.setHeader('Cache-Control', 'public, s-maxage=3600, stale-while-revalidate=86400');
    res.setHeader('X-Cache', 'MISS');
    return res.status(200).json({ repos });
  } catch (error) {
    const message = error instanceof Error ? error.message : 'Failed to fetch repositories';
    return res.status(502).json({ repos: [], error: message });
  }
}
