import WasteCard from "./WasteCard";

export default function WasteSection() {
  return (
    <div className="bg-[#0B1B33] border border-[#1f2a44]/60 rounded-2xl p-8 min-h-[520px]">

      <div className="flex justify-between items-center mb-8">
        <h2 className="text-xl font-semibold">Waste Monitoring</h2>

        <span className="bg-red-500/10 text-red-400 px-3 py-1 rounded-full text-sm font-medium">
          2 Alerts
        </span>
      </div>

      <div className="grid grid-cols-2 gap-6">
        <WasteCard bin="BIN-001" level={45} />
        <WasteCard bin="BIN-002" level={78} />
        <WasteCard bin="BIN-003" level={92} />
        <WasteCard bin="BIN-004" level={65} />
        <WasteCard bin="BIN-005" level={88} />
        <WasteCard bin="BIN-006" level={34} />
      </div>

    </div>
  );
}