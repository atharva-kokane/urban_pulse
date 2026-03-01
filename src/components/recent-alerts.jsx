"use client"

import { useEffect, useState } from "react"
import { AlertTriangle, AlertCircle } from "lucide-react"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { ScrollArea } from "@/components/ui/scroll-area"

import { supabase } from "@/lib/supabaseClient"



const typeConfig = {

  
  Critical: {
    icon: AlertTriangle,
    color: "bg-destructive/10 text-destructive",
    badgeClass: "bg-destructive text-destructive-foreground"
  },

  Warning: {
    icon: AlertCircle,
    color: "bg-[var(--warning)]/10 text-[var(--warning)]",
    badgeClass: "bg-[var(--warning)] text-white"
  }

}



export function RecentAlerts() {

  const [alerts, setAlerts] = useState([])



  useEffect(() => {

    fetchAlerts()

    // realtime bin alerts
    const binChannel = supabase
      .channel("recent_bin_alerts")
      .on(
        "postgres_changes",
        { event: "*", schema: "public", table: "smart_bins" },
        fetchAlerts
      )
      .subscribe()

    // realtime AQI alerts
    const airChannel = supabase
      .channel("recent_air_alerts")
      .on(
        "postgres_changes",
        { event: "*", schema: "public", table: "air_quality" },
        fetchAlerts
      )
      .subscribe()

    return () => {
      supabase.removeChannel(binChannel)
      supabase.removeChannel(airChannel)
    }

  }, [])



  async function fetchAlerts() {

    // fetch critical bins
    const { data: binData } = await supabase
      .from("smart_bins")
      .select("*")
      .eq("status", "Critical")
      .order("last_updated", { ascending: false })
      .limit(6)



    // fetch air pollution warnings (AQI ≥ 150)
    const { data: airData } = await supabase
      .from("air_quality")
      .select("*")
      .gte("aqi", 150)
      .order("updated_at", { ascending: false })
      .limit(6)



    // format bin alerts
    const binAlerts = (binData || []).map(bin => ({
      id: "bin-" + bin.bin_id,
      type: "Critical",
      time: timeAgo(bin.last_updated),
      message: `${bin.bin_id} at ${bin.location} has reached ${bin.fill_level}% capacity`
    }))



    // format air alerts
    const airAlerts = (airData || []).map(air => ({
      id: "air-" + air.id,
      type: "Warning",
      time: timeAgo(air.updated_at),
      message: `Air pollution has reached ${air.aqi} AQI (Unhealthy)`
    }))



    // combine and sort latest first
    const combined = [...binAlerts, ...airAlerts]
      .sort((a, b) => new Date(b.time) - new Date(a.time))
      .slice(0, 10)



    setAlerts(combined)

  }



  function timeAgo(timestamp) {

    const diff = Math.floor((Date.now() - new Date(timestamp)) / 1000)

    if (diff < 60) return `${diff}s ago`
    if (diff < 3600) return `${Math.floor(diff/60)} min ago`
    if (diff < 86400) return `${Math.floor(diff/3600)} hr ago`

    return `${Math.floor(diff/86400)} day ago`

  }



  return (

    <Card>

      <CardHeader>
        <CardTitle className="text-sm font-semibold">
          Recent Alerts
        </CardTitle>
      </CardHeader>


      <CardContent>

        <ScrollArea className="h-[320px] pr-4">

          <div className="flex flex-col gap-3">

            {alerts.map((alert) => {

              const config = typeConfig[alert.type]
              const Icon = config.icon

              return (

                <div
                  key={alert.id}
                  className="flex items-start gap-3 rounded-lg border p-3 bg-muted/50"
                >

                  <div className={`flex size-8 items-center justify-center rounded-lg ${config.color}`}>
                    <Icon className="size-4"/>
                  </div>


                  <div className="flex flex-col gap-1 flex-1">

                    <div className="flex items-center gap-2">

                      <Badge className={`text-[10px] px-1.5 py-0 ${config.badgeClass}`}>
                        {alert.type}
                      </Badge>

                      <span className="text-[10px] text-muted-foreground">
                        {alert.time}
                      </span>

                    </div>


                    <p className="text-xs">
                      {alert.message}
                    </p>

                  </div>


                  <div className="size-2 rounded-full bg-primary mt-1"/>

                </div>

              )

            })}

          </div>

        </ScrollArea>

      </CardContent>

    </Card>

  )

}