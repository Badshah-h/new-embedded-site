import React from "react";
import { LineChart, BarChart3, PieChart } from "lucide-react";
import StatCard from "./StatCard";
import ChartCard from "./ChartCard";
import { useAnalytics } from "@/api/hooks";

const OverviewTab = () => {
  const {
    overviewStats,
    conversationVolumeData,
    userGrowthData,
    conversationDurationData,
    userSatisfactionData,
    aiModelUsageData,
    isLoading,
  } = useAnalytics();

  return (
    <div className="space-y-6">
      {/* Overview Stats */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        {overviewStats.map((stat, index) => (
          <StatCard key={index} {...stat} />
        ))}
      </div>

      {/* Main Charts */}
      <div className="grid gap-6 md:grid-cols-2">
        <ChartCard
          title="Conversation Volume"
          icon={LineChart}
          description="Conversation volume chart would appear here"
          isLoading={isLoading}
          data={conversationVolumeData}
        />
        <ChartCard
          title="User Growth"
          icon={BarChart3}
          description="User growth chart would appear here"
          isLoading={isLoading}
          data={userGrowthData}
        />
      </div>

      {/* Additional Charts */}
      <div className="grid gap-6 md:grid-cols-3">
        <ChartCard
          title="Conversation Duration"
          icon={BarChart3}
          height={200}
          description="Duration distribution chart"
          isLoading={isLoading}
          data={conversationDurationData}
        />
        <ChartCard
          title="User Satisfaction"
          icon={PieChart}
          height={200}
          description="Satisfaction rating distribution"
          isLoading={isLoading}
          data={userSatisfactionData}
        />
        <ChartCard
          title="AI Model Usage"
          icon={PieChart}
          height={200}
          description="AI model distribution chart"
          isLoading={isLoading}
          data={aiModelUsageData}
        />
      </div>
    </div>
  );
};

export default OverviewTab;
