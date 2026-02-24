export default function AlertsPanel() {
  return (
    <div className="bg-[#0B1B33] border border-[#1f2a44]/60 rounded-2xl p-8 h-[520px] flex flex-col">

      {/* Header */}
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-xl font-semibold">Recent Alerts</h2>
        <span className="text-cyan-400 text-sm cursor-pointer">
          View All
        </span>
      </div>

      {/* Scroll Area */}
      <div className="flex-1 overflow-y-auto pr-2 space-y-5 custom-scroll">

        {/* Alert Card */}
        <div className="border border-red-500/40 bg-red-900/20 rounded-xl p-5">
          <p className="font-medium mb-2">
            Smart Bin BIN-003 requires immediate collection
          </p>
          <div className="flex items-center gap-4 text-sm text-gray-400">
            <span>2 minutes ago</span>
            <span className="bg-red-500/20 text-red-400 px-3 py-1 rounded-full text-xs">
              Critical
            </span>
          </div>
        </div>

        <div className="border border-red-500/40 bg-red-900/20 rounded-xl p-5">
          <p className="font-medium mb-2">
            High traffic congestion detected in Downtown area
          </p>
          <div className="flex items-center gap-4 text-sm text-gray-400">
            <span>15 minutes ago</span>
            <span className="bg-red-500/20 text-red-400 px-3 py-1 rounded-full text-xs">
              Critical
            </span>
          </div>
        </div>

        <div className="border border-teal-500/40 bg-teal-900/20 rounded-xl p-5">
          <p className="font-medium mb-2">
            Air quality improved in Industrial Area
          </p>
          <div className="flex items-center gap-4 text-sm text-gray-400">
            <span>1 hour ago</span>
            <span className="bg-teal-500/20 text-teal-400 px-3 py-1 rounded-full text-xs">
              Resolved
            </span>
          </div>
        </div>

        <div className="border border-red-500/40 bg-red-900/20 rounded-xl p-5">
          <p className="font-medium mb-2">
            Smart Bin BIN-005 at 88% capacity
          </p>
          <div className="flex items-center gap-4 text-sm text-gray-400">
            <span>2 hours ago</span>
            <span className="bg-red-500/20 text-red-400 px-3 py-1 rounded-full text-xs">
              Critical
            </span>
          </div>
        </div>

        <div className="border border-teal-500/40 bg-teal-900/20 rounded-xl p-5">
          <p className="font-medium mb-2">
            Traffic flow normalized in Tech Park zone
          </p>
          <div className="flex items-center gap-4 text-sm text-gray-400">
            <span>3 hours ago</span>
            <span className="bg-teal-500/20 text-teal-400 px-3 py-1 rounded-full text-xs">
              Resolved
            </span>
          </div>
        </div>

      </div>
    </div>
  );
}