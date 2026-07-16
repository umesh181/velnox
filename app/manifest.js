import { SITE } from '@/lib/seo/config';

export const dynamic = 'force-static';

export default function manifest() {
  return {
    name: `${SITE.legalName}`,
    short_name: SITE.name,
    description:
      'Web design, app development, e-commerce & SEO agency — digital experiences that move brands forward.',
    start_url: '/',
    display: 'standalone',
    background_color: '#f2efe9',
    theme_color: '#141412',
    orientation: 'portrait-primary',
    categories: ['business', 'design', 'productivity'],
    lang: SITE.language,
    dir: 'ltr',
    icons: [
      {
        src: '/icon.png',
        sizes: '512x512',
        type: 'image/png',
        purpose: 'any maskable',
      },
    ],
  };
}
