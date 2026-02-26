"use client";

import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabaseClient";

import Sidebar from "@/components/Sidebar";
import TopHeader from "@/components/TopHeader";
import WasteMapCard from "@/components/waste/WasteMapCard";
import BinStatusCard from "@/components/waste/BinStatusCard";
import WasteAnalytics from "@/components/waste/WasteAnalytics";

export default function WasteManagement() {

  const [bins, setBins] = useState([]);

  useEffect(() => {
    fetchBins();

    // Subscribe to realtime updates
    const channel = supabase
      .channel("waste_bins_changes")
      .on(
        "postgres_changes",
        {
          event: "*",
          schema: "public",
          table: "waste_bins",
        },
        (payload) => {
          console.log("Realtime update:", payload);
          fetchBins(); // refresh bins
        }
      )
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, []);

  async function fetchBins() {
    const { data, error } = await supabase
      .from("waste_bins")
      .select("*");

    if (!error) {
      setBins(data);
    }
  }

  return (
    <div className="h-screen bg-[#061226] text-white flex flex-col">

      <TopHeader />

      <div className="flex flex-1 overflow-hidden">

        <Sidebar />

        <div className="flex-1 overflow-y-auto p-8">

          <div className="grid gap-8 grid-cols-[2.2fr_1fr]">
            <WasteMapCard bins={bins} />
            <BinStatusCard bins={bins} />
          </div>

          <div className="mt-8">
            <WasteAnalytics bins={bins} />
          </div>

        </div>

      </div>

    </div>
  );
}