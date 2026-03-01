"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Eye } from "lucide-react"
import { useEffect, useState } from "react"
import { supabase } from "@/lib/supabaseClient"


function StatusBadge({ status }) {
  const styles = {
    Critical: "bg-destructive text-destructive-foreground",
    Full: "bg-[var(--warning)] text-foreground",
    Medium: "bg-primary text-primary-foreground",
    Empty: "bg-accent text-accent-foreground",
  }
  return (
    <Badge className={`text-[10px] ${styles[status] || ""}`}>
      {status}
    </Badge>
  )
}

export function WasteBinTable() {

  const [bins, setBins] = useState([])

  useEffect(() => {
    fetchBins()

    const channel = supabase
      .channel("smart_bins_changes")
      .on(
        "postgres_changes",
        { event: "*", schema: "public", table: "smart_bins" },
        () => {
          fetchBins()
        }
      )
      .subscribe()

    return () => {
      supabase.removeChannel(channel)
    }

  }, [])

  async function fetchBins() {
    const { data, error } = await supabase
      .from("smart_bins")
      .select("*")
      .order("bin_id")

    if (!error) {
      setBins(data)
    }
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-sm font-semibold">Smart Bin Status</CardTitle>
      </CardHeader>
      <CardContent>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Bin ID</TableHead>
              <TableHead>Location</TableHead>
              <TableHead>Fill Level</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Last Updated</TableHead>
              
            </TableRow>
          </TableHeader>
          <TableBody>
            {bins.map((bin) => (
              <TableRow key={bin.bin_id}>
                <TableCell>{bin.bin_id}</TableCell>
                <TableCell>{bin.location}</TableCell>
                <TableCell>{bin.fill_level}%</TableCell>
                <TableCell>
                  <StatusBadge status={bin.status} />
                </TableCell>
                <TableCell>
                  {new Date(bin.last_updated).toLocaleTimeString()}
                </TableCell>
               
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  )
}
