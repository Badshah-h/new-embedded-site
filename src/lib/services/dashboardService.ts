import {
  StatCardData,
  ChartDataPoint,
  ActivityItem,
  QueryItem,
  ModelItem,
} from "@/mock_data/dashboardData";
import mockDb from "@/lib/mockDb";
import { BaseService } from "./baseService";

/**
 * Dashboard Service
 *
 * Handles all dashboard-related data operations.
 * Acts as an intermediary between the API layer and the data source.
 */
class DashboardService extends BaseService {
  /**
   * Get dashboard stats
   */
  async getDashboardStats(): Promise<StatCardData[]> {
    await this.simulateNetworkDelay(500);
    return mockDb.getDashboardStats();
  }

  /**
   * Get chart data based on type
   */
  async getChartData(
    type: "conversations" | "users" | "performance",
  ): Promise<ChartDataPoint[]> {
    await this.simulateNetworkDelay(400);
    return mockDb.getChartData(type);
  }

  /**
   * Get recent activities
   */
  async getRecentActivities(filter: string = "all"): Promise<ActivityItem[]> {
    await this.simulateNetworkDelay(300);
    return mockDb.getRecentActivities(filter);
  }

  /**
   * Get top queries
   */
  async getTopQueries(searchTerm: string = ""): Promise<QueryItem[]> {
    await this.simulateNetworkDelay(300);
    return mockDb.getTopQueries(searchTerm);
  }

  /**
   * Get AI model performance data
   */
  async getAIModelPerformance(): Promise<ModelItem[]> {
    await this.simulateNetworkDelay(400);
    return mockDb.getAIModelPerformance();
  }

  /**
   * Get dashboard summary
   */
  async getDashboardSummary() {
    await this.simulateNetworkDelay(600);
    return mockDb.getDashboardSummary();
  }
}

// Export a singleton instance
export const dashboardService = new DashboardService();
