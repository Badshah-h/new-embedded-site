import { conversations, Conversation } from "@/mock_data/conversationsPage";

// Get all conversations
export const getAllConversations = async (): Promise<Conversation[]> => {
  // Simulate API delay
  await new Promise((resolve) => setTimeout(resolve, 300));
  return [...conversations];
};

// Get conversation by ID
export const getConversationById = async (
  id: string,
): Promise<Conversation | undefined> => {
  // Simulate API delay
  await new Promise((resolve) => setTimeout(resolve, 200));
  return conversations.find((conversation) => conversation.id === id);
};

// Search conversations
export const searchConversations = async (
  query: string,
): Promise<Conversation[]> => {
  // Simulate API delay
  await new Promise((resolve) => setTimeout(resolve, 300));

  if (!query) return [...conversations];

  const lowercaseQuery = query.toLowerCase();
  return conversations.filter(
    (conversation) =>
      conversation.user.name.toLowerCase().includes(lowercaseQuery) ||
      conversation.user.email.toLowerCase().includes(lowercaseQuery) ||
      conversation.lastMessage.toLowerCase().includes(lowercaseQuery),
  );
};

// Filter conversations by status
export const filterConversationsByStatus = async (
  status: Conversation["status"] | "all",
): Promise<Conversation[]> => {
  // Simulate API delay
  await new Promise((resolve) => setTimeout(resolve, 300));

  if (status === "all") return [...conversations];

  return conversations.filter((conversation) => conversation.status === status);
};

// Get conversation statistics
export const getConversationStats = async () => {
  // Simulate API delay
  await new Promise((resolve) => setTimeout(resolve, 400));

  return {
    total: conversations.length,
    active: conversations.filter((c) => c.status === "active").length,
    completed: conversations.filter((c) => c.status === "completed").length,
    abandoned: conversations.filter((c) => c.status === "abandoned").length,
    averageDuration: "8m 45s",
    averageSatisfaction: 4.2,
  };
};
