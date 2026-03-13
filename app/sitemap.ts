import { MetadataRoute } from 'next'
import { cities } from '@/lib/cities'

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = 'https://snowday-calc.com'
  const now = new Date()

  const staticPages: MetadataRoute.Sitemap = [
    { url: baseUrl, lastModified: now, changeFrequency: 'daily', priority: 1 },
    { url: `${baseUrl}/snow-day-calculator`, lastModified: now, changeFrequency: 'weekly', priority: 0.9 },
    { url: `${baseUrl}/will-there-be-a-snow-day-tomorrow`, lastModified: now, changeFrequency: 'weekly', priority: 0.9 },
    { url: `${baseUrl}/snow-day-statistics`, lastModified: now, changeFrequency: 'weekly', priority: 0.85 },
    { url: `${baseUrl}/about`, lastModified: now, changeFrequency: 'monthly', priority: 0.5 },
    { url: `${baseUrl}/contact`, lastModified: now, changeFrequency: 'monthly', priority: 0.4 },
    { url: `${baseUrl}/privacy`, lastModified: now, changeFrequency: 'yearly', priority: 0.2 },
    { url: `${baseUrl}/terms`, lastModified: now, changeFrequency: 'yearly', priority: 0.2 },
  ]

  const calculatorPages: MetadataRoute.Sitemap = cities.map((city) => ({
    url: `${baseUrl}/snow-day-calculator/${city.slug}`,
    lastModified: now,
    changeFrequency: 'daily',
    priority: 0.8,
  }))

  const predictionPages: MetadataRoute.Sitemap = cities.map((city) => ({
    url: `${baseUrl}/will-there-be-a-snow-day-tomorrow/${city.slug}`,
    lastModified: now,
    changeFrequency: 'daily',
    priority: 0.75,
  }))

  const statsPages: MetadataRoute.Sitemap = cities.map((city) => ({
    url: `${baseUrl}/snow-day-statistics/${city.slug}`,
    lastModified: now,
    changeFrequency: 'monthly',
    priority: 0.65,
  }))

  return [...staticPages, ...calculatorPages, ...predictionPages, ...statsPages]
}
