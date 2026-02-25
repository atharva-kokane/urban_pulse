"use client";

import { useRouter } from "next/navigation";
import { useEffect } from "react";

import Sidebar from "@/components/Sidebar";
import TopHeader from "@/components/TopHeader";
import StatsRow from "@/components/StatsRow";
import TrafficSection from "@/components/TrafficSection";
import AQIGauge from "@/components/AQIGauge";
import WasteSection from "@/components/WasteSection";
import AlertsPanel from "@/components/AlertsPanel";
import AIAnalysis from "@/components/AIAnalysis";
import AutomationFeed from "@/components/AutomationFeed";

export default function Dashboard() {
  const router = useRouter();

  // 🔐 Protect Dashboard
  useEffect(() => {
    const isAdmin = localStorage.getItem("adminAuth");
    if (!isAdmin) {
      router.push("/login");
    }
  }, []);

  return (
    <div className="h-screen bg-[#061226] text-white flex flex-col">

      <TopHeader />

      <div className="flex flex-1 overflow-hidden">

        <Sidebar />

        <div className="flex-1 overflow-y-auto p-8 space-y-8">

          <StatsRow />

          {/* Traffic + AQI */}
          <div className="grid grid-cols-[72%_28%] gap-6">
            <TrafficSection />
            <AQIGauge value={78} />
          </div>

          {/* Waste + Alerts */}
          <div className="grid grid-cols-[72%_28%] gap-6">
            <WasteSection />
            <AlertsPanel />
          </div>

          {/* AI + Automation */}
          <div className="grid grid-cols-2 gap-6">
            <AIAnalysis />
            <AutomationFeed />
          </div>

        </div>
      </div>
    </div>
  );
}