import React from "react";
import { LineChart, BarChart3 } from "lucide-react";
import ChartCard from "./ChartCard";

const AIPerformanceTab = () => {
  return (
    <div className="space-y-6">
      <div className="grid gap-6 md:grid-cols-2">
        <ChartCard
          title="AI Response Time"
          icon={LineChart}
          description="AI response time trends would appear here"
        />
        <ChartCard
          title="AI Accuracy"
          icon={BarChart3}
          description="AI accuracy metrics would appear here"
        />
      </div>

      <ChartCard
        title="AI Model Comparison"
        icon={BarChart3}
        description="Performance comparison between AI models would appear here"
      />
    </div>
  );
};

export default AIPerformanceTab;
