"use client";

import { useState } from "react";
import PollutionBreakdown from "@/components/air/PollutionBreakdown";

export default function AirQuality() {

  const city = "Pune";

  const areas = [
    "Downtown",
    "Industrial Area",
    "Residential North",
    "Tech Park"
  ];

  const [selectedArea, setSelectedArea] = useState("Downtown");

  return (

    <div className="space-y-8">

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

        <div className="text-green-400 text-sm">
          ● Live
        </div>

      </div>


      {/* City Card */}
      <div className="bg-[#0B1B33] border border-[#1f2a44]/60 rounded-2xl p-6">

        <p className="text-gray-400 text-sm mb-2">
          City
        </p>

        <div className="bg-[#0e1f35] p-4 rounded-xl text-lg font-semibold text-cyan-400">
          {city}
        </div>

      </div>


      {/* Pollution Breakdown */}
      <PollutionBreakdown
        areas={areas}
        selectedArea={selectedArea}
        setSelectedArea={setSelectedArea}
      />

    </div>

  );
}