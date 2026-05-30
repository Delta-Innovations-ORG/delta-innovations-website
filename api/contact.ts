import type { VercelRequest, VercelResponse } from '@vercel/node';
import { z } from 'zod';
import {
  getEmailJsConfig,
  getMissingEmailJsEnvKeys,
  isEmailJsConfigured,
} from './_lib/loadEnv';

const contactSchema = z.object({
  name: z.string().min(1).max(200),
  email: z.string().email().max(320),
  phone: z.string().min(1).max(50),
  company: z.string().min(1).max(200),
  country: z.string().min(1).max(100),
  projectType: z.string().min(1).max(100),
  budgetRange: z.string().min(1).max(100),
  timeline: z.string().min(1).max(100),
  message: z.string().min(1).max(5000),
  product: z.string().max(100).optional(),
  website: z.string().max(0).optional(),
});

const rateLimitMap = new Map<string, { count: number; resetAt: number }>();
const RATE_LIMIT = 5;
const RATE_WINDOW_MS = 15 * 60 * 1000;

function getClientIp(req: VercelRequest): string {
  const forwarded = req.headers['x-forwarded-for'];
  if (typeof forwarded === 'string') return forwarded.split(',')[0]?.trim() ?? 'unknown';
  if (Array.isArray(forwarded)) return forwarded[0] ?? 'unknown';
  return req.socket?.remoteAddress ?? 'unknown';
}

function isRateLimited(ip: string): boolean {
  const now = Date.now();
  const entry = rateLimitMap.get(ip);
  if (!entry || now > entry.resetAt) {
    rateLimitMap.set(ip, { count: 1, resetAt: now + RATE_WINDOW_MS });
    return false;
  }
  entry.count += 1;
  return entry.count > RATE_LIMIT;
}

const EMAILJS_SEND_URL = 'https://api.emailjs.com/api/v1.0/email/send';

function isDevEnvironment(): boolean {
  return process.env.NODE_ENV !== 'production' && process.env.VERCEL_ENV !== 'production';
}

export default async function handler(req: VercelRequest, res: VercelResponse) {
  if (req.method === 'GET') {
    return res.status(200).json({ configured: isEmailJsConfigured() });
  }

  if (req.method !== 'POST') {
    res.setHeader('Allow', 'GET, POST');
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const ip = getClientIp(req);
  if (isRateLimited(ip)) {
    return res.status(429).json({ error: 'Too many requests. Please try again later.' });
  }

  const parsed = contactSchema.safeParse(req.body);
  if (!parsed.success) {
    return res.status(400).json({ error: 'Invalid form data', details: parsed.error.flatten() });
  }

  const data = parsed.data;
  if (data.website && data.website.length > 0) {
    return res.status(200).json({ ok: true });
  }

  const { serviceId, templateId, publicKey, privateKey } = getEmailJsConfig();

  if (!serviceId || !templateId || !publicKey || !privateKey) {
    const payload: { error: string; missing?: string[] } = {
      error: 'Contact service is not configured',
    };
    if (isDevEnvironment()) {
      payload.missing = getMissingEmailJsEnvKeys();
    }
    return res.status(503).json(payload);
  }

  const productLine = data.product ? `\nProduct interest: ${data.product}` : '';
  const templateParams = {
    client_name: data.name.trim(),
    client_email: data.email.trim(),
    client_phone: data.phone.trim(),
    client_company: data.company.trim(),
    client_country: data.country.trim(),
    project_type: data.projectType.trim(),
    budget_range: data.budgetRange.trim(),
    timeline: data.timeline.trim(),
    message: `${data.message.trim()}${productLine}`,
  };

  try {
    const response = await fetch(EMAILJS_SEND_URL, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        lib_version: '4.4.1',
        user_id: publicKey,
        service_id: serviceId,
        template_id: templateId,
        template_params: templateParams,
        accessToken: privateKey,
      }),
    });

    const text = await response.text();
    if (!response.ok) {
      return res.status(502).json({ error: text || 'Email send failed' });
    }

    return res.status(200).json({ ok: true });
  } catch {
    return res.status(500).json({ error: 'Failed to send message' });
  }
}
