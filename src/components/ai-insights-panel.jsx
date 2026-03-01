"use client"

import { useEffect, useState } from "react"
import { AlertTriangle, Lightbulb, Zap } from "lucide-react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"

function getIcon(category) {

  switch(category) {

    case "Risk Alert":
      return AlertTriangle

    case "Optimization":
      return Zap

    default:
      return Lightbulb
  }

}

function getStyle(priority) {

  switch(priority) {

    case "high":
      return "bg-destructive text-destructive-foreground"

    case "medium":
      return "bg-[var(--warning)] text-foreground"

    default:
      return "bg-accent text-accent-foreground"
  }

}

export function AiInsightsPanel() {

  const [insights, setInsights] = useState([])

  useEffect(() => {

    fetchInsights()

    const interval = setInterval(fetchInsights, 60000)

    return () => clearInterval(interval)

  }, [])


  async function fetchInsights() {

    try {

      const res = await fetch("/api/ai/insights")

      const data = await res.json()

      setInsights(data)

    }
    catch(err) {

      console.error(err)

    }

  }


  return (

    <Card>

      <CardHeader>

        <CardTitle className="text-sm font-semibold">

          AI Insights & Recommendations

        </CardTitle>

      </CardHeader>

      <CardContent className="flex flex-col gap-3">

        {insights.map((item, index) => {

          const Icon = getIcon(item.category)

          return (

            <div
              key={index}
              className="flex items-start gap-3 rounded-lg border p-3"
            >

              <div className="flex size-8 items-center justify-center rounded-lg bg-muted">

                <Icon className="size-4"/>

              </div>

              <div className="flex flex-col gap-1 flex-1">

                <div className="flex items-center gap-2">

                  <span className="text-xs font-medium">

                    {item.category}

                  </span>

                  <Badge className={`text-[10px] ${getStyle(item.priority)}`}>

                    {item.priority}

                  </Badge>

                </div>

                <p className="text-xs text-muted-foreground">

                  {item.message}

                </p>

              </div>

            </div>

          )

        })}

      </CardContent>

    </Card>

  )

}