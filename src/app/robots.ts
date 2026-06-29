import type { MetadataRoute } from 'next';

// Next.js metadata route — generates /robots.txt dynamically
export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: '*',
        allow: '/',
      },
      {
        userAgent: 'Googlebot',
        allow: '/',
      },
    ],
    sitemap: 'https://hotelcasamonica.com/sitemap.xml',
    host: 'https://hotelcasamonica.com',
  };
}
