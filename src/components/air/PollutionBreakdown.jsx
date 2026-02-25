export default function PollutionBreakdown() {
  const pollutants = [
    { name: "PM2.5", value: 42 },
    { name: "PM10", value: 28 },
    { name: "O₃", value: 65 },
    { name: "NO₂", value: 38 },
  ];

  return (
    <div className="bg-[#0B1B33] border border-[#1f2a44]/60 rounded-2xl p-8">

      <h3 className="text-lg font-semibold mb-6">
        Pollution Breakdown
      </h3>

      <div className="space-y-6">
        {pollutants.map((item, index) => (
          <div key={index}>
            <div className="flex justify-between text-sm mb-2">
              <span>{item.name}</span>
              <span>{item.value}</span>
            </div>

            <div className="w-full h-2 bg-[#1e2a44] rounded-full">
              <div
                className="h-2 bg-cyan-400 rounded-full transition-all duration-700"
                style={{ width: `${item.value}%` }}
              />
            </div>
          </div>
        ))}
      </div>

    </div>
  );
}