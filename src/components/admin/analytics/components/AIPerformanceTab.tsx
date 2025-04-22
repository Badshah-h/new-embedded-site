import React from "react";
import { LineChart, BarChart3 } from "lucide-react";
import ChartCard from "./ChartCard";
import { useAnalytics } from "@/api/hooks";

const AIPerformanceTab = () => {
  const { aiPerformanceData, modelComparisonData, isLoading } = useAnalytics();
  return (
    <div className="space-y-6">
      <div className="grid gap-6 md:grid-cols-2">
        <ChartCard
          title="AI Response Time"
          icon={LineChart}
          description="AI response time trends would appear here"
          isLoading={isLoading}
          data={aiPerformanceData?.responseTime}
        />
        <ChartCard
          title="AI Accuracy"
          icon={BarChart3}
          description="AI accuracy metrics would appear here"
          isLoading={isLoading}
          data={aiPerformanceData?.accuracy}
        />
      </div>

      <ChartCard
        title="AI Model Comparison"
        icon={BarChart3}
        description="Performance comparison between AI models would appear here"
        isLoading={isLoading}
        data={modelComparisonData}
      />
    </div>
  );
};

export default AIPerformanceTab;
