"use client";

export default function CongestionZones({ zones = [] }) {

  const getStatusColor = (level) => {
    if (level >= 80) return "bg-red-500/10 text-red-400";
    if (level >= 40) return "bg-yellow-500/10 text-yellow-400";
    return "bg-green-500/10 text-green-400";
  };

  const getStatus = (level) => {
    if (level >= 80) return "High";
    if (level >= 40) return "Medium";
    return "Low";
  };

  const getBarColor = (level) => {
    if (level >= 80) return "bg-red-500";
    if (level >= 40) return "bg-yellow-400";
    return "bg-green-500";
  };

  return (

    <div className="bg-[#0B1C36] rounded-xl p-6">

      {/* Header */}
      <div className="flex justify-between items-center mb-4">

        <h2 className="text-white font-semibold text-lg">
          Congestion Zones
        </h2>

       
      </div>

      {/* Zones */}
      <div className="space-y-5 max-h-[300px] overflow-y-auto">

        {zones.map(zone => (

          <div key={zone.id}>

            <div className="flex justify-between items-center mb-1">

              <span className="text-white">
                {zone.zone_name}
              </span>

              <span className={`text-xs px-2 py-1 rounded-full ${getStatusColor(zone.congestion_level)}`}>
                {getStatus(zone.congestion_level)}
              </span>

            </div>

            <div className="text-xs text-gray-400 mb-1">
              Congestion Level
            </div>

            <div className="w-full bg-gray-700 h-2 rounded">

              <div
                className={`${getBarColor(zone.congestion_level)} h-2 rounded`}
                style={{
                  width: `${zone.congestion_level}%`
                }}
              />

            </div>

          </div>

        ))}

      </div>

    </div>

  );

}