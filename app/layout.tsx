import type { Metadata } from "next"
import { Inter } from "next/font/google"
import "./globals.css"

const inter = Inter({ subsets: ["latin"] })

export const metadata: Metadata = {
  metadataBase: new URL('https://snowday-calc.com'),
  title: {
    default: "Snow Day Calculator – Find Out If School Will Close Tomorrow",
    template: "%s | Snow Day Calculator"
  },
  description: "Use our free Snow Day Calculator to predict if your school will close due to snow. Enter your ZIP code, school level, and snowfall prediction to get instant results.",
  keywords: ["snow day calculator", "school closure prediction", "snow day predictor", "weather school closings", "snow day probability", "school snow cancellation"],
  authors: [{ name: "Snow Day Calculator Team" }],
  creator: "Snow Day Calculator",
  publisher: "Snow Day Calculator",
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://snowday-calc.com",
    title: "Snow Day Calculator – Find Out If School Will Close Tomorrow",
    description: "Use our free Snow Day Calculator to predict if your school will close due to snow. Enter your ZIP code, school level, and snowfall prediction to get instant results.",
    siteName: "Snow Day Calculator",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "Snow Day Calculator - Predict School Closures",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Snow Day Calculator – Find Out If School Will Close Tomorrow",
    description: "Use our free Snow Day Calculator to predict if your school will close due to snow. Enter your ZIP code, school level, and snowfall prediction to get instant results.",
    images: ["/twitter-image.png"],
    creator: "@snowdaycalc",
  },
  alternates: {
    canonical: "https://snowday-calc.com",
  },
  verification: {
    google: "your-google-verification-code",
    yandex: "your-yandex-verification-code",
    yahoo: "your-yahoo-verification-code",
  },
  category: "education",
}

const jsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "WebSite",
      "@id": "https://snowday-calc.com/#website",
      url: "https://snowday-calc.com",
      name: "Snow Day Calculator",
      description: "Free tool to predict school closures due to snow",
      potentialAction: {
        "@type": "SearchAction",
        target: {
          "@type": "EntryPoint",
          urlTemplate: "https://snowday-calc.com/?q={search_term_string}",
        },
        "query-input": "required name=search_term_string",
      },
    },
    {
      "@type": "WebApplication",
      "@id": "https://snowday-calc.com/#webapp",
      name: "Snow Day Calculator",
      description: "Calculate the probability of school closures due to snow",
      url: "https://snowday-calc.com",
      applicationCategory: "EducationalApplication",
      operatingSystem: "Any",
      offers: {
        "@type": "Offer",
        price: "0",
        priceCurrency: "USD",
      },
    },
    {
      "@type": "FAQPage",
      "@id": "https://snowday-calc.com/#faq",
      mainEntity: [
        {
          "@type": "Question",
          name: "How accurate is the Snow Day Calculator?",
          acceptedAnswer: {
            "@type": "Answer",
            text: "Our Snow Day Calculator provides estimates based on historical data and weather patterns. While it's a helpful tool, actual school closure decisions depend on many local factors including road conditions, temperature, and district policies.",
          },
        },
        {
          "@type": "Question",
          name: "What factors determine if schools close for snow?",
          acceptedAnswer: {
            "@type": "Answer",
            text: "Schools consider snowfall amount, temperature, wind conditions, road safety, bus route accessibility, and local infrastructure when deciding to close. Each district has its own criteria and decision-making process.",
          },
        },
      ],
    },
  ],
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <head>
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
        <link rel="icon" href="/favicon.ico" />
        <link rel="apple-touch-icon" sizes="180x180" href="/apple-touch-icon.png" />
        <link rel="icon" type="image/png" sizes="32x32" href="/favicon-32x32.png" />
        <link rel="icon" type="image/png" sizes="16x16" href="/favicon-16x16.png" />
        <link rel="manifest" href="/site.webmanifest" />
      </head>
      <body className={inter.className}>{children}</body>
    </html>
  )
}