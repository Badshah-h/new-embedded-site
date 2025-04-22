import { Conversation } from "@/mock_data/conversationsPage";
import mockDb from "@/lib/mockDb";
import { BaseService } from "./baseService";

/**
 * Conversation Service
 *
 * Handles all conversation-related data operations.
 * Acts as an intermediary between the API layer and the data source.
 */
class ConversationService extends BaseService {
  /**
   * Get all conversations
   */
  async getAllConversations(): Promise<Conversation[]> {
    await this.simulateNetworkDelay(300);
    return mockDb.getConversations();
  }

  /**
   * Get conversation by ID
   */
  async getConversationById(id: string): Promise<Conversation | undefined> {
    await this.simulateNetworkDelay(200);
    return mockDb.getConversationById(id);
  }

  /**
   * Search conversations by query string
   */
  async searchConversations(query: string): Promise<Conversation[]> {
    await this.simulateNetworkDelay(300);
    return mockDb.searchConversations(query);
  }

  /**
   * Filter conversations by status
   */
  async filterConversationsByStatus(
    status: Conversation["status"] | "all",
  ): Promise<Conversation[]> {
    await this.simulateNetworkDelay(300);
    return mockDb.filterConversationsByStatus(status);
  }

  /**
   * Get conversation statistics
   */
  async getConversationStats() {
    await this.simulateNetworkDelay(400);
    return mockDb.getConversationStats();
  }
}

// Export a singleton instance
export const conversationService = new ConversationService();
