export type PolicySection = {
  title: string;
  content: string | string[];
};

export type PolicyPage = {
  title: string;
  description: string;
  effectiveDate?: string;
  sections: PolicySection[];
};

export const privacyPolicy: PolicyPage = {
  title: 'Privacy Policy',
  description: 'How Delta Innovations collects, uses, and protects your information.',
  effectiveDate: '2025',
  sections: [
    {
      title: 'Overview',
      content:
        'Delta Innovations respects privacy and protects information shared through our website, emails, project forms, and communication channels.',
    },
    {
      title: 'Information We May Collect',
      content: [
        'Name, email, phone number, and company name',
        'Project details and business requirements',
        'Technical access information, when required for delivery',
        'Communication history related to your inquiry or project',
      ],
    },
    {
      title: 'How We Use Information',
      content:
        'We use information to respond to inquiries, prepare proposals, deliver services, communicate updates, provide support, and maintain business records.',
    },
    {
      title: 'Data Sharing',
      content:
        'We do not sell client data. Limited project information may be shared with trusted team members or contractors only when required for service delivery.',
    },
    {
      title: 'Data Security',
      content:
        'We take reasonable technical and organizational measures to protect data. Clients should avoid sharing unnecessary sensitive information.',
    },
    {
      title: 'Third-Party Services',
      content:
        'Projects may involve hosting providers, analytics tools, APIs, payment gateways, cloud platforms, or communication tools. Their policies may also apply.',
    },
    {
      title: 'Contact',
      content: 'For privacy questions, contact daltainnovations.co@gmail.com',
    },
  ],
};

export const termsPolicy: PolicyPage = {
  title: 'Terms and Conditions',
  description: 'Terms governing the use of Delta Innovations services and website.',
  effectiveDate: '2025',
  sections: [
    {
      title: '1. Scope of Services',
      content:
        'Delta Innovations provides software development, web development, mobile application development, AI/ML solutions, data analytics, DevOps, cloud, cybersecurity, and related technology services. The exact scope for each client project must be agreed in writing before work begins.',
    },
    {
      title: '2. Written Requirements Required',
      content:
        'All project requirements must be documented in writing before development starts. Verbal discussions, calls, or casual chat messages are not enough to define final scope.',
    },
    {
      title: '3. Client Responsibilities',
      content:
        'Clients must provide complete requirements, content, branding assets, access credentials, timely feedback, and payments according to agreed milestones.',
    },
    {
      title: '4. Change Requests',
      content:
        'Any feature, design change, integration, workflow, or revision outside the approved scope may be treated as a change request and may require additional cost and timeline extension.',
    },
    {
      title: '5. Payments',
      content:
        'Payment terms must be agreed in writing before work begins. Work may be paused if payments are delayed beyond agreed terms.',
    },
    {
      title: '6. Third-Party Services',
      content:
        'Hosting, domains, APIs, payment gateways, cloud tools, email services, and paid third-party subscriptions are the client\'s responsibility unless agreed otherwise.',
    },
    {
      title: '7. Intellectual Property',
      content:
        'Ownership of deliverables should be defined in the project agreement. Delta Innovations may showcase completed work in its portfolio unless confidentiality terms prevent this.',
    },
    {
      title: '8. Confidentiality',
      content:
        'Delta Innovations will take reasonable steps to protect client information, credentials, files, and business data.',
    },
    {
      title: '9. Limitation of Liability',
      content:
        'Delta Innovations is not responsible for losses caused by third-party outages, client-side changes, incorrect credentials, hosting failures, or misuse of delivered software.',
    },
    {
      title: '10. Contact',
      content: 'daltainnovations.co@gmail.com · insider.daltainnovations@gmail.com',
    },
  ],
};

export const refundPolicy: PolicyPage = {
  title: 'Refund Policy',
  description: 'Payment and refund terms for custom software services.',
  effectiveDate: '2025',
  sections: [
    {
      title: 'Custom Services',
      content:
        'Most Delta Innovations services are custom software services. Because work involves planning, design, coding, testing, and resource allocation, payments for completed work are generally non-refundable.',
    },
    {
      title: 'Advance Payments',
      content:
        'Advance payments may be non-refundable once planning, design, development, or resource allocation has started.',
    },
    {
      title: 'Milestone Payments',
      content:
        'Milestone payments are linked to completed or partially completed work. Once a milestone is delivered or substantially completed, the related payment may not be refundable.',
    },
    {
      title: 'Cancellation',
      content:
        'If a client cancels a project, Delta Innovations may charge for completed work, planning time, design work, development work, meetings, third-party costs, and reserved resources.',
    },
    {
      title: 'Refund Requests',
      content: 'Refund requests must be submitted in writing to daltainnovations.co@gmail.com.',
    },
  ],
};

export const securityPolicy: PolicyPage = {
  title: 'Security Policy',
  description: 'How Delta Innovations approaches secure development.',
  sections: [
    {
      title: 'Security Principles',
      content: [
        'Do not commit secrets to repositories',
        'Use environment variables for sensitive configuration',
        'Use HTTPS in production environments',
        'Apply least-privilege access controls',
        'Protect client credentials and access tokens',
        'Keep dependencies updated',
        'Use strong authentication mechanisms',
        'Maintain backups for critical systems',
      ],
    },
    {
      title: 'Reporting Security Issues',
      content:
        'Report security issues privately to daltainnovations.co@gmail.com. Please do not disclose vulnerabilities publicly before we have had a chance to address them.',
    },
  ],
};

export const codeOfConductPolicy: PolicyPage = {
  title: 'Code of Conduct',
  description: 'Expected professional behavior for team members, collaborators, and clients.',
  sections: [
    {
      title: 'Expected Behavior',
      content: [
        'Communicate respectfully',
        'Protect client confidentiality',
        'Avoid harassment and abusive language',
        'Keep project discussions professional',
        'Test work before delivery',
        'Report blockers early',
        'Never expose passwords, tokens, or credentials',
      ],
    },
    {
      title: 'Unacceptable Behavior',
      content: [
        'Harassment or discrimination',
        'Abusive language',
        'Sharing confidential information without authorization',
        'Committing secrets to version control',
        'Misleading clients about scope or delivery',
        'Careless production changes without approval',
      ],
    },
    {
      title: 'Enforcement',
      content:
        'Violations may lead to removal from projects, restricted access, or termination of collaboration.',
    },
  ],
};

export const requirementsPolicy: PolicyPage = {
  title: 'Project Requirements',
  description: 'What clients should provide before Delta Innovations starts a project.',
  sections: [
    {
      title: 'Client Information',
      content: [
        'Client name, company, email, phone/WhatsApp',
        'Country and preferred communication channel',
      ],
    },
    {
      title: 'Project Type',
      content: [
        'Website, web application, mobile app, admin dashboard',
        'E-commerce, booking system, API development',
        'AI/ML system, data dashboard, DevOps/Docker, cybersecurity, or other',
      ],
    },
    {
      title: 'Project Goal',
      content: 'Explain the main purpose of the project and the business outcome you expect.',
    },
    {
      title: 'Required Features',
      content:
        'List every required feature clearly — e.g. user login, admin dashboard, payments, booking, notifications, reports, role-based access.',
    },
    {
      title: 'Design Requirements',
      content: [
        'Logo and brand colors availability',
        'Reference websites or apps',
        'UI/UX scope, mobile-first needs, animation preferences',
      ],
    },
    {
      title: 'Technical Requirements',
      content: [
        'Preferred technology stack, hosting, domain, database',
        'APIs, payment gateway, admin panel, backup needs',
      ],
    },
    {
      title: 'Timeline & Budget',
      content: [
        'Start date, target delivery, hard deadline',
        'Estimated budget, payment method, milestone preference',
      ],
    },
    {
      title: 'Written Approval',
      content:
        'Client confirms that requirements are accurate. Send your completed requirements to insider.daltainnovations@gmail.com before development begins.',
    },
  ],
};

export const cookiePolicy: PolicyPage = {
  title: 'Cookie Policy',
  description: 'How Delta Innovations uses cookies and similar technologies on this website.',
  effectiveDate: '2025',
  sections: [
    {
      title: 'What Are Cookies',
      content:
        'Cookies are small text files stored on your device when you visit a website. They help the site remember preferences and understand how visitors use the site.',
    },
    {
      title: 'How We Use Cookies',
      content: [
        'Essential cookies required for basic site functionality',
        'Analytics cookies (Vercel Web Analytics and Speed Insights) load only after you click Accept on the cookie banner',
        'Preference cookies to remember your settings, including your analytics consent choice',
      ],
    },
    {
      title: 'Third-Party Cookies',
      content:
        'If you accept analytics, Vercel may set cookies or use similar technologies to measure traffic and performance. Declining analytics prevents those scripts from loading. Embedded content from other providers may set their own cookies subject to their privacy policies.',
    },
    {
      title: 'Managing Cookies',
      content:
        'You can accept or decline analytics cookies using the banner on your first visit. You can also control or delete cookies through your browser settings. Disabling cookies may affect certain website features.',
    },
    {
      title: 'Contact',
      content: 'For questions about this Cookie Policy, contact daltainnovations.co@gmail.com',
    },
  ],
};

export const changeRequestPolicy: PolicyPage = {
  title: 'Change Request Policy',
  description: 'How out-of-scope work is handled after project approval.',
  effectiveDate: '2025',
  sections: [
    {
      title: 'What Is a Change Request',
      content:
        'A change request includes any work outside the approved project scope. Examples: new features, new pages, extra integrations, redesign of approved sections, new workflows, database changes after approval, or expanded admin dashboard functions.',
    },
    {
      title: 'Process',
      content: [
        'Client submits the request in writing',
        'Delta Innovations reviews impact on timeline and cost',
        'Updated cost and timeline are estimated',
        'Client approves in writing before work begins',
        'Work starts only after written approval',
      ],
    },
    {
      title: 'Why This Matters',
      content:
        'Written change requests protect both parties — ensuring fair pricing, realistic timelines, and clear delivery expectations for every addition to the original scope.',
    },
    {
      title: 'Contact',
      content: 'Submit change requests to insider.daltainnovations@gmail.com or daltainnovations.co@gmail.com',
    },
  ],
};
