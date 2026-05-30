import type { VercelRequest } from '@vercel/node';

const rateLimitMap = new Map<string, { count: number; resetAt: number }>();

export function getClientIp(req: VercelRequest): string {
  const forwarded = req.headers['x-forwarded-for'];
  if (typeof forwarded === 'string') return forwarded.split(',')[0]?.trim() ?? 'unknown';
  if (Array.isArray(forwarded)) return forwarded[0] ?? 'unknown';
  return req.socket?.remoteAddress ?? 'unknown';
}

export function isRateLimited(
  ip: string,
  limit = 60,
  windowMs = 15 * 60 * 1000,
): boolean {
  const now = Date.now();
  const entry = rateLimitMap.get(ip);
  if (!entry || now > entry.resetAt) {
    rateLimitMap.set(ip, { count: 1, resetAt: now + windowMs });
    return false;
  }
  entry.count += 1;
  return entry.count > limit;
}
