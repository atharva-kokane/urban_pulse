"use client";
import { LayoutDashboard, Car, Trash2, Wind, Bell, BarChart3 } from "lucide-react";
import Link from "next/link";

export default function Sidebar() {
  return (
    <div className="w-64 h-full bg-[#061226] border-r border-[#1f2a44] flex flex-col">

 

      {/* MENU */}
      <div className="flex flex-col px-4 gap-2 mt-4">

        {/* Active */}
        <div className="flex items-center gap-3 px-4 py-3 rounded-xl bg-[#0f2a36] border border-cyan-500/30 text-cyan-400">
          <LayoutDashboard size={18} />
          <span className="font-medium">Dashboard</span>
        </div>

        {/* Normal Items */}
        <Link href="/traffic-monitoring">
  <div className="flex items-center gap-3 px-4 py-3 rounded-xl hover:bg-[#0f2a36] cursor-pointer">
    Traffic Monitoring
  </div>
</Link>

        <div className="flex items-center gap-3 px-4 py-3 rounded-xl text-gray-400 hover:bg-[#0f2a36] transition">
          <Trash2 size={18} />
          Waste Management
        </div>

        <div className="flex items-center gap-3 px-4 py-3 rounded-xl text-gray-400 hover:bg-[#0f2a36] transition">
          <Wind size={18} />
          Air Quality
        </div>

        <div className="flex items-center gap-3 px-4 py-3 rounded-xl text-gray-400 hover:bg-[#0f2a36] transition">
          <Bell size={18} />
          Alerts
        </div>

        <div className="flex items-center gap-3 px-4 py-3 rounded-xl text-gray-400 hover:bg-[#0f2a36] transition">
          <BarChart3 size={18} />
          Analytics
        </div>

      </div>
    </div>
  );
}