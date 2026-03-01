"use client"

import { useEffect, useState } from "react"
import { BrainCircuit } from "lucide-react"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"

function getSeverityStyle(severity) {

  switch (severity) {

    case "high":
      return "bg-destructive text-destructive-foreground"

    case "medium":
      return "bg-[var(--warning)] text-foreground"

    case "low":
      return "bg-accent text-accent-foreground"

    default:
      return "bg-muted text-muted-foreground"

  }

}

export function AiPredictionCards() {

  const [predictions, setPredictions] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {

    fetchPredictions()

    const interval = setInterval(fetchPredictions, 60000)

    return () => clearInterval(interval)

  }, [])

  async function fetchPredictions() {

    try {

      const res = await fetch("/api/ai/predict")

      const data = await res.json()

      setPredictions(data)

      setLoading(false)

    }
    catch (err) {

      console.error(err)

      setLoading(false)

    }

  }

  if (loading) {

    return (

      <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">

        {[1,2,3].map(i => (

          <Card key={i} className="animate-pulse">
            <CardContent className="h-24"/>
          </Card>

        ))}

      </div>

    )

  }

  return (

    <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">

      {predictions.map((item, index) => (

        <Card key={index}>

          <CardContent className="flex flex-col gap-3">

            <div className="flex items-center justify-between">

              <div className="flex items-center gap-2">

                <BrainCircuit className="size-4 text-primary"/>

                <span className="text-sm font-medium">
                  {item.type}
                </span>

              </div>

              <Badge className={`text-[10px] ${getSeverityStyle(item.severity)}`}>
                {item.severity}
              </Badge>

            </div>

            <p className="text-xs text-muted-foreground">
              {item.prediction}
            </p>

            <div className="flex items-center justify-between">

              <span className="text-[10px] text-accent">
                {item.confidence}% confidence
              </span>

              <div className="h-1 w-20 bg-muted rounded-full overflow-hidden">

                <div
                  className="h-full bg-accent"
                  style={{ width: `${item.confidence}%` }}
                />

              </div>

            </div>

          </CardContent>

        </Card>

      ))}

    </div>

  )

}