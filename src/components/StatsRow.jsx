import StatCard from "./StatCard";
import { Trash2, Car, Wind, HeartPulse } from "lucide-react";

export default function StatsRow() {
  return (
    <div className="grid grid-cols-4 gap-6">
      <StatCard
        title="Total Smart Bins"
        value="248"
        change="+12%"
        icon={<Trash2 size={22} />}
        color="from-cyan-500 to-blue-600"
      />

      <StatCard
        title="Active Traffic Zones"
        value="42"
        change="+5%"
        icon={<Car size={22} />}
        color="from-green-500 to-emerald-600"
      />

      <StatCard
        title="Average AQI Level"
        value="78"
        change="-8%"
        icon={<Wind size={22} />}
        color="from-orange-500 to-yellow-500"
      />

      <StatCard
        title="City Health Score"
        value="87"
        change="+3%"
        icon={<HeartPulse size={22} />}
        color="from-pink-500 to-purple-600"
      />
    </div>
  );
}