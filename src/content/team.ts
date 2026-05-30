export type TeamMember = {
  id: string;
  name: string;
  role: string;
  location: string;
  bio: string;
  skills: string[];
  linkedin?: string;
  github?: string;
};

export const teamMembers: TeamMember[] = [
  {
    id: 'lead-engineering',
    name: 'Engineering Lead',
    role: 'Full-Stack & Architecture',
    location: 'Pakistan',
    bio: 'Leads web and cloud delivery with written scope, secure defaults, and transparent GitHub workflows.',
    skills: ['React', 'Node.js', 'DevOps', 'System Design'],
  },
  {
    id: 'mobile-ai',
    name: 'Product Engineer',
    role: 'Mobile & AI Solutions',
    location: 'Egypt',
    bio: 'Builds mobile apps and AI integrations with focus on practical business outcomes and maintainable code.',
    skills: ['Flutter', 'Python', 'ML APIs', 'API Design'],
  },
  {
    id: 'devops-security',
    name: 'Platform Engineer',
    role: 'DevOps & Security',
    location: 'Pakistan · Egypt',
    bio: 'Owns CI/CD, cloud deployment, monitoring, and security hardening across client environments.',
    skills: ['Docker', 'AWS', 'CI/CD', 'Security'],
  },
];

export const teamPreviewCount = 3;
