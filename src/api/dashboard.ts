import {
  StatCardData,
  ChartDataPoint,
  ActivityItem,
  QueryItem,
  ModelItem,
} from "@/mock_data/dashboardData";
import { dashboardService } from "@/lib/services";

/**
 * Dashboard API
 *
 * This module provides API endpoints for dashboard-related operations.
 * It delegates actual data operations to the DashboardService.
 */

// Get dashboard stats
export const getDashboardStats = async (): Promise<StatCardData[]> => {
  return dashboardService.getDashboardStats();
};

// Get chart data based on type
export const getChartData = async (
  type: "conversations" | "users" | "performance",
): Promise<ChartDataPoint[]> => {
  return dashboardService.getChartData(type);
};

// Get recent activities
export const getRecentActivities = async (
  filter: string = "all",
): Promise<ActivityItem[]> => {
  return dashboardService.getRecentActivities(filter);
};

// Get top queries
export const getTopQueries = async (
  searchTerm: string = "",
): Promise<QueryItem[]> => {
  return dashboardService.getTopQueries(searchTerm);
};

// Get AI model performance data
export const getAIModelPerformance = async (): Promise<ModelItem[]> => {
  return dashboardService.getAIModelPerformance();
};

// Get dashboard summary
export const getDashboardSummary = async () => {
  return dashboardService.getDashboardSummary();
};
