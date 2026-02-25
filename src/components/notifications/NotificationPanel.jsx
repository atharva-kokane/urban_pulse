"use client";

import { useState } from "react";

export default function NotificationPanel() {
  const [alerts] = useState([
    { message: "BIN-003 reaching critical level", type: "critical" },
    { message: "Heavy traffic in Downtown", type: "warning" },
    { message: "AI optimized new truck route", type: "info" },
  ]);

  return (
    <div className="bg-[#0B1B33] border border-[#1f2a44]/60 rounded-2xl p-6 w-[320px]">

      <h3 className="text-lg font-semibold mb-4">
        Notifications
      </h3>

      <div className="space-y-4">
        {alerts.map((alert, index) => {

          let color = "#14b8a6";
          if (alert.type === "critical") color = "#ef4444";
          if (alert.type === "warning") color = "#f59e0b";

          return (
            <div
              key={index}
              className="p-3 rounded-lg text-sm"
              style={{
                backgroundColor: `${color}20`,
                color: color
              }}
            >
              {alert.message}
            </div>
          );
        })}
      </div>
    </div>
  );
}