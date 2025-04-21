// Dashboard statistics and data

// Stats card data
export interface StatCardData {
  title: string;
  value: string;
  description: string;
  trend: "up" | "down" | "neutral";
  trendValue: string;
  iconColor?: string;
  iconBgColor?: string;
  gradient?: string;
}

export const dashboardStats = [
  {
    id: "total-users",
    title: "Total Users",
    value: "12,345",
    description: "Active accounts",
    trend: "up" as const,
    trendValue: "12%",
    iconColor: "text-blue-600",
    iconBgColor: "bg-blue-100 dark:bg-blue-900/30",
    gradient: "from-blue-500 to-blue-600",
  },
  {
    id: "active-conversations",
    title: "Active Conversations",
    value: "1,234",
    description: "Ongoing chats",
    trend: "up" as const,
    trendValue: "18%",
    iconColor: "text-indigo-600",
    iconBgColor: "bg-indigo-100 dark:bg-indigo-900/30",
    gradient: "from-indigo-500 to-indigo-600",
  },
  {
    id: "response-time",
    title: "AI Response Time",
    value: "1.2s",
    description: "Average response",
    trend: "down" as const,
    trendValue: "0.3s",
    iconColor: "text-green-600",
    iconBgColor: "bg-green-100 dark:bg-green-900/30",
    gradient: "from-green-500 to-green-600",
  },
  {
    id: "accuracy-rate",
    title: "AI Accuracy Rate",
    value: "94.2%",
    description: "Successful responses",
    trend: "up" as const,
    trendValue: "2.4%",
    iconColor: "text-amber-600",
    iconBgColor: "bg-amber-100 dark:bg-amber-900/30",
    gradient: "from-amber-500 to-amber-600",
  },
];

// Chart data
export interface ChartDataPoint {
  month: string;
  value: number;
}

export const conversationChartData: ChartDataPoint[] = [
  { month: "Jan", value: 65 },
  { month: "Feb", value: 45 },
  { month: "Mar", value: 75 },
  { month: "Apr", value: 55 },
  { month: "May", value: 85 },
  { month: "Jun", value: 70 },
  { month: "Jul", value: 90 },
];

export const userChartData: ChartDataPoint[] = [
  { month: "Jan", value: 30 },
  { month: "Feb", value: 40 },
  { month: "Mar", value: 45 },
  { month: "Apr", value: 60 },
  { month: "May", value: 75 },
  { month: "Jun", value: 85 },
  { month: "Jul", value: 95 },
];

export const performanceChartData: ChartDataPoint[] = [
  { month: "Jan", value: 80 },
  { month: "Feb", value: 82 },
  { month: "Mar", value: 85 },
  { month: "Apr", value: 88 },
  { month: "May", value: 90 },
  { month: "Jun", value: 92 },
  { month: "Jul", value: 94 },
];

// Recent activity data
export interface ActivityItem {
  id: string;
  user: {
    name: string;
    avatar: string;
  };
  action: string;
  target: string;
  time: string;
  type: "conversation" | "user" | "system" | "ai";
}

export const recentActivities: ActivityItem[] = [
  {
    id: "1",
    user: {
      name: "Sarah Johnson",
      avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Sarah",
    },
    action: "started a new",
    target: "conversation",
    time: "2 minutes ago",
    type: "conversation",
  },
  {
    id: "2",
    user: {
      name: "Michael Chen",
      avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Michael",
    },
    action: "registered a new",
    target: "account",
    time: "15 minutes ago",
    type: "user",
  },
  {
    id: "3",
    user: {
      name: "AI Assistant",
      avatar: "https://api.dicebear.com/7.x/bottts/svg?seed=AI",
    },
    action: "was updated to",
    target: "version 2.4",
    time: "1 hour ago",
    type: "ai",
  },
  {
    id: "4",
    user: {
      name: "Emily Rodriguez",
      avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Emily",
    },
    action: "completed a conversation with",
    target: "5-star rating",
    time: "3 hours ago",
    type: "conversation",
  },
  {
    id: "5",
    user: {
      name: "System",
      avatar: "https://api.dicebear.com/7.x/bottts/svg?seed=System",
    },
    action: "performed",
    target: "knowledge base update",
    time: "5 hours ago",
    type: "system",
  },
];

// Top queries data
export interface QueryItem {
  query: string;
  count: number;
}

export const topQueries: QueryItem[] = [
  { query: "How do I reset my password?", count: 342 },
  { query: "What are your business hours?", count: 271 },
  { query: "How to upgrade my subscription?", count: 234 },
  { query: "Where is my order?", count: 198 },
  { query: "How to contact support?", count: 157 },
  { query: "Do you offer refunds?", count: 143 },
  { query: "How to change my email?", count: 128 },
  { query: "What payment methods do you accept?", count: 112 },
];

// AI model performance data
export interface ModelItem {
  model: string;
  accuracy: number;
  usage: number;
  responseTime: string;
}

export const aiModels: ModelItem[] = [
  { model: "Gemini Pro", accuracy: 94.2, usage: 68, responseTime: "0.8s" },
  {
    model: "Hugging Face - Mistral",
    accuracy: 91.7,
    usage: 22,
    responseTime: "1.2s",
  },
  {
    model: "Hugging Face - Llama",
    accuracy: 89.5,
    usage: 10,
    responseTime: "1.5s",
  },
];
