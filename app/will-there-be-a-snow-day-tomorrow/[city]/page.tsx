import type { Metadata } from "next"
import { notFound } from "next/navigation"
import Link from "next/link"
import { cities, getCityBySlug, getNearbyCities, formatCityName } from "@/lib/cities"
import { SnowDayCalculator } from "@/components/snow-day-calculator"
import { NearbyCities } from "@/components/nearby-cities"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { Snowflake, MapPin, Clock, ChevronRight } from "lucide-react"

export async function generateStaticParams() {
  return cities.map((city) => ({ city: city.slug }))
}

type Props = { params: Promise<{ city: string }> }

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { city: slug } = await params
  const city = getCityBySlug(slug)
  if (!city) return {}

  const title = `Will There Be a Snow Day Tomorrow in ${city.city}? (${new Date().getFullYear()} Predictor)`
  const description = `Find out if there will be a snow day tomorrow in ${city.city}, ${city.state}. Check the probability that ${city.schoolDistrict} will be closed due to snow or winter weather.`
  const url = `https://snowday-calc.com/will-there-be-a-snow-day-tomorrow/${city.slug}`

  return {
    title,
    description,
    alternates: { canonical: url },
    openGraph: {
      title,
      description,
      url,
      type: "website",
      siteName: "Snow Day Calculator",
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
    },
  }
}

export default async function WillThereBeASnowDayPage({ params }: Props) {
  const { city: slug } = await params
  const city = getCityBySlug(slug)
  if (!city) notFound()

  const nearbyCities = getNearbyCities(city)

  const jsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "BreadcrumbList",
        itemListElement: [
          { "@type": "ListItem", position: 1, name: "Home", item: "https://snowday-calc.com" },
          { "@type": "ListItem", position: 2, name: "Will There Be a Snow Day Tomorrow", item: "https://snowday-calc.com/will-there-be-a-snow-day-tomorrow" },
          { "@type": "ListItem", position: 3, name: city.city, item: `https://snowday-calc.com/will-there-be-a-snow-day-tomorrow/${city.slug}` },
        ],
      },
      {
        "@type": "FAQPage",
        mainEntity: [
          {
            "@type": "Question",
            name: `Will there be a snow day tomorrow in ${city.city}?`,
            acceptedAnswer: {
              "@type": "Answer",
              text: `To predict if there will be a snow day tomorrow in ${city.city}, enter the expected snowfall amount, temperature, and wind speed into our calculator above. ${city.schoolDistrict} typically announces closures by 5–6 AM on the day in question.`,
            },
          },
          {
            "@type": "Question",
            name: `When does ${city.schoolDistrict} announce snow days?`,
            acceptedAnswer: {
              "@type": "Answer",
              text: `${city.schoolDistrict} typically announces snow day decisions between 5:00 AM and 6:00 AM on the morning of a potential closure. Check their official website, local TV stations, and their school notification system for updates.`,
            },
          },
          {
            "@type": "Question",
            name: `How much snow does it take to cancel school in ${city.city}?`,
            acceptedAnswer: {
              "@type": "Answer",
              text: `In ${city.city}, school closures typically depend on multiple factors including total snowfall, road conditions, temperature, and wind. ${city.city} averages ${city.averageSnowfall} of snowfall per year and approximately ${city.avgSnowDays} snow days annually.`,
            },
          },
        ],
      },
    ],
  }

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <main className="min-h-screen bg-background">
        <Header />

        {/* Breadcrumb */}
        <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3 flex items-center gap-1 text-sm text-gray-500">
          <Link href="/" className="hover:text-blue-600">Home</Link>
          <ChevronRight className="h-4 w-4" />
          <Link href="/will-there-be-a-snow-day-tomorrow" className="hover:text-blue-600">Will There Be a Snow Day Tomorrow</Link>
          <ChevronRight className="h-4 w-4" />
          <span className="text-gray-900 font-medium">{city.city}</span>
        </nav>

        {/* Hero */}
        <section className="py-10 px-4 sm:px-6 lg:px-8 bg-gradient-to-b from-indigo-50 to-white">
          <div className="max-w-4xl mx-auto text-center">
            <div className="flex items-center justify-center gap-2 text-indigo-600 mb-3">
              <MapPin className="h-5 w-5" />
              <span className="font-medium">{formatCityName(city)}</span>
            </div>
            <h1 className="text-4xl sm:text-5xl font-bold text-gray-900 mb-4">
              Will There Be a Snow Day Tomorrow in {city.city}?
            </h1>
            <p className="text-xl text-gray-600 mb-3 max-w-2xl mx-auto">
              Use our predictor to calculate the chance that{" "}
              <strong>{city.schoolDistrict}</strong> will be closed tomorrow due to snow or winter
              weather.
            </p>
            <div className="inline-flex items-center gap-2 bg-white border border-indigo-200 rounded-full px-4 py-2 text-sm text-indigo-700 font-medium">
              <Clock className="h-4 w-4" />
              Closures usually announced by 5–6 AM
            </div>
          </div>
        </section>

        {/* Calculator */}
        <section className="py-8 px-4 sm:px-6 lg:px-8">
          <div className="max-w-4xl mx-auto">
            <SnowDayCalculator />
          </div>
        </section>

        {/* What to Watch For */}
        <section className="py-8 px-4 sm:px-6 lg:px-8 bg-gray-50">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-2xl font-bold text-gray-900 mb-4 flex items-center gap-2">
              <Snowflake className="h-5 w-5 text-indigo-600" />
              What to Watch For Tonight in {city.city}
            </h2>
            <p className="text-gray-700 mb-6">
              If a winter storm is approaching {city.city}, here are the signs that a snow day is
              increasingly likely tomorrow:
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {[
                {
                  icon: "🌨️",
                  title: "NWS Winter Storm Warning",
                  desc: `A Winter Storm Warning for ${city.city} is the strongest signal a snow day is coming. These are issued when significant accumulation is expected.`,
                },
                {
                  icon: "🌡️",
                  title: "Temperature Below 28°F",
                  desc: `Below freezing temperatures overnight mean roads in ${city.city} will stay icy well into the morning rush and bus routes.`,
                },
                {
                  icon: "💨",
                  title: "Wind Gusts Over 25 mph",
                  desc: `High winds cause blowing and drifting snow across ${city.city} roads, significantly increasing the chance of closure even with lower snowfall totals.`,
                },
                {
                  icon: "📏",
                  title: "Forecast 4+ inches",
                  desc: `In ${city.city}, forecasts of 4 or more inches typically put ${city.schoolDistrict} administrators on high alert for a closure.`,
                },
              ].map(({ icon, title, desc }) => (
                <div key={title} className="bg-white rounded-lg p-4 border border-gray-200">
                  <div className="text-2xl mb-2">{icon}</div>
                  <h3 className="font-semibold text-gray-900 mb-1">{title}</h3>
                  <p className="text-sm text-gray-600">{desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Where to Check */}
        <section className="py-8 px-4 sm:px-6 lg:px-8">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">
              Where to Check Snow Day Announcements in {city.city}
            </h2>
            <ul className="space-y-3 text-gray-700">
              <li className="flex items-start gap-3">
                <span className="text-blue-600 font-bold mt-0.5">1.</span>
                <span>
                  <strong>{city.schoolDistrict} official website and mobile app</strong> — the most reliable source
                  for closure announcements in {city.city}.
                </span>
              </li>
              <li className="flex items-start gap-3">
                <span className="text-blue-600 font-bold mt-0.5">2.</span>
                <span>
                  <strong>Local TV station school closing lists</strong> — {city.city} area news channels typically
                  start posting closures by 5:00 AM.
                </span>
              </li>
              <li className="flex items-start gap-3">
                <span className="text-blue-600 font-bold mt-0.5">3.</span>
                <span>
                  <strong>School notification systems (SchoolMessenger, ParentSquare)</strong> — most{" "}
                  {city.city} districts send automated calls and texts.
                </span>
              </li>
              <li className="flex items-start gap-3">
                <span className="text-blue-600 font-bold mt-0.5">4.</span>
                <span>
                  <strong>National Weather Service – weather.gov</strong> — check for{" "}
                  <a href="https://www.weather.gov" target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline">
                    the latest winter storm alerts for {city.city}
                  </a>
                  .
                </span>
              </li>
            </ul>
            <div className="mt-6 p-4 bg-blue-50 rounded-lg border border-blue-200">
              <p className="text-blue-800 text-sm">
                <strong>Also see:</strong>{" "}
                <Link href={`/snow-day-calculator/${city.slug}`} className="underline hover:text-blue-600">
                  Snow Day Calculator for {city.city}
                </Link>{" "}
                and{" "}
                <Link href={`/snow-day-statistics/${city.slug}`} className="underline hover:text-blue-600">
                  {city.city} snow day statistics
                </Link>
                .
              </p>
            </div>
          </div>
        </section>

        {/* Internal Links */}
        <section className="py-6 px-4 sm:px-6 lg:px-8">
          <div className="max-w-4xl mx-auto">
            <NearbyCities cities={nearbyCities} routePrefix="will-there-be-a-snow-day-tomorrow" />
          </div>
        </section>

        <Footer />
      </main>
    </>
  )
}
