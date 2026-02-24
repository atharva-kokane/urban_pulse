"use client";

import dynamic from "next/dynamic";

const TrafficMap = dynamic(() => import("./TrafficMap"), {
  ssr: false,
});

export default function MapCard() {
  return (
    <div className="bg-[#0B1B33] border border-[#1f2a44]/60 rounded-2xl p-8 h-[480px] flex flex-col">

      <div className="flex justify-between items-center mb-6">
        <h3 className="text-lg font-semibold">
          Live Traffic Map
        </h3>

        <div className="bg-green-500/10 text-green-400 px-3 py-1 rounded-full text-xs">
          ● Live
        </div>
      </div>

  <div className="flex-1 rounded-xl overflow-hidden">
  <TrafficMap />
</div>

    </div>
  );
}