export interface Conversation {
  id: string;
  user: {
    name: string;
    email: string;
    avatar: string;
  };
  status: "active" | "completed" | "abandoned";
  messages: number;
  duration: string;
  satisfaction: number | null;
  lastMessage: string;
  timestamp: string;
}

// Mock data for conversations
export const conversations: Conversation[] = [
  {
    id: "conv-1",
    user: {
      name: "Sarah Johnson",
      email: "sarah.johnson@example.com",
      avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Sarah",
    },
    status: "active",
    messages: 12,
    duration: "15m 23s",
    satisfaction: null,
    lastMessage: "How do I reset my password?",
    timestamp: "2 minutes ago",
  },
  {
    id: "conv-2",
    user: {
      name: "Michael Chen",
      email: "michael.chen@example.com",
      avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Michael",
    },
    status: "completed",
    messages: 8,
    duration: "5m 12s",
    satisfaction: 5,
    lastMessage: "Thanks for your help!",
    timestamp: "15 minutes ago",
  },
  {
    id: "conv-3",
    user: {
      name: "Emily Rodriguez",
      email: "emily.rodriguez@example.com",
      avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Emily",
    },
    status: "completed",
    messages: 15,
    duration: "12m 45s",
    satisfaction: 4,
    lastMessage: "I'll try that solution, thank you.",
    timestamp: "1 hour ago",
  },
  {
    id: "conv-4",
    user: {
      name: "David Kim",
      email: "david.kim@example.com",
      avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=David",
    },
    status: "abandoned",
    messages: 3,
    duration: "1m 30s",
    satisfaction: null,
    lastMessage: "This isn't working for me.",
    timestamp: "3 hours ago",
  },
  {
    id: "conv-5",
    user: {
      name: "Jessica Taylor",
      email: "jessica.taylor@example.com",
      avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Jessica",
    },
    status: "completed",
    messages: 20,
    duration: "18m 10s",
    satisfaction: 3,
    lastMessage: "I still have some questions but this helps.",
    timestamp: "5 hours ago",
  },
  {
    id: "conv-6",
    user: {
      name: "Robert Wilson",
      email: "robert.wilson@example.com",
      avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Robert",
    },
    status: "completed",
    messages: 7,
    duration: "4m 55s",
    satisfaction: 5,
    lastMessage: "Perfect! That's exactly what I needed.",
    timestamp: "Yesterday",
  },
  {
    id: "conv-7",
    user: {
      name: "Amanda Martinez",
      email: "amanda.martinez@example.com",
      avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Amanda",
    },
    status: "active",
    messages: 9,
    duration: "8m 20s",
    satisfaction: null,
    lastMessage: "Can you explain how to use this feature?",
    timestamp: "Just now",
  },
];
