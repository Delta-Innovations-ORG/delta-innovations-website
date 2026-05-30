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
  product?: string;
  website?: string;
};

type ContactHealthResponse = {
  configured?: boolean;
};

let contactApiConfigured: boolean | null = null;

export async function isContactApiAvailable(): Promise<boolean> {
  if (contactApiConfigured !== null) {
    return contactApiConfigured;
  }

  try {
    const response = await fetch('/api/contact');
    if (!response.ok) {
      contactApiConfigured = false;
      return false;
    }
    const body = (await response.json()) as ContactHealthResponse;
    contactApiConfigured = body.configured === true;
    return contactApiConfigured;
  } catch {
    contactApiConfigured = false;
    return false;
  }
}

export async function sendContactEmail(data: ContactEmailPayload): Promise<void> {
  const response = await fetch('/api/contact', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      ...data,
      website: data.website ?? '',
    }),
  });

  const body = (await response.json().catch(() => ({}))) as { error?: string };

  if (!response.ok) {
    throw new Error(body.error || 'Failed to send message');
  }

  contactApiConfigured = true;
}
