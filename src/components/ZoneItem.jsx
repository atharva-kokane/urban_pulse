"use client";

export default function ZoneItem({ name, percent }) {
  let color = "#10b981";
  let status = "Low";

  if (percent > 75) {
    color = "#ef4444";
    status = "High";
  } else if (percent > 50) {
    color = "#f59e0b";
    status = "Medium";
  }

  return (
    <div className="bg-[#0e1f35] p-4 rounded-xl border border-[#1f2a44]/40">

      <div className="flex justify-between items-center mb-3">
        <div className="flex items-center gap-2">
          {status === "High" && (
            <span className="w-2 h-2 bg-red-500 rounded-full animate-pulse" />
          )}
          <span className="font-medium">{name}</span>
        </div>

        <span
          className="text-xs px-3 py-1 rounded-full"
          style={{
            backgroundColor: `${color}20`,
            color: color,
          }}
        >
          {status}
        </span>
      </div>

      <div className="flex justify-between text-sm mb-2 text-gray-400">
        <span>Congestion Level</span>
        <span>{percent}%</span>
      </div>

      <div className="w-full h-2 bg-[#1e2a44] rounded-full">
        <div
          className="h-2 rounded-full transition-all duration-700 ease-in-out"
          style={{ width: `${percent}%`, backgroundColor: color }}
        />
      </div>
    </div>
  );
}