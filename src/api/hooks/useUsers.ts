import { useState, useEffect, useCallback } from "react";
import { usersAPI } from "@/api";
import { User } from "@/mock_data/usersPage";

// Custom hook for users data
export const useUsers = (initialSearchQuery: string = "") => {
  const [users, setUsers] = useState<User[]>([]);
  const [filteredUsers, setFilteredUsers] = useState<User[]>([]);
  const [searchQuery, setSearchQuery] = useState(initialSearchQuery);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);
  const [stats, setStats] = useState<any>(null);

  // Load all users
  const loadUsers = useCallback(async () => {
    setIsLoading(true);
    setError(null);
    try {
      const data = await usersAPI.getAllUsers();
      setUsers(data);
      setFilteredUsers(data);

      // Also load stats
      const statsData = await usersAPI.getUserStats();
      setStats(statsData);
    } catch (err) {
      setError(err instanceof Error ? err : new Error("Failed to load users"));
    } finally {
      setIsLoading(false);
    }
  }, []);

  // Search users
  const searchUsers = useCallback(async (query: string) => {
    setIsLoading(true);
    setError(null);
    try {
      const data = await usersAPI.searchUsers(query);
      setFilteredUsers(data);
      setSearchQuery(query);
    } catch (err) {
      setError(
        err instanceof Error ? err : new Error("Failed to search users"),
      );
    } finally {
      setIsLoading(false);
    }
  }, []);

  // Filter users by status
  const filterByStatus = useCallback(async (status: User["status"] | "all") => {
    setIsLoading(true);
    setError(null);
    try {
      const data = await usersAPI.filterUsersByStatus(status);
      setFilteredUsers(data);
    } catch (err) {
      setError(
        err instanceof Error ? err : new Error("Failed to filter users"),
      );
    } finally {
      setIsLoading(false);
    }
  }, []);

  // Filter users by role
  const filterByRole = useCallback(async (role: User["role"] | "all") => {
    setIsLoading(true);
    setError(null);
    try {
      const data = await usersAPI.filterUsersByRole(role);
      setFilteredUsers(data);
    } catch (err) {
      setError(
        err instanceof Error ? err : new Error("Failed to filter users"),
      );
    } finally {
      setIsLoading(false);
    }
  }, []);

  // Load data on initial render
  useEffect(() => {
    loadUsers();
  }, [loadUsers]);

  // Handle search query changes
  useEffect(() => {
    if (searchQuery) {
      searchUsers(searchQuery);
    } else if (users.length > 0) {
      setFilteredUsers(users);
    }
  }, [searchQuery, users, searchUsers]);

  return {
    users,
    filteredUsers,
    searchQuery,
    setSearchQuery: searchUsers,
    isLoading,
    error,
    stats,
    loadUsers,
    filterByStatus,
    filterByRole,
  };
};
