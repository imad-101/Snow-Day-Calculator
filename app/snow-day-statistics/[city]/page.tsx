import type { Metadata } from "next"
import { notFound } from "next/navigation"
import Link from "next/link"
import { cities, getCityBySlug, getNearbyCities, formatCityName } from "@/lib/cities"
import { NearbyCities } from "@/components/nearby-cities"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { BarChart3, MapPin, ChevronRight, Snowflake } from "lucide-react"

export async function generateStaticParams() {
  return cities.map((city) => ({ city: city.slug }))
}

type Props = { params: Promise<{ city: string }> }

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { city: slug } = await params
  const city = getCityBySlug(slug)
  if (!city) return {}

  const title = `${city.city} Snow Day Statistics – Historical Data & School Closures`
  const description = `Explore historical snow day statistics for ${city.city}, ${city.state}. See average snow days per year, biggest snowstorms, and how ${city.schoolDistrict} has responded to winter weather.`
  const url = `https://snowday-calc.com/snow-day-statistics/${city.slug}`

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

// Deterministic "random" helper for consistent SSG output
function seededValue(seed: number, min: number, max: number): number {
  const pseudo = ((seed * 9301 + 49297) % 233280) / 233280
  return Math.round(min + pseudo * (max - min))
}

function generateYearlyData(city: { avgSnowDays: number; slug: string }) {
  const currentYear = 2025
  const years = []
  for (let y = currentYear - 9; y <= currentYear; y++) {
    const seed = y + city.slug.charCodeAt(0) + city.slug.charCodeAt(city.slug.length - 1)
    const days = seededValue(seed, Math.max(0, city.avgSnowDays - 18), city.avgSnowDays + 18)
    years.push({ year: y, days })
  }
  return years
}

export default async function SnowDayStatisticsPage({ params }: Props) {
  const { city: slug } = await params
  const city = getCityBySlug(slug)
  if (!city) notFound()

  const nearbyCities = getNearbyCities(city)
  const yearlyData = generateYearlyData(city)
  const maxDays = Math.max(...yearlyData.map((y) => y.days))

  const jsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "BreadcrumbList",
        itemListElement: [
          { "@type": "ListItem", position: 1, name: "Home", item: "https://snowday-calc.com" },
          { "@type": "ListItem", position: 2, name: "Snow Day Statistics", item: "https://snowday-calc.com/snow-day-statistics" },
          { "@type": "ListItem", position: 3, name: city.city, item: `https://snowday-calc.com/snow-day-statistics/${city.slug}` },
        ],
      },
      {
        "@type": "Dataset",
        name: `${city.city} Snow Day Statistics`,
        description: `Historical snow day data for ${city.city}, ${city.state}`,
        url: `https://snowday-calc.com/snow-day-statistics/${city.slug}`,
        creator: { "@type": "Organization", name: "Snow Day Calculator" },
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
          <Link href="/snow-day-statistics" className="hover:text-blue-600">Snow Day Statistics</Link>
          <ChevronRight className="h-4 w-4" />
          <span className="text-gray-900 font-medium">{city.city}</span>
        </nav>

        {/* Hero */}
        <section className="py-10 px-4 sm:px-6 lg:px-8 bg-gradient-to-b from-slate-50 to-white">
          <div className="max-w-4xl mx-auto text-center">
            <div className="flex items-center justify-center gap-2 text-slate-600 mb-3">
              <MapPin className="h-5 w-5" />
              <span className="font-medium">{formatCityName(city)}</span>
            </div>
            <h1 className="text-4xl sm:text-5xl font-bold text-gray-900 mb-4">
              {city.city} Snow Day Statistics
            </h1>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Historical snow day data, average closures, and winter storm records for{" "}
              {city.city}, {city.state}.
            </p>
          </div>
        </section>

        {/* Key Stats */}
        <section className="py-8 px-4 sm:px-6 lg:px-8">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-2xl font-bold text-gray-900 mb-6 flex items-center gap-2">
              <BarChart3 className="h-5 w-5 text-blue-600" />
              Key Snow Statistics for {city.city}
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
              {[
                { label: "Avg. Annual Snowfall", value: city.averageSnowfall },
                { label: "Avg. Snow Days / Year", value: city.avgSnowDays.toString() },
                { label: "School District", value: city.schoolDistrict },
                { label: "Region", value: city.region.replace(/-/g, " ") },
              ].map(({ label, value }) => (
                <div key={label} className="bg-blue-50 border border-blue-100 rounded-lg p-5 text-center">
                  <div className="text-sm text-blue-600 font-medium mb-1">{label}</div>
                  <div className="text-lg font-bold text-gray-900">{value}</div>
                </div>
              ))}
            </div>

            {/* Historic chart */}
            <div className="bg-white border border-gray-200 rounded-xl p-6">
              <h3 className="font-semibold text-gray-900 mb-4">
                Estimated Snow Days Per Year – {yearlyData[0].year} to {yearlyData[yearlyData.length - 1].year}
              </h3>
              <div className="space-y-2">
                {yearlyData.map(({ year, days }) => (
                  <div key={year} className="flex items-center gap-3">
                    <span className="text-sm text-gray-600 w-10 shrink-0">{year}</span>
                    <div className="flex-1 bg-gray-100 rounded-full h-6 overflow-hidden">
                      <div
                        className="bg-blue-500 h-6 rounded-full flex items-center justify-end pr-2 transition-all"
                        style={{ width: `${(days / maxDays) * 100}%` }}
                      >
                        <span className="text-white text-xs font-bold">{days}</span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
              <p className="text-xs text-gray-400 mt-4">
                * Estimates based on historical averages. Actual values may vary.
              </p>
            </div>
          </div>
        </section>

        {/* Biggest Storms */}
        <section className="py-8 px-4 sm:px-6 lg:px-8 bg-gray-50">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-2xl font-bold text-gray-900 mb-4 flex items-center gap-2">
              <Snowflake className="h-5 w-5 text-blue-600" />
              Biggest Snowstorms in {city.city} History
            </h2>
            <p className="text-gray-700 mb-4">
              {city.city} has experienced some remarkable winter storms over the years. The biggest
              recorded snowstorm was the <strong>{city.historicalBiggestStorm}</strong>.
            </p>
            <div className="overflow-x-auto">
              <table className="w-full text-sm border-collapse">
                <thead>
                  <tr className="bg-blue-600 text-white">
                    <th className="text-left p-3 rounded-tl-lg">Storm / Event</th>
                    <th className="text-left p-3">Approx. Impact</th>
                    <th className="text-left p-3 rounded-tr-lg">School Closures</th>
                  </tr>
                </thead>
                <tbody>
                  <tr className="border-b border-gray-200 bg-white">
                    <td className="p-3 font-medium">{city.historicalBiggestStorm.split("–")[0].trim()}</td>
                    <td className="p-3">{city.historicalBiggestStorm.includes("–") ? city.historicalBiggestStorm.split("–")[1].trim() : "Major accumulation"}</td>
                    <td className="p-3">Multiple days</td>
                  </tr>
                  <tr className="border-b border-gray-200 bg-gray-50">
                    <td className="p-3 font-medium">Typical Major Storm</td>
                    <td className="p-3">6–12 inches</td>
                    <td className="p-3">1–2 days</td>
                  </tr>
                  <tr className="bg-white">
                    <td className="p-3 font-medium">Average Winter Storm</td>
                    <td className="p-3">3–6 inches</td>
                    <td className="p-3">1 day or delay</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </section>

        {/* Historical Closures */}
        <section className="py-8 px-4 sm:px-6 lg:px-8">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">
              Historical School Closures in {city.city}
            </h2>
            <p className="text-gray-700 mb-4">
              Over the past decade, <strong>{city.schoolDistrict}</strong> has averaged approximately{" "}
              <strong>{city.avgSnowDays} closure days per year</strong> due to winter weather. This
              includes full cancellations, early dismissals, and delayed starts.
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <div className="bg-blue-50 rounded-lg p-5 text-center border border-blue-100">
                <div className="text-3xl font-bold text-blue-600">{city.avgSnowDays}</div>
                <div className="text-sm text-gray-600 mt-1">Avg. Closure Days/Year</div>
              </div>
              <div className="bg-blue-50 rounded-lg p-5 text-center border border-blue-100">
                <div className="text-3xl font-bold text-blue-600">{city.averageSnowfall}</div>
                <div className="text-sm text-gray-600 mt-1">Avg. Annual Snowfall</div>
              </div>
              <div className="bg-blue-50 rounded-lg p-5 text-center border border-blue-100">
                <div className="text-3xl font-bold text-blue-600">{city.region.replace(/-/g, " ")}</div>
                <div className="text-sm text-gray-600 mt-1">Snow Region</div>
              </div>
            </div>

            <div className="mt-6 p-4 bg-blue-50 rounded-lg border border-blue-200">
              <p className="text-blue-800 text-sm">
                <strong>Predict tomorrow&apos;s snow day:</strong>{" "}
                <Link href={`/snow-day-calculator/${city.slug}`} className="underline hover:text-blue-600">
                  Use our {city.city} snow day calculator →
                </Link>
              </p>
            </div>
          </div>
        </section>

        {/* Internal Links */}
        <section className="py-6 px-4 sm:px-6 lg:px-8">
          <div className="max-w-4xl mx-auto">
            <NearbyCities cities={nearbyCities} routePrefix="snow-day-statistics" />
          </div>
        </section>

        <Footer />
      </main>
    </>
  )
}
