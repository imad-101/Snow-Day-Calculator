import Link from "next/link"
import { Snowflake } from "lucide-react"
import { MobileMenu } from "@/components/mobile-menu"

export function Header() {
  return (
    <header className="relative border-b border-gray-200 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex h-16 items-center justify-between">
          <Link href="/" className="flex items-center space-x-2">
            <Snowflake className="h-6 w-6 text-blue-600" />
            <span className="text-lg font-semibold text-gray-900">Snow Day Calculator</span>
          </Link>

          <nav className="hidden md:flex items-center space-x-6">
            <Link href="/snow-day-calculator" className="text-gray-600 hover:text-gray-900 transition-colors font-medium text-sm">
              By City
            </Link>
            <Link href="/will-there-be-a-snow-day-tomorrow" className="text-gray-600 hover:text-gray-900 transition-colors font-medium text-sm">
              Tomorrow
            </Link>
            <Link href="/snow-day-statistics" className="text-gray-600 hover:text-gray-900 transition-colors font-medium text-sm">
              Statistics
            </Link>
            <Link href="/about" className="text-gray-600 hover:text-gray-900 transition-colors font-medium text-sm">
              About
            </Link>
          </nav>

          <MobileMenu />
        </div>
      </div>
    </header>
  )
}
