import { User } from "@/mock_data/usersPage";
import mockDb from "@/lib/mockDb";
import { BaseService } from "./baseService";

/**
 * User Service
 *
 * Handles all user-related data operations.
 * Acts as an intermediary between the API layer and the data source.
 */
class UserService extends BaseService {
  /**
   * Get all users
   */
  async getAllUsers(): Promise<User[]> {
    await this.simulateNetworkDelay(300);
    return mockDb.getUsers();
  }

  /**
   * Get user by ID
   */
  async getUserById(id: string): Promise<User | undefined> {
    await this.simulateNetworkDelay(200);
    return mockDb.getUserById(id);
  }

  /**
   * Search users by query string
   */
  async searchUsers(query: string): Promise<User[]> {
    await this.simulateNetworkDelay(300);
    return mockDb.searchUsers(query);
  }

  /**
   * Filter users by status
   */
  async filterUsersByStatus(status: User["status"] | "all"): Promise<User[]> {
    await this.simulateNetworkDelay(300);
    return mockDb.filterUsersByStatus(status);
  }

  /**
   * Filter users by role
   */
  async filterUsersByRole(role: User["role"] | "all"): Promise<User[]> {
    await this.simulateNetworkDelay(300);
    return mockDb.filterUsersByRole(role);
  }

  /**
   * Get user statistics
   */
  async getUserStats() {
    await this.simulateNetworkDelay(400);
    return mockDb.getUserStats();
  }
}

// Export a singleton instance
export const userService = new UserService();
