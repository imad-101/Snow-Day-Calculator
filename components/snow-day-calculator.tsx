"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Snowflake } from "lucide-react"

export function SnowDayCalculator() {
  const [zipCode, setZipCode] = useState("")
  const [schoolLevel, setSchoolLevel] = useState("")
  const [snowfall, setSnowfall] = useState("")
  const [result, setResult] = useState<number | null>(null)
  const [showResult, setShowResult] = useState(false)

  const calculateSnowDayProbability = () => {
    if (!zipCode || !schoolLevel || !snowfall) return

    const snowfallAmount = Number.parseFloat(snowfall)
    let baseProbability = 0

    // Base probability based on snowfall
    if (snowfallAmount < 1) baseProbability = 5
    else if (snowfallAmount < 2) baseProbability = 15
    else if (snowfallAmount < 3) baseProbability = 35
    else if (snowfallAmount < 4) baseProbability = 55
    else if (snowfallAmount < 6) baseProbability = 75
    else if (snowfallAmount < 8) baseProbability = 85
    else baseProbability = 95

    // Adjust based on school level
    const levelMultiplier =
      {
        elementary: 1.2,
        middle: 1.1,
        high: 0.9,
      }[schoolLevel] || 1

    const finalProbability = Math.min(95, Math.round(baseProbability * levelMultiplier))
    setResult(finalProbability)
    setShowResult(true)
  }

  const getProbabilityColor = (probability: number) => {
    if (probability < 30) return "text-green-600"
    if (probability < 60) return "text-yellow-600"
    return "text-red-600"
  }

  const getProbabilityMessage = (probability: number) => {
    if (probability < 30) return "Low chance of a snow day"
    if (probability < 60) return "Moderate chance of a snow day"
    return "High chance of a snow day!"
  }

  return (
    <Card className="max-w-2xl mx-auto shadow-lg">
      <CardHeader className="text-center">
        <CardTitle className="flex items-center justify-center gap-2 text-2xl">
          <Snowflake className="h-6 w-6 text-blue-500" />
          Snow Day Calculator
        </CardTitle>
        <CardDescription>Enter your information to get a snow day prediction</CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="space-y-2">
            <Label htmlFor="zipcode">ZIP Code</Label>
            <Input
              id="zipcode"
              placeholder="Enter your ZIP code"
              value={zipCode}
              onChange={(e) => setZipCode(e.target.value)}
              maxLength={5}
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="schoollevel">School Level</Label>
            <Select value={schoolLevel} onValueChange={setSchoolLevel}>
              <SelectTrigger>
                <SelectValue placeholder="Select school level" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="elementary">Elementary School</SelectItem>
                <SelectItem value="middle">Middle School</SelectItem>
                <SelectItem value="high">High School</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>

        <div className="space-y-2">
          <Label htmlFor="snowfall">Expected Snowfall (inches)</Label>
          <Input
            id="snowfall"
            type="number"
            placeholder="Enter expected snowfall in inches"
            value={snowfall}
            onChange={(e) => setSnowfall(e.target.value)}
            min="0"
            max="20"
            step="0.1"
          />
        </div>

        <Button
          onClick={calculateSnowDayProbability}
          className="w-full"
          size="lg"
          disabled={!zipCode || !schoolLevel || !snowfall}
        >
          Calculate Snow Day Probability
        </Button>

        {showResult && result !== null && (
          <Card className="mt-6 border-2 border-blue-200 bg-blue-50">
            <CardContent className="pt-6 text-center">
              <div className="space-y-2">
                <div className={`text-4xl font-bold ${getProbabilityColor(result)}`}>{result}%</div>
                <div className="text-lg font-medium text-foreground">{getProbabilityMessage(result)}</div>
                <p className="text-sm text-muted-foreground">
                  This is an estimate based on typical patterns. Check your school district's official channels for
                  actual closure announcements.
                </p>
              </div>
            </CardContent>
          </Card>
        )}
      </CardContent>
    </Card>
  )
}
