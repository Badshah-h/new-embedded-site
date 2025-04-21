import {
  userGrowthData,
  userEngagementData,
  userDemographicsData,
  conversationMetricsData,
  conversationDurationData,
  satisfactionDistributionData,
  aiPerformanceData,
  modelComparisonData,
  analyticsOverviewStats,
} from "@/mock_data/analyticsData";

// Get analytics overview stats
export const getAnalyticsOverviewStats = async () => {
  // Simulate API delay
  await new Promise((resolve) => setTimeout(resolve, 500));
  return [...analyticsOverviewStats];
};

// Get user growth data
export const getUserGrowthData = async (
  period: "month" | "quarter" | "year" = "year",
) => {
  // Simulate API delay
  await new Promise((resolve) => setTimeout(resolve, 400));

  // For simplicity, we're returning the same data regardless of period
  // In a real implementation, you would filter based on the period
  return [...userGrowthData];
};

// Get user engagement data
export const getUserEngagementData = async () => {
  // Simulate API delay
  await new Promise((resolve) => setTimeout(resolve, 300));
  return [...userEngagementData];
};

// Get user demographics data
export const getUserDemographicsData = async () => {
  // Simulate API delay
  await new Promise((resolve) => setTimeout(resolve, 300));
  return [...userDemographicsData];
};

// Get conversation metrics data
export const getConversationMetricsData = async (
  period: "month" | "quarter" | "year" = "year",
) => {
  // Simulate API delay
  await new Promise((resolve) => setTimeout(resolve, 400));

  // For simplicity, we're returning the same data regardless of period
  return [...conversationMetricsData];
};

// Get conversation duration data
export const getConversationDurationData = async () => {
  // Simulate API delay
  await new Promise((resolve) => setTimeout(resolve, 300));
  return [...conversationDurationData];
};

// Get satisfaction distribution data
export const getSatisfactionDistributionData = async () => {
  // Simulate API delay
  await new Promise((resolve) => setTimeout(resolve, 300));
  return [...satisfactionDistributionData];
};

// Get AI performance data
export const getAIPerformanceData = async (
  period: "month" | "quarter" | "year" = "year",
) => {
  // Simulate API delay
  await new Promise((resolve) => setTimeout(resolve, 400));

  // For simplicity, we're returning the same data regardless of period
  return [...aiPerformanceData];
};

// Get model comparison data
export const getModelComparisonData = async () => {
  // Simulate API delay
  await new Promise((resolve) => setTimeout(resolve, 300));
  return [...modelComparisonData];
};

// Get analytics summary
export const getAnalyticsSummary = async () => {
  // Simulate API delay
  await new Promise((resolve) => setTimeout(resolve, 600));

  return {
    totalConversations: 52600,
    averageResponseTime: "0.8s",
    userSatisfaction: 4.3,
    aiAccuracy: "94.2%",
    activeUsers: 4500,
    topQuery: "How do I reset my password?",
    bestPerformingModel: "Gemini Pro",
    lastUpdated: new Date().toISOString(),
  };
};
