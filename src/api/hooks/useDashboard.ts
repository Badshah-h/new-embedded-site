import { useState, useEffect, useCallback } from "react";
import { dashboardAPI } from "@/api";
import {
  StatCardData,
  ChartDataPoint,
  ActivityItem,
  QueryItem,
  ModelItem,
} from "@/mock_data/dashboardData";

// Custom hook for dashboard data
export const useDashboard = () => {
  const [stats, setStats] = useState<StatCardData[]>([]);
  const [chartData, setChartData] = useState<{
    conversations: ChartDataPoint[];
    users: ChartDataPoint[];
    performance: ChartDataPoint[];
  }>({ conversations: [], users: [], performance: [] });
  const [activities, setActivities] = useState<ActivityItem[]>([]);
  const [queries, setQueries] = useState<QueryItem[]>([]);
  const [aiModels, setAiModels] = useState<ModelItem[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);
  const [summary, setSummary] = useState<any>(null);

  // Load all dashboard data
  const loadDashboardData = useCallback(async () => {
    setIsLoading(true);
    setError(null);
    try {
      // Load all data in parallel
      const [
        statsData,
        conversationsData,
        usersData,
        performanceData,
        activitiesData,
        queriesData,
        modelsData,
        summaryData,
      ] = await Promise.all([
        dashboardAPI.getDashboardStats(),
        dashboardAPI.getChartData("conversations"),
        dashboardAPI.getChartData("users"),
        dashboardAPI.getChartData("performance"),
        dashboardAPI.getRecentActivities(),
        dashboardAPI.getTopQueries(),
        dashboardAPI.getAIModelPerformance(),
        dashboardAPI.getDashboardSummary(),
      ]);

      setStats(statsData);
      setChartData({
        conversations: conversationsData,
        users: usersData,
        performance: performanceData,
      });
      setActivities(activitiesData);
      setQueries(queriesData);
      setAiModels(modelsData);
      setSummary(summaryData);
    } catch (err) {
      setError(
        err instanceof Error ? err : new Error("Failed to load dashboard data"),
      );
    } finally {
      setIsLoading(false);
    }
  }, []);

  // Filter activities
  const filterActivities = useCallback(async (filter: string = "all") => {
    try {
      const data = await dashboardAPI.getRecentActivities(filter);
      setActivities(data);
    } catch (err) {
      setError(
        err instanceof Error ? err : new Error("Failed to filter activities"),
      );
    }
  }, []);

  // Search queries
  const searchQueries = useCallback(async (searchTerm: string = "") => {
    try {
      const data = await dashboardAPI.getTopQueries(searchTerm);
      setQueries(data);
    } catch (err) {
      setError(
        err instanceof Error ? err : new Error("Failed to search queries"),
      );
    }
  }, []);

  // Refresh dashboard data
  const refreshData = useCallback(async () => {
    await loadDashboardData();
  }, [loadDashboardData]);

  // Load data on initial render
  useEffect(() => {
    loadDashboardData();
  }, [loadDashboardData]);

  return {
    stats,
    chartData,
    activities,
    queries,
    aiModels,
    isLoading,
    error,
    summary,
    refreshData,
    filterActivities,
    searchQueries,
  };
};
