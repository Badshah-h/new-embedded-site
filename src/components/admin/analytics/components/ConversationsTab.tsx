import React from "react";
import { LineChart, BarChart3, PieChart } from "lucide-react";
import ChartCard from "./ChartCard";

const ConversationsTab = () => {
  const { conversationMetricsData, conversationDurationData, isLoading } =
    useAnalytics();
  return (
    <div className="space-y-6">
      <div className="grid gap-6 md:grid-cols-2">
        <ChartCard
          title="Conversation Metrics"
          icon={LineChart}
          description="Conversation metrics chart would appear here"
        />
        <ChartCard
          title="Conversation Duration"
          icon={BarChart3}
          description="Conversation duration chart would appear here"
        />
      </div>

      <ChartCard
        title="Conversation Topics"
        icon={PieChart}
        description="Conversation topics distribution would appear here"
      />
    </div>
  );
};

export default ConversationsTab;
