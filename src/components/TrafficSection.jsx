"use client";

import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  CartesianGrid,
} from "recharts";

const data = [
  { time: "00:00", value: 20 },
  { time: "06:00", value: 50 },
  { time: "12:00", value: 85 },
  { time: "18:00", value: 70 },
  { time: "23:59", value: 40 },
];

export default function TrafficSection() {
  return (
<div className="bg-[#0B1B33] border border-[#1f2a44]/60 rounded-2xl p-8 h-[520px] flex flex-col">

      {/* Header */}
      <div className="flex justify-between items-center mb-8">
        <h2 className="text-xl font-semibold">
          Traffic Monitoring
        </h2>
        <span className="text-gray-400 text-sm">
          Real-time data
        </span>
      </div>

      <div className="grid grid-cols-2 gap-10 flex-1">

        {/* LEFT SIDE */}
        <div>
          <p className="text-gray-400 text-sm mb-6">
            Congestion Zones
          </p>

          <div className="space-y-6">

            {[
              { name: "Downtown", value: 85, color: "bg-red-500" },
              { name: "Industrial Area", value: 62, color: "bg-yellow-500" },
              { name: "Residential North", value: 35, color: "bg-green-500" },
              { name: "Tech Park", value: 48, color: "bg-yellow-400" },
            ].map((zone, i) => (
              <div key={i}>
                <div className="flex justify-between text-sm mb-2">
                  <span>{zone.name}</span>
                  <span className="text-gray-400">
                    {zone.value}%
                  </span>
                </div>

                <div className="h-2.5 bg-gray-700 rounded-full">
                  <div
                    className={`h-2.5 rounded-full ${zone.color}`}
                    style={{ width: `${zone.value}%` }}
                  />
                </div>
              </div>
            ))}

          </div>
        </div>

        {/* RIGHT SIDE */}
        <div>
          <p className="text-gray-400 text-sm mb-6">
            24h Congestion Trend
          </p>

          <ResponsiveContainer width="100%" height={220}>
           <ResponsiveContainer width="100%" height={240}>
  <LineChart data={data}>
    <CartesianGrid
      stroke="#1f2a44"
      strokeDasharray="3 6"
      vertical={true}
      horizontal={true}
    />

    <XAxis
      dataKey="time"
      stroke="#6b7a99"
      tick={{ fill: "#6b7a99", fontSize: 12 }}
    />

    <YAxis
      stroke="#6b7a99"
      tick={{ fill: "#6b7a99", fontSize: 12 }}
    />

    <Tooltip
      contentStyle={{
        backgroundColor: "#0B1B33",
        border: "1px solid #1f2a44",
        borderRadius: "12px",
      }}
    />

    <Line
      type="monotone"
      dataKey="value"
      stroke="#2dd4bf"
      strokeWidth={3}
      dot={{
        r: 6,
        stroke: "#2dd4bf",
        strokeWidth: 3,
        fill: "#0B1B33",
      }}
      activeDot={{
        r: 7,
        fill: "#2dd4bf",
        stroke: "#ffffff",
        strokeWidth: 2,
      }}
    />
  </LineChart>
</ResponsiveContainer>
          </ResponsiveContainer>
        </div>

      </div>
    </div>
  );
}