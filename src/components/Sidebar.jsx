"use client";
import { LayoutDashboard, Car, Trash2, Wind, Bell, BarChart3 } from "lucide-react";
import Link from "next/link";

export default function Sidebar() {
  return (
    <div className="hidden lg:flex w-64 min-h-screen bg-[#071a2d] border-r border-[#1f2a44] flex-col">

 

      {/* MENU */}
      <div className="flex flex-col px-4 gap-2 mt-4">

        {/* Active */}
       <Link href="/"> <div className="flex items-center gap-3 px-4 py-3 rounded-xl bg-[#0f2a36] border border-cyan-500/30 text-cyan-400">
          <LayoutDashboard size={18} />
          <span className="font-medium">Dashboard</span>
        </div></Link>

        {/* Normal Items */}
        <Link href="/traffic-monitoring">
  <div className="flex items-center gap-3 px-4 py-3 rounded-xl hover:bg-[#0f2a36] cursor-pointer">
    Traffic Monitoring
  </div>
</Link>

       <Link href="/waste-management">
  <div className="flex items-center gap-3 px-4 py-3 rounded-xl hover:bg-[#0f2a36] cursor-pointer">
    Waste Management
  </div>
</Link>

       <Link href="/air-quality">
  <div className="flex items-center gap-3 px-4 py-3 rounded-xl hover:bg-[#0f2a36] cursor-pointer">
    Air Quality
  </div>
</Link>

        <Link href="/alerts"><div className="flex items-center gap-3 px-4 py-3 rounded-xl hover:bg-[#0f2a36] cursor-pointer">
          <Bell size={18} />
          Alerts
        </div>
        </Link>

       <Link href="/analytics"> <div className="flex items-center gap-3 px-4 py-3 rounded-xl hover:bg-[#0f2a36] cursor-pointer">
          <BarChart3 size={18} />
          Analytics
        </div>
        </Link>
      </div>
    </div>
  );
}