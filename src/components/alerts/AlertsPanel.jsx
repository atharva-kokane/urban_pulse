"use client";

import { useState, useEffect } from "react";
import { supabase } from "@/lib/supabaseClient";

export default function AlertsPanel() {

  const [filter, setFilter] = useState("All");
  const [alerts, setAlerts] = useState([]);

  // Fetch alerts from Supabase
  async function fetchAlerts() {

    const { data, error } = await supabase
      .from("alerts")
      .select("*")
      .order("created_at", { ascending: false });

    if (error) {
      console.error("Error fetching alerts:", error);
      return;
    }

    // Convert Supabase data to your UI format
    const formattedAlerts = data.map(alert => ({

      message: alert.message,

      type:
        alert.status === "critical"
          ? "Critical"
          : alert.status === "warning"
          ? "Warning"
          : "Resolved",

      time: new Date(alert.created_at).toLocaleString()

    }));

    setAlerts(formattedAlerts);

  }

  useEffect(() => {

    fetchAlerts();

    // Realtime updates
    const channel = supabase
      .channel("alerts-live")
      .on(
        "postgres_changes",
        {
          event: "INSERT",
          schema: "public",
          table: "alerts",
        },
        (payload) => {

          const newAlert = {

            message: payload.new.message,

            type:
              payload.new.status === "critical"
                ? "Critical"
                : payload.new.status === "warning"
                ? "Warning"
                : "Resolved",

            time: new Date(payload.new.created_at).toLocaleString()

          };

          setAlerts(prev => [newAlert, ...prev]);

        }
      )
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };

  }, []);

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