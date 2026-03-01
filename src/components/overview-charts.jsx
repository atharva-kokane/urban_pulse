"use client"

import { useEffect, useState } from "react"

import {
  BarChart,
  Bar,
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Legend,
} from "recharts"


import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card"

import { supabase } from "@/lib/supabaseClient"



export function OverviewCharts() {

  const [aqiTrendData, setAqiTrendData] = useState([])
  const [wasteTrendData, setWasteTrendData] = useState([])



  useEffect(() => {

    fetchAqiTrend()
    fetchWasteTrend()

    // AQI realtime
    const aqiChannel = supabase
      .channel("aqi_trend_overview")
      .on(
        "postgres_changes",
        { event: "*", schema: "public", table: "air_quality" },
        fetchAqiTrend
      )
      .subscribe()

    // Waste realtime
    const wasteChannel = supabase
      .channel("waste_trend_overview")
      .on(
        "postgres_changes",
        { event: "*", schema: "public", table: "waste_collection" },
        fetchWasteTrend
      )
      .subscribe()

    return () => {
      supabase.removeChannel(aqiChannel)
      supabase.removeChannel(wasteChannel)
    }

  }, [])



  async function fetchAqiTrend() {

    const { data, error } = await supabase
      .from("air_quality")
      .select("aqi, updated_at")
      .gte(
        "updated_at",
        new Date(Date.now() - 24 * 60 * 60 * 1000).toISOString()
      )
      .order("updated_at", { ascending: true })

    if (error || !data) return

    const formatted = data.map(row => ({
      time: new Date(row.updated_at).toLocaleTimeString([], {
        hour: "2-digit",
        minute: "2-digit",
      }),
      aqi: row.aqi,
    }))

    setAqiTrendData(formatted)

  }



  async function fetchWasteTrend() {

    const { data, error } = await supabase
      .from("waste_collection")
      .select("day, collected, generated")
      .order("id", { ascending: true })

    if (error || !data) return

    setWasteTrendData(data)

  }



  return (

    <div className="grid grid-cols-1 gap-4 lg:grid-cols-2">

      {/* AQI Trend */}

      <Card>

        <CardHeader>
          <CardTitle className="text-sm font-semibold">
            AQI Trend (24h)
          </CardTitle>

          <CardDescription>
            Air Quality Index over the last 24 hours
          </CardDescription>
        </CardHeader>

        <CardContent>

          <div className="h-[280px]">

            <ResponsiveContainer width="100%" height="100%">

              <LineChart data={aqiTrendData}>

                <CartesianGrid strokeDasharray="3 3" stroke="var(--color-border)" />

                <XAxis dataKey="time" />

                <YAxis />

                <Tooltip />

                <Line
                  type="monotone"
                  dataKey="aqi"
                  stroke="var(--color-chart-1)"
                  strokeWidth={2}
                />

              </LineChart>

            </ResponsiveContainer>

          </div>

        </CardContent>

      </Card>



      {/* Waste Trend */}

      <Card>

        <CardHeader>

          <CardTitle className="text-sm font-semibold">
            Waste Collection (Weekly)
          </CardTitle>

          <CardDescription>
            Collected vs Generated waste in tons
          </CardDescription>

        </CardHeader>


        <CardContent>

          <div className="h-[280px]">

            <ResponsiveContainer width="100%" height="100%">

              <BarChart data={wasteTrendData}>

                <CartesianGrid strokeDasharray="3 3" stroke="var(--color-border)" />

                <XAxis dataKey="day" />

                <YAxis />

                <Tooltip />

                <Legend />

                <Bar
                  dataKey="collected"
                  fill="var(--color-chart-2)"
                  radius={[4, 4, 0, 0]}
                />

                <Bar
                  dataKey="generated"
                  fill="var(--color-chart-1)"
                  radius={[4, 4, 0, 0]}
                />

              </BarChart>

            </ResponsiveContainer>

          </div>

        </CardContent>

      </Card>


    </div>

  )

}