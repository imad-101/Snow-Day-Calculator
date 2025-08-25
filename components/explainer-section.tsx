import { Card, CardContent } from "@/components/ui/card"
import { CloudSnow, Thermometer, Wind, Bus, Clock, MapPin, Users, AlertTriangle } from "lucide-react"

export function ExplainerSection() {
  return (
    <section className="py-16 px-4 sm:px-6 lg:px-8 bg-muted/30">
      <div className="max-w-4xl mx-auto">
        <h2 className="text-3xl font-bold text-center mb-8">How Snow Day Predictions Work</h2>

        <div className="prose prose-lg max-w-none text-foreground mb-12">
          <p className="text-xl leading-relaxed mb-6">
            Snow day calculators use historical data, weather patterns, and local factors to estimate the likelihood of
            school closures. While no prediction tool is 100% accurate, understanding the key factors can help you
            prepare for potential snow days and make informed decisions about your daily schedule.
          </p>

          <h3 className="text-2xl font-semibold mt-8 mb-4">The Science Behind Snow Day Decisions</h3>
          <p className="mb-6">
            School districts across the United States make closure decisions based on multiple criteria, with student
            and staff safety being the top priority. The decision-making process typically begins the evening before or
            early morning of a potential snow day, with administrators consulting weather forecasts, road conditions,
            and transportation departments. This complex process involves meteorologists, transportation supervisors,
            maintenance crews, and school administrators working together to assess risk factors.
          </p>

          <p className="mb-6">
            Modern snow day prediction algorithms analyze over 50 different variables including current weather
            conditions, forecasted precipitation, temperature trends, wind speed and direction, road surface
            temperatures, historical closure patterns, and even socioeconomic factors that might affect a district's
            decision-making process. These sophisticated models can process decades of historical data in seconds,
            identifying patterns that human decision-makers might miss.
          </p>

          <h3 className="text-2xl font-semibold mt-8 mb-4">Regional Variations in Snow Day Thresholds</h3>
          <p className="mb-6">
            Different regions have dramatically varying thresholds for snow day declarations based on their
            infrastructure, experience, and climate expectations. Northern states like Minnesota, Wisconsin, and Maine
            with well-established snow removal infrastructure might require 6-8 inches of snow for closures, while
            southern districts in states like Georgia, North Carolina, or Texas might close schools with just 1-2 inches
            due to limited snow removal equipment and less experience driving in winter conditions.
          </p>

          <p className="mb-6">
            Mountain regions face unique challenges with elevation changes affecting snowfall amounts and temperatures
            across a single school district. A district might see no snow at lower elevations while higher areas receive
            several inches, creating complex decision-making scenarios. Coastal areas must consider the moderating
            effects of large bodies of water, which can change snow to rain or create dangerous ice conditions.
          </p>

          <h3 className="text-2xl font-semibold mt-8 mb-4">Temperature and Wind Chill Factors</h3>
          <p className="mb-6">
            Temperature plays a crucial role alongside snowfall amounts in snow day calculations. Extremely cold
            temperatures (typically below -10°F with wind chill) can trigger closures even without significant snowfall,
            as these conditions pose serious health risks to students waiting for buses or walking to school. Wind chill
            calculations consider both air temperature and wind speed to determine the "feels like" temperature that
            affects human safety.
          </p>

          <p className="mb-6">
            Ice formation is often more dangerous than snow itself. When temperatures hover around the freezing point
            (32°F), precipitation can alternate between rain and snow, creating treacherous ice conditions on roads and
            sidewalks. Black ice, which forms when temperatures drop after wet conditions, is particularly hazardous
            because it's nearly invisible to drivers and pedestrians.
          </p>

          <h3 className="text-2xl font-semibold mt-8 mb-4">Timing and Duration of Weather Events</h3>
          <p className="mb-6">
            The timing of snowfall significantly impacts closure decisions more than many people realize. Snow that
            falls overnight and stops by morning is less likely to cause closures than snow that continues falling
            during school hours. Districts must consider whether roads can be cleared in time for morning bus routes,
            whether conditions will worsen throughout the day, and if afternoon dismissal might become dangerous.
          </p>

          <p className="mb-6">
            Rush hour timing creates additional complications. Snow that begins during morning or afternoon commute
            times can create traffic nightmares that affect school transportation. Many districts now monitor traffic
            patterns and commuter reports when making closure decisions, understanding that parent pickup and staff
            travel safety are integral to the overall safety equation.
          </p>

          <h3 className="text-2xl font-semibold mt-8 mb-4">Transportation and Infrastructure Considerations</h3>
          <p className="mb-6">
            School bus transportation safety is often the determining factor in snow day decisions. Bus routes through
            rural areas, hills, or areas with poor road maintenance receive extra scrutiny. Transportation supervisors
            conduct pre-dawn route checks, driving the most challenging routes to assess conditions firsthand. A single
            impassable hill or dangerous curve can trigger district-wide closures.
          </p>

          <p className="mb-6">
            Urban districts face different challenges including traffic congestion, limited snow storage areas, and
            coordination with city snow removal operations. Suburban districts often have the most complex decisions,
            dealing with varied topography, different municipal snow removal standards, and diverse transportation needs
            across their coverage areas.
          </p>

          <h3 className="text-2xl font-semibold mt-8 mb-4">Technology and Modern Prediction Methods</h3>
          <p className="mb-6">
            Modern snow day calculators incorporate machine learning algorithms that analyze decades of historical
            closure data, weather patterns, and regional characteristics. These systems can identify subtle patterns in
            decision-making, such as how a particular superintendent tends to make more conservative decisions on
            Fridays or how certain weather combinations historically lead to closures in specific districts.
          </p>

          <p className="mb-6">
            Advanced weather monitoring technology provides real-time data from road sensors, weather stations, and even
            satellite imagery. Some districts use thermal mapping to identify problem areas where ice forms first, and
            GPS tracking on snow plows to monitor clearing progress. Social media monitoring has become an unofficial
            tool, with districts tracking parent and community concerns about road conditions.
          </p>

          <h3 className="text-2xl font-semibold mt-8 mb-4">Economic and Social Factors</h3>
          <p className="mb-6">
            Snow day decisions carry significant economic implications that factor into the decision-making process.
            Each closure day can cost districts thousands of dollars in lost state funding, overtime pay for essential
            staff, and makeup day scheduling. Districts must balance safety concerns with financial realities,
            especially those operating on tight budgets.
          </p>

          <p className="mb-6">
            Social equity considerations have become increasingly important in snow day decisions. Districts recognize
            that closures disproportionately affect working parents who cannot stay home, families without reliable
            childcare, and students who depend on school meals. Some districts now offer emergency childcare or meal
            pickup services during weather closures.
          </p>

          <h3 className="text-2xl font-semibold mt-8 mb-4">Preparing for Snow Days</h3>
          <p className="mb-6">
            Families can better prepare for potential snow days by understanding their local district's historical
            patterns and decision-making tendencies. Keep emergency supplies including food, water, flashlights, and
            batteries readily available. Ensure vehicles have winter emergency kits and that alternative childcare
            arrangements are in place.
          </p>

          <p className="mb-6">
            Students should have remote learning materials accessible and understand their district's virtual learning
            policies. Many districts now implement "virtual snow days" where learning continues online, reducing the
            need for makeup days later in the school year. Having reliable internet access and charged devices becomes
            crucial for these scenarios.
          </p>

          <p>
            Remember that snow day calculators provide estimates based on statistical analysis and historical patterns,
            but they cannot account for every local factor or last-minute condition changes. These tools should be used
            as helpful guides rather than definitive predictions, as each school district has unique policies, local
            factors, and decision-making processes that influence their final choices. Always rely on official district
            communications for final closure decisions.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <Card className="text-center">
            <CardContent className="pt-6">
              <CloudSnow className="h-12 w-12 text-blue-500 mx-auto mb-4" />
              <h3 className="font-semibold mb-2">Snowfall Amount</h3>
              <p className="text-sm text-muted-foreground">
                The primary factor - more snow typically means higher closure probability
              </p>
            </CardContent>
          </Card>

          <Card className="text-center">
            <CardContent className="pt-6">
              <Thermometer className="h-12 w-12 text-red-500 mx-auto mb-4" />
              <h3 className="font-semibold mb-2">Temperature</h3>
              <p className="text-sm text-muted-foreground">Extreme cold can trigger closures even without heavy snow</p>
            </CardContent>
          </Card>

          <Card className="text-center">
            <CardContent className="pt-6">
              <Wind className="h-12 w-12 text-gray-500 mx-auto mb-4" />
              <h3 className="font-semibold mb-2">Wind Conditions</h3>
              <p className="text-sm text-muted-foreground">
                High winds create dangerous wind chills and reduce visibility
              </p>
            </CardContent>
          </Card>

          <Card className="text-center">
            <CardContent className="pt-6">
              <Bus className="h-12 w-12 text-yellow-500 mx-auto mb-4" />
              <h3 className="font-semibold mb-2">Transportation</h3>
              <p className="text-sm text-muted-foreground">
                Bus route safety and road conditions heavily influence decisions
              </p>
            </CardContent>
          </Card>

          <Card className="text-center">
            <CardContent className="pt-6">
              <Clock className="h-12 w-12 text-purple-500 mx-auto mb-4" />
              <h3 className="font-semibold mb-2">Timing</h3>
              <p className="text-sm text-muted-foreground">
                When snow falls affects closure likelihood and safety planning
              </p>
            </CardContent>
          </Card>

          <Card className="text-center">
            <CardContent className="pt-6">
              <MapPin className="h-12 w-12 text-green-500 mx-auto mb-4" />
              <h3 className="font-semibold mb-2">Geography</h3>
              <p className="text-sm text-muted-foreground">
                Regional climate and terrain significantly impact decisions
              </p>
            </CardContent>
          </Card>

          <Card className="text-center">
            <CardContent className="pt-6">
              <Users className="h-12 w-12 text-orange-500 mx-auto mb-4" />
              <h3 className="font-semibold mb-2">Community Impact</h3>
              <p className="text-sm text-muted-foreground">Economic and social factors influence closure decisions</p>
            </CardContent>
          </Card>

          <Card className="text-center">
            <CardContent className="pt-6">
              <AlertTriangle className="h-12 w-12 text-red-600 mx-auto mb-4" />
              <h3 className="font-semibold mb-2">Safety Priority</h3>
              <p className="text-sm text-muted-foreground">
                Student and staff safety always takes precedence over other factors
              </p>
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  )
}
