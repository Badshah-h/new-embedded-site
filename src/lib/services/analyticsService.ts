import mockDb from "@/lib/mockDb";
import { BaseService } from "./baseService";

/**
 * Analytics Service
 *
 * Handles all analytics-related data operations.
 * Acts as an intermediary between the API layer and the data source.
 */
class AnalyticsService extends BaseService {
  /**
   * Get analytics overview stats
   */
  async getAnalyticsOverviewStats() {
    await this.simulateNetworkDelay(500);
    return mockDb.getAnalyticsOverviewStats();
  }

  /**
   * Get user growth data
   */
  async getUserGrowthData(period: "month" | "quarter" | "year" = "year") {
    await this.simulateNetworkDelay(400);
    return mockDb.getUserGrowthData(period);
  }

  /**
   * Get user engagement data
   */
  async getUserEngagementData() {
    await this.simulateNetworkDelay(300);
    return mockDb.getUserEngagementData();
  }

  /**
   * Get user demographics data
   */
  async getUserDemographicsData() {
    await this.simulateNetworkDelay(300);
    return mockDb.getUserDemographicsData();
  }

  /**
   * Get conversation metrics data
   */
  async getConversationMetricsData(
    period: "month" | "quarter" | "year" = "year",
  ) {
    await this.simulateNetworkDelay(400);
    return mockDb.getConversationMetricsData(period);
  }

  /**
   * Get conversation duration data
   */
  async getConversationDurationData() {
    await this.simulateNetworkDelay(300);
    return mockDb.getConversationDurationData();
  }

  /**
   * Get satisfaction distribution data
   */
  async getSatisfactionDistributionData() {
    await this.simulateNetworkDelay(300);
    return mockDb.getSatisfactionDistributionData();
  }

  /**
   * Get AI performance data
   */
  async getAIPerformanceData(period: "month" | "quarter" | "year" = "year") {
    await this.simulateNetworkDelay(400);
    return mockDb.getAIPerformanceData(period);
  }

  /**
   * Get model comparison data
   */
  async getModelComparisonData() {
    await this.simulateNetworkDelay(300);
    return mockDb.getModelComparisonData();
  }

  /**
   * Get analytics summary
   */
  async getAnalyticsSummary() {
    await this.simulateNetworkDelay(600);
    return mockDb.getAnalyticsSummary();
  }
}

// Export a singleton instance
export const analyticsService = new AnalyticsService();
