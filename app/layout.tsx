import type React from "react"
import type { Metadata } from "next"
import { GeistSans } from "geist/font/sans"
import { GeistMono } from "geist/font/mono"
import "./globals.css"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"

export const metadata: Metadata = {
  title: "Snow Day Calculator - Accurate Snow Day Predictions",
  description:
    "Get instant snow day predictions based on your ZIP code, snowfall amounts, and school level. The most accurate snow day calculator available.",
  generator: "v0.app",
  keywords: "snow day calculator, snow day prediction, school closures, weather forecast, snow day probability",
  openGraph: {
    title: "Snow Day Calculator - Accurate Snow Day Predictions",
    description: "Get instant snow day predictions based on your ZIP code, snowfall amounts, and school level.",
    type: "website",
  },
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <head>
        <style>{`
html {
  font-family: ${GeistSans.style.fontFamily};
  --font-sans: ${GeistSans.variable};
  --font-mono: ${GeistMono.variable};
}
        `}</style>
      </head>
      <body>
        <Header />
        <main className="min-h-screen">{children}</main>
        <Footer />
      </body>
    </html>
  )
}
