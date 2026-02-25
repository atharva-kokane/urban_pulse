"use client";

import { useState } from "react";

export default function AlertsPanel() {

  const [filter, setFilter] = useState("All");

  const alerts = [
    { message: "BIN-003 critical level", type: "Critical", time: "2 min ago" },
    { message: "Heavy traffic in Downtown", type: "Warning", time: "10 min ago" },
    { message: "Air quality improved", type: "Resolved", time: "1 hour ago" },
    { message: "Truck route optimized", type: "Resolved", time: "2 hours ago" },
  ];

  const filteredAlerts =
    filter === "All"
      ? alerts
      : alerts.filter(a => a.type === filter);

  return (
    <div className="bg-[#0B1B33] border border-[#1f2a44]/60 rounded-2xl p-8">

      {/* Filter Tabs */}
      <div className="flex gap-4 mb-6">
        {["All", "Critical", "Warning", "Resolved"].map(type => (
          <button
            key={type}
            onClick={() => setFilter(type)}
            className={`px-4 py-2 rounded-full text-sm ${
              filter === type
                ? "bg-cyan-500 text-white"
                : "bg-[#0e1f35] text-gray-400"
            }`}
          >
            {type}
          </button>
        ))}
      </div>

      {/* Alerts List */}
      <div className="space-y-4 max-h-[400px] overflow-y-auto">

        {filteredAlerts.map((alert, index) => {

          let color = "#14b8a6";
          if (alert.type === "Critical") color = "#ef4444";
          if (alert.type === "Warning") color = "#f59e0b";

          return (
            <div
              key={index}
              className="p-4 rounded-xl border border-[#1f2a44]/40"
              style={{
                backgroundColor: `${color}15`,
                borderColor: `${color}40`
              }}
            >
              <div className="flex justify-between mb-1">
                <span>{alert.message}</span>
                <span
                  className="text-xs px-3 py-1 rounded-full"
                  style={{
                    backgroundColor: `${color}25`,
                    color: color
                  }}
                >
                  {alert.type}
                </span>
              </div>
              <p className="text-xs text-gray-400">
                {alert.time}
              </p>
            </div>
          );
        })}

      </div>

    </div>
  );
}