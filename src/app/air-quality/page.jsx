import Sidebar from "@/components/Sidebar";
import TopHeader from "@/components/TopHeader";
import AQIGauge from "@/components/AQIGauge";
import PollutionBreakdown from "@/components/air/PollutionBreakdown";
import AQITrendChart from "@/components/air/AQITrendChart";
import AreaComparison from "@/components/air/AreaComparison";

export default function AirQuality() {
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
                Air Quality Monitoring
              </h1>
              <p className="text-gray-400 text-sm">
                Real-time environmental intelligence
              </p>
            </div>

            <div className="flex items-center gap-2 text-green-400">
              <span className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></span>
              Live
            </div>
          </div>

          {/* Top Grid */}
          <div className="grid grid-cols-[1fr_1.5fr] gap-8">
            <AQIGauge value={78} />
            <PollutionBreakdown />
          </div>

          {/* Trend Chart */}
          <AQITrendChart />

          {/* Area Comparison */}
          <AreaComparison />

        </div>
      </div>
    </div>
  );
}