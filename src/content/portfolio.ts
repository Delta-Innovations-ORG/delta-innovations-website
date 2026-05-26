export type PortfolioAccent = 'cyan' | 'emerald' | 'violet' | 'amber' | 'rose';

export type PortfolioItem = {
  id: string;
  title: string;
  category: string;
  problem: string;
  solution: string;
  stack: string[];
  status: 'live' | 'demo' | 'internal';
  accent: PortfolioAccent;
};

export const portfolioItems: PortfolioItem[] = [
  {
    id: 'website',
    title: 'Delta Innovations Website',
    category: 'Web Development',
    problem: 'Company needed a professional, conversion-focused web presence aligned with brand identity.',
    solution: 'Modern multi-page React site with lead-generation form, policies, and animated brand design.',
    stack: ['React', 'TypeScript', 'Tailwind CSS', 'Vite'],
    status: 'live',
    accent: 'cyan',
  },
  {
    id: 'skyline-hotel',
    title: 'Skyline Hotel Management',
    category: 'Hospitality / ERP',
    problem: 'Hotel chain needed unified room booking, billing, housekeeping, and staff management in one system.',
    solution: 'Full-stack hotel ERP with reservations, check-in/out workflows, invoicing, and admin dashboards.',
    stack: ['React', 'Node.js', 'PostgreSQL', 'REST API'],
    status: 'demo',
    accent: 'amber',
  },
  {
    id: 'skyline-finance',
    title: 'Skyline Finance Management',
    category: 'FinTech / ERP',
    problem: 'Business required ledger, invoicing, expense tracking, and financial reporting in a single platform.',
    solution: 'Finance management suite with accounts, transactions, reports, and role-based access control.',
    stack: ['React', 'TypeScript', 'Node.js', 'MongoDB'],
    status: 'demo',
    accent: 'emerald',
  },
  {
    id: 'real-estate-marketing',
    title: 'Real Estate Marketing Platform',
    category: 'PropTech / Marketing',
    problem: 'Agency needed to showcase listings, capture leads, and run property marketing campaigns online.',
    solution: 'PropTech platform with listing CMS, lead forms, search filters, and agent analytics dashboard.',
    stack: ['React', 'Next.js', 'Tailwind CSS', 'Maps API'],
    status: 'demo',
    accent: 'violet',
  },
  {
    id: 'banking-app',
    title: 'Banking App',
    category: 'FinTech / Mobile',
    problem: 'Financial institution wanted secure mobile banking with transfers, statements, and account management.',
    solution: 'Cross-platform banking app with auth, transactions, notifications, and encrypted API integration.',
    stack: ['React Native', 'Node.js', 'PostgreSQL', 'JWT'],
    status: 'demo',
    accent: 'cyan',
  },
  {
    id: 'ecommerce',
    title: 'E-Commerce Platform',
    category: 'E-Commerce',
    problem: 'Retailer needed online store with catalog, cart, checkout, and order management.',
    solution: 'Scalable e-commerce platform with product admin, payments-ready checkout, and inventory tracking.',
    stack: ['React', 'Node.js', 'Stripe', 'PostgreSQL'],
    status: 'demo',
    accent: 'rose',
  },
  {
    id: 'blog-app',
    title: 'Blog App',
    category: 'Content / CMS',
    problem: 'Publisher needed a fast, SEO-friendly blog with categories, drafts, and rich content editing.',
    solution: 'Modern blog CMS with markdown editor, tags, search, and responsive reader experience.',
    stack: ['React', 'TypeScript', 'Node.js', 'MongoDB'],
    status: 'demo',
    accent: 'cyan',
  },
  {
    id: 'wedding-planner',
    title: 'Wedding Planner',
    category: 'Events / SaaS',
    problem: 'Event planners needed tools to manage vendors, budgets, timelines, and client communication.',
    solution: 'SaaS wedding planner with task boards, budget tracker, guest lists, and vendor coordination.',
    stack: ['React', 'Firebase', 'Tailwind CSS', 'Calendar API'],
    status: 'demo',
    accent: 'violet',
  },
  {
    id: 'university-portal',
    title: 'University Portal with ML & AI Predictions',
    category: 'EdTech / AI',
    problem: 'University needed student portal plus predictive analytics for at-risk students and performance trends.',
    solution: 'EdTech portal with enrollment, grades, LMS integration, and ML models for risk prediction dashboards.',
    stack: ['React', 'Python', 'TensorFlow', 'PostgreSQL', 'FastAPI'],
    status: 'demo',
    accent: 'emerald',
  },
  {
    id: 'risk-dashboard',
    title: 'Student Risk Analysis Dashboard',
    category: 'Data Analytics',
    problem: 'Educational institute needed KPI tracking and risk indicators for student performance.',
    solution: 'Interactive dashboard with reports, filters, and data visualization for decision-makers.',
    stack: ['React', 'Charts', 'API', 'PostgreSQL'],
    status: 'demo',
    accent: 'violet',
  },
  {
    id: 'contributors-wall',
    title: 'Open-Source Contributors Wall',
    category: 'Web Application',
    problem: 'Organization wanted to showcase community contributors with live GitHub integration.',
    solution: 'Dynamic contributors display with profiles, stats, and automated updates from GitHub API.',
    stack: ['React', 'GitHub API', 'Node.js'],
    status: 'demo',
    accent: 'amber',
  },
];

export const portfolioCategories = ['All', ...Array.from(new Set(portfolioItems.map((p) => p.category)))];
