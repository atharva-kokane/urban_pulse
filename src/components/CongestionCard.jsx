"use client";

import { useEffect, useState } from "react";
import ZoneItem from "./ZoneItem";

export default function CongestionCard() {
  const [zones, setZones] = useState([
    { name: "Downtown", percent: 85 },
    { name: "Industrial Area", percent: 62 },
    { name: "Residential North", percent: 35 },
    { name: "Tech Park", percent: 48 },
  ]);

  const [lastUpdated, setLastUpdated] = useState("Just now");

  useEffect(() => {
    const interval = setInterval(() => {
      setZones(prev =>
        prev.map(zone => ({
          ...zone,
          percent: Math.max(
            20,
            Math.min(95, zone.percent + (Math.random() * 20 - 10))
          ),
        }))
      );

      setLastUpdated("Updated just now");
      setTimeout(() => setLastUpdated(""), 2000);

    }, 5000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="bg-[#0B1B33] border border-[#1f2a44]/60 rounded-2xl p-8 h-[480px] flex flex-col">

      <div className="flex justify-between items-center mb-6">
        <h3 className="text-lg font-semibold">
          Congestion Zones
        </h3>

        <div className="flex items-center gap-3">
          <span className="text-xs text-gray-400">
            {lastUpdated}
          </span>

          <span className="bg-purple-500/10 text-purple-400 px-3 py-1 rounded-full text-xs">
            AI Predicted
          </span>
        </div>
      </div>

      <div className="space-y-6 overflow-y-auto">
        {zones.map((zone, index) => (
          <ZoneItem
            key={index}
            name={zone.name}
            percent={Math.round(zone.percent)}
          />
        ))}
      </div>

    </div>
  );
}