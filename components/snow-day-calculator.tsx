"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { Snowflake, MapPin, GraduationCap, CloudSnow, AlertTriangle, CheckCircle, XCircle } from "lucide-react"
import { motion, AnimatePresence } from "framer-motion"

export function SnowDayCalculator() {
  const [zipCode, setZipCode] = useState("")
  const [schoolLevel, setSchoolLevel] = useState("")
  const [snowfall, setSnowfall] = useState("")
  const [temperature, setTemperature] = useState("")
  const [windSpeed, setWindSpeed] = useState("")
  const [isCalculating, setIsCalculating] = useState(false)
  const [result, setResult] = useState<number | null>(null)
  const [showResult, setShowResult] = useState(false)
  const [factors, setFactors] = useState<Array<{name: string, impact: string, points: number}>>([])

  // Validate ZIP code
  const isValidZipCode = (zip: string) => /^\d{5}$/.test(zip)

  const calculateSnowDayProbability = async () => {
    if (!zipCode || !schoolLevel || !snowfall) return

    setIsCalculating(true)
    
    // Simulate API call delay
    await new Promise(resolve => setTimeout(resolve, 1500))

    const snowfallAmount = Number.parseFloat(snowfall)
    const temp = Number.parseFloat(temperature) || 32
    const wind = Number.parseFloat(windSpeed) || 0
    
    let baseProbability = 0
    const factorsList: Array<{name: string, impact: string, points: number}> = []

    // Base probability based on snowfall
    if (snowfallAmount < 1) {
      baseProbability = 5
      factorsList.push({name: "Light snowfall", impact: "Low impact", points: 5})
    } else if (snowfallAmount < 2) {
      baseProbability = 15
      factorsList.push({name: "Moderate snowfall", impact: "Low-moderate impact", points: 15})
    } else if (snowfallAmount < 3) {
      baseProbability = 35
      factorsList.push({name: "Significant snowfall", impact: "Moderate impact", points: 35})
    } else if (snowfallAmount < 4) {
      baseProbability = 55
      factorsList.push({name: "Heavy snowfall", impact: "High impact", points: 55})
    } else if (snowfallAmount < 6) {
      baseProbability = 75
      factorsList.push({name: "Very heavy snowfall", impact: "Very high impact", points: 75})
    } else if (snowfallAmount < 8) {
      baseProbability = 85
      factorsList.push({name: "Extreme snowfall", impact: "Extreme impact", points: 85})
    } else {
      baseProbability = 95
      factorsList.push({name: "Blizzard conditions", impact: "Maximum impact", points: 95})
    }

    // Temperature adjustment
    if (temp < 20) {
      baseProbability += 10
      factorsList.push({name: "Extremely cold", impact: "Increases probability", points: 10})
    } else if (temp > 35) {
      baseProbability -= 15
      factorsList.push({name: "Warmer temperature", impact: "Decreases probability", points: -15})
    }

    // Wind speed adjustment
    if (wind > 20) {
      baseProbability += 15
      factorsList.push({name: "High wind speeds", impact: "Creates dangerous conditions", points: 15})
    } else if (wind > 10) {
      baseProbability += 5
      factorsList.push({name: "Moderate winds", impact: "Slight increase", points: 5})
    }

    // School level adjustment
    const levelMultipliers = {
      elementary: { multiplier: 1.2, name: "Elementary school", points: 15 },
      middle: { multiplier: 1.1, name: "Middle school", points: 8 },
      high: { multiplier: 0.9, name: "High school", points: -5 }
    }

    const levelData = levelMultipliers[schoolLevel as keyof typeof levelMultipliers]
    if (levelData) {
      baseProbability *= levelData.multiplier
      factorsList.push({
        name: levelData.name,
        impact: levelData.points > 0 ? "Higher closure likelihood" : "Lower closure likelihood",
        points: levelData.points
      })
    }

    const finalProbability = Math.min(98, Math.max(2, Math.round(baseProbability)))
    
    setFactors(factorsList)
    setResult(finalProbability)
    setShowResult(true)
    setIsCalculating(false)
  }

  const getProbabilityColor = (probability: number) => {
    if (probability < 25) return "text-green-600"
    if (probability < 50) return "text-yellow-600"
    if (probability < 75) return "text-orange-600"
    return "text-red-600"
  }

  const getProbabilityBgColor = (probability: number) => {
    if (probability < 25) return "bg-green-50 border-green-200"
    if (probability < 50) return "bg-yellow-50 border-yellow-200"
    if (probability < 75) return "bg-orange-50 border-orange-200"
    return "bg-red-50 border-red-200"
  }

  const getProbabilityMessage = (probability: number) => {
    if (probability < 25) return "Very low chance of a snow day"
    if (probability < 50) return "Low to moderate chance"
    if (probability < 75) return "Good chance of a snow day"
    return "Very high chance of a snow day!"
  }

  const getProbabilityIcon = (probability: number) => {
    if (probability < 25) return <XCircle className="h-6 w-6 text-green-600" />
    if (probability < 50) return <AlertTriangle className="h-6 w-6 text-yellow-600" />
    if (probability < 75) return <CheckCircle className="h-6 w-6 text-orange-600" />
    return <CheckCircle className="h-6 w-6 text-red-600" />
  }

  const resetCalculator = () => {
    setResult(null)
    setShowResult(false)
    setFactors([])
  }

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      <Card className="shadow-xl border-0 bg-gradient-to-br from-blue-50 to-white">
        <CardHeader className="text-center pb-4">
          <CardTitle className="flex items-center justify-center gap-3 text-3xl font-bold bg-gradient-to-r from-blue-600 to-blue-800 bg-clip-text text-transparent">
            <Snowflake className="h-8 w-8 text-blue-500 animate-pulse" />
            Snow Day Calculator
          </CardTitle>
          <CardDescription className="text-lg text-muted-foreground">
            Get an accurate prediction for school closures based on weather conditions
          </CardDescription>
        </CardHeader>
        
        <CardContent className="space-y-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Location & School Info */}
            <Card className="p-4 bg-white/50">
              <div className="flex items-center gap-2 mb-4">
                <MapPin className="h-5 w-5 text-blue-600" />
                <h3 className="font-semibold">Location & School</h3>
              </div>
              <div className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="zipcode" className="text-sm font-medium">ZIP Code</Label>
                  <Input
                    id="zipcode"
                    placeholder="e.g. 12345"
                    value={zipCode}
                    onChange={(e) => setZipCode(e.target.value)}
                    maxLength={5}
                    className={`${isValidZipCode(zipCode) && zipCode ? 'border-green-500' : zipCode ? 'border-red-500' : ''}`}
                  />
                  {zipCode && !isValidZipCode(zipCode) && (
                    <p className="text-xs text-red-500">Please enter a valid 5-digit ZIP code</p>
                  )}
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="schoollevel" className="text-sm font-medium">School Level</Label>
                  <Select value={schoolLevel} onValueChange={setSchoolLevel}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select your school level" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="elementary">
                        <div className="flex items-center gap-2">
                          <GraduationCap className="h-4 w-4" />
                          Elementary School
                        </div>
                      </SelectItem>
                      <SelectItem value="middle">
                        <div className="flex items-center gap-2">
                          <GraduationCap className="h-4 w-4" />
                          Middle School
                        </div>
                      </SelectItem>
                      <SelectItem value="high">
                        <div className="flex items-center gap-2">
                          <GraduationCap className="h-4 w-4" />
                          High School
                        </div>
                      </SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
            </Card>

            {/* Weather Conditions */}
            <Card className="p-4 bg-white/50">
              <div className="flex items-center gap-2 mb-4">
                <CloudSnow className="h-5 w-5 text-blue-600" />
                <h3 className="font-semibold">Weather Conditions</h3>
              </div>
              <div className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="snowfall" className="text-sm font-medium">Expected Snowfall (inches)</Label>
                  <Input
                    id="snowfall"
                    type="number"
                    placeholder="e.g. 3.5"
                    value={snowfall}
                    onChange={(e) => setSnowfall(e.target.value)}
                    min="0"
                    max="20"
                    step="0.1"
                  />
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div className="space-y-2">
                    <Label htmlFor="temperature" className="text-sm font-medium">Temperature (°F)</Label>
                    <Input
                      id="temperature"
                      type="number"
                      placeholder="32"
                      value={temperature}
                      onChange={(e) => setTemperature(e.target.value)}
                      min="-20"
                      max="50"
                    />
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="windspeed" className="text-sm font-medium">Wind Speed (mph)</Label>
                    <Input
                      id="windspeed"
                      type="number"
                      placeholder="10"
                      value={windSpeed}
                      onChange={(e) => setWindSpeed(e.target.value)}
                      min="0"
                      max="60"
                    />
                  </div>
                </div>
              </div>
            </Card>
          </div>

          <div className="flex gap-3">
            <Button
              onClick={calculateSnowDayProbability}
              className="flex-1 bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white font-semibold py-3 text-lg"
              size="lg"
              disabled={!zipCode || !isValidZipCode(zipCode) || !schoolLevel || !snowfall || isCalculating}
            >
              {isCalculating ? (
                <div className="flex items-center gap-2">
                  <Snowflake className="h-5 w-5 animate-spin" />
                  Calculating...
                </div>
              ) : (
                "Calculate Snow Day Probability"
              )}
            </Button>
            
            {showResult && (
              <Button
                onClick={resetCalculator}
                variant="outline"
                size="lg"
                className="px-6"
              >
                Reset
              </Button>
            )}
          </div>

          <AnimatePresence>
            {showResult && result !== null && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.5 }}
              >
                <Card className={`border-2 ${getProbabilityBgColor(result)}`}>
                  <CardContent className="pt-6">
                    <div className="text-center space-y-4">
                      <div className="flex items-center justify-center gap-3">
                        {getProbabilityIcon(result)}
                        <div className={`text-6xl font-bold ${getProbabilityColor(result)}`}>
                          {result}%
                        </div>
                      </div>
                      
                      <div>
                        <div className="text-xl font-semibold mb-2">{getProbabilityMessage(result)}</div>
                        <Progress value={result} className="h-3 mb-4" />
                      </div>

                      {factors.length > 0 && (
                        <div className="mt-6">
                          <h4 className="font-semibold mb-3 text-left">Contributing Factors:</h4>
                          <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                            {factors.map((factor, index) => (
                              <div key={index} className="flex items-center justify-between p-2 bg-white/60 rounded-lg">
                                <span className="text-sm font-medium">{factor.name}</span>
                                <Badge variant={factor.points > 0 ? "destructive" : "secondary"} className="text-xs">
                                  {factor.points > 0 ? '+' : ''}{factor.points}
                                </Badge>
                              </div>
                            ))}
                          </div>
                        </div>
                      )}

                      <Alert className="mt-4">
                        <AlertTriangle className="h-4 w-4" />
                        <AlertDescription className="text-left">
                          This is an estimate based on typical weather patterns and school closure tendencies. 
                          Always check your school district's official channels for actual closure announcements.
                        </AlertDescription>
                      </Alert>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            )}
          </AnimatePresence>
        </CardContent>
      </Card>
    </div>
  )
}