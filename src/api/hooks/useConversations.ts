import { useState, useEffect, useCallback } from "react";
import { conversationsAPI } from "@/api";
import { Conversation } from "@/mock_data/conversationsPage";

// Custom hook for conversations data
export const useConversations = (initialSearchQuery: string = "") => {
  const [conversations, setConversations] = useState<Conversation[]>([]);
  const [filteredConversations, setFilteredConversations] = useState<
    Conversation[]
  >([]);
  const [searchQuery, setSearchQuery] = useState(initialSearchQuery);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);
  const [stats, setStats] = useState<any>(null);

  // Load all conversations
  const loadConversations = useCallback(async () => {
    setIsLoading(true);
    setError(null);
    try {
      const data = await conversationsAPI.getAllConversations();
      setConversations(data);
      setFilteredConversations(data);

      // Also load stats
      const statsData = await conversationsAPI.getConversationStats();
      setStats(statsData);
    } catch (err) {
      setError(
        err instanceof Error ? err : new Error("Failed to load conversations"),
      );
    } finally {
      setIsLoading(false);
    }
  }, []);

  // Search conversations
  const searchConversations = useCallback(async (query: string) => {
    setIsLoading(true);
    setError(null);
    try {
      const data = await conversationsAPI.searchConversations(query);
      setFilteredConversations(data);
      setSearchQuery(query);
    } catch (err) {
      setError(
        err instanceof Error
          ? err
          : new Error("Failed to search conversations"),
      );
    } finally {
      setIsLoading(false);
    }
  }, []);

  // Filter conversations by status
  const filterByStatus = useCallback(
    async (status: Conversation["status"] | "all") => {
      setIsLoading(true);
      setError(null);
      try {
        const data = await conversationsAPI.filterConversationsByStatus(status);
        setFilteredConversations(data);
      } catch (err) {
        setError(
          err instanceof Error
            ? err
            : new Error("Failed to filter conversations"),
        );
      } finally {
        setIsLoading(false);
      }
    },
    [],
  );

  // Load data on initial render
  useEffect(() => {
    loadConversations();
  }, [loadConversations]);

  // Handle search query changes
  useEffect(() => {
    if (searchQuery) {
      searchConversations(searchQuery);
    } else if (conversations.length > 0) {
      setFilteredConversations(conversations);
    }
  }, [searchQuery, conversations, searchConversations]);

  return {
    conversations,
    filteredConversations,
    searchQuery,
    setSearchQuery: searchConversations,
    isLoading,
    error,
    stats,
    loadConversations,
    filterByStatus,
  };
};
