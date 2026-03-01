"use client"

import { useEffect, useState } from "react"
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Legend
} from "recharts"

import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent
} from "@/components/ui/card"

import { supabase } from "@/lib/supabaseClient"

export function PredictionChart() {

  const [data, setData] = useState([])

  useEffect(() => {

    fetchData()

    // realtime listener
    const channel = supabase
      .channel("aqi-live-chart")
      .on(
        "postgres_changes",
        {
          event: "*",
          schema: "public",
          table: "air_quality"
        },
        () => {
          fetchData()
        }
      )
      .subscribe()

    return () => {
      supabase.removeChannel(channel)
    }

  }, [])


  async function fetchData() {

    const res = await fetch("/api/ai/aqi-history")
    const json = await res.json()

    setData(json)

  }

  return (

    <Card>

      <CardHeader>

        <CardTitle className="text-sm font-semibold">
          AQI Prediction (Next 6h)
        </CardTitle>

        <CardDescription>
          Actual vs AI-predicted air quality values
        </CardDescription>

      </CardHeader>

      <CardContent>

        <div className="h-[300px]">

          <ResponsiveContainer width="100%" height="100%">

            <LineChart data={data}>

              <CartesianGrid strokeDasharray="3 3" />

              <XAxis dataKey="time" />

              <YAxis />

              <Tooltip />

              <Legend />

              {/* Actual AQI */}
              <Line
                type="monotone"
                dataKey="actual"
                stroke="#2563eb"
                strokeWidth={2}
                name="Actual"
              />

              {/* Predicted AQI */}
              <Line
                type="monotone"
                dataKey="predicted"
                stroke="#16a34a"
                strokeWidth={2}
                name="Predicted"
              />

            </LineChart>

          </ResponsiveContainer>

        </div>

      </CardContent>

    </Card>

  )

}