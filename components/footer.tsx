import Link from "next/link"
import { Snowflake } from "lucide-react"

export function Footer() {
  return (
    <footer className="bg-[#4a5d7a] text-white">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Brand */}
          <div className="col-span-1 md:col-span-2">
            <Link href="/" className="flex items-center space-x-2 mb-4">
              <Snowflake className="h-8 w-8 text-[#8fa3c7]" />
              <span className="text-xl font-bold">Snow Day Calculator</span>
            </Link>
            <p className="text-gray-300 mb-4 max-w-md">
              The most accurate snow day prediction tool. Get instant predictions based on your location, snowfall
              amounts, and school district policies.
            </p>
            <p className="text-sm text-gray-400">© 2024 Snow Day Calculator. All rights reserved.</p>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="font-semibold mb-4">Quick Links</h3>
            <ul className="space-y-2">
              <li>
                <Link href="/" className="text-gray-300 hover:text-[#8fa3c7] transition-colors">
                  Snow Day Calculator
                </Link>
              </li>
              <li>
                <Link href="/about" className="text-gray-300 hover:text-[#8fa3c7] transition-colors">
                  About Us
                </Link>
              </li>
              <li>
                <Link href="/contact" className="text-gray-300 hover:text-[#8fa3c7] transition-colors">
                  Contact
                </Link>
              </li>
            </ul>
          </div>

          {/* Legal */}
          <div>
            <h3 className="font-semibold mb-4">Legal</h3>
            <ul className="space-y-2">
              <li>
                <Link href="/privacy" className="text-gray-300 hover:text-[#8fa3c7] transition-colors">
                  Privacy Policy
                </Link>
              </li>
              <li>
                <Link href="/terms" className="text-gray-300 hover:text-[#8fa3c7] transition-colors">
                  Terms of Service
                </Link>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-[#5a6d94] mt-8 pt-8 text-center text-gray-300">
          <p className="text-sm">
            Disclaimer: Snow day predictions are estimates based on weather data and historical patterns. Always check
            with your local school district for official announcements.
          </p>
        </div>
      </div>
    </footer>
  )
}
