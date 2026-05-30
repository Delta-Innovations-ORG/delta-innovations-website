function cleanEnv(value: string | undefined): string {
  return (value ?? '').trim().replace(/\uFEFF/g, '');
}

/** Client-safe EmailJS IDs (private key is server-only via /api/contact). */
export function getEmailJsPublicConfig() {
  return {
    serviceId: cleanEnv(import.meta.env.VITE_EMAILJS_SERVICE_ID),
    templateId: cleanEnv(import.meta.env.VITE_EMAILJS_TEMPLATE_ID),
    publicKey: cleanEnv(import.meta.env.VITE_EMAILJS_PUBLIC_KEY),
  };
}

export function isEmailJsConfigured(): boolean {
  const { serviceId, templateId, publicKey } = getEmailJsPublicConfig();
  return Boolean(serviceId && templateId && publicKey);
}
