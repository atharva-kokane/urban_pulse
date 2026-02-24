"use client";
import { LineChart, Line, XAxis, YAxis, Tooltip, ResponsiveContainer } from "recharts";

const data = [
  { time: "00:00", value: 20 },
  { time: "06:00", value: 50 },
  { time: "12:00", value: 80 },
  { time: "18:00", value: 70 },
  { time: "23:00", value: 40 },
];

export default function TrafficChart() {
  return (
    <div className="bg-[#0B1B33] p-6 rounded-xl border border-gray-800 h-72">
      <h2 className="mb-4">Traffic Monitoring</h2>
      <ResponsiveContainer width="100%" height="85%">
        <LineChart data={data}>
          <XAxis dataKey="time" stroke="#888"/>
          <YAxis stroke="#888"/>
          <Tooltip />
          <Line type="monotone" dataKey="value" stroke="#06b6d4" strokeWidth={3}/>
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
}