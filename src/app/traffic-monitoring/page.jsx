import Sidebar from "@/components/Sidebar";
import TopHeader from "@/components/TopHeader";
import MapCard from "@/components/MapCard";
import CongestionCard from "@/components/CongestionCard";

export default function TrafficMonitoring() {
  return (
    <div className="h-screen bg-[#061226] text-white flex flex-col">

      <TopHeader />

      <div className="flex flex-1 overflow-hidden">
        <Sidebar />

        <div className="flex-1 overflow-y-auto p-8">

          <div className="flex justify-between items-center mb-12">
            <div>
              <h1 className="text-2xl font-semibold">Traffic Monitoring</h1>
              <p className="text-gray-400 text-sm">
                Real-time city traffic analytics
              </p>
            </div>

            <div className="bg-green-500/10 text-green-400 px-4 py-2 rounded-full text-sm">
              ● Live
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-[2.2fr_1fr] gap-6">
            <MapCard />
            <CongestionCard />
          </div>

        </div>
      </div>
    </div>
  );
}