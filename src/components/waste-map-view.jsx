"use client"

import { useEffect, useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { MapPin } from "lucide-react"
import { supabase } from "@/lib/supabaseClient"

const binPositions = [
  { x: 20, y: 25 }, { x: 55, y: 15 }, { x: 40, y: 45 },
  { x: 75, y: 30 }, { x: 30, y: 70 }, { x: 60, y: 55 },
  { x: 85, y: 65 }, { x: 15, y: 50 }, { x: 50, y: 80 },
  { x: 70, y: 75 },
]

// color based on status
function getPinColor(status, fillLevel) {

  if (status === "Critical" || fillLevel >= 80) return "#DC2626" // red
  if (status === "Full" || fillLevel >= 50) return "#F59E0B" // orange
  if (status === "Medium" || fillLevel >= 20) return "#2563EB" // blue
  return "#16A34A" // green

}

export function WasteMapView() {

  const [bins, setBins] = useState([])

  useEffect(() => {

    fetchBins()

    // realtime updates
    const channel = supabase
      .channel("map_bins_changes")
      .on(
        "postgres_changes",
        { event: "*", schema: "public", table: "smart_bins" },
        fetchBins
      )
      .subscribe()

    return () => supabase.removeChannel(channel)

  }, [])

  async function fetchBins() {

    const { data, error } = await supabase
      .from("smart_bins")
      .select("*")
      .order("bin_id")

    if (!error && data) {
      setBins(data)
    }

  }

  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-sm font-semibold">
          Bin Locations Map
        </CardTitle>
      </CardHeader>

      <CardContent>
        <div className="relative aspect-[16/10] w-full overflow-hidden rounded-lg bg-muted/50 border">

          {/* Grid */}
          <svg className="absolute inset-0 size-full">
            <defs>
              <pattern id="grid" width="40" height="40" patternUnits="userSpaceOnUse">
                <path d="M 40 0 L 0 0 0 40" fill="none" stroke="var(--color-border)" strokeWidth="0.5"/>
              </pattern>
            </defs>

            <rect width="100%" height="100%" fill="url(#grid)" />

            <line x1="0" y1="50%" x2="100%" y2="50%"
              stroke="var(--color-border)" strokeWidth="2" strokeDasharray="8,4" />

            <line x1="50%" y1="0" x2="50%" y2="100%"
              stroke="var(--color-border)" strokeWidth="2" strokeDasharray="8,4" />

          </svg>

          {/* Label */}
          <div className="absolute left-2 top-2 rounded bg-card/80 px-2 py-1 text-[10px] border">
            Metro City - Live View
          </div>

          {/* Dynamic pins from Supabase */}
          {bins.map((bin, i) => {

            const pos = binPositions[i]
            if (!pos) return null

            const color = getPinColor(bin.status, bin.fill_level)

            return (
              <div
                key={bin.bin_id}
                className="group absolute flex flex-col items-center"
                style={{
                  left: `${pos.x}%`,
                  top: `${pos.y}%`,
                  transform: "translate(-50%, -100%)"
                }}
              >

                <div className="relative">

                  <MapPin
                    className="size-6 drop-shadow-md"
                    style={{ color }}
                    fill={color}
                    stroke="white"
                    strokeWidth={1.5}
                  />

                  {/* blinking for critical */}
                  {bin.status === "Critical" && (
                    <span className="absolute -top-1 -right-1 flex size-3">
                      <span className="absolute inline-flex size-full animate-ping rounded-full bg-destructive opacity-75" />
                      <span className="relative inline-flex size-3 rounded-full bg-destructive" />
                    </span>
                  )}

                </div>

                {/* Tooltip */}
                <div className="pointer-events-none absolute bottom-full mb-2 hidden rounded-lg border bg-card px-2 py-1 shadow-lg group-hover:block">

                  <p className="text-xs font-semibold">
                    {bin.bin_id}
                  </p>

                  <p className="text-[10px] text-muted-foreground">
                    {bin.location}
                  </p>

                  <p className="text-[10px] font-medium" style={{ color }}>
                    {bin.fill_level}% Full
                  </p>

                </div>

              </div>
            )

          })}

          {/* Legend */}
          <div className="absolute bottom-2 right-2 flex gap-3 rounded bg-card/80 px-2 py-1 border text-[10px]">

            <span className="flex items-center gap-1">
              <span className="size-2 rounded-full bg-green-600"/>
              Empty
            </span>

            <span className="flex items-center gap-1">
              <span className="size-2 rounded-full bg-blue-600"/>
              Medium
            </span>

            <span className="flex items-center gap-1">
              <span className="size-2 rounded-full bg-orange-500"/>
              Full
            </span>

            <span className="flex items-center gap-1">
              <span className="size-2 rounded-full bg-red-600"/>
              Critical
            </span>

          </div>

        </div>
      </CardContent>
    </Card>
  )
}