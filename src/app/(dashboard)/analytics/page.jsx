"use client"

import React from "react"

import { AiPredictionCards } from "@/components/ai-prediction-cards"
import { AiInsightsPanel } from "@/components/ai-insights-panel"
import { PredictionChart } from "@/components/prediction-chart"

export default function AnalyticsPage() {

  return (

    <div className="flex flex-col gap-6">

      <div>
        <h1 className="text-xl font-bold text-foreground">
          AI Analytics
        </h1>

        <p className="text-sm text-muted-foreground">
          AI-powered predictions, insights, and risk analysis
        </p>
      </div>

      <AiPredictionCards />

     <div className="grid grid-cols-1 gap-4">
  <PredictionChart />


        

      </div>

    </div>

  )

}