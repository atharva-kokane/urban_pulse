import Sidebar from "@/components/Sidebar";
import TopHeader from "@/components/TopHeader";
import StatsRow from "@/components/StatsRow";
import TrafficSection from "@/components/TrafficSection";
import AQIGauge from "@/components/AQIGauge";
import WasteSection from "@/components/WasteSection";
import AlertsPanel from "@/components/AlertsPanel";

export default function Dashboard() {
  return (
    <div className="h-screen bg-[#061226] text-white flex flex-col">

      {/* FIXED HEADER */}
      <TopHeader />

      {/* BELOW HEADER AREA */}
      <div className="flex flex-1 overflow-hidden">

        {/* FIXED SIDEBAR */}
        <Sidebar />

        {/* SCROLLABLE MAIN CONTENT */}
        <div className="flex-1 overflow-y-auto p-8 space-y-8">

          <StatsRow />

          <div className="grid gap-6 grid-cols-[2fr_1fr] items-stretch">
  <TrafficSection />
  <AQIGauge value={78} />
</div>

          <div className="grid gap-6 grid-cols-[2fr_1fr]">
            <WasteSection />
            <AlertsPanel />
          </div>

        </div>
      </div>
    </div>
  );
}