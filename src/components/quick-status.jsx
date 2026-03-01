"use client"

import { useEffect, useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { supabase } from "@/lib/supabaseClient"

function getStatusColor(fillLevel) {
  if (fillLevel >= 85) return "bg-destructive"
  if (fillLevel >= 60) return "bg-[var(--warning)]"
  if (fillLevel >= 20) return "bg-blue-600"
  return "bg-accent"
}

export function QuickStatus() {

  
  const [topBins, setTopBins] = useState([])

  useEffect(() => {

    fetchTopBins()

    // realtime updates
    const channel = supabase
      .channel("quick_status_changes")
      .on(
        "postgres_changes",
        { event: "*", schema: "public", table: "smart_bins" },
        fetchTopBins
      )
      .subscribe()

    return () => supabase.removeChannel(channel)

  }, [])

  async function fetchTopBins() {

    const { data, error } = await supabase
      .from("smart_bins")
      .select("*")
      .order("fill_level", { ascending: false })
      .limit(6)

    if (!error && data) {
      setTopBins(data)
    }

  }

  return (
    <Card>

      <CardHeader>
        <CardTitle className="text-sm font-semibold">
          Top Bins by Fill Level
        </CardTitle>
      </CardHeader>

      <CardContent>

        <div className="flex flex-col gap-4">

          {topBins.map((bin) => (

            <div key={bin.bin_id} className="flex flex-col gap-1.5">

              <div className="flex items-center justify-between text-xs">

                <div className="flex items-center gap-2">

                  <span className="font-medium text-foreground">
                    {bin.bin_id}
                  </span>

                  <span className="text-muted-foreground">
                    {bin.location}
                  </span>

                </div>

                <span
                  className={`font-semibold ${
                    bin.fill_level >= 85
                      ? "text-destructive"
                      : bin.fill_level >= 60
                      ? "text-[var(--warning)]"
                      : "text-accent"
                  }`}
                >
                  {bin.fill_level}%
                </span>

              </div>

              <div className="relative h-2 w-full overflow-hidden rounded-full bg-muted">

                <div
                  className={`h-full rounded-full transition-all ${getStatusColor(bin.fill_level)}`}
                  style={{ width: `${bin.fill_level}%` }}
                />

              </div>

            </div>

          ))}

        </div>

      </CardContent>

    </Card>
  )
}