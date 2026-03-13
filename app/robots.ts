import { MetadataRoute } from 'next'

export default function robots(): MetadataRoute.Robots {
  const baseUrl = 'https://snowday-calc.com'

  return {
    rules: [
      {
        userAgent: '*',
        allow: [
          '/',
          '/snow-day-calculator/',
          '/will-there-be-a-snow-day-tomorrow/',
          '/snow-day-statistics/',
          '/about/',
          '/contact/',
          '/privacy/',
          '/terms/',
        ],
      },
    ],
    sitemap: `${baseUrl}/sitemap.xml`,
  }
}
