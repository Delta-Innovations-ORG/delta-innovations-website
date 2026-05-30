import { config } from 'dotenv';
import { existsSync } from 'node:fs';
import { resolve } from 'node:path';

let loaded = false;

/**
 * Ensures serverless handlers see `.env.local` during local `vercel dev`.
 * Vite hot-reloads client env on file change, but API routes need this fallback
 * or a full `vercel dev` restart after editing secrets.
 */
export function loadEnv(): void {
  if (loaded) return;
  loaded = true;

  const vercelEnv = process.env.VERCEL_ENV;
  if (vercelEnv === 'production' || vercelEnv === 'preview') return;

  const root = process.cwd();
  const candidates = ['.env.local', '.env.development.local', '.env'];

  for (const file of candidates) {
    const path = resolve(root, file);
    if (existsSync(path)) {
      config({ path, override: false });
    }
  }
}

export function getGithubToken(): string | undefined {
  loadEnv();
  const token = process.env.GITHUB_TOKEN?.trim();
  return token || undefined;
}

function pickEnv(primary?: string, fallback?: string): string | undefined {
  const value = (primary || fallback || '').trim();
  return value || undefined;
}

export function getEmailJsConfig() {
  loadEnv();
  return {
    serviceId: pickEnv(process.env.EMAILJS_SERVICE_ID, process.env.VITE_EMAILJS_SERVICE_ID),
    templateId: pickEnv(process.env.EMAILJS_TEMPLATE_ID, process.env.VITE_EMAILJS_TEMPLATE_ID),
    publicKey: pickEnv(process.env.EMAILJS_PUBLIC_KEY, process.env.VITE_EMAILJS_PUBLIC_KEY),
    privateKey: pickEnv(process.env.EMAILJS_PRIVATE_KEY, process.env.VITE_EMAILJS_PRIVATE_KEY),
  };
}

export function isEmailJsConfigured(): boolean {
  const config = getEmailJsConfig();
  return Boolean(config.serviceId && config.templateId && config.publicKey && config.privateKey);
}

export function getMissingEmailJsEnvKeys(): string[] {
  const config = getEmailJsConfig();
  const missing: string[] = [];
  if (!config.serviceId) missing.push('EMAILJS_SERVICE_ID');
  if (!config.templateId) missing.push('EMAILJS_TEMPLATE_ID');
  if (!config.publicKey) missing.push('EMAILJS_PUBLIC_KEY');
  if (!config.privateKey) missing.push('EMAILJS_PRIVATE_KEY');
  return missing;
}
