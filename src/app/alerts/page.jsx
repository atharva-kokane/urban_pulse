import Sidebar from "@/components/Sidebar";
import TopHeader from "@/components/TopHeader";
import AlertsPanel from "@/components/alerts/AlertsPanel";
import AlertsSummary from "@/components/alerts/AlertsSummary";

export default function AlertsPage() {
  return (
    <div className="h-screen bg-[#061226] text-white flex flex-col">

      <TopHeader />

      <div className="flex flex-1 overflow-hidden">
        <Sidebar />

        <div className="flex-1 overflow-y-auto p-8 space-y-8">

          {/* Header */}
          <div className="flex justify-between items-center">
            <div>
              <h1 className="text-2xl font-semibold">
                Alerts & Incidents
              </h1>
              <p className="text-gray-400 text-sm">
                Real-time system monitoring
              </p>
            </div>

            <div className="flex items-center gap-2 text-red-400">
              <span className="w-2 h-2 bg-red-500 rounded-full animate-pulse"></span>
              Live Monitoring
            </div>
          </div>

          <AlertsSummary />

          <AlertsPanel />

        </div>
      </div>
    </div>
  );
}