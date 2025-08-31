
import { SnowDayCalculator } from "@/components/snow-day-calculator"
import { ExplainerSection } from "@/components/explainer-section"
import { FAQSection } from "@/components/faq-section"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"

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
            Get instant predictions on whether your school will close due to snow. Enter your details below for a
            personalized snow day probability.
          </p>
          <SnowDayCalculator />
        </div>
      </section>

      <ExplainerSection />
      <FAQSection />
      <Footer />
    </main>
  )
}