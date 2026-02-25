export default function AutomationFeed() {
  return (
    <div className="bg-[#0B1B33] border border-[#1f2a44]/60 rounded-2xl p-8 flex flex-col">

      <h3 className="text-cyan-400 font-semibold mb-6">
        Automation Feed
      </h3>

      <div className="space-y-4 flex-1 overflow-y-auto">

        <FeedItem text="Alert sent to collection unit #3" time="2 min ago" />
        <FeedItem text="BIN-003 overflow prediction triggered" time="5 min ago" />
        <FeedItem text="AI analysis completed - Risk MODERATE" time="8 min ago" />
        <FeedItem text="Route optimization calculated" time="12 min ago" />
        <FeedItem text="Data sync with IoT sensors completed" time="15 min ago" />

      </div>

      <div className="text-center text-xs text-gray-500 mt-6">
        ⚡ Powered by n8n Workflows
      </div>

    </div>
  );
}

function FeedItem({ text, time }) {
  return (
    <div className="bg-[#0e1f35] p-4 rounded-xl border border-[#1f2a44]/40">
      <p className="text-sm">{text}</p>
      <p className="text-xs text-gray-400 mt-1">{time}</p>
    </div>
  );
}