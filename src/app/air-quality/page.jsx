"use client";

import { useState } from "react";
import Sidebar from "@/components/Sidebar";
import TopHeader from "@/components/TopHeader";
import PollutionBreakdown from "@/components/air/PollutionBreakdown";

export default function AirQuality() {

  const [selectedArea, setSelectedArea] = useState("Downtown");

  return (
    <div className="h-screen bg-[#061226] text-white flex flex-col">

      <TopHeader />

      <div className="flex flex-1 overflow-hidden">

        <Sidebar />

        <div className="flex-1 overflow-y-auto p-8 space-y-8">

          {/* Header */}
          <div className="flex justify-between items-center">
            <div>
              <h1 className="text-2xl font-semibold">
                Air Quality Monitoring
              </h1>
              <p className="text-gray-400 text-sm">
                Real-time environmental intelligence
              </p>
            </div>

            <div className="flex items-center gap-2 text-green-400">
              <span className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></span>
              Live
            </div>
          </div>

          {/* Main Layout */}
          <div className="grid grid-cols-[320px_1fr] gap-8">

            {/* LEFT PANEL (City only) */}
            <div className="bg-[#0B1B33] border border-[#1f2a44]/60 rounded-2xl p-6">

              <p className="text-cyan-400 mb-4 text-sm">
                City
              </p>

              <div className="bg-[#0e1f35] p-4 rounded-xl border border-[#1f2a44]/40">
                <p className="text-xl font-semibold text-cyan-400">
                  Pune
                </p>
              </div>

            </div>


            {/* RIGHT PANEL */}
            <PollutionBreakdown
              selectedArea={selectedArea}
              setSelectedArea={setSelectedArea}
            />

          </div>

        </div>

      </div>

    </div>
  );
}