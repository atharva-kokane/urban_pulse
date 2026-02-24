"use client";

import { PieChart, Pie, Cell, ResponsiveContainer } from "recharts";

export default function AQIGauge({ value = 78 }) {
  const data = [
    { name: "Good", value: 50 },
    { name: "Moderate", value: 50 },
    { name: "Rest", value: 100 },
  ];

  const COLORS = ["#22c55e", "#facc15", "#1e293b"];

  const RADIAN = Math.PI / 180;

  const needle = (value, cx, cy, outerRadius) => {
    const safeValue = Math.min(Math.max(value, 0), 100);
    const angle = 180 - (safeValue / 100) * 180;

    const length = outerRadius - 10;
    const sin = Math.sin(-RADIAN * angle);
    const cos = Math.cos(-RADIAN * angle);

    const x = cx + length * cos;
    const y = cy + length * sin;

    return (
      <>
        <line
          x1={cx}
          y1={cy}
          x2={x}
          y2={y}
          stroke="#e5e7eb"
          strokeWidth={4}
          strokeLinecap="round"
        />
        <circle cx={cx} cy={cy} r={8} fill="#e5e7eb" />
      </>
    );
  };

  return (
<div className="bg-[#0B1B33] border border-[#1f2a44]/60 rounded-2xl p-8 h-[520px] flex flex-col">

      {/* Header */}
      <div className="flex justify-between items-center mb-8">
        <h2 className="text-xl font-semibold">
          Air Quality Index
        </h2>

        <span className="bg-yellow-500/10 text-yellow-400 px-3 py-1 rounded-full text-sm font-medium">
          Moderate
        </span>
      </div>

      {/* Gauge */}
     <div className="relative flex-1 flex items-center justify-center">
        <ResponsiveContainer width="100%" height="100%">
          <PieChart>
            <Pie
              data={data}
              dataKey="value"
              startAngle={180}
              endAngle={0}
              cx="50%"
              cy="70%"
              innerRadius={95}
              outerRadius={115}
              stroke="none"
            >
              {data.map((entry, index) => (
                <Cell key={index} fill={COLORS[index]} />
              ))}
            </Pie>

            {needle(value, 200, 200, 115)}
          </PieChart>
        </ResponsiveContainer>

        {/* Center AQI */}
        <div className="absolute inset-0 flex flex-col items-center justify-center top-6">
          <h1 className="text-5xl font-bold tracking-tight">
            {value}
          </h1>
          <span className="text-gray-400 text-sm mt-1">
            AQI
          </span>
        </div>
      </div>

      {/* Legend */}
      <div className="flex justify-between mt-6 text-sm text-gray-400">
        <div className="flex items-center gap-2">
          <span className="w-3 h-3 bg-green-500 rounded-full"></span>
          <span>Good (0-50)</span>
        </div>

        <div className="flex items-center gap-2">
          <span className="w-3 h-3 bg-yellow-400 rounded-full"></span>
          <span>Moderate (51-100)</span>
        </div>

        <div className="flex items-center gap-2">
          <span className="w-3 h-3 bg-red-500 rounded-full"></span>
          <span>Unhealthy (100+)</span>
        </div>
      </div>

      {/* Bottom Stats */}
      <div className="flex justify-between mt-auto pt-8 text-center">
        <div>
          <p className="text-cyan-400 text-2xl font-bold">42</p>
          <p className="text-gray-400 text-xs">PM2.5</p>
        </div>

        <div>
          <p className="text-green-400 text-2xl font-bold">28</p>
          <p className="text-gray-400 text-xs">PM10</p>
        </div>

        <div>
          <p className="text-yellow-400 text-2xl font-bold">65</p>
          <p className="text-gray-400 text-xs">O₃</p>
        </div>
      </div>
    </div>
  );
}