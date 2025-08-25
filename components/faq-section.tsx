import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"

export function FAQSection() {
  return (
    <section className="py-16 px-4 sm:px-6 lg:px-8">
      <div className="max-w-3xl mx-auto">
        <h2 className="text-3xl font-bold text-center mb-8">Frequently Asked Questions</h2>

        <Accordion type="single" collapsible className="space-y-4">
          <AccordionItem value="accuracy" className="border rounded-lg px-4">
            <AccordionTrigger className="text-left">How accurate is the Snow Day Calculator?</AccordionTrigger>
            <AccordionContent className="text-muted-foreground">
              Our Snow Day Calculator provides estimates based on historical data and weather patterns. While it's a
              helpful tool for planning, actual school closure decisions depend on many local factors including road
              conditions, temperature, district policies, and real-time assessments by school officials. Use it as a
              guide, but always check your school district's official channels for definitive closure announcements.
            </AccordionContent>
          </AccordionItem>

          <AccordionItem value="factors" className="border rounded-lg px-4">
            <AccordionTrigger className="text-left">What factors determine if schools close for snow?</AccordionTrigger>
            <AccordionContent className="text-muted-foreground">
              Schools consider multiple factors when deciding to close: snowfall amount and rate, temperature and wind
              chill, road conditions and visibility, bus route accessibility, timing of the storm, local infrastructure
              capabilities, and district-specific policies. Each school district has its own criteria and
              decision-making process, which is why closure thresholds vary significantly between regions.
            </AccordionContent>
          </AccordionItem>

          <AccordionItem value="school-levels" className="border rounded-lg px-4">
            <AccordionTrigger className="text-left">
              Why do different school levels have different closure rates?
            </AccordionTrigger>
            <AccordionContent className="text-muted-foreground">
              Elementary schools often close more readily than high schools because younger students are more vulnerable
              to cold weather and have less experience navigating winter conditions. Elementary students also require
              more supervision and assistance, making transportation and safety more challenging during severe weather.
              High school students are generally more capable of handling winter conditions and have more flexibility in
              their schedules.
            </AccordionContent>
          </AccordionItem>

          <AccordionItem value="timing" className="border rounded-lg px-4">
            <AccordionTrigger className="text-left">
              When do schools typically announce snow day closures?
            </AccordionTrigger>
            <AccordionContent className="text-muted-foreground">
              Most schools announce closures the evening before (typically between 6-10 PM) or early morning (between
              5-7 AM) of the affected day. The timing depends on when weather conditions become clear enough to make a
              decision. Many districts use automated calling systems, official websites, social media, and local news
              partnerships to notify families as quickly as possible.
            </AccordionContent>
          </AccordionItem>

          <AccordionItem value="regional-differences" className="border rounded-lg px-4">
            <AccordionTrigger className="text-left">Why do snow day thresholds vary by region?</AccordionTrigger>
            <AccordionContent className="text-muted-foreground">
              Regional differences in snow day thresholds reflect local infrastructure, climate experience, and
              resources. Northern states with regular snowfall have better snow removal equipment, experienced drivers,
              and infrastructure designed for winter weather, so they typically require more snow for closures. Southern
              regions with infrequent snow may close schools with minimal accumulation due to limited snow removal
              capabilities and less experience with winter driving conditions.
            </AccordionContent>
          </AccordionItem>
        </Accordion>
      </div>
    </section>
  )
}
