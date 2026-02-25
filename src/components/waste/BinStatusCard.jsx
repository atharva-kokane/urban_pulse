"use client";

import { useEffect, useState } from "react";

export default function BinStatusCard() {
  const [bins, setBins] = useState([
    { id: "BIN-001", level: 45 },
    { id: "BIN-002", level: 78 },
    { id: "BIN-003", level: 92 },
    { id: "BIN-004", level: 65 },
  ]);

  useEffect(() => {
    const interval = setInterval(() => {
      setBins(prev =>
        prev.map(bin => ({
          ...bin,
          level: Math.max(
            10,
            Math.min(100, bin.level + (Math.random() * 15 - 5))
          ),
        }))
      );
    }, 5000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="bg-[#0B1B33] border border-[#1f2a44]/60 rounded-2xl p-8 h-[480px] flex flex-col">

      <div className="flex justify-between items-center mb-6">
        <h3 className="text-lg font-semibold">Bin Status</h3>
        <span className="bg-purple-500/10 text-purple-400 px-3 py-1 rounded-full text-xs">
          AI Predicted
        </span>
      </div>

      <div className="space-y-6 overflow-y-auto">

        {bins.map((bin, index) => {
          let color = "#10b981";
          let prediction = "Stable";

          if (bin.level > 85) {
            color = "#ef4444";
            prediction = "Full in 30 min";
          } else if (bin.level > 65) {
            color = "#f59e0b";
            prediction = "Full in 2 hours";
          }

          return (
            <div
              key={index}
              className="bg-[#0e1f35] p-4 rounded-xl border border-[#1f2a44]/40"
            >
              <div className="flex justify-between mb-2">
                <span>{bin.id}</span>
                <span>{Math.round(bin.level)}%</span>
              </div>

              <div className="w-full h-2 bg-[#1e2a44] rounded-full mb-2">
                <div
                  className="h-2 rounded-full transition-all duration-700"
                  style={{ width: `${bin.level}%`, backgroundColor: color }}
                />
              </div>

              <p
                className="text-xs"
                style={{ color }}
              >
                {prediction}
              </p>
            </div>
          );
        })}

      </div>
    </div>
  );
}