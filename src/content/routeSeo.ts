export type RouteSeoMeta = {
  title: string;
  description: string;
  keywords?: string;
  ogImage?: string;
  noindex?: boolean;
};

export const routeSeo: Record<string, RouteSeoMeta> = {
  '/': {
    title: 'Delta Innovations | Software Development Pakistan & Egypt',
    description:
      'Delta Innovations builds scalable web, mobile, AI, cloud, DevOps, and cybersecurity solutions for startups and businesses in Pakistan, Egypt, and worldwide.',
    keywords:
      'Delta Innovations, software development Pakistan, software development Egypt, web development, mobile apps, DevOps, cybersecurity, AI development',
  },
  '/about': {
    title: 'About Us | Delta Innovations',
    description:
      'Learn about Delta Innovations — a Pakistan and Egypt-based digital product engineering team focused on clear requirements, secure delivery, and long-term client partnerships.',
    keywords: 'about Delta Innovations, software company Pakistan Egypt, engineering team',
  },
  '/services': {
    title: 'Software Development Services | Delta Innovations',
    description:
      'Web development, mobile apps, backend APIs, DevOps, cloud deployment, AI/ML, data analytics, cybersecurity, UI/UX, and SaaS — full-cycle engineering from Delta Innovations.',
    keywords:
      'software development services, web development company, mobile app development, DevOps services, AI solutions',
  },
  '/contact': {
    title: 'Contact Us | Start Your Project',
    description:
      'Contact Delta Innovations for web, mobile, and cloud projects. Pakistan and Egypt teams. Email, phone, WhatsApp — get a clear scope and proposal.',
    keywords: 'contact software company, hire development team Pakistan, project inquiry',
  },
  '/requirements': {
    title: 'Project Requirements | Delta Innovations',
    description:
      'Submit your project requirements in writing before development. Delta Innovations documents scope, milestones, and timeline for transparent delivery.',
    keywords: 'project requirements template, software scope document, development brief',
  },
  '/change-requests': {
    title: 'Change Request Policy | Delta Innovations',
    description:
      'How scope changes are handled after project approval — written change requests, impact review, and agreed updates before additional work.',
    noindex: true,
  },
  '/privacy': {
    title: 'Privacy Policy | Delta Innovations',
    description: 'Privacy Policy for Delta Innovations website and client services — how we collect, use, and protect your information.',
    noindex: true,
  },
  '/terms': {
    title: 'Terms and Conditions | Delta Innovations',
    description: 'Terms and Conditions governing use of the Delta Innovations website and software development services.',
    noindex: true,
  },
  '/refund': {
    title: 'Refund Policy | Delta Innovations',
    description: 'Refund Policy for Delta Innovations projects — eligibility, process, and timelines for approved refunds.',
    noindex: true,
  },
  '/cookies': {
    title: 'Cookie Policy | Delta Innovations',
    description: 'Cookie Policy explaining how Delta Innovations uses cookies and similar technologies on this website.',
    noindex: true,
  },
  '/security': {
    title: 'Security Policy | Delta Innovations',
    description:
      'Security Policy outlining secure development practices, data protection, and how to report security concerns to Delta Innovations.',
    noindex: true,
  },
  '/code-of-conduct': {
    title: 'Code of Conduct | Delta Innovations',
    description: 'Code of Conduct for Delta Innovations team members, collaborators, and professional engagements.',
    noindex: true,
  },
};

export const defaultRouteSeo: RouteSeoMeta = {
  title: 'Delta Innovations | Digital Product Engineering',
  description:
    'Delta Innovations — Pakistan and Egypt-based software development for web, mobile, AI, cloud, data, DevOps, and cybersecurity.',
};

export function getSeoForPath(pathname: string): RouteSeoMeta {
  return routeSeo[pathname] ?? defaultRouteSeo;
}
