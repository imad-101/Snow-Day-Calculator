import { MetadataRoute } from 'next'

export default function robots(): MetadataRoute.Robots {
  const baseUrl = 'https://snowday-calc.com'
  
  return {
    rules: [
      {
        userAgent: '*',
        allow: [
          '/',
          '/about/',
          '/contact/',
          '/privacy/',
          '/terms/'
        ]
      },
    ],
    sitemap: `${baseUrl}/sitemap.xml`,
  }
}
