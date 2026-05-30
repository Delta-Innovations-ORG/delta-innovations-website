import React, { useEffect, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import { useUser } from '@clerk/react';
import { Send, CheckCircle, Loader2 } from 'lucide-react';
import { siteConfig } from '../../content/siteConfig';
import {
  autoReplyMessage,
  budgetRangeOptions,
  projectTypeOptions,
  timelineOptions,
} from '../../content/formOptions';
import { PhoneInputField } from './PhoneInputField';
import { sendContactEmail } from '../../utils/email';

type FormData = {
  name: string;
  email: string;
  phone: string;
  company: string;
  country: string;
  projectType: string;
  budgetRange: string;
  timeline: string;
  message: string;
  website: string;
};

const initialForm: FormData = {
  name: '',
  email: '',
  phone: '',
  company: '',
  country: '',
  projectType: '',
  budgetRange: '',
  timeline: '',
  message: '',
  website: '',
};

export function ContactForm() {
  const { user } = useUser();
  const [searchParams] = useSearchParams();
  const productSlug = searchParams.get('product') ?? '';
  const productName = productSlug
    ? productSlug.replace(/-/g, ' ').replace(/\b\w/g, (c) => c.toUpperCase())
    : '';

  const [formData, setFormData] = useState<FormData>(initialForm);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    if (productSlug && productName) {
      setFormData((prev) => ({
        ...prev,
        message: prev.message
          ? prev.message
          : `I'm interested in: ${productName} (${productSlug}).\n\n`,
      }));
    }
  }, [productSlug, productName]);

  // Prefill name/email for signed-in users. Only fills empty fields, so the
  // values stay fully editable and never overwrite what the user types.
  useEffect(() => {
    if (!user) return;
    const email = user.primaryEmailAddress?.emailAddress ?? '';
    setFormData((prev) => ({
      ...prev,
      email: prev.email || email,
      name: prev.name || (user.fullName ?? ''),
    }));
  }, [user]);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>,
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handlePhoneChange = (value: string) => {
    setFormData((prev) => ({ ...prev, phone: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setError('');

    try {
      await sendContactEmail({
        name: formData.name,
        email: formData.email,
        phone: formData.phone,
        company: formData.company,
        country: formData.country,
        projectType: formData.projectType,
        budgetRange: formData.budgetRange,
        timeline: formData.timeline,
        message: formData.message,
        product: productSlug || undefined,
        website: formData.website,
      });
      setSubmitted(true);
      setFormData(initialForm);
      setTimeout(() => setSubmitted(false), 8000);
    } catch (err) {
      if (err instanceof Error) {
        const devHint = err.message.toLowerCase().includes('not configured')
          ? ' If you are developing locally, restart with npm run dev:api after editing .env.local.'
          : '';
        setError(
          `Could not send your message (${err.message}).${devHint} Please email us at ${siteConfig.emails.contact}`,
        );
      } else {
        setError(`Something went wrong. Please email us directly at ${siteConfig.emails.contact}`);
      }
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-5">
      {productSlug && productName && (
        <div className="p-4 rounded-xl bg-brand-cyan/10 border border-brand-cyan/25 text-sm text-brand-light">
          Inquiring about: <strong>{productName}</strong>
        </div>
      )}
      {submitted && (
        <div className="flex items-start gap-3 p-4 rounded-xl bg-brand-emerald/10 border border-brand-emerald/30 text-brand-emeraldLight text-sm">
          <CheckCircle size={18} className="shrink-0 mt-0.5" />
          <span>{autoReplyMessage}</span>
        </div>
      )}
      {error && (
        <div className="p-4 rounded-xl bg-red-500/10 border border-red-500/30 text-red-300 text-sm">
          {error}
        </div>
      )}

      <input
        type="text"
        name="website"
        value={formData.website}
        onChange={handleChange}
        tabIndex={-1}
        autoComplete="off"
        className="absolute opacity-0 pointer-events-none h-0 w-0 overflow-hidden"
        aria-hidden
      />

      <div className="grid sm:grid-cols-2 gap-5">
        <div>
          <label htmlFor="name" className="block text-sm font-medium text-brand-light mb-1.5">
            Full Name *
          </label>
          <input
            id="name"
            name="name"
            type="text"
            required
            value={formData.name}
            onChange={handleChange}
            className="input-dark"
            placeholder="Your name"
          />
        </div>
        <div>
          <label htmlFor="email" className="block text-sm font-medium text-brand-light mb-1.5">
            Email *
          </label>
          <input
            id="email"
            name="email"
            type="email"
            required
            value={formData.email}
            onChange={handleChange}
            className="input-dark"
            placeholder="you@company.com"
          />
        </div>
      </div>

      <div className="grid sm:grid-cols-2 gap-5">
        <div>
          <label htmlFor="phone" className="block text-sm font-medium text-brand-light mb-1.5">
            WhatsApp / Phone *
          </label>
          <PhoneInputField
            id="phone"
            value={formData.phone}
            onChange={handlePhoneChange}
            required
          />
        </div>
        <div>
          <label htmlFor="company" className="block text-sm font-medium text-brand-light mb-1.5">
            Company Name *
          </label>
          <input
            id="company"
            name="company"
            type="text"
            required
            value={formData.company}
            onChange={handleChange}
            className="input-dark"
            placeholder="Company name"
          />
        </div>
      </div>

      <div className="grid sm:grid-cols-2 gap-5">
        <div>
          <label htmlFor="country" className="block text-sm font-medium text-brand-light mb-1.5">
            Country *
          </label>
          <input
            id="country"
            name="country"
            type="text"
            required
            value={formData.country}
            onChange={handleChange}
            className="input-dark"
            placeholder="Pakistan, Egypt, etc."
          />
        </div>
        <div>
          <label htmlFor="projectType" className="block text-sm font-medium text-brand-light mb-1.5">
            Project Type *
          </label>
          <select
            id="projectType"
            name="projectType"
            required
            value={formData.projectType}
            onChange={handleChange}
            className="input-dark"
          >
            <option value="">Select project type</option>
            {projectTypeOptions.map((opt) => (
              <option key={opt} value={opt}>
                {opt}
              </option>
            ))}
          </select>
        </div>
      </div>

      <div className="grid sm:grid-cols-2 gap-5">
        <div>
          <label htmlFor="budgetRange" className="block text-sm font-medium text-brand-light mb-1.5">
            Budget Range *
          </label>
          <select
            id="budgetRange"
            name="budgetRange"
            required
            value={formData.budgetRange}
            onChange={handleChange}
            className="input-dark"
          >
            <option value="">Select budget range</option>
            {budgetRangeOptions.map((opt) => (
              <option key={opt} value={opt}>
                {opt}
              </option>
            ))}
          </select>
        </div>
        <div>
          <label htmlFor="timeline" className="block text-sm font-medium text-brand-light mb-1.5">
            Timeline *
          </label>
          <select
            id="timeline"
            name="timeline"
            required
            value={formData.timeline}
            onChange={handleChange}
            className="input-dark"
          >
            <option value="">Select timeline</option>
            {timelineOptions.map((opt) => (
              <option key={opt} value={opt}>
                {opt}
              </option>
            ))}
          </select>
        </div>
      </div>

      <div>
        <label htmlFor="message" className="block text-sm font-medium text-brand-light mb-1.5">
          Project Description *
        </label>
        <textarea
          id="message"
          name="message"
          required
          rows={5}
          value={formData.message}
          onChange={handleChange}
          className="input-dark resize-none"
          placeholder="Describe your project goals, features, and requirements..."
        />
      </div>

      <button
        type="submit"
        disabled={isSubmitting}
        className="w-full flex items-center justify-center gap-2 px-6 py-4 rounded-xl bg-brand-gradient text-brand-navy font-semibold shadow-glow hover:opacity-95 transition-opacity disabled:opacity-60 btn-shine hover-lift-glow"
      >
        {isSubmitting ? (
          <>
            <Loader2 size={18} className="animate-spin" />
            Sending...
          </>
        ) : (
          <>
            <Send size={18} />
            Send Inquiry
          </>
        )}
      </button>
    </form>
  );
}
