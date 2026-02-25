export default function AreaComparison() {
  const areas = [
    { name: "Downtown", aqi: 82 },
    { name: "Industrial Zone", aqi: 96 },
    { name: "Residential Area", aqi: 65 },
    { name: "Tech Park", aqi: 71 },
  ];

  return (
    <div className="bg-[#0B1B33] border border-[#1f2a44]/60 rounded-2xl p-8">

      <h3 className="text-lg font-semibold mb-6">
        Area Comparison
      </h3>

      <div className="grid grid-cols-4 gap-6">
        {areas.map((area, index) => (
          <div
            key={index}
            className="bg-[#0e1f35] p-6 rounded-xl border border-[#1f2a44]/40 text-center"
          >
            <p className="text-gray-400 text-sm mb-2">{area.name}</p>
            <p className="text-xl font-semibold">{area.aqi}</p>
          </div>
        ))}
      </div>

    </div>
  );
}