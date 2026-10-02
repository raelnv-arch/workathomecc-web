import type { MetadataRoute } from 'next';

export default function sitemap(): MetadataRoute.Sitemap {
  const base = 'https://www.workathomecc.com';
  return [
    { url: `${base}/`, changeFrequency: 'monthly', priority: 1 },
    { url: `${base}/tijuana-call-center`, changeFrequency: 'monthly', priority: 0.9 },
    { url: `${base}/opportunities`, changeFrequency: 'weekly', priority: 0.9 },
  ];
}
