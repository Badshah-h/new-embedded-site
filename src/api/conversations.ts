import { Conversation } from "@/mock_data/conversationsPage";
import { conversationService } from "@/lib/services";

/**
 * Conversations API
 *
 * This module provides API endpoints for conversation-related operations.
 * It delegates actual data operations to the ConversationService.
 */

// Get all conversations
export const getAllConversations = async (): Promise<Conversation[]> => {
  return conversationService.getAllConversations();
};

// Get conversation by ID
export const getConversationById = async (
  id: string,
): Promise<Conversation | undefined> => {
  return conversationService.getConversationById(id);
};

// Search conversations
export const searchConversations = async (
  query: string,
): Promise<Conversation[]> => {
  return conversationService.searchConversations(query);
};

// Filter conversations by status
export const filterConversationsByStatus = async (
  status: Conversation["status"] | "all",
): Promise<Conversation[]> => {
  return conversationService.filterConversationsByStatus(status);
};

// Get conversation statistics
export const getConversationStats = async () => {
  return conversationService.getConversationStats();
};
