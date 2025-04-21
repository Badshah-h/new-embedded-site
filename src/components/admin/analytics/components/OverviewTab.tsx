import React from "react";
import { LineChart, BarChart3, PieChart } from "lucide-react";
import StatCard from "./StatCard";
import ChartCard from "./ChartCard";

const OverviewTab = () => {
  const stats = [
    {
      title: "Total Conversations",
      value: "8,642",
      change: "+12.5%",
      positive: true,
      progress: 78,
    },
    {
      title: "Active Users",
      value: "2,845",
      change: "+8.2%",
      positive: true,
      progress: 65,
    },
    {
      title: "Avg. Response Time",
      value: "1.2s",
      change: "-0.3s",
      positive: true,
      progress: 92,
    },
    {
      title: "User Satisfaction",
      value: "4.7/5",
      change: "+0.2",
      positive: true,
      progress: 94,
    },
  ];

  return (
    <div className="space-y-6">
      {/* Overview Stats */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        {stats.map((stat, index) => (
          <StatCard key={index} {...stat} />
        ))}
      </div>

      {/* Main Charts */}
      <div className="grid gap-6 md:grid-cols-2">
        <ChartCard
          title="Conversation Volume"
          icon={LineChart}
          description="Conversation volume chart would appear here"
        />
        <ChartCard
          title="User Growth"
          icon={BarChart3}
          description="User growth chart would appear here"
        />
      </div>

      {/* Additional Charts */}
      <div className="grid gap-6 md:grid-cols-3">
        <ChartCard
          title="Conversation Duration"
          icon={BarChart3}
          height={200}
          description="Duration distribution chart"
        />
        <ChartCard
          title="User Satisfaction"
          icon={PieChart}
          height={200}
          description="Satisfaction rating distribution"
        />
        <ChartCard
          title="AI Model Usage"
          icon={PieChart}
          height={200}
          description="AI model distribution chart"
        />
      </div>
    </div>
  );
};

export default OverviewTab;
