function cleanEnv(value: string | undefined): string {
  return (value ?? '').trim().replace(/\uFEFF/g, '');
}

export function getEmailJsConfig() {
  return {
    serviceId: cleanEnv(import.meta.env.VITE_EMAILJS_SERVICE_ID),
    templateId: cleanEnv(import.meta.env.VITE_EMAILJS_TEMPLATE_ID),
    publicKey: cleanEnv(import.meta.env.VITE_EMAILJS_PUBLIC_KEY),
    privateKey: cleanEnv(import.meta.env.VITE_EMAILJS_PRIVATE_KEY),
  };
}

export function isEmailJsConfigured(): boolean {
  const { serviceId, templateId, publicKey, privateKey } = getEmailJsConfig();
  return Boolean(serviceId && templateId && publicKey && privateKey);
}

/** Dev-only: confirm which IDs Vite loaded (no secrets). */
export function getEmailJsConfigDebugLabel(): string | null {
  if (!import.meta.env.DEV || !isEmailJsConfigured()) return null;
  const { serviceId, templateId, publicKey } = getEmailJsConfig();
  return `EmailJS: ${serviceId} | template: ${templateId} | pub …${publicKey.slice(-4)}`;
}
