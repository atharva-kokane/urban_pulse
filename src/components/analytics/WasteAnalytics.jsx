export default function WasteAnalytics() {
  return (
    <div className="bg-[#0B1B33] border border-[#1f2a44]/60 rounded-2xl p-8 h-[300px]">
      <h3 className="mb-6 font-semibold">Waste Collection Efficiency</h3>

      <div className="space-y-6">
        <Progress label="Collected" percent={85} color="bg-green-500" />
        <Progress label="Pending" percent={15} color="bg-red-500" />
      </div>
    </div>
  );
}

function Progress({ label, percent, color }) {
  return (
    <div>
      <div className="flex justify-between mb-2 text-sm">
        <span>{label}</span>
        <span>{percent}%</span>
      </div>

      <div className="h-2 bg-[#1e2a44] rounded-full">
        <div className={`h-2 rounded-full ${color}`} style={{ width: `${percent}%` }} />
      </div>
    </div>
  );
}