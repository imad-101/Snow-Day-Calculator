import type { Metadata } from "next"
import { SnowDayCalculator } from "@/components/snow-day-calculator"
import { ExplainerSection } from "@/components/explainer-section"
import { FAQSection } from "@/components/faq-section"
import { BlogPreview } from "@/components/blog-preview"

export const metadata: Metadata = {
  title: "Snow Day Calculator – Find Out If School Will Close Tomorrow",
  description:
    "Use our free Snow Day Calculator to predict if your school will close due to snow. Enter your ZIP code, school level, and snowfall prediction to get instant results.",
  keywords: "snow day calculator, school closure prediction, snow day predictor, weather school closings",
  openGraph: {
    title: "Snow Day Calculator – Find Out If School Will Close Tomorrow",
    description:
      "Use our free Snow Day Calculator to predict if your school will close due to snow. Enter your ZIP code, school level, and snowfall prediction to get instant results.",
    type: "website",
    url: "https://snowdaycalculator.com",
  },
  twitter: {
    card: "summary_large_image",
    title: "Snow Day Calculator – Find Out If School Will Close Tomorrow",
    description:
      "Use our free Snow Day Calculator to predict if your school will close due to snow. Enter your ZIP code, school level, and snowfall prediction to get instant results.",
  },
  alternates: {
    canonical: "https://snowdaycalculator.com",
  },
}

const jsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "WebSite",
      "@id": "https://snowdaycalculator.com/#website",
      url: "https://snowdaycalculator.com",
      name: "Snow Day Calculator",
      description: "Free tool to predict school closures due to snow",
      potentialAction: {
        "@type": "SearchAction",
        target: {
          "@type": "EntryPoint",
          urlTemplate: "https://snowdaycalculator.com/?q={search_term_string}",
        },
        "query-input": "required name=search_term_string",
      },
    },
    {
      "@type": "FAQPage",
      "@id": "https://snowdaycalculator.com/#faq",
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
        {
          "@type": "Question",
          name: "Why do different school levels have different closure rates?",
          acceptedAnswer: {
            "@type": "Answer",
            text: "Elementary schools often close more readily than high schools because younger students are more vulnerable to cold weather and have less experience walking in snow. High school students are generally more capable of handling winter conditions.",
          },
        },
        {
          "@type": "Question",
          name: "When do schools typically announce snow day closures?",
          acceptedAnswer: {
            "@type": "Answer",
            text: "Most schools announce closures the evening before or early morning (typically between 5-7 AM) of the affected day. Some districts use automated calling systems, websites, and social media to notify families.",
          },
        },
      ],
    },
  ],
}

export default function HomePage() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <main className="min-h-screen bg-background">
        {/* Hero Section with Calculator */}
        <section className="py-12 px-4 sm:px-6 lg:px-8">
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="text-4xl sm:text-5xl font-bold text-foreground mb-6">
              Snow Day Calculator – Find Out If School Will Close Tomorrow
            </h1>
            <p className="text-xl text-muted-foreground mb-8 max-w-2xl mx-auto">
              Get instant predictions on whether your school will close due to snow. Enter your details below for a
              personalized snow day probability.
            </p>
            <SnowDayCalculator />
          </div>
        </section>

        {/* Explainer Section */}
        <ExplainerSection />

        {/* FAQ Section */}
        <FAQSection />

        {/* Blog Preview Section */}
        <BlogPreview />
      </main>
    </>
  )
}
