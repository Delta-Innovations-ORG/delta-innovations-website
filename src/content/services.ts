export type Service = {
  id: string;
  title: string;
  description: string;
  features: string[];
  comingSoon?: boolean;
};

export const services: Service[] = [
  {
    id: 'web',
    title: 'Web Development',
    description:
      'Business websites, landing pages, dashboards, portals, SaaS frontends, e-commerce websites, booking systems, and responsive web apps.',
    features: ['React & Next.js', 'TypeScript', 'Responsive design', 'SEO-ready'],
  },
  {
    id: 'mobile',
    title: 'Mobile App Development',
    description:
      'Android, iOS, and cross-platform mobile applications for customers, staff, operations, booking, delivery, dashboards, and internal tools.',
    features: ['iOS & Android', 'React Native', 'Cross-platform', 'App store deployment'],
  },
  {
    id: 'backend',
    title: 'Backend & API Development',
    description:
      'REST APIs, GraphQL APIs, authentication, role-based access, admin panels, database architecture, payment integrations, and third-party integrations.',
    features: ['REST & GraphQL', 'Auth & RBAC', 'Database design', 'Payment gateways'],
  },
  {
    id: 'devops',
    title: 'DevOps, Docker & Cloud Deployment',
    description:
      'Docker setup, CI/CD pipelines, VPS deployment, cloud deployment, Nginx, SSL, server monitoring, backups, and production deployment support.',
    features: ['Docker & CI/CD', 'AWS & VPS', 'SSL & Nginx', 'Monitoring'],
  },
  {
    id: 'ai',
    title: 'AI & Machine Learning',
    description:
      'Prediction systems, classification models, recommendation engines, AI chatbots, ML dashboards, automation workflows, and AI integration into web apps.',
    features: ['ML models', 'AI chatbots', 'Automation', 'AI integration'],
  },
  {
    id: 'data',
    title: 'Data Analytics',
    description:
      'Dashboards, reports, KPI tracking, business insights, data cleaning, data visualization, and analytics automation.',
    features: ['KPI dashboards', 'Reports', 'Data visualization', 'Business insights'],
  },
  {
    id: 'security',
    title: 'Cybersecurity Solutions',
    description:
      'Basic security audits, authentication hardening, secure API review, vulnerability review, backup planning, and security best practices.',
    features: ['Security audits', 'Auth hardening', 'API review', 'Backup planning'],
  },
  {
    id: 'uiux',
    title: 'UI/UX Design',
    description:
      'User research, wireframes, prototypes, design systems, and pixel-perfect interfaces designed for clarity and conversion.',
    features: ['User research', 'Prototyping', 'Design systems', 'Mobile-first UI'],
  },
  {
    id: 'saas',
    title: 'E-Commerce & SaaS Development',
    description:
      'Online stores, subscription platforms, booking systems, admin dashboards, and scalable SaaS products built for growth.',
    features: ['E-commerce', 'Subscriptions', 'Admin panels', 'Scalable SaaS'],
  },
  {
    id: 'blockchain',
    title: 'Blockchain',
    description:
      'Smart contracts, dApps, token systems, and Web3 integrations — coming soon as we expand our Web3 capabilities.',
    features: ['Smart contracts', 'dApps', 'Token systems', 'Web3 integration'],
    comingSoon: true,
  },
];
