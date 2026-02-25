export default function KPISection() {
  return (
    <div className="grid grid-cols-4 gap-6">

      <Card title="City Health" value="87%" color="text-cyan-400" />
      <Card title="Avg Congestion" value="62%" color="text-red-400" />
      <Card title="Waste Efficiency" value="91%" color="text-green-400" />
      <Card title="Air Quality" value="Moderate" color="text-yellow-400" />

    </div>
  );
}

function Card({ title, value, color }) {
  return (
    <div className="bg-[#0B1B33] border border-[#1f2a44]/60 rounded-2xl p-6">
      <p className="text-gray-400 text-sm mb-2">{title}</p>
      <p className={`text-xl font-semibold ${color}`}>
        {value}
      </p>
    </div>
  );
}