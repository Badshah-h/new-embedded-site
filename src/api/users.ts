import { users, User } from "@/mock_data/usersPage";

// Get all users
export const getAllUsers = async (): Promise<User[]> => {
  // Simulate API delay
  await new Promise((resolve) => setTimeout(resolve, 300));
  return [...users];
};

// Get user by ID
export const getUserById = async (id: string): Promise<User | undefined> => {
  // Simulate API delay
  await new Promise((resolve) => setTimeout(resolve, 200));
  return users.find((user) => user.id === id);
};

// Search users
export const searchUsers = async (query: string): Promise<User[]> => {
  // Simulate API delay
  await new Promise((resolve) => setTimeout(resolve, 300));

  if (!query) return [...users];

  const lowercaseQuery = query.toLowerCase();
  return users.filter(
    (user) =>
      user.name.toLowerCase().includes(lowercaseQuery) ||
      user.email.toLowerCase().includes(lowercaseQuery),
  );
};

// Filter users by status
export const filterUsersByStatus = async (
  status: User["status"] | "all",
): Promise<User[]> => {
  // Simulate API delay
  await new Promise((resolve) => setTimeout(resolve, 300));

  if (status === "all") return [...users];

  return users.filter((user) => user.status === status);
};

// Filter users by role
export const filterUsersByRole = async (
  role: User["role"] | "all",
): Promise<User[]> => {
  // Simulate API delay
  await new Promise((resolve) => setTimeout(resolve, 300));

  if (role === "all") return [...users];

  return users.filter((user) => user.role === role);
};

// Get user statistics
export const getUserStats = async () => {
  // Simulate API delay
  await new Promise((resolve) => setTimeout(resolve, 400));

  return {
    total: users.length,
    active: users.filter((u) => u.status === "active").length,
    inactive: users.filter((u) => u.status === "inactive").length,
    pending: users.filter((u) => u.status === "pending").length,
    admins: users.filter((u) => u.role === "admin").length,
    regularUsers: users.filter((u) => u.role === "user").length,
    guests: users.filter((u) => u.role === "guest").length,
  };
};
