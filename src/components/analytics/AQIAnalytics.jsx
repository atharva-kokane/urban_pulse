"use client";
import { AreaChart, Area, XAxis, YAxis, Tooltip, ResponsiveContainer } from "recharts";

export default function AQIAnalytics() {

  const data = [
    { day: "Mon", value: 60 },
    { day: "Tue", value: 78 },
    { day: "Wed", value: 55 },
    { day: "Thu", value: 82 },
    { day: "Fri", value: 70 },
  ];

  return (
    <div className="bg-[#0B1B33] border border-[#1f2a44]/60 rounded-2xl p-8 h-[350px]">
      <h3 className="mb-6 font-semibold">AQI Trend</h3>

      <ResponsiveContainer width="100%" height="80%">
        <AreaChart data={data}>
          <XAxis dataKey="day" stroke="#6b7280" />
          <YAxis stroke="#6b7280" />
          <Tooltip />
          <Area type="monotone" dataKey="value" stroke="#facc15" fill="#facc15" fillOpacity={0.2} />
        </AreaChart>
      </ResponsiveContainer>
    </div>
  );
}