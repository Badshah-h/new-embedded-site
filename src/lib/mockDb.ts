import { users, User } from "@/mock_data/usersPage";
import { conversations, Conversation } from "@/mock_data/conversationsPage";
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

/**
 * Mock Database
 *
 * This simulates a real database with collections and CRUD operations.
 * In a real application, this would be replaced with actual database calls.
 */
class MockDatabase {
  private users: User[];
  private conversations: Conversation[];
  private dashboardStats: StatCardData[];
  private conversationChartData: ChartDataPoint[];
  private userChartData: ChartDataPoint[];
  private performanceChartData: ChartDataPoint[];
  private recentActivities: ActivityItem[];
  private topQueries: QueryItem[];
  private aiModels: ModelItem[];
  private userGrowthData: any[];
  private userEngagementData: any[];
  private userDemographicsData: any[];
  private conversationMetricsData: any[];
  private conversationDurationData: any[];
  private satisfactionDistributionData: any[];
  private aiPerformanceData: any[];
  private modelComparisonData: any[];
  private analyticsOverviewStats: any[];

  constructor() {
    // Initialize collections with mock data
    this.users = [...users];
    this.conversations = [...conversations];
    this.dashboardStats = [...dashboardStats];
    this.conversationChartData = [...conversationChartData];
    this.userChartData = [...userChartData];
    this.performanceChartData = [...performanceChartData];
    this.recentActivities = [...recentActivities];
    this.topQueries = [...topQueries];
    this.aiModels = [...aiModels];
    this.userGrowthData = [...userGrowthData];
    this.userEngagementData = [...userEngagementData];
    this.userDemographicsData = [...userDemographicsData];
    this.conversationMetricsData = [...conversationMetricsData];
    this.conversationDurationData = [...conversationDurationData];
    this.satisfactionDistributionData = [...satisfactionDistributionData];
    this.aiPerformanceData = [...aiPerformanceData];
    this.modelComparisonData = [...modelComparisonData];
    this.analyticsOverviewStats = [...analyticsOverviewStats];
  }

  // User operations
  async getUsers(): Promise<User[]> {
    return [...this.users];
  }

  async getUserById(id: string): Promise<User | undefined> {
    return this.users.find((user) => user.id === id);
  }

  async searchUsers(query: string): Promise<User[]> {
    if (!query) return [...this.users];

    const lowercaseQuery = query.toLowerCase();
    return this.users.filter(
      (user) =>
        user.name.toLowerCase().includes(lowercaseQuery) ||
        user.email.toLowerCase().includes(lowercaseQuery),
    );
  }

  async filterUsersByStatus(status: User["status"] | "all"): Promise<User[]> {
    if (status === "all") return [...this.users];
    return this.users.filter((user) => user.status === status);
  }

  async filterUsersByRole(role: User["role"] | "all"): Promise<User[]> {
    if (role === "all") return [...this.users];
    return this.users.filter((user) => user.role === role);
  }

  async getUserStats() {
    return {
      total: this.users.length,
      active: this.users.filter((u) => u.status === "active").length,
      inactive: this.users.filter((u) => u.status === "inactive").length,
      pending: this.users.filter((u) => u.status === "pending").length,
      admins: this.users.filter((u) => u.role === "admin").length,
      regularUsers: this.users.filter((u) => u.role === "user").length,
      guests: this.users.filter((u) => u.role === "guest").length,
    };
  }

  // Conversation operations
  async getConversations(): Promise<Conversation[]> {
    return [...this.conversations];
  }

  async getConversationById(id: string): Promise<Conversation | undefined> {
    return this.conversations.find((conversation) => conversation.id === id);
  }

  async searchConversations(query: string): Promise<Conversation[]> {
    if (!query) return [...this.conversations];

    const lowercaseQuery = query.toLowerCase();
    return this.conversations.filter(
      (conversation) =>
        conversation.user.name.toLowerCase().includes(lowercaseQuery) ||
        conversation.user.email.toLowerCase().includes(lowercaseQuery) ||
        conversation.lastMessage.toLowerCase().includes(lowercaseQuery),
    );
  }

  async filterConversationsByStatus(
    status: Conversation["status"] | "all",
  ): Promise<Conversation[]> {
    if (status === "all") return [...this.conversations];
    return this.conversations.filter(
      (conversation) => conversation.status === status,
    );
  }

  async getConversationStats() {
    return {
      total: this.conversations.length,
      active: this.conversations.filter((c) => c.status === "active").length,
      completed: this.conversations.filter((c) => c.status === "completed")
        .length,
      abandoned: this.conversations.filter((c) => c.status === "abandoned")
        .length,
      averageDuration: "8m 45s",
      averageSatisfaction: 4.2,
    };
  }

  // Dashboard operations
  async getDashboardStats(): Promise<StatCardData[]> {
    return [...this.dashboardStats];
  }

  async getChartData(
    type: "conversations" | "users" | "performance",
  ): Promise<ChartDataPoint[]> {
    switch (type) {
      case "conversations":
        return [...this.conversationChartData];
      case "users":
        return [...this.userChartData];
      case "performance":
        return [...this.performanceChartData];
      default:
        return [...this.conversationChartData];
    }
  }

  async getRecentActivities(filter: string = "all"): Promise<ActivityItem[]> {
    if (filter === "all") return [...this.recentActivities];
    return this.recentActivities.filter((activity) => activity.type === filter);
  }

  async getTopQueries(searchTerm: string = ""): Promise<QueryItem[]> {
    if (!searchTerm) return [...this.topQueries];
    return this.topQueries.filter((q) =>
      q.query.toLowerCase().includes(searchTerm.toLowerCase()),
    );
  }

  async getAIModelPerformance(): Promise<ModelItem[]> {
    return [...this.aiModels];
  }

  async getDashboardSummary() {
    return {
      totalUsers: 12345,
      activeConversations: 1234,
      averageResponseTime: "1.2s",
      accuracyRate: "94.2%",
      totalQueries: 45678,
      knowledgeBaseSize: "2.3GB",
      lastUpdated: new Date().toISOString(),
    };
  }

  // Analytics operations
  async getAnalyticsOverviewStats() {
    return [...this.analyticsOverviewStats];
  }

  async getUserGrowthData(period: "month" | "quarter" | "year" = "year") {
    // In a real implementation, we would filter based on the period
    return [...this.userGrowthData];
  }

  async getUserEngagementData() {
    return [...this.userEngagementData];
  }

  async getUserDemographicsData() {
    return [...this.userDemographicsData];
  }

  async getConversationMetricsData(
    period: "month" | "quarter" | "year" = "year",
  ) {
    // In a real implementation, we would filter based on the period
    return [...this.conversationMetricsData];
  }

  async getConversationDurationData() {
    return [...this.conversationDurationData];
  }

  async getSatisfactionDistributionData() {
    return [...this.satisfactionDistributionData];
  }

  async getAIPerformanceData(period: "month" | "quarter" | "year" = "year") {
    // In a real implementation, we would filter based on the period
    return [...this.aiPerformanceData];
  }

  async getModelComparisonData() {
    return [...this.modelComparisonData];
  }

  async getAnalyticsSummary() {
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
  }
}

// Create a singleton instance of the mock database
const mockDb = new MockDatabase();

export default mockDb;
