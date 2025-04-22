import React from "react";
import { LineChart, BarChart3, PieChart } from "lucide-react";
import ChartCard from "./ChartCard";
import { useAnalytics } from "@/api/hooks";

const UsersTab = () => {
  const {
    userGrowthData,
    userEngagementData,
    userDemographicsData,
    isLoading,
  } = useAnalytics();
  return (
    <div className="space-y-6">
      <div className="grid gap-6 md:grid-cols-2">
        <ChartCard
          title="User Growth"
          icon={LineChart}
          description="User growth over time would appear here"
          isLoading={isLoading}
          data={userGrowthData}
        />
        <ChartCard
          title="User Engagement"
          icon={BarChart3}
          description="User engagement metrics would appear here"
          isLoading={isLoading}
          data={userEngagementData}
        />
      </div>

      <ChartCard
        title="User Demographics"
        icon={PieChart}
        description="User demographics distribution would appear here"
        isLoading={isLoading}
        data={userDemographicsData}
      />
    </div>
  );
};

export default UsersTab;
