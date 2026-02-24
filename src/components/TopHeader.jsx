"use client";
import { Bell, User } from "lucide-react";

export default function TopHeader() {
  return (
    <div className="flex justify-between items-center px-8 py-4 border-b border-[#1f2a44] bg-[#061226]">

      {/* LEFT SIDE */}
      <div className="flex items-center gap-3">
        <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-cyan-400 to-teal-500" />
        <h1 className="text-xl font-semibold text-cyan-400">
          Urban Pulse
        </h1>
      </div>

      {/* RIGHT SIDE */}
      <div className="flex items-center gap-6">

        {/* City Health */}
        <div className="flex items-center gap-3 bg-[#0e1f35] border border-[#1f2a44] px-3 py-1.5 rounded-full">
          <span className="text-gray-400 text-sm">
            City Health
          </span>

          <div className="relative w-8 h-8">
            <svg className="w-8 h-8 -rotate-90">
              <circle cx="16" cy="16" r="13" stroke="#1f2a44" strokeWidth="2.5" fill="none" />
              <circle
                cx="16"
                cy="16"
                r="13"
                stroke="#14b8a6"
                strokeWidth="2.5"
                strokeDasharray="82"
                strokeDashoffset="11"
                strokeLinecap="round"
                fill="none"
              />
            </svg>

            <div className="absolute inset-0 flex items-center justify-center text-xs font-semibold">
              87
            </div>
          </div>
        </div>

        {/* Notification */}
        <div className="relative">
          <Bell className="text-gray-400 cursor-pointer" />
          <span className="absolute -top-1 -right-1 w-2 h-2 bg-red-500 rounded-full" />
        </div>

        {/* Admin */}
        <div className="w-10 h-10 rounded-full bg-gradient-to-br from-cyan-400 to-teal-500 flex items-center justify-center cursor-pointer">
          <User size={18} />
        </div>

      </div>
    </div>
  );
}