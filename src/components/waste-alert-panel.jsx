"use client"

import { useEffect, useState } from "react"
import { AlertTriangle } from "lucide-react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { supabase } from "@/lib/supabaseClient"

export function WasteAlertPanel() {

  const [criticalBins, setCriticalBins] = useState([])

  useEffect(() => {

    fetchCriticalBins()

    
    // realtime updates
    const channel = supabase
      .channel("critical_bins_changes")
      .on(
        "postgres_changes",
        { event: "*", schema: "public", table: "smart_bins" },
        fetchCriticalBins
      )
      .subscribe()

    return () => supabase.removeChannel(channel)

  }, [])

  async function fetchCriticalBins() {

    const { data, error } = await supabase
      .from("smart_bins")
      .select("*")
      .eq("status", "Critical") // only critical bins
      .order("fill_level", { ascending: false })

    if (!error && data) {
      setCriticalBins(data)
    }

  }

  return (
    <Card className="border-destructive/20">
      <CardHeader>
        <div className="flex items-center gap-2">
          <AlertTriangle className="size-4 text-destructive" />
          <CardTitle className="text-sm font-semibold text-destructive">
            Critical Alerts ({criticalBins.length})
          </CardTitle>
        </div>
      </CardHeader>

      <CardContent>

  <div className="flex flex-col gap-3 max-h-[400px] overflow-y-auto pr-1">

    {criticalBins.map((bin) => (

      <div
        key={bin.bin_id}
        className="flex flex-col gap-2 rounded-lg border border-destructive/20 bg-destructive/5 p-3"
      >

        <div className="flex items-center justify-between">

          <span className="text-xs font-semibold">
            {bin.bin_id}
          </span>

          <Badge className="bg-destructive text-[10px]">
            {bin.fill_level}% Full
          </Badge>

        </div>

        <p className="text-[11px] text-muted-foreground">
          {bin.location}
        </p>

        <p className="text-[10px] text-muted-foreground">
          Updated {new Date(bin.last_updated).toLocaleTimeString()}
        </p>

      </div>

    ))}

  </div>

</CardContent>

    </Card>
  )
}