import { analyticsService } from "@/lib/services";

/**
 * Analytics API
 *
 * This module provides API endpoints for analytics-related operations.
 * It delegates actual data operations to the AnalyticsService.
 */

// Get analytics overview stats
export const getAnalyticsOverviewStats = async () => {
  return analyticsService.getAnalyticsOverviewStats();
};

// Get user growth data
export const getUserGrowthData = async (
  period: "month" | "quarter" | "year" = "year",
) => {
  return analyticsService.getUserGrowthData(period);
};

// Get user engagement data
export const getUserEngagementData = async () => {
  return analyticsService.getUserEngagementData();
};

// Get user demographics data
export const getUserDemographicsData = async () => {
  return analyticsService.getUserDemographicsData();
};

// Get conversation metrics data
export const getConversationMetricsData = async (
  period: "month" | "quarter" | "year" = "year",
) => {
  return analyticsService.getConversationMetricsData(period);
};

// Get conversation duration data
export const getConversationDurationData = async () => {
  return analyticsService.getConversationDurationData();
};

// Get satisfaction distribution data
export const getSatisfactionDistributionData = async () => {
  return analyticsService.getSatisfactionDistributionData();
};

// Get AI performance data
export const getAIPerformanceData = async (
  period: "month" | "quarter" | "year" = "year",
) => {
  return analyticsService.getAIPerformanceData(period);
};

// Get model comparison data
export const getModelComparisonData = async () => {
  return analyticsService.getModelComparisonData();
};

// Get analytics summary
export const getAnalyticsSummary = async () => {
  return analyticsService.getAnalyticsSummary();
};
