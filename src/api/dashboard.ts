import {
  dashboardStats,
  conversationChartData,
  userChartData,
  performanceChartData,
  recentActivities,
  topQueries,
  aiModels,
  StatCardData,
  ChartDataPoint,
  ActivityItem,
  QueryItem,
  ModelItem,
} from "@/mock_data/dashboardData";

// Get dashboard stats
export const getDashboardStats = async (): Promise<StatCardData[]> => {
  // Simulate API delay
  await new Promise((resolve) => setTimeout(resolve, 500));
  return [...dashboardStats];
};

// Get chart data based on type
export const getChartData = async (
  type: "conversations" | "users" | "performance",
): Promise<ChartDataPoint[]> => {
  // Simulate API delay
  await new Promise((resolve) => setTimeout(resolve, 400));

  switch (type) {
    case "conversations":
      return [...conversationChartData];
    case "users":
      return [...userChartData];
    case "performance":
      return [...performanceChartData];
    default:
      return [...conversationChartData];
  }
};

// Get recent activities
export const getRecentActivities = async (
  filter: string = "all",
): Promise<ActivityItem[]> => {
  // Simulate API delay
  await new Promise((resolve) => setTimeout(resolve, 300));

  if (filter === "all") return [...recentActivities];

  return recentActivities.filter((activity) => activity.type === filter);
};

// Get top queries
export const getTopQueries = async (
  searchTerm: string = "",
): Promise<QueryItem[]> => {
  // Simulate API delay
  await new Promise((resolve) => setTimeout(resolve, 300));

  if (!searchTerm) return [...topQueries];

  return topQueries.filter((q) =>
    q.query.toLowerCase().includes(searchTerm.toLowerCase()),
  );
};

// Get AI model performance data
export const getAIModelPerformance = async (): Promise<ModelItem[]> => {
  // Simulate API delay
  await new Promise((resolve) => setTimeout(resolve, 400));
  return [...aiModels];
};

// Get dashboard summary
export const getDashboardSummary = async () => {
  // Simulate API delay
  await new Promise((resolve) => setTimeout(resolve, 600));

  return {
    totalUsers: 12345,
    activeConversations: 1234,
    averageResponseTime: "1.2s",
    accuracyRate: "94.2%",
    totalQueries: 45678,
    knowledgeBaseSize: "2.3GB",
    lastUpdated: new Date().toISOString(),
  };
};
