import Sidebar from "@/components/Sidebar";
import TopHeader from "@/components/TopHeader";
import KPISection from "@/components/analytics/KPISection";
import TrafficAnalytics from "@/components/analytics/TrafficAnalytics";
import AQIAnalytics from "@/components/analytics/AQIAnalytics";
import WasteAnalytics from "@/components/analytics/WasteAnalytics";
import AlertsAnalytics from "@/components/analytics/AlertsAnalytics";

export default function AnalyticsPage() {
  return (
    <div className="h-screen bg-[#061226] text-white flex flex-col">

      <TopHeader />

      <div className="flex flex-1 overflow-hidden">
        <Sidebar />

        <div className="flex-1 overflow-y-auto p-8 space-y-8">

          {/* Header */}
          <div>
            <h1 className="text-2xl font-semibold">City Analytics</h1>
            <p className="text-gray-400 text-sm">
              Data insights and performance overview
            </p>
          </div>

          <KPISection />

          <div className="grid grid-cols-2 gap-8">
            <TrafficAnalytics />
            <AQIAnalytics />
          </div>

          <div className="grid grid-cols-2 gap-8">
            <WasteAnalytics />
            <AlertsAnalytics />
          </div>

        </div>
      </div>
    </div>
  );
}