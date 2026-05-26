import { getEmailJsConfig } from '../config/emailJs.config';

export type ContactEmailPayload = {
  name: string;
  email: string;
  phone: string;
  company: string;
  country: string;
  projectType: string;
  budgetRange: string;
  timeline: string;
  message: string;
};

const EMAILJS_SEND_URL = 'https://api.emailjs.com/api/v1.0/email/send';

function trimParam(value: string): string {
  return value.trim();
}

export { isEmailJsConfigured } from '../config/emailJs.config';

export async function sendContactEmail(data: ContactEmailPayload): Promise<void> {
  const { serviceId, templateId, publicKey, privateKey } = getEmailJsConfig();

  if (!serviceId || !templateId || !publicKey || !privateKey) {
    throw new Error('EMAILJS_NOT_CONFIGURED');
  }

  const templateParams = {
    client_name: trimParam(data.name),
    client_email: trimParam(data.email),
    client_phone: trimParam(data.phone),
    client_company: trimParam(data.company),
    client_country: trimParam(data.country),
    project_type: trimParam(data.projectType),
    budget_range: trimParam(data.budgetRange),
    timeline: trimParam(data.timeline),
    message: trimParam(data.message),
  };

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
    if (text.includes('template ID not found')) {
      throw new Error(
        `${text} (using ${templateId}). Verify Template ID in EmailJS dashboard and that Public + Private keys match the same account.`
      );
    }

    if (text.includes('Public Key is invalid')) {
      throw new Error(
        `${text} Copy Public Key from EmailJS → Account → API Keys (use Copy button). Current key ends with …${publicKey.slice(-4)}.`
      );
    }

    if (text.includes('private key')) {
      throw new Error(
        `${text} Add VITE_EMAILJS_PRIVATE_KEY to .env.local (Account → API Keys → Private Key) and restart the dev server.`
      );
    }

    throw new Error(text || 'Email send failed');
  }
}
