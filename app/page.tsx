import Link from "next/link"
import { SnowDayCalculator } from "@/components/snow-day-calculator"
import { ExplainerSection } from "@/components/explainer-section"
import { FAQSection } from "@/components/faq-section"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { Snowflake, BarChart3, CloudSnow, MapPin } from "lucide-react"

const POPULAR_CITIES = [
  { city: "Boston", state: "MA", slug: "boston" },
  { city: "Chicago", state: "IL", slug: "chicago" },
  { city: "Buffalo", state: "NY", slug: "buffalo" },
  { city: "Detroit", state: "MI", slug: "detroit" },
  { city: "Minneapolis", state: "MN", slug: "minneapolis" },
  { city: "Denver", state: "CO", slug: "denver" },
  { city: "Syracuse", state: "NY", slug: "syracuse" },
  { city: "Cleveland", state: "OH", slug: "cleveland" },
  { city: "Milwaukee", state: "WI", slug: "milwaukee" },
  { city: "Pittsburgh", state: "PA", slug: "pittsburgh" },
  { city: "Rochester", state: "NY", slug: "rochester" },
  { city: "Albany", state: "NY", slug: "albany" },
]

export default function HomePage() {
  return (
    <main className="min-h-screen bg-background">
      <Header />

      {/* Hero Section with Calculator */}
      <section className="py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto text-center">
          <h1 className="text-4xl sm:text-5xl font-bold text-foreground mb-6">
            Snow Day Calculator – Find Out If School Will Close Tomorrow
          </h1>
          <p className="text-xl text-muted-foreground mb-8 max-w-2xl mx-auto">
            Get instant predictions on whether your school will close due to snow. Enter your
            details below for a personalized snow day probability.
          </p>
          <SnowDayCalculator />
        </div>
      </section>

      {/* Popular Cities Hub */}
      <section className="py-12 px-4 sm:px-6 lg:px-8 bg-blue-50">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-8">
            <h2 className="text-3xl font-bold text-gray-900 mb-3 flex items-center justify-center gap-2">
              <MapPin className="h-6 w-6 text-blue-600" />
              Snow Day Calculators by City
            </h2>
            <p className="text-gray-600 max-w-xl mx-auto">
              Select your city for a tailored snow day probability with local school district data
              and historical snowfall averages.
            </p>
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-3 mb-6">
            {POPULAR_CITIES.map(({ city, state, slug }) => (
              <Link
                key={slug}
                href={`/snow-day-calculator/${slug}`}
                className="block p-3 bg-white hover:bg-blue-100 border border-blue-100 rounded-lg text-sm font-medium text-blue-700 hover:text-blue-900 transition-colors text-center shadow-sm"
              >
                {city}
                <span className="block text-xs text-blue-400 font-normal">{state}</span>
              </Link>
            ))}
          </div>
          <div className="text-center">
            <Link
              href="/snow-day-calculator"
              className="inline-flex items-center gap-2 px-6 py-3 bg-blue-600 text-white rounded-lg font-medium hover:bg-blue-700 transition-colors"
            >
              <Snowflake className="h-4 w-4" />
              Browse All 200+ Cities
            </Link>
          </div>
        </div>
      </section>

      {/* Section Cards */}
      <section className="py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-5xl mx-auto">
          <h2 className="text-2xl font-bold text-gray-900 mb-6 text-center">
            More Snow Day Tools
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
            <Link
              href="/snow-day-calculator"
              className="group block p-6 bg-white rounded-xl border border-gray-200 hover:border-blue-300 hover:shadow-md transition-all"
            >
              <Snowflake className="h-8 w-8 text-blue-600 mb-3 group-hover:scale-110 transition-transform" />
              <h3 className="font-semibold text-gray-900 mb-1">Calculator by City</h3>
              <p className="text-sm text-gray-600">
                City-specific snow day calculators with local school district and snowfall data.
              </p>
            </Link>
            <Link
              href="/will-there-be-a-snow-day-tomorrow"
              className="group block p-6 bg-white rounded-xl border border-gray-200 hover:border-indigo-300 hover:shadow-md transition-all"
            >
              <CloudSnow className="h-8 w-8 text-indigo-600 mb-3 group-hover:scale-110 transition-transform" />
              <h3 className="font-semibold text-gray-900 mb-1">Tomorrow Predictor</h3>
              <p className="text-sm text-gray-600">
                Will there be a snow day tomorrow? Get a probability estimate for your city.
              </p>
            </Link>
            <Link
              href="/snow-day-statistics"
              className="group block p-6 bg-white rounded-xl border border-gray-200 hover:border-slate-300 hover:shadow-md transition-all"
            >
              <BarChart3 className="h-8 w-8 text-slate-600 mb-3 group-hover:scale-110 transition-transform" />
              <h3 className="font-semibold text-gray-900 mb-1">Snow Day Statistics</h3>
              <p className="text-sm text-gray-600">
                Historical snow day data, biggest storms, and average closure rates by city.
              </p>
            </Link>
          </div>
        </div>
      </section>

      <ExplainerSection />
      <FAQSection />
      <Footer />
    </main>
  )
}
