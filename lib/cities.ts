import citiesData from "@/data/cities.json"

export interface City {
  city: string
  state: string
  slug: string
  averageSnowfall: string
  schoolDistrict: string
  lat: number
  lng: number
  avgSnowDays: number
  historicalBiggestStorm: string
  region: string
}

export const cities: City[] = citiesData as City[]

export function getCityBySlug(slug: string): City | undefined {
  return cities.find((c) => c.slug === slug)
}

function haversineDistance(lat1: number, lng1: number, lat2: number, lng2: number): number {
  const R = 3958.8 // miles
  const dLat = ((lat2 - lat1) * Math.PI) / 180
  const dLng = ((lng2 - lng1) * Math.PI) / 180
  const a =
    Math.sin(dLat / 2) ** 2 +
    Math.cos((lat1 * Math.PI) / 180) * Math.cos((lat2 * Math.PI) / 180) * Math.sin(dLng / 2) ** 2
  return R * 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a))
}

export function getNearbyCities(city: City, count = 10): City[] {
  return cities
    .filter((c) => c.slug !== city.slug)
    .map((c) => ({ city: c, distance: haversineDistance(city.lat, city.lng, c.lat, c.lng) }))
    .sort((a, b) => a.distance - b.distance)
    .slice(0, count)
    .map((item) => item.city)
}

export function getCitiesByRegion(region: string): City[] {
  return cities.filter((c) => c.region === region)
}

export function formatCityName(city: City): string {
  return `${city.city}, ${city.state}`
}
