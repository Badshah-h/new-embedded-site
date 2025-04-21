import { useState, useEffect, useCallback } from "react";
import { analyticsAPI } from "@/api";

// Custom hook for analytics data
export const useAnalytics = () => {
  const [overviewStats, setOverviewStats] = useState<any[]>([]);
  const [userGrowthData, setUserGrowthData] = useState<any[]>([]);
  const [userEngagementData, setUserEngagementData] = useState<any[]>([]);
  const [userDemographicsData, setUserDemographicsData] = useState<any[]>([]);
  const [conversationMetricsData, setConversationMetricsData] = useState<any[]>(
    [],
  );
  const [conversationDurationData, setConversationDurationData] = useState<
    any[]
  >([]);
  const [satisfactionData, setSatisfactionData] = useState<any[]>([]);
  const [aiPerformanceData, setAiPerformanceData] = useState<any[]>([]);
  const [modelComparisonData, setModelComparisonData] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);
  const [summary, setSummary] = useState<any>(null);

  // Load all analytics data
  const loadAnalyticsData = useCallback(async () => {
    setIsLoading(true);
    setError(null);
    try {
      // Load all data in parallel
      const [
        stats,
        userGrowth,
        userEngagement,
        userDemographics,
        conversationMetrics,
        conversationDuration,
        satisfaction,
        aiPerformance,
        modelComparison,
        analyticsSummary,
      ] = await Promise.all([
        analyticsAPI.getAnalyticsOverviewStats(),
        analyticsAPI.getUserGrowthData(),
        analyticsAPI.getUserEngagementData(),
        analyticsAPI.getUserDemographicsData(),
        analyticsAPI.getConversationMetricsData(),
        analyticsAPI.getConversationDurationData(),
        analyticsAPI.getSatisfactionDistributionData(),
        analyticsAPI.getAIPerformanceData(),
        analyticsAPI.getModelComparisonData(),
        analyticsAPI.getAnalyticsSummary(),
      ]);

      setOverviewStats(stats);
      setUserGrowthData(userGrowth);
      setUserEngagementData(userEngagement);
      setUserDemographicsData(userDemographics);
      setConversationMetricsData(conversationMetrics);
      setConversationDurationData(conversationDuration);
      setSatisfactionData(satisfaction);
      setAiPerformanceData(aiPerformance);
      setModelComparisonData(modelComparison);
      setSummary(analyticsSummary);
    } catch (err) {
      setError(
        err instanceof Error ? err : new Error("Failed to load analytics data"),
      );
    } finally {
      setIsLoading(false);
    }
  }, []);

  // Get data for a specific period
  const getDataForPeriod = useCallback(
    async (
      dataType: "userGrowth" | "conversationMetrics" | "aiPerformance",
      period: "month" | "quarter" | "year",
    ) => {
      try {
        let data;
        switch (dataType) {
          case "userGrowth":
            data = await analyticsAPI.getUserGrowthData(period);
            setUserGrowthData(data);
            break;
          case "conversationMetrics":
            data = await analyticsAPI.getConversationMetricsData(period);
            setConversationMetricsData(data);
            break;
          case "aiPerformance":
            data = await analyticsAPI.getAIPerformanceData(period);
            setAiPerformanceData(data);
            break;
        }
      } catch (err) {
        setError(
          err instanceof Error
            ? err
            : new Error(`Failed to get ${dataType} data for period ${period}`),
        );
      }
    },
    [],
  );

  // Refresh analytics data
  const refreshData = useCallback(async () => {
    await loadAnalyticsData();
  }, [loadAnalyticsData]);

  // Load data on initial render
  useEffect(() => {
    loadAnalyticsData();
  }, [loadAnalyticsData]);

  return {
    overviewStats,
    userGrowthData,
    userEngagementData,
    userDemographicsData,
    conversationMetricsData,
    conversationDurationData,
    satisfactionData,
    aiPerformanceData,
    modelComparisonData,
    isLoading,
    error,
    summary,
    refreshData,
    getDataForPeriod,
  };
};
