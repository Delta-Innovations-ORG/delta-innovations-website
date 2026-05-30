import type { VercelRequest, VercelResponse } from '@vercel/node';
import { marketplaceConfig } from '../../../src/content/marketplace';
import { getGithubToken } from '../../_lib/loadEnv';
import { CACHE_TTL, getCached, setCached } from '../../_lib/memoryCache';
import { readmeCacheKey, resolveGithubRepoName } from '../../_lib/resolveGithubRepo';
import { getClientIp, isRateLimited } from '../../_lib/rateLimit';

type ReadmePayload = {
  markdown: string;
  repo: string;
  fullName: string;
};

export default async function handler(req: VercelRequest, res: VercelResponse) {
  if (req.method !== 'GET') {
    res.setHeader('Allow', 'GET');
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const ip = getClientIp(req);
  if (isRateLimited(ip)) {
    return res.status(429).json({ error: 'Too many requests. Please try again later.' });
  }

  const repo = typeof req.query.repo === 'string' ? req.query.repo.trim() : '';
  if (!repo || !/^[a-zA-Z0-9._-]+$/.test(repo)) {
    return res.status(400).json({ error: 'Invalid repo parameter' });
  }

  const resolvedRepo = resolveGithubRepoName(repo);
  const cacheKey = readmeCacheKey(repo);
  const cached = getCached<ReadmePayload>(cacheKey);
  if (cached) {
    res.setHeader('Cache-Control', 'public, s-maxage=3600, stale-while-revalidate=86400');
    res.setHeader('X-Cache', 'HIT');
    return res.status(200).json(cached);
  }

  const token = getGithubToken();
  if (!token) {
    return res.status(503).json({ error: 'GITHUB_TOKEN not configured' });
  }

  const { githubUsername } = marketplaceConfig;
  const headers: HeadersInit = {
    Accept: 'application/vnd.github.raw',
    'X-GitHub-Api-Version': '2022-11-28',
    Authorization: `Bearer ${token}`,
    'User-Agent': 'Delta-Innovations-Website',
  };

  try {
    const response = await fetch(
      `https://api.github.com/repos/${githubUsername}/${resolvedRepo}/readme`,
      { headers },
    );

    if (response.status === 404) {
      return res.status(404).json({
        markdown: null,
        message: 'No README found for this project.',
      });
    }

    if (!response.ok) {
      return res.status(response.status).json({ error: 'Failed to fetch README' });
    }

    const markdown = await response.text();
    const payload: ReadmePayload = {
      markdown,
      repo: resolvedRepo,
      fullName: `${githubUsername}/${resolvedRepo}`,
    };
    setCached(cacheKey, payload, CACHE_TTL.readme);
    res.setHeader('Cache-Control', 'public, s-maxage=3600, stale-while-revalidate=86400');
    res.setHeader('X-Cache', 'MISS');
    return res.status(200).json(payload);
  } catch {
    return res.status(502).json({ error: 'Failed to fetch README' });
  }
}
