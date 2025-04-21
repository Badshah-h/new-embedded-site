import React, { useEffect, useState } from "react";
import { useOutletContext } from "react-router-dom";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import {
  Download,
  RefreshCw,
  ChevronRight,
  Filter,
  Calendar,
} from "lucide-react";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

// Import dashboard components
import StatCard from "./components/StatCard";
import OverviewChart from "./components/OverviewChart";
import RecentActivityCard from "./components/RecentActivityCard";
import TopQueriesCard from "./components/TopQueriesCard";
import AIPerformanceCard from "./components/AIPerformanceCard";
import QuickActionsCard from "./components/QuickActionsCard";
import DetailedView from "./components/DetailedView";

const Dashboard = () => {
  const { setPageTitle } = useOutletContext<{
    setPageTitle: (title: string) => void;
  }>();

  // State for detailed view dialog
  const [detailedView, setDetailedView] = useState({
    open: false,
    title: "",
    type: "users" as "users" | "conversations" | "queries" | "performance",
    data: null,
  });

  // State for filters
  const [timeRange, setTimeRange] = useState("7d");
  const [isRefreshing, setIsRefreshing] = useState(false);

  useEffect(() => {
    setPageTitle("Dashboard");
  }, [setPageTitle]);

  // Handle refresh click with animation
  const handleRefresh = () => {
    setIsRefreshing(true);
    // Simulate data refresh
    setTimeout(() => {
      setIsRefreshing(false);
    }, 1000);
  };

  // Open detailed view
  const openDetailedView = (
    title: string,
    type: "users" | "conversations" | "queries" | "performance",
    data: any = null,
  ) => {
    setDetailedView({
      open: true,
      title,
      type,
      data,
    });
  };

  // Animation variants for staggered animations
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        type: "spring",
        stiffness: 100,
        damping: 15,
      },
    },
  };

  const stats = [
    {
      title: "Total Users",
      value: "12,345",
      description: "Active accounts",
      icon: Users,
      trend: "up",
      trendValue: "12%",
      iconColor: "text-blue-600",
      iconBgColor: "bg-blue-100 dark:bg-blue-900/30",
      gradient: "from-blue-500 to-blue-600",
      delay: 0.1,
      onClick: () => openDetailedView("User Analytics", "users"),
    },
    {
      title: "Active Conversations",
      value: "1,234",
      description: "Ongoing chats",
      icon: MessageSquare,
      trend: "up",
      trendValue: "18%",
      iconColor: "text-indigo-600",
      iconBgColor: "bg-indigo-100 dark:bg-indigo-900/30",
      gradient: "from-indigo-500 to-indigo-600",
      delay: 0.2,
      onClick: () =>
        openDetailedView("Conversation Analytics", "conversations"),
    },
    {
      title: "AI Response Time",
      value: "1.2s",
      description: "Average response",
      icon: Clock,
      trend: "down",
      trendValue: "0.3s",
      iconColor: "text-green-600",
      iconBgColor: "bg-green-100 dark:bg-green-900/30",
      gradient: "from-green-500 to-green-600",
      delay: 0.3,
      onClick: () => openDetailedView("Response Time Analytics", "performance"),
    },
    {
      title: "AI Accuracy Rate",
      value: "94.2%",
      description: "Successful responses",
      icon: Zap,
      trend: "up",
      trendValue: "2.4%",
      iconColor: "text-amber-600",
      iconBgColor: "bg-amber-100 dark:bg-amber-900/30",
      gradient: "from-amber-500 to-amber-600",
      delay: 0.4,
      onClick: () => openDetailedView("Accuracy Analytics", "performance"),
    },
  ];

  return (
    <div className="space-y-6 relative">
      {/* Background decorative elements */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-primary/5 rounded-full filter blur-3xl -z-10 transform translate-x-1/2 -translate-y-1/2"></div>
      <div className="absolute bottom-0 left-0 w-96 h-96 bg-secondary/5 rounded-full filter blur-3xl -z-10 transform -translate-x-1/2 translate-y-1/2"></div>

      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <h1 className="text-3xl font-bold tracking-tight bg-clip-text text-transparent bg-gradient-to-r from-primary to-purple-600">
            Dashboard
          </h1>
          <p className="text-muted-foreground">
            Overview of your AI chat system performance and activity.
          </p>
        </motion.div>
        <motion.div
          className="flex items-center gap-2 flex-wrap justify-end"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
        >
          {/* Time range selector */}
          <Select value={timeRange} onValueChange={setTimeRange}>
            <SelectTrigger className="w-[140px]">
              <Calendar className="mr-2 h-4 w-4" />
              <SelectValue placeholder="Select range" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="24h">Last 24 hours</SelectItem>
              <SelectItem value="7d">Last 7 days</SelectItem>
              <SelectItem value="30d">Last 30 days</SelectItem>
              <SelectItem value="90d">Last 90 days</SelectItem>
              <SelectItem value="custom">Custom range</SelectItem>
            </SelectContent>
          </Select>

          {/* Filter button with popover */}
          <Popover>
            <PopoverTrigger asChild>
              <Button variant="outline" size="sm" className="group">
                <Filter className="mr-2 h-4 w-4" />
                Filters
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-80">
              <div className="space-y-4">
                <h4 className="font-medium">Filter Dashboard</h4>
                <div className="space-y-2">
                  <h5 className="text-sm font-medium">Data Source</h5>
                  <Select defaultValue="all">
                    <SelectTrigger>
                      <SelectValue placeholder="Select source" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">All Sources</SelectItem>
                      <SelectItem value="website">Website</SelectItem>
                      <SelectItem value="mobile">Mobile App</SelectItem>
                      <SelectItem value="api">API</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <h5 className="text-sm font-medium">AI Model</h5>
                  <Select defaultValue="all">
                    <SelectTrigger>
                      <SelectValue placeholder="Select model" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">All Models</SelectItem>
                      <SelectItem value="gemini">Gemini</SelectItem>
                      <SelectItem value="mistral">Mistral</SelectItem>
                      <SelectItem value="llama">Llama</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="flex justify-end gap-2">
                  <Button variant="outline" size="sm">
                    Reset
                  </Button>
                  <Button size="sm">Apply Filters</Button>
                </div>
              </div>
            </PopoverContent>
          </Popover>

          <Button
            variant="outline"
            size="sm"
            className="group"
            onClick={handleRefresh}
            disabled={isRefreshing}
          >
            <RefreshCw
              className={`mr-2 h-4 w-4 ${isRefreshing ? "animate-spin" : "group-hover:rotate-180 transition-transform duration-500"}`}
            />
            {isRefreshing ? "Refreshing..." : "Refresh"}
          </Button>

          <Button variant="outline" size="sm">
            <Download className="mr-2 h-4 w-4" />
            Export
          </Button>

          <Button
            size="sm"
            className="relative overflow-hidden group"
            onClick={() => openDetailedView("Comprehensive Reports", "users")}
          >
            <span className="relative z-10">View Reports</span>
            <span className="absolute inset-0 bg-primary/20 transform translate-y-full group-hover:translate-y-0 transition-transform"></span>
          </Button>
        </motion.div>
      </div>

      {/* Stats Cards */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        {stats.map((stat, index) => (
          <StatCard key={index} {...stat} />
        ))}
      </div>

      {/* Main Content */}
      <div className="grid gap-6 md:grid-cols-7">
        {/* Activity Chart */}
        <div className="md:col-span-4">
          <OverviewChart
            onViewDetails={() =>
              openDetailedView("Detailed Overview", "conversations")
            }
          />
        </div>

        {/* Recent Activity */}
        <div className="md:col-span-3">
          <RecentActivityCard
            onViewAll={() => openDetailedView("All Activity", "conversations")}
          />
        </div>
      </div>

      {/* Bottom Section */}
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {/* Top Queries */}
        <div>
          <TopQueriesCard
            onViewDetails={() => openDetailedView("Query Analysis", "queries")}
          />
        </div>

        {/* AI Performance */}
        <div>
          <AIPerformanceCard
            onViewDetails={() =>
              openDetailedView("AI Performance Analysis", "performance")
            }
          />
        </div>

        {/* Quick Actions */}
        <div>
          <QuickActionsCard />
        </div>
      </div>

      {/* Floating action button */}
      <motion.div
        className="fixed bottom-6 right-6 z-10"
        initial={{ opacity: 0, scale: 0 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 1, type: "spring" }}
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
      >
        <Button
          size="lg"
          className="rounded-full w-12 h-12 p-0 bg-gradient-to-r from-primary to-purple-600 shadow-lg shadow-primary/20"
        >
          <ChevronRight className="h-6 w-6" />
        </Button>
      </motion.div>

      {/* Detailed View Dialog */}
      <DetailedView
        open={detailedView.open}
        onClose={() => setDetailedView((prev) => ({ ...prev, open: false }))}
        title={detailedView.title}
        type={detailedView.type}
        data={detailedView.data}
      />
    </div>
  );
};

export default Dashboard;

// Import the icons used in the stats
import { Users, MessageSquare, Clock, Zap } from "lucide-react";
