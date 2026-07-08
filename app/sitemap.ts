import type { MetadataRoute } from 'next';

export default function sitemap(): MetadataRoute.Sitemap {
  const base = 'https://www.workathomecc.com';
  return [
    { url: base, changeFrequency: 'monthly', priority: 1 },
    { url: `${base}/opportunities`, changeFrequency: 'weekly', priority: 0.9 },
  ];
}
