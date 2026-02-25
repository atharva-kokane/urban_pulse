export default function WasteAnalytics() {
  return (
    <div className="bg-[#0B1B33] border border-[#1f2a44]/60 rounded-2xl p-8">

      <h3 className="text-lg font-semibold mb-6">
        Collection Analytics
      </h3>

      <div className="grid grid-cols-4 gap-6">

        <Stat title="Total Waste Today" value="12.4 Tons" />
        <Stat title="Active Trucks" value="18" />
        <Stat title="Collections Completed" value="142" />
        <Stat title="Critical Bins" value="3" />

      </div>

    </div>
  );
}

function Stat({ title, value }) {
  return (
    <div className="bg-[#0e1f35] p-6 rounded-xl border border-[#1f2a44]/40">
      <p className="text-gray-400 text-sm mb-2">{title}</p>
      <p className="text-xl font-semibold">{value}</p>
    </div>
  );
}