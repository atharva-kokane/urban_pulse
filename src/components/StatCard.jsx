export default function StatCard({ title, value, change, icon, color }) {
  return (
    <div className="bg-[#0B1B33] border border-[#1f2a44] rounded-2xl p-6 relative">

      {/* Percentage */}
      <div className={`absolute top-4 right-6 text-sm font-medium ${change.includes('-') ? 'text-red-400' : 'text-green-400'}`}>
        {change}
      </div>

      {/* ICON */}
      <div className={`w-14 h-14 rounded-2xl bg-gradient-to-br ${color} flex items-center justify-center shadow-lg mb-5`}>
        <div className="text-white">
          {icon}
        </div>
      </div>

      {/* TEXT */}
      <p className="text-gray-400 text-sm">{title}</p>
      <h2 className="text-4xl font-bold mt-2">{value}</h2>
    </div>
  );
}