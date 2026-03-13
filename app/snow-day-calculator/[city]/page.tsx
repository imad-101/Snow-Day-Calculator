import type { Metadata } from "next"
import { notFound } from "next/navigation"
import Link from "next/link"
import { cities, getCityBySlug, getNearbyCities, formatCityName } from "@/lib/cities"
import { SnowDayCalculator } from "@/components/snow-day-calculator"
import { NearbyCities } from "@/components/nearby-cities"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { Snowflake, MapPin, BarChart3, BookOpen, ChevronRight } from "lucide-react"

export async function generateStaticParams() {
  return cities.map((city) => ({ city: city.slug }))
}

type Props = { params: Promise<{ city: string }> }

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { city: slug } = await params
  const city = getCityBySlug(slug)
  if (!city) return {}

  const title = `Snow Day Calculator for ${city.city} (School Closing Predictor)`
  const description = `Calculate the probability of a snow day in ${city.city}, ${city.state}. Use our snow day calculator to estimate if ${city.schoolDistrict} will close tomorrow due to snow.`
  const url = `https://snowday-calc.com/snow-day-calculator/${city.slug}`

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

export default async function CityCalculatorPage({ params }: Props) {
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
          { "@type": "ListItem", position: 2, name: "Snow Day Calculator", item: "https://snowday-calc.com/snow-day-calculator" },
          { "@type": "ListItem", position: 3, name: city.city, item: `https://snowday-calc.com/snow-day-calculator/${city.slug}` },
        ],
      },
      {
        "@type": "WebApplication",
        name: `Snow Day Calculator – ${city.city}`,
        description: `Calculate snow day probability for ${city.city}, ${city.state}`,
        url: `https://snowday-calc.com/snow-day-calculator/${city.slug}`,
        applicationCategory: "EducationalApplication",
        operatingSystem: "Any",
        offers: { "@type": "Offer", price: "0", priceCurrency: "USD" },
      },
      {
        "@type": "FAQPage",
        mainEntity: [
          {
            "@type": "Question",
            name: `How many snow days does ${city.city} get per year?`,
            acceptedAnswer: {
              "@type": "Answer",
              text: `${city.city} averages approximately ${city.avgSnowDays} snow days per year, with an average annual snowfall of ${city.averageSnowfall}.`,
            },
          },
          {
            "@type": "Question",
            name: `How does ${city.schoolDistrict} decide to cancel school for snow?`,
            acceptedAnswer: {
              "@type": "Answer",
              text: `${city.schoolDistrict} typically evaluates road conditions, total snowfall, temperature, wind chill, and bus route safety before announcing a snow day. Decisions are usually made by 5–6 AM on the day in question.`,
            },
          },
          {
            "@type": "Question",
            name: `What is the biggest snowstorm in ${city.city} history?`,
            acceptedAnswer: {
              "@type": "Answer",
              text: `The biggest recorded snowstorm in ${city.city} was the ${city.historicalBiggestStorm}.`,
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
          <Link href="/snow-day-calculator" className="hover:text-blue-600">Snow Day Calculator</Link>
          <ChevronRight className="h-4 w-4" />
          <span className="text-gray-900 font-medium">{city.city}</span>
        </nav>

        {/* Hero */}
        <section className="py-10 px-4 sm:px-6 lg:px-8 bg-gradient-to-b from-blue-50 to-white">
          <div className="max-w-4xl mx-auto text-center">
            <div className="flex items-center justify-center gap-2 text-blue-600 mb-3">
              <MapPin className="h-5 w-5" />
              <span className="font-medium">{formatCityName(city)}</span>
            </div>
            <h1 className="text-4xl sm:text-5xl font-bold text-gray-900 mb-4">
              Snow Day Calculator for {city.city}
            </h1>
            <p className="text-xl text-gray-600 mb-3 max-w-2xl mx-auto">
              Will <strong>{city.schoolDistrict}</strong> close tomorrow? Enter your weather
              conditions below for an instant snow day probability estimate.
            </p>
            <p className="text-sm text-gray-500">
              {city.city} averages <strong>{city.averageSnowfall}</strong> of snow per year and approximately{" "}
              <strong>{city.avgSnowDays} snow days</strong> annually.
            </p>
          </div>
        </section>

        {/* Calculator */}
        <section className="py-8 px-4 sm:px-6 lg:px-8">
          <div className="max-w-4xl mx-auto">
            <SnowDayCalculator />
          </div>
        </section>

        {/* Snow Forecast Section */}
        <section className="py-8 px-4 sm:px-6 lg:px-8 bg-gray-50">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-2xl font-bold text-gray-900 mb-4 flex items-center gap-2">
              <Snowflake className="h-5 w-5 text-blue-600" />
              Latest Snow Forecast for {city.city}
            </h2>
            <p className="text-gray-700 mb-4">
              {city.city} sits in the <strong>{city.region.replace(/-/g, " ")}</strong> snowbelt region.
              With an average annual snowfall of <strong>{city.averageSnowfall}</strong>, residents know
              how quickly conditions can change. Always check the{" "}
              <a href="https://www.weather.gov" target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline">
                National Weather Service
              </a>{" "}
              for the most current forecasts and winter storm warnings for {city.city}.
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mt-6">
              <div className="bg-white rounded-lg p-4 border border-gray-200 text-center">
                <div className="text-3xl font-bold text-blue-600">{city.averageSnowfall}</div>
                <div className="text-sm text-gray-600 mt-1">Avg. Annual Snowfall</div>
              </div>
              <div className="bg-white rounded-lg p-4 border border-gray-200 text-center">
                <div className="text-3xl font-bold text-blue-600">{city.avgSnowDays}</div>
                <div className="text-sm text-gray-600 mt-1">Avg. Snow Days / Year</div>
              </div>
              <div className="bg-white rounded-lg p-4 border border-gray-200 text-center">
                <div className="text-3xl font-bold text-blue-600">❄️</div>
                <div className="text-sm text-gray-600 mt-1">Region: {city.region.replace(/-/g, " ")}</div>
              </div>
            </div>
          </div>
        </section>

        {/* Historical Snow Days */}
        <section className="py-8 px-4 sm:px-6 lg:px-8">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-2xl font-bold text-gray-900 mb-4 flex items-center gap-2">
              <BarChart3 className="h-5 w-5 text-blue-600" />
              Historical Snow Days in {city.city}
            </h2>
            <p className="text-gray-700 mb-4">
              {city.city}, {city.state} has a well-documented history of significant winter weather
              events. Schools in the area have been closing for snow days for decades, with the total
              number varying widely year to year.
            </p>
            <ul className="list-disc list-inside text-gray-700 space-y-2">
              <li>Average annual snowfall: <strong>{city.averageSnowfall}</strong></li>
              <li>Average number of snow days per year: <strong>{city.avgSnowDays}</strong></li>
              <li>Biggest recorded storm: <strong>{city.historicalBiggestStorm}</strong></li>
              <li>
                <Link href={`/snow-day-statistics/${city.slug}`} className="text-blue-600 hover:underline">
                  View full {city.city} snow day statistics →
                </Link>
              </li>
            </ul>
          </div>
        </section>

        {/* How Schools Decide */}
        <section className="py-8 px-4 sm:px-6 lg:px-8 bg-gray-50">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-2xl font-bold text-gray-900 mb-4 flex items-center gap-2">
              <BookOpen className="h-5 w-5 text-blue-600" />
              How {city.schoolDistrict} Decides to Close
            </h2>
            <p className="text-gray-700 mb-4">
              When winter storms threaten {city.city}, administrators at{" "}
              <strong>{city.schoolDistrict}</strong> weigh multiple factors before making a closure
              decision. This process typically begins the evening before and continues through the
              early morning hours.
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {[
                { title: "Total Snowfall", desc: `In ${city.city}, accumulations over 4–6 inches typically trigger serious consideration of closures.` },
                { title: "Road & Bus Safety", desc: `Bus routes through ${city.city} are assessed for ice, visibility, and plowing status before dawn.` },
                { title: "Temperature & Wind Chill", desc: `Extreme cold with dangerous wind chills can close schools even with minimal snowfall.` },
                { title: "Forecast Timing", desc: `Snow falling during the morning commute window carries more weight than overnight accumulation.` },
              ].map(({ title, desc }) => (
                <div key={title} className="bg-white rounded-lg p-4 border border-gray-200">
                  <h3 className="font-semibold text-gray-900 mb-1">{title}</h3>
                  <p className="text-sm text-gray-600">{desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Tips */}
        <section className="py-8 px-4 sm:px-6 lg:px-8">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">
              Tips for Predicting Snow Days in {city.city}
            </h2>
            <ol className="list-decimal list-inside text-gray-700 space-y-3">
              <li><strong>Watch NWS Winter Storm Watches and Warnings</strong> — official watches usually precede school closures.</li>
              <li><strong>Check local radar after midnight</strong> — radar at 1–3 AM often shows how much will accumulate before buses run.</li>
              <li><strong>Follow {city.schoolDistrict} on social media</strong> — most districts post closure decisions between 5 and 6 AM.</li>
              <li><strong>Monitor local TV stations</strong> — {city.city} news stations often receive closure lists as early as 4:30 AM.</li>
              <li><strong>Use our calculator above</strong> — enter the expected snowfall, temperature, and wind speed for an instant probability.</li>
            </ol>
          </div>
        </section>

        {/* Share Button */}
        <section className="py-8 px-4 sm:px-6 lg:px-8 bg-blue-50">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-xl font-bold text-gray-900 mb-3">Share Your Snow Day Probability</h2>
            <p className="text-gray-600 mb-4">
              Got your result? Share it with friends and family in {city.city}!
            </p>
            <ShareButton city={city.city} />
          </div>
        </section>

        {/* Internal Links */}
        <section className="py-6 px-4 sm:px-6 lg:px-8">
          <div className="max-w-4xl mx-auto">
            <NearbyCities cities={nearbyCities} routePrefix="snow-day-calculator" />
          </div>
        </section>

        <Footer />
      </main>
    </>
  )
}

function ShareButton({ city }: { city: string }) {
  return (
    <div className="flex flex-wrap gap-3 justify-center">
      <a
        href={`https://twitter.com/intent/tweet?text=I%20just%20calculated%20my%20snow%20day%20chance%20for%20${encodeURIComponent(city)}!%20Check%20yours%20at%20snowday-calc.com`}
        target="_blank"
        rel="noopener noreferrer"
        className="inline-flex items-center gap-2 px-5 py-2.5 bg-[#1DA1F2] text-white rounded-lg font-medium hover:bg-[#1a8fd1] transition-colors"
      >
        Share on Twitter/X
      </a>
      <a
        href={`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(`https://snowday-calc.com/snow-day-calculator`)}`}
        target="_blank"
        rel="noopener noreferrer"
        className="inline-flex items-center gap-2 px-5 py-2.5 bg-[#4267B2] text-white rounded-lg font-medium hover:bg-[#375899] transition-colors"
      >
        Share on Facebook
      </a>
    </div>
  )
}
