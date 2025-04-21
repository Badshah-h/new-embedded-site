export interface User {
  id: string;
  name: string;
  email: string;
  status: "active" | "inactive" | "pending";
  role: "admin" | "user" | "guest";
  lastActive: string;
  conversations: number;
  avatar: string;
}

// Mock data for users
export const users: User[] = [
  {
    id: "1",
    name: "Sarah Johnson",
    email: "sarah.johnson@example.com",
    status: "active",
    role: "admin",
    lastActive: "2 minutes ago",
    conversations: 152,
    avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Sarah",
  },
  {
    id: "2",
    name: "Michael Chen",
    email: "michael.chen@example.com",
    status: "active",
    role: "user",
    lastActive: "15 minutes ago",
    conversations: 87,
    avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Michael",
  },
  {
    id: "3",
    name: "Emily Rodriguez",
    email: "emily.rodriguez@example.com",
    status: "active",
    role: "user",
    lastActive: "3 hours ago",
    conversations: 64,
    avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Emily",
  },
  {
    id: "4",
    name: "David Kim",
    email: "david.kim@example.com",
    status: "inactive",
    role: "user",
    lastActive: "2 days ago",
    conversations: 23,
    avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=David",
  },
  {
    id: "5",
    name: "Jessica Taylor",
    email: "jessica.taylor@example.com",
    status: "pending",
    role: "guest",
    lastActive: "Never",
    conversations: 0,
    avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Jessica",
  },
  {
    id: "6",
    name: "Robert Wilson",
    email: "robert.wilson@example.com",
    status: "active",
    role: "user",
    lastActive: "1 hour ago",
    conversations: 42,
    avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Robert",
  },
  {
    id: "7",
    name: "Amanda Martinez",
    email: "amanda.martinez@example.com",
    status: "active",
    role: "user",
    lastActive: "5 hours ago",
    conversations: 31,
    avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Amanda",
  },
];
