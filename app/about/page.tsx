import type { Metadata } from "next"
import { Card, CardContent } from "@/components/ui/card"
import { Snowflake, Users, Target, Award } from "lucide-react"

export const metadata: Metadata = {
  title: "About Us - Snow Day Calculator",
  description:
    "Learn about the Snow Day Calculator team and our mission to provide accurate snow day predictions for students, parents, and educators.",
  openGraph: {
    title: "About Us - Snow Day Calculator",
    description: "Learn about our mission to provide accurate snow day predictions.",
  },
}

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-white">
      {/* Hero Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8">
        <div className="container mx-auto max-w-4xl text-center">
          <div className="flex justify-center mb-6">
            <Snowflake className="h-16 w-16 text-blue-600" />
          </div>
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">About Snow Day Calculator</h1>
          <p className="text-xl text-gray-600 leading-relaxed">
            We're passionate about helping students, parents, and educators make informed decisions about snow days
            through accurate, data-driven predictions.
          </p>
        </div>
      </section>

      {/* Mission Section */}
      <section className="py-16 px-4 sm:px-6 lg:px-8">
        <div className="container mx-auto max-w-6xl">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl font-bold text-gray-900 mb-6">Our Mission</h2>
              <p className="text-lg text-gray-600 mb-6 leading-relaxed">
                Snow Day Calculator was created to solve a common problem faced by millions of families every winter:
                uncertainty about school closures due to weather conditions.
              </p>
              <p className="text-lg text-gray-600 mb-6 leading-relaxed">
                Our advanced algorithm considers multiple factors including snowfall amounts, temperature, wind
                conditions, road conditions, and historical school district patterns to provide the most accurate
                predictions possible.
              </p>
              <p className="text-lg text-gray-600 leading-relaxed">
                We believe that better information leads to better planning, whether you're a parent arranging
                childcare, a student planning study time, or an educator preparing lessons.
              </p>
            </div>
            <div className="grid grid-cols-2 gap-6">
              <Card className="text-center p-6">
                <CardContent className="pt-6">
                  <Users className="h-12 w-12 text-blue-600 mx-auto mb-4" />
                  <h3 className="font-semibold text-gray-900 mb-2">500K+</h3>
                  <p className="text-gray-600">Users Served</p>
                </CardContent>
              </Card>
              <Card className="text-center p-6">
                <CardContent className="pt-6">
                  <Target className="h-12 w-12 text-blue-600 mx-auto mb-4" />
                  <h3 className="font-semibold text-gray-900 mb-2">85%</h3>
                  <p className="text-gray-600">Accuracy Rate</p>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </section>

      {/* How It Works Section */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 bg-white">
        <div className="container mx-auto max-w-4xl">
          <h2 className="text-3xl font-bold text-gray-900 text-center mb-12">How Our Predictions Work</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="bg-blue-100 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl font-bold text-blue-600">1</span>
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-3">Data Collection</h3>
              <p className="text-gray-600">
                We gather real-time weather data, historical patterns, and school district policies from thousands of
                sources across the country.
              </p>
            </div>
            <div className="text-center">
              <div className="bg-blue-100 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl font-bold text-blue-600">2</span>
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-3">Algorithm Analysis</h3>
              <p className="text-gray-600">
                Our machine learning algorithm processes multiple variables including snowfall, temperature, timing, and
                local decision-making patterns.
              </p>
            </div>
            <div className="text-center">
              <div className="bg-blue-100 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl font-bold text-blue-600">3</span>
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-3">Instant Prediction</h3>
              <p className="text-gray-600">
                You receive an accurate probability score and detailed explanation of the factors influencing the snow
                day decision.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Values Section */}
      <section className="py-16 px-4 sm:px-6 lg:px-8">
        <div className="container mx-auto max-w-4xl">
          <h2 className="text-3xl font-bold text-gray-900 text-center mb-12">Our Values</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <Card className="p-6">
              <CardContent className="pt-6">
                <Award className="h-8 w-8 text-blue-600 mb-4" />
                <h3 className="text-xl font-semibold text-gray-900 mb-3">Accuracy First</h3>
                <p className="text-gray-600">
                  We continuously refine our algorithms and validate our predictions against actual school closure
                  decisions to maintain the highest accuracy possible.
                </p>
              </CardContent>
            </Card>
            <Card className="p-6">
              <CardContent className="pt-6">
                <Users className="h-8 w-8 text-blue-600 mb-4" />
                <h3 className="text-xl font-semibold text-gray-900 mb-3">Community Focus</h3>
                <p className="text-gray-600">
                  We're committed to serving families and educators by providing free, accessible tools that help with
                  winter weather planning and decision-making.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Team Section */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 bg-white">
        <div className="container mx-auto max-w-4xl text-center">
          <h2 className="text-3xl font-bold text-gray-900 mb-6">Our Story</h2>
          <p className="text-lg text-gray-600 mb-8 leading-relaxed">
            Snow Day Calculator was founded in 2020 by a team of meteorologists, data scientists, and educators who were
            frustrated by the lack of reliable snow day prediction tools. What started as a simple project to help local
            families has grown into a comprehensive platform serving hundreds of thousands of users nationwide.
          </p>
          <p className="text-lg text-gray-600 leading-relaxed">
            We're proud to be a trusted resource for families across the country, and we're constantly working to
            improve our predictions and expand our coverage to serve even more communities.
          </p>
        </div>
      </section>
    </div>
  )
}
