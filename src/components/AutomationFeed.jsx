"use client";

import { useEffect, useState } from "react";
import { createClient } from "@supabase/supabase-js";

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
);

export default function AutomationFeed() {
  const [logs, setLogs] = useState([]);

  useEffect(() => {
    fetchLogs();
  }, []);

  async function fetchLogs() {
    const { data, error } = await supabase
      .from("automation_logs")
      .select("*")
      .order("created_at", { ascending: false })
      .limit(10);

    if (!error) {
      setLogs(data);
    }
  }

  return (
    <div className="bg-[#0B1B33] border border-[#1f2a44]/60 rounded-2xl p-8 flex flex-col">

      <h3 className="text-cyan-400 font-semibold mb-6">
        Automation Feed
      </h3>

      <div className="space-y-4 flex-1 overflow-y-auto">

        {logs.map((log) => (
          <FeedItem
            key={log.id}
            text={`${log.event} - ${log.bin_id}`}
            time={formatTime(log.created_at)}
          />
        ))}

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

function formatTime(timestamp) {
  const diff = Math.floor(
    (new Date() - new Date(timestamp)) / 60000
  );

  if (diff < 1) return "Just now";
  if (diff < 60) return `${diff} min ago`;

  const hours = Math.floor(diff / 60);
  if (hours < 24) return `${hours} hr ago`;

  const days = Math.floor(hours / 24);
  return `${days} day ago`;
}