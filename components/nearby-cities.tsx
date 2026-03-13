import Link from "next/link"
import { MapPin } from "lucide-react"
import type { City } from "@/lib/cities"

interface NearbyCitiesProps {
  cities: City[]
  routePrefix: string
}

export function NearbyCities({ cities, routePrefix }: NearbyCitiesProps) {
  return (
    <section className="mt-12 border-t border-gray-200 pt-10">
      <h2 className="text-2xl font-bold text-gray-900 mb-2 flex items-center gap-2">
        <MapPin className="h-5 w-5 text-blue-600" />
        Snow Day Predictions Near You
      </h2>
      <p className="text-gray-600 mb-6">
        Check snow day predictions for nearby cities and school districts.
      </p>
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-3">
        {cities.map((city) => (
          <Link
            key={city.slug}
            href={`/${routePrefix}/${city.slug}`}
            className="block p-3 bg-blue-50 hover:bg-blue-100 rounded-lg text-sm font-medium text-blue-700 hover:text-blue-900 transition-colors text-center"
          >
            {city.city}
            <span className="block text-xs text-blue-500 font-normal">{city.state}</span>
          </Link>
        ))}
      </div>
    </section>
  )
}
