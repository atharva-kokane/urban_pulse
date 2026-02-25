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
  }, []);

  async function fetchBins() {
  const { data, error } = await supabase
    .from("waste_bins")
    .select("*");

  console.log("DATA:", data);
  console.log("ERROR:", error);

  if (error) {
    console.error("Supabase Error:", error);
  } else {
    setBins(data);
  }
}

  return (
    <div className="h-screen bg-[#061226] text-white flex flex-col">

      <TopHeader />

      <div className="flex flex-1 overflow-hidden">
        <Sidebar />

        <div className="flex-1 overflow-y-auto p-8">

          {/* Header */}
          <div className="flex justify-between items-center mb-12">
            <div>
              <h1 className="text-2xl font-semibold">Waste Management</h1>
              <p className="text-gray-400 text-sm">
                Smart bin monitoring & collection optimization
              </p>
            </div>

            <div className="bg-green-500/10 text-green-400 px-4 py-2 rounded-full text-sm">
              ● Live
            </div>
          </div>

          {/* Top Grid */}
          <div className="grid gap-8 grid-cols-[2.2fr_1fr] items-stretch">
            <WasteMapCard bins={bins} />
            <BinStatusCard bins={bins} />
          </div>

          {/* Bottom Analytics */}
          <div className="mt-8">
            <WasteAnalytics bins={bins} />
          </div>

        </div>
      </div>
    </div>
  );
}