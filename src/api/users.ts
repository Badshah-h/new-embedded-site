import { User } from "@/mock_data/usersPage";
import { userService } from "@/lib/services";

/**
 * Users API
 *
 * This module provides API endpoints for user-related operations.
 * It delegates actual data operations to the UserService.
 */

// Get all users
export const getAllUsers = async (): Promise<User[]> => {
  return userService.getAllUsers();
};

// Get user by ID
export const getUserById = async (id: string): Promise<User | undefined> => {
  return userService.getUserById(id);
};

// Search users
export const searchUsers = async (query: string): Promise<User[]> => {
  return userService.searchUsers(query);
};

// Filter users by status
export const filterUsersByStatus = async (
  status: User["status"] | "all",
): Promise<User[]> => {
  return userService.filterUsersByStatus(status);
};

// Filter users by role
export const filterUsersByRole = async (
  role: User["role"] | "all",
): Promise<User[]> => {
  return userService.filterUsersByRole(role);
};

// Get user statistics
export const getUserStats = async () => {
  return userService.getUserStats();
};
