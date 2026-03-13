import type { Metadata } from "next"
import Link from "next/link"
import { cities } from "@/lib/cities"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { BarChart3 } from "lucide-react"

export const metadata: Metadata = {
  title: "Snow Day Statistics by City – Historical Data",
  description: "Explore historical snow day statistics, average closures, and biggest snowstorms for 200+ US and Canadian cities.",
  alternates: { canonical: "https://snowday-calc.com/snow-day-statistics" },
}

export default function SnowDayStatisticsIndexPage() {
  const grouped = cities.reduce<Record<string, typeof cities>>((acc, city) => {
    const letter = city.city[0].toUpperCase()
    if (!acc[letter]) acc[letter] = []
    acc[letter].push(city)
    return acc
  }, {})
  const letters = Object.keys(grouped).sort()

  return (
    <main className="min-h-screen bg-background">
      <Header />
      <section className="py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-10">
            <h1 className="text-4xl font-bold text-gray-900 mb-4 flex items-center justify-center gap-3">
              <BarChart3 className="h-8 w-8 text-blue-600" />
              Snow Day Statistics by City
            </h1>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Historical snow day data, average annual closures, and biggest recorded storms for {cities.length}+ US and Canadian cities.
            </p>
          </div>
          {letters.map((letter) => (
            <div key={letter} className="mb-8">
              <h2 className="text-xl font-bold text-gray-800 border-b border-gray-200 pb-2 mb-4">{letter}</h2>
              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-2">
                {grouped[letter].map((city) => (
                  <Link
                    key={city.slug}
                    href={`/snow-day-statistics/${city.slug}`}
                    className="block p-2.5 text-sm text-blue-700 hover:text-blue-900 hover:bg-blue-50 rounded-lg transition-colors"
                  >
                    {city.city}
                    <span className="block text-xs text-gray-500">{city.state}</span>
                  </Link>
                ))}
              </div>
            </div>
          ))}
        </div>
      </section>
      <Footer />
    </main>
  )
}
