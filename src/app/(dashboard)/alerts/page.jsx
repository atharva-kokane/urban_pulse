
"use client"

import { useEffect, useState } from "react"

import {
  AlertTriangle,
  AlertCircle,
  Info,
  Bell,
} from "lucide-react"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"

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
    badgeClass: "bg-[var(--warning)] text-foreground"
  },

  Info: {
    icon: Info,
    color: "bg-primary/10 text-primary",
    badgeClass: "bg-primary text-primary-foreground"
  }

}



export default function AlertsPage() {

  const [alerts, setAlerts] = useState([])

  const [filter, setFilter] = useState("All")



  useEffect(() => {

    fetchAlerts()

    const channel = supabase
      .channel("alerts-page-sync")
      .on(
        "postgres_changes",
        { event: "*", schema: "public", table: "alerts" },
        fetchAlerts
      )
      .subscribe()

    return () => supabase.removeChannel(channel)

  }, [])



  async function fetchAlerts() {

    const { data } = await supabase
      .from("alerts")
      .select("*")
      .order("created_at", { ascending: false })

    const formatted = data.map(alert => ({

      id: alert.id,
      type: alert.type,
      message: alert.message,
      read: alert.read ?? false,
      time: timeAgo(alert.created_at)

    }))

    setAlerts(formatted)

  }



  function timeAgo(timestamp) {

    const seconds = Math.floor(
      (Date.now() - new Date(timestamp)) / 1000
    )

    if (seconds < 60) return `${seconds}s ago`

    const minutes = Math.floor(seconds / 60)
    if (minutes < 60) return `${minutes} min ago`

    const hours = Math.floor(minutes / 60)
    if (hours < 24) return `${hours} hr ago`

    const days = Math.floor(hours / 24)
    return `${days} day ago`

  }



  async function dismissAlert(id) {

    await supabase
      .from("alerts")
      .update({ read: true })
      .eq("id", id)

  }



  const criticalCount =
    alerts.filter(a => a.type === "Critical").length

  const warningCount =
    alerts.filter(a => a.type === "Warning").length



  // FILTER LOGIC
  const filteredAlerts =
    filter === "All"
      ? alerts
      : alerts.filter(a => a.type === filter)



  return (

    <div className="flex flex-col gap-6">

      {/* Header */}

      <div>

        <h1 className="text-xl font-bold">
          Alerts & Notifications
        </h1>

        <p className="text-sm text-muted-foreground">
          Real-time alert feed and notification history
        </p>

      </div>



      {/* Cards */}

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">

        {/* Total */}

        <Card
          className={`cursor-pointer ${
            filter === "All" ? "border-primary" : ""
          }`}
          onClick={() => setFilter("All")}
        >

          <CardContent className="flex items-center gap-3 py-4">

            <Bell className="size-5 text-primary"/>

            <div>
              <p className="text-xs text-muted-foreground">
                Total Alerts
              </p>

              <p className="text-lg font-bold">
                {alerts.length}
              </p>

            </div>

          </CardContent>

        </Card>



        {/* Critical */}

        <Card
          className={`cursor-pointer ${
            filter === "Critical" ? "border-destructive" : ""
          }`}
          onClick={() => setFilter("Critical")}
        >

          <CardContent className="flex items-center gap-3 py-4">

            <AlertTriangle className="size-5 text-destructive"/>

            <div>
              <p className="text-xs text-muted-foreground">
                Critical
              </p>

              <p className="text-lg font-bold text-destructive">
                {criticalCount}
              </p>

            </div>

          </CardContent>

        </Card>



        {/* Warning */}

        <Card
          className={`cursor-pointer ${
            filter === "Warning" ? "border-yellow-500" : ""
          }`}
          onClick={() => setFilter("Warning")}
        >

          <CardContent className="flex items-center gap-3 py-4">

            <AlertCircle className="size-5 text-yellow-500"/>

            <div>
              <p className="text-xs text-muted-foreground">
                Warnings
              </p>

              <p className="text-lg font-bold text-yellow-500">
                {warningCount}
              </p>

            </div>

          </CardContent>

        </Card>

      </div>



      {/* Alert Feed */}

      <Card>

        <CardHeader>

          <CardTitle>
            Alert Feed ({filter})
          </CardTitle>

        </CardHeader>



        <CardContent>

          <div className="flex flex-col gap-3">

            {filteredAlerts.map(alert => {

              const config = typeConfig[alert.type]
              const Icon = config.icon

              return (

                <div
                  key={alert.id}
                  className="flex items-start gap-3 border rounded-lg p-4"
                >

                  <div className={`p-2 rounded-lg ${config.color}`}>
                    <Icon className="size-4"/>
                  </div>


                  <div className="flex-1">

                    <div className="flex gap-2 items-center">

                      <Badge className={config.badgeClass}>
                        {alert.type}
                      </Badge>

                      <span className="text-xs text-muted-foreground">
                        {alert.time}
                      </span>

                    </div>


                    <p className="text-sm mt-1">
                      {alert.message}
                    </p>

                  </div>


                 

                </div>

              )

            })}

          </div>

        </CardContent>

      </Card>

    </div>

  )

}

