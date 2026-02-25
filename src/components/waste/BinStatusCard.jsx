"use client";

import { useEffect, useState } from "react";

export default function BinStatusCard({ bins }) {
  const getColor = (level) => {
    if (level >= 70) return "bg-red-500";
    if (level >= 40) return "bg-yellow-500";
    return "bg-green-500";
  };

  return (
    <div className="bg-[#0B1C36] rounded-xl p-6">
      <h2 className="text-lg font-semibold mb-6">Bin Status</h2>

      <div className="space-y-5">
        {bins?.map((bin) => (
          <div key={bin.id}>
            <div className="flex justify-between text-sm mb-1">
              <span>{bin.bin_id}</span>
              <span>{bin.fill_level}%</span>
            </div>

            <div className="w-full bg-gray-700 rounded-full h-2">
              <div
                className={`${getColor(bin.fill_level)} h-2 rounded-full transition-all duration-500`}
                style={{ width: `${bin.fill_level}%` }}
              ></div>
            </div>

            <p className="text-xs text-gray-400 mt-1">
              {bin.location}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}