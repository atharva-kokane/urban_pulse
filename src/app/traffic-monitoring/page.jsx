"use client";

import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabaseClient";

import Sidebar from "@/components/Sidebar";
import TopHeader from "@/components/TopHeader";
import TrafficMapCard from "@/components/traffic/TrafficMapCard";
import CongestionZones from "@/components/traffic/CongestionZones";

export default function TrafficMonitoring() {

  const [zones, setZones] = useState([]);

  // ✅ PUT fetchZones HERE (inside component)
  async function fetchZones() {

    const { data, error } =
      await supabase.from("traffic_zones").select("*");

    if (!error) {
      setZones(data);
    }

  }

  useEffect(() => {

  fetchZones();

  const channel = supabase
    .channel("traffic_zones_changes")
    .on(
      "postgres_changes",
      {
        event: "*",
        schema: "public",
        table: "traffic_zones",
      },
      (payload) => {
        console.log("Realtime working:", payload);
        fetchZones();
      }
    )
    .subscribe((status) => {
      console.log("Realtime status:", status);
    });

  return () => {
    supabase.removeChannel(channel);
  };

}, []);

  return (

    <div className="h-screen bg-[#061226] text-white flex flex-col">

      <TopHeader />

      <div className="flex flex-1 overflow-hidden">

        <Sidebar />

        <div className="flex-1 overflow-y-auto p-8">

          {/* Page Header */}
          <div className="flex justify-between items-center mb-6">

            <div>
              <h1 className="text-2xl font-semibold">
                Traffic Monitoring
              </h1>

              <p className="text-gray-400 text-sm">
                Real-time city traffic analytics
              </p>
            </div>

            <div className="bg-green-500/10 text-green-400 px-4 py-1 rounded-full text-sm">
              ● Live
            </div>

          </div>

          {/* Grid */}
          <div className="grid gap-8 grid-cols-[2.2fr_1fr]">

            <TrafficMapCard zones={zones} />

            <CongestionZones zones={zones} />

          </div>

        </div>

      </div>

    </div>

  );

}