"use client"

import { useEffect, useState } from "react"
import {
  Trash2,
  AlertTriangle,
  PackageOpen,
  PackageCheck,
  Wind,
  CloudSun,
  BrainCircuit,
  Workflow,
  TrendingUp,
  TrendingDown,
  Minus,
} from "lucide-react"


import { Card, CardContent } from "@/components/ui/card"
import { summaryCards } from "@/lib/data"
import { supabase } from "@/lib/supabaseClient"


function TrendIndicator({ trend, dir }) {

  if (dir === "live") {
    return (
      <span className="flex items-center gap-1.5 text-xs font-medium text-red-600">
        <span className="relative flex h-2 w-2">
          <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-red-500 opacity-75"></span>
          <span className="relative inline-flex h-2 w-2 rounded-full bg-red-600"></span>
        </span>
        {trend}
      </span>
    )
  }

  if (dir === "up") {
    return (
      <span className="flex items-center gap-1 text-xs text-accent">
        <TrendingUp className="size-3"/>
        {trend}
      </span>
    )
  }

  if (dir === "down") {
    return (
      <span className="flex items-center gap-1 text-xs text-primary">
        <TrendingDown className="size-3"/>
        {trend}
      </span>
    )
  }

  return (
    <span className="flex items-center gap-1 text-xs text-muted-foreground">
      {trend}
    </span>
  )
}


function getTimeAgo(timestamp) {

  if (!timestamp) return "Loading..."

  const diff = Math.floor((Date.now() - new Date(timestamp)) / 1000)

  if (diff < 60) return `Updated ${diff}s ago`
  if (diff < 3600) return `Updated ${Math.floor(diff / 60)} min ago`
  if (diff < 86400) return `Updated ${Math.floor(diff / 3600)} hr ago`

  return `Updated ${Math.floor(diff / 86400)} day ago`
}


export function SummaryCards() {

  const [binStats, setBinStats] = useState({
    totalBins: 0,
    filledBins: 0,
    emptyBins: 0,
    criticalBins: 0,
  })

  // FIXED: no default AQI fallback
  const [aqiData, setAqiData] = useState(null)


  useEffect(() => {

    fetchBinStats()
    fetchAqiData()

    const channel1 = supabase
      .channel("summary_cards_bins")
      .on(
        "postgres_changes",
        { event: "*", schema: "public", table: "smart_bins" },
        fetchBinStats
      )
      .subscribe()

    const channel2 = supabase
      .channel("summary_cards_aqi")
      .on(
        "postgres_changes",
        { event: "*", schema: "public", table: "air_quality" },
        fetchAqiData
      )
      .subscribe()

    return () => {
      supabase.removeChannel(channel1)
      supabase.removeChannel(channel2)
    }

  }, [])


  async function fetchBinStats() {

    const { data, error } = await supabase
      .from("smart_bins")
      .select("status")

    if (error || !data) return

    const totalBins = data.length

    const criticalBins =
      data.filter(b => b.status === "Critical").length

    const filledBins =
      data.filter(b =>
        b.status === "Full" || b.status === "Critical"
      ).length

    const emptyBins =
      data.filter(b => b.status === "Empty").length

    setBinStats({
      totalBins,
      filledBins,
      emptyBins,
      criticalBins,
    })

  }


  async function fetchAqiData() {

    const { data, error } = await supabase
      .from("air_quality")
      .select("aqi, status, updated_at")
      .order("updated_at", { ascending: false })
      .limit(1)
      .single()

    if (error || !data) return

    setAqiData(data)

  }


  const cards = [

    {
      title: "Total Smart Bins",
      value: binStats.totalBins.toLocaleString(),
      icon: Trash2,
      trend: "Live",
      trendDir: "live",
      color: "text-primary",
      bgColor: "bg-primary/10",
    },

    {
      title: "Filled Bins",
      value: binStats.filledBins.toLocaleString(),
      icon: PackageCheck,
      trend: "Live",
      trendDir: "live",
      color: "text-[var(--warning)]",
      bgColor: "bg-[var(--warning)]/10",
    },

    {
      title: "Empty Bins",
      value: binStats.emptyBins.toLocaleString(),
      icon: PackageOpen,
      trend: "Live",
      trendDir: "live",
      color: "text-accent",
      bgColor: "bg-accent/10",
    },

    {
      title: "Critical Bins",
      value: binStats.criticalBins.toLocaleString(),
      icon: AlertTriangle,
      trend: "Live",
      trendDir: "live",
      color: "text-destructive",
      bgColor: "bg-destructive/10",
    },

    {
      title: "Current AQI",
      value: aqiData ? aqiData.aqi.toString() : "...",
      icon: Wind,
      trend: aqiData ? getTimeAgo(aqiData.updated_at) : "Loading...",
      trendDir: "neutral",
      color: "text-[var(--warning)]",
      bgColor: "bg-[var(--warning)]/10",
    },

    {
      title: "Pollution Status",
      value: aqiData ? aqiData.status : "...",
      icon: CloudSun,
      trend: "Based on latest reading",
      trendDir: "neutral",
      color: "text-[var(--warning)]",
      bgColor: "bg-[var(--warning)]/10",
    },

    {
      title: "Active AI Predictions",
      value: summaryCards.activePredictions.toString(),
      icon: BrainCircuit,
      trend: "+6",
      trendDir: "up",
      color: "text-primary",
      bgColor: "bg-primary/10",
    },

    {
      title: "Active Automations",
      value: summaryCards.activeAutomations.toString(),
      icon: Workflow,
      trend: "+2",
      trendDir: "up",
      color: "text-accent",
      bgColor: "bg-accent/10",
    },

  ]


  return (
    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">

      {cards.map((card) => (

        <Card key={card.title} className="gap-0 py-4">

          <CardContent className="flex items-center gap-4">

            <div className={`flex size-10 items-center justify-center rounded-lg ${card.bgColor}`}>
              <card.icon className={`size-5 ${card.color}`} />
            </div>

            <div className="flex flex-col gap-1">

              <p className="text-xs text-muted-foreground">
                {card.title}
              </p>

              <span className="text-xl font-bold">
                {card.value}
              </span>

              <TrendIndicator
                trend={card.trend}
                dir={card.trendDir}
              />

            </div>

          </CardContent>

        </Card>

      ))}

    </div>
  )
}