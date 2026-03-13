import { MetadataRoute } from 'next'
import { cities } from '@/lib/cities'

// Bump this date when content changes so crawlers re-prioritise updated pages
const CITY_PAGES_UPDATED = new Date('2026-03-13')
const STATS_PAGES_UPDATED = new Date('2026-03-13')

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = 'https://snowday-calc.com'
  const now = new Date()

  const staticPages: MetadataRoute.Sitemap = [
    { url: baseUrl, lastModified: now, changeFrequency: 'daily', priority: 1 },
    { url: `${baseUrl}/snow-day-calculator`, lastModified: CITY_PAGES_UPDATED, changeFrequency: 'weekly', priority: 0.9 },
    { url: `${baseUrl}/will-there-be-a-snow-day-tomorrow`, lastModified: CITY_PAGES_UPDATED, changeFrequency: 'weekly', priority: 0.9 },
    { url: `${baseUrl}/snow-day-statistics`, lastModified: STATS_PAGES_UPDATED, changeFrequency: 'weekly', priority: 0.85 },
    { url: `${baseUrl}/about`, lastModified: new Date('2024-01-01'), changeFrequency: 'monthly', priority: 0.5 },
    { url: `${baseUrl}/contact`, lastModified: new Date('2024-01-01'), changeFrequency: 'monthly', priority: 0.4 },
    { url: `${baseUrl}/privacy`, lastModified: new Date('2024-01-01'), changeFrequency: 'yearly', priority: 0.2 },
    { url: `${baseUrl}/terms`, lastModified: new Date('2024-01-01'), changeFrequency: 'yearly', priority: 0.2 },
  ]

  const calculatorPages: MetadataRoute.Sitemap = cities.map((city) => ({
    url: `${baseUrl}/snow-day-calculator/${city.slug}`,
    lastModified: CITY_PAGES_UPDATED,
    changeFrequency: 'weekly' as const,
    priority: 0.8,
  }))

  const predictionPages: MetadataRoute.Sitemap = cities.map((city) => ({
    url: `${baseUrl}/will-there-be-a-snow-day-tomorrow/${city.slug}`,
    lastModified: CITY_PAGES_UPDATED,
    changeFrequency: 'weekly' as const,
    priority: 0.75,
  }))

  const statsPages: MetadataRoute.Sitemap = cities.map((city) => ({
    url: `${baseUrl}/snow-day-statistics/${city.slug}`,
    lastModified: STATS_PAGES_UPDATED,
    changeFrequency: 'monthly' as const,
    priority: 0.65,
  }))

  return [...staticPages, ...calculatorPages, ...predictionPages, ...statsPages]
}
