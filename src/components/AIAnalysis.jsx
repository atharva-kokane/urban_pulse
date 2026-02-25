"use client";

import { useEffect, useState } from "react";

export default function AIAnalysis() {
  const [data, setData] = useState(null);

useEffect(() => {
  const fetchAI = async () => {
    const res = await fetch("/api/ai-analysis", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        traffic: 65,
        waste: 80,
        aqi: 78,
      }),
    });

    const data = await res.json();
    setData(data);
  };

  fetchAI(); // initial run

  const interval = setInterval(fetchAI, 30000); // every 30 sec

  return () => clearInterval(interval);
}, []);

  if (!data) {
    return (
      <div className="bg-[#0B1B33] border border-[#1f2a44]/60 p-8 rounded-2xl">
        <div className="flex items-center gap-2 text-cyan-400">
  <div className="w-3 h-3 border-2 border-cyan-400 border-t-transparent rounded-full animate-spin"></div>
  Running AI Analysis...
</div>
      </div>
    );
  }

  return (
    <div className="bg-[#0B1B33] border border-[#1f2a44]/60 rounded-2xl p-8">
      <h3 className="text-cyan-400 font-semibold mb-6">
        AI Analysis
      </h3>

      <div className="space-y-4 text-sm">
        <div className="bg-[#0e1f35] p-4 rounded-xl border border-[#1f2a44]/40">
  <p className="text-cyan-400">Risk Level</p>
  <p
    className={`mt-1 font-semibold ${
      data.risk_level === "HIGH"
        ? "text-red-400"
        : data.risk_level === "MODERATE"
        ? "text-yellow-400"
        : "text-green-400"
    }`}
  >
    {data.risk_level}
  </p>
</div>
        <Box title="Explanation" value={data.explanation} />
        <Box title="Recommended Action" value={data.recommended_action} />
      </div>
    </div>
  );
}

function Box({ title, value }) {
  return (
    <div className="bg-[#0e1f35] p-4 rounded-xl border border-[#1f2a44]/40">
      <p className="text-cyan-400">{title}</p>
      <p className="text-gray-300 mt-1">{value}</p>
    </div>
  );
}