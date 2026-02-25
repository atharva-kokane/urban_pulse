"use client";
import { PieChart, Pie, Cell, Tooltip, ResponsiveContainer } from "recharts";

export default function AlertsAnalytics() {

  const data = [
    { name: "Critical", value: 5 },
    { name: "Warning", value: 7 },
    { name: "Resolved", value: 6 },
  ];

  const COLORS = ["#ef4444", "#f59e0b", "#10b981"];

  return (
    <div className="bg-[#0B1B33] border border-[#1f2a44]/60 rounded-2xl p-8 h-[300px]">
      <h3 className="mb-6 font-semibold">Alerts Distribution</h3>

      <ResponsiveContainer width="100%" height="80%">
        <PieChart>
          <Pie data={data} dataKey="value" outerRadius={90}>
            {data.map((entry, index) => (
              <Cell key={index} fill={COLORS[index]} />
            ))}
          </Pie>
          <Tooltip />
        </PieChart>
      </ResponsiveContainer>
    </div>
  );
}