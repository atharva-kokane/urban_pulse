export default function WasteCard({ bin, level }) {

  let color = "#10b981"; // green

  if (level > 85) color = "#ef4444";      // red
  else if (level > 60) color = "#f59e0b"; // yellow

  return (
    <div className="bg-[#0f213a] border border-[#1f2a44]/40 rounded-xl p-5">
      
      <div className="flex justify-between items-start mb-2">
        <div>
          <h3 className="font-semibold">{bin}</h3>
          <p className="text-sm text-gray-400">Main Location</p>
        </div>

        <span className="font-semibold">{level}%</span>
      </div>

      <p className="text-sm text-gray-400 mb-2">Fill Level</p>

      <div className="w-full h-2 bg-[#1e2a44] rounded-full overflow-hidden">
        <div
          className="h-2 rounded-full"
          style={{ width: `${level}%`, backgroundColor: color }}
        />
      </div>

    </div>
  );
}