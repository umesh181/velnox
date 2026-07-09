import { FAQ_ITEMS, SERVICES, SITE, SOCIAL_LINKS } from './config';

const absolute = (path) => `${SITE.url}${path.startsWith('/') ? path : `/${path}`}`;

export function organizationSchema() {
  return {
    '@context': 'https://schema.org',
    '@type': 'ProfessionalService',
    '@id': `${SITE.url}/#organization`,
    name: SITE.legalName,
    alternateName: SITE.name,
    url: SITE.url,
    logo: absolute(SITE.defaultOgImage),
    image: absolute(SITE.defaultOgImage),
    description:
      'Full-service digital agency for web design, app design, development, e-commerce, and SEO.',
    email: SITE.email,
    telephone: [SITE.phone, SITE.phoneAlt],
    foundingDate: String(SITE.foundingYear),
    areaServed: SITE.areaServed.map((name) => ({ '@type': 'Place', name })),
    priceRange: '$$',
    knowsAbout: [
      'Web Design',
      'Website Development',
      'App Design',
      'Mobile App Development',
      'E-Commerce',
      'SEO',
      'Answer Engine Optimization',
      'UI/UX Design',
      'Next.js',
      'Shopify',
    ],
    sameAs: Object.values(SOCIAL_LINKS),
    contactPoint: [
      {
        '@type': 'ContactPoint',
        contactType: 'sales',
        email: SITE.email,
        telephone: SITE.phone,
        availableLanguage: ['English', 'Hindi', 'Telugu'],
        areaServed: 'Worldwide',
      },
    ],
    hasOfferCatalog: {
      '@type': 'OfferCatalog',
      name: 'Digital Agency Services',
      itemListElement: SERVICES.map((service, i) => ({
        '@type': 'Offer',
        position: i + 1,
        itemOffered: {
          '@type': 'Service',
          name: service.name,
          description: service.description,
          provider: { '@id': `${SITE.url}/#organization` },
        },
      })),
    },
  };
}

export function websiteSchema() {
  return {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    '@id': `${SITE.url}/#website`,
    name: SITE.name,
    alternateName: 'Velnox Digital Agency',
    url: SITE.url,
    description:
      'Velnox crafts websites, apps, and digital products with precision — design, development, e-commerce, and SEO under one roof.',
    publisher: { '@id': `${SITE.url}/#organization` },
    inLanguage: SITE.language,
    potentialAction: {
      '@type': 'ReserveAction',
      target: {
        '@type': 'EntryPoint',
        urlTemplate: SITE.calLink,
        actionPlatform: [
          'http://schema.org/DesktopWebPlatform',
          'http://schema.org/MobileWebPlatform',
        ],
      },
      name: 'Book a discovery call',
    },
  };
}

export function webPageSchema() {
  return {
    '@context': 'https://schema.org',
    '@type': 'WebPage',
    '@id': `${SITE.url}/#webpage`,
    url: SITE.url,
    name: `${SITE.name}® | ${SITE.tagline}`,
    description:
      'Velnox is a digital agency partnering with ambitious teams to design, build, and scale websites, apps, and products.',
    isPartOf: { '@id': `${SITE.url}/#website` },
    about: { '@id': `${SITE.url}/#organization` },
    inLanguage: SITE.language,
    primaryImageOfPage: absolute(SITE.defaultOgImage),
  };
}

export function faqSchema() {
  return {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    '@id': `${SITE.url}/#faq`,
    mainEntity: FAQ_ITEMS.map((item) => ({
      '@type': 'Question',
      name: item.question,
      acceptedAnswer: {
        '@type': 'Answer',
        text: item.answer,
      },
    })),
  };
}

export function breadcrumbSchema() {
  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      {
        '@type': 'ListItem',
        position: 1,
        name: 'Home',
        item: SITE.url,
      },
    ],
  };
}

export function getAllSchemas() {
  return [
    organizationSchema(),
    websiteSchema(),
    webPageSchema(),
    faqSchema(),
    breadcrumbSchema(),
  ];
}
