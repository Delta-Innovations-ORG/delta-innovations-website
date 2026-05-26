import { siteConfig } from '../../content/siteConfig';
import { organizationSameAs, siteName, siteUrl } from '../../content/seoConfig';

const structuredData = {
  '@context': 'https://schema.org',
  '@graph': [
    {
      '@type': 'Organization',
      '@id': `${siteUrl}/#organization`,
      name: siteName,
      url: siteUrl,
      logo: `${siteUrl}/logo10.png`,
      email: siteConfig.emails.contact,
      telephone: [siteConfig.phones.pakistan.call, siteConfig.phones.egypt.call],
      areaServed: siteConfig.locations,
      sameAs: organizationSameAs,
    },
    {
      '@type': 'WebSite',
      '@id': `${siteUrl}/#website`,
      url: siteUrl,
      name: siteName,
      description: siteConfig.tagline,
      publisher: { '@id': `${siteUrl}/#organization` },
      inLanguage: 'en',
    },
    {
      '@type': 'ProfessionalService',
      '@id': `${siteUrl}/#professional-service`,
      name: siteName,
      url: siteUrl,
      image: `${siteUrl}/logo10.png`,
      description:
        'Full-cycle digital product engineering: web, mobile, AI, cloud, DevOps, data analytics, and cybersecurity.',
      email: siteConfig.emails.contact,
      telephone: siteConfig.phones.pakistan.call,
      areaServed: siteConfig.locations.map((name) => ({ '@type': 'Country', name })),
      serviceType: [
        'Web Development',
        'Mobile App Development',
        'Cloud and DevOps',
        'AI and Machine Learning',
        'Cybersecurity',
      ],
      parentOrganization: { '@id': `${siteUrl}/#organization` },
    },
  ],
};

export function SeoStructuredData() {
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
    />
  );
}
