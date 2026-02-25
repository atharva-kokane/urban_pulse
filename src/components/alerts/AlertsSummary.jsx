export default function AlertsSummary() {
  return (
    <div className="grid grid-cols-4 gap-6">
      <Stat title="Total Alerts" value="18" />
      <Stat title="Critical" value="5" color="text-red-400" />
      <Stat title="Warnings" value="7" color="text-yellow-400" />
      <Stat title="Resolved" value="6" color="text-green-400" />
    </div>
  );
}

function Stat({ title, value, color }) {
  return (
    <div className="bg-[#0B1B33] border border-[#1f2a44]/60 rounded-2xl p-6">
      <p className="text-gray-400 text-sm mb-2">{title}</p>
      <p className={`text-xl font-semibold ${color || ""}`}>
        {value}
      </p>
    </div>
  );
}