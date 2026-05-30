export type Testimonial = {
  id: string;
  quote: string;
  author: string;
  role: string;
  company: string;
  region: string;
};

export const testimonials: Testimonial[] = [
  {
    id: 'saas-startup',
    quote:
      'Delta Innovations delivered a clear scope and milestone plan before writing code. Communication was consistent and the launch was smooth.',
    author: 'Startup Founder',
    role: 'CEO',
    company: 'SaaS Client',
    region: 'International',
  },
  {
    id: 'ecommerce',
    quote:
      'Our e-commerce platform was rebuilt with better performance and a secure checkout flow. The team handled DevOps and deployment end to end.',
    author: 'Operations Manager',
    role: 'Operations',
    company: 'Retail Business',
    region: 'MENA',
  },
  {
    id: 'enterprise-api',
    quote:
      'API design, documentation, and integration support were excellent. Change requests were handled transparently with written approvals.',
    author: 'Technical Lead',
    role: 'Engineering Manager',
    company: 'Enterprise Client',
    region: 'Pakistan',
  },
  {
    id: 'mobile-app',
    quote:
      'Cross-platform mobile delivery with post-launch support gave us confidence to iterate quickly after the first release.',
    author: 'Product Owner',
    role: 'Product',
    company: 'Mobile Product',
    region: 'Egypt',
  },
];

export const featuredTestimonialIds = ['saas-startup', 'ecommerce', 'enterprise-api'];
