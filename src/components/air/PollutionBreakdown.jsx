"use client";

const data = {
  Downtown: { pm25: 42, pm10: 28, o3: 65, no2: 38 },
  "Industrial Area": { pm25: 78, pm10: 55, o3: 88, no2: 61 },
  "Residential North": { pm25: 30, pm10: 20, o3: 40, no2: 25 },
  "Tech Park": { pm25: 50, pm10: 35, o3: 60, no2: 45 },
};

const areas = [
  "Downtown",
  "Industrial Area",
  "Residential North",
  "Tech Park",
];

export default function PollutionBreakdown({
  selectedArea,
  setSelectedArea,
}) {

  const values = data[selectedArea];

  return (
    <div className="bg-[#0B1B33] border border-[#1f2a44]/60 rounded-2xl p-8">

      {/* Title */}
      <h3 className="text-xl font-semibold mb-6">
        Pollution Breakdown
      </h3>

      {/* AREA SELECTOR (shifted here) */}
      <div className="flex gap-4 mb-6 flex-wrap">

        {areas.map(area => (

          <button
            key={area}
            onClick={() => setSelectedArea(area)}
            className={`
              px-5 py-2 rounded-lg text-sm transition

              ${
                selectedArea === area
                  ? "bg-cyan-600 text-white"
                  : "bg-[#0e1f35] text-gray-300 hover:bg-[#12304d]"
              }
            `}
          >
            {area}
          </button>

        ))}

      </div>

      {/* Selected Area Title */}
      <p className="text-cyan-400 mb-4 font-semibold">
        {selectedArea}
      </p>

      {/* Bars */}
      <Bar label="PM2.5" value={values.pm25} />
      <Bar label="PM10" value={values.pm10} />
      <Bar label="O₃" value={values.o3} />
      <Bar label="NO₂" value={values.no2} />

    </div>
  );
}


function getColor(value) {

  if (value <= 50)
    return {
      bar: "bg-green-500",
      text: "text-green-400",
      label: "Good",
    };

  if (value <= 100)
    return {
      bar: "bg-yellow-400",
      text: "text-yellow-400",
      label: "Moderate",
    };

  if (value <= 150)
    return {
      bar: "bg-orange-500",
      text: "text-orange-400",
      label: "Poor",
    };

  return {
    bar: "bg-red-500",
    text: "text-red-400",
    label: "Unhealthy",
  };
}


function Bar({ label, value }) {

  const color = getColor(value);

  return (
    <div className="mb-6">

      {/* Label Row */}
      <div className="flex justify-between items-center mb-2">

        <span className="text-gray-300">
          {label}
        </span>

        <div className="flex items-center gap-3">

          <span className={`text-sm font-semibold ${color.text}`}>
            {color.label}
          </span>

          <span className="text-white font-semibold">
            {value}
          </span>

        </div>

      </div>

      {/* Progress bar */}
      <div className="w-full h-2 bg-[#1e2a44] rounded-full overflow-hidden">

        <div
          className={`h-2 rounded-full transition-all duration-500 ${color.bar}`}
          style={{ width: `${value}%` }}
        />

      </div>

    </div>
  );
}