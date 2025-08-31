import Link from "next/link"
import { Snowflake } from "lucide-react"

export function Header() {
  return (
    <header className="border-b border-gray-200 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex h-16 items-center justify-between">
          <Link href="/" className="flex items-center space-x-2">
            <Snowflake className="h-6 w-6 text-blue-600" />
            <span className="text-lg font-semibold text-gray-900">Snow Day Calculator</span>
          </Link>

          <nav className="flex items-center space-x-8">
            <Link href="/" className="text-gray-600 hover:text-gray-900 transition-colors font-medium">
              Home
            </Link>
            <Link href="/about" className="text-gray-600 hover:text-gray-900 transition-colors font-medium">
              About
            </Link>
            <Link href="/contact" className="text-gray-600 hover:text-gray-900 transition-colors font-medium">
              Contact
            </Link>
          </nav>
        </div>
      </div>
    </header>
  )
}
