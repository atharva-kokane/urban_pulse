"use client";

export default function WasteAnalytics({ bins }) {
  
  // Total Waste Today (convert fill level sum to tons)
  const totalWasteKg = bins?.reduce(
    (sum, bin) => sum + (bin.fill_level || 0),
    0
  );

  const totalWasteTons = (totalWasteKg / 1000).toFixed(2);

  // Active Trucks (static for now)
  const activeTrucks = 3;

  // Collections Completed (bins with low fill level)
  const collectionsCompleted = bins?.filter(
    (bin) => bin.fill_level <= 10
  ).length;

  // Critical Bins (fill level ≥ 80)
  const criticalBins = bins?.filter(
    (bin) => bin.fill_level >= 80
  ).length;

  return (
    <div>
      <h2 className="text-lg font-semibold mb-4 text-white">
        Collection Analytics
      </h2>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">

        {/* Total Waste */}
        <div className="bg-[#0B1C36] p-6 rounded-xl">
          <p className="text-gray-400 text-sm">
            Total Waste Today
          </p>
          <h3 className="text-2xl font-bold mt-2">
            {totalWasteTons} Tons
          </h3>
        </div>

        {/* Active Trucks */}
        <div className="bg-[#0B1C36] p-6 rounded-xl">
          <p className="text-gray-400 text-sm">
            Active Trucks
          </p>
          <h3 className="text-2xl font-bold mt-2">
            {activeTrucks}
          </h3>
        </div>

        {/* Collections Completed */}
        <div className="bg-[#0B1C36] p-6 rounded-xl">
          <p className="text-gray-400 text-sm">
            Collections Completed
          </p>
          <h3 className="text-2xl font-bold mt-2">
            {collectionsCompleted}
          </h3>
        </div>

        {/* Critical Bins */}
        <div className="bg-[#0B1C36] p-6 rounded-xl">
          <p className="text-gray-400 text-sm">
            Critical Bins
          </p>
          <h3 className="text-2xl font-bold mt-2 text-red-400">
            {criticalBins}
          </h3>
        </div>

      </div>
    </div>
  );
}