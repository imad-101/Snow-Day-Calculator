import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Snowflake } from "lucide-react"

export function Header() {
  return (
    <header className="border-b bg-white/95 backdrop-blur supports-[backdrop-filter]:bg-white/60">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex h-16 items-center justify-between">
          <Link href="/" className="flex items-center space-x-2">
            <Snowflake className="h-8 w-8 text-[#6b80ac]" />
            <span className="text-xl font-bold text-gray-900">Snow Day Calculator</span>
          </Link>

          <nav className="hidden md:flex items-center space-x-8">
            <Link href="/" className="text-gray-700 hover:text-[#6b80ac] transition-colors">
              Calculator
            </Link>
            <Link href="/about" className="text-gray-700 hover:text-[#6b80ac] transition-colors">
              About
            </Link>
            <Link href="/contact" className="text-gray-700 hover:text-[#6b80ac] transition-colors">
              Contact
            </Link>
          </nav>

          <Button asChild className="bg-[#6b80ac] hover:bg-[#5a6d94]">
            <Link href="/">Try Calculator</Link>
          </Button>
        </div>
      </div>
    </header>
  )
}
