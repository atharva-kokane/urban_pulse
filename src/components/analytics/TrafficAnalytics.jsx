"use client";
import { LineChart, Line, XAxis, YAxis, Tooltip, ResponsiveContainer } from "recharts";

export default function TrafficAnalytics() {

  const data = [
    { day: "Mon", value: 45 },
    { day: "Tue", value: 70 },
    { day: "Wed", value: 60 },
    { day: "Thu", value: 80 },
    { day: "Fri", value: 65 },
  ];

  return (
    <div className="bg-[#0B1B33] border border-[#1f2a44]/60 rounded-2xl p-8 h-[350px]">
      <h3 className="mb-6 font-semibold">Traffic Trend</h3>

      <ResponsiveContainer width="100%" height="80%">
        <LineChart data={data}>
          <XAxis dataKey="day" stroke="#6b7280" />
          <YAxis stroke="#6b7280" />
          <Tooltip />
          <Line type="monotone" dataKey="value" stroke="#14b8a6" strokeWidth={3} />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
}