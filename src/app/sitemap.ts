import type { MetadataRoute } from 'next';

// Next.js metadata route — generates /sitemap.xml dynamically
// Combined with the static /public/sitemap.xml, this ensures proper indexing.
export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = 'https://hotelcasamonica.com';
  const lastModified = new Date();

  return [
    {
      url: baseUrl,
      lastModified,
      changeFrequency: 'weekly',
      priority: 1.0,
      images: [
        `${baseUrl}/hotel-exterior-day.png`,
        `${baseUrl}/owners-couple.jpg`,
        `${baseUrl}/mompox-river-sunset-real.jpg`,
      ],
    },
  ];
}
