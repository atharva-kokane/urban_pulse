"use client";

import { useEffect, useState } from "react";

export default function AQITrendChart() {
  const [aqi, setAqi] = useState(78);

  useEffect(() => {
    const interval = setInterval(() => {
      setAqi(prev =>
        Math.max(40, Math.min(120, prev + (Math.random() * 10 - 5)))
      );
    }, 4000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="bg-[#0B1B33] border border-[#1f2a44]/60 rounded-2xl p-8">

      <h3 className="text-lg font-semibold mb-6">
        AQI Trend (Live Simulation)
      </h3>

      <div className="h-[150px] flex items-center justify-center text-4xl font-bold text-cyan-400">
        {Math.round(aqi)}
      </div>

    </div>
  );
}