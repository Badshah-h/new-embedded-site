import React, { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { BarChart3, LineChart, ArrowUpRight, Info } from "lucide-react";
import { motion } from "framer-motion";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import GlassCard from "./GlassCard";

interface OverviewChartProps {
  onViewDetails?: () => void;
}

const OverviewChart = ({ onViewDetails }: OverviewChartProps) => {
  const [activeTab, setActiveTab] = useState("conversations");
  const [hoveredBar, setHoveredBar] = useState<number | null>(null);

  // Mock data for visualization
  const conversationData = [
    { month: "Jan", value: 65 },
    { month: "Feb", value: 45 },
    { month: "Mar", value: 75 },
    { month: "Apr", value: 55 },
    { month: "May", value: 85 },
    { month: "Jun", value: 70 },
    { month: "Jul", value: 90 },
  ];

  const userData = [
    { month: "Jan", value: 30 },
    { month: "Feb", value: 40 },
    { month: "Mar", value: 45 },
    { month: "Apr", value: 60 },
    { month: "May", value: 75 },
    { month: "Jun", value: 85 },
    { month: "Jul", value: 95 },
  ];

  const performanceData = [
    { month: "Jan", value: 80 },
    { month: "Feb", value: 82 },
    { month: "Mar", value: 85 },
    { month: "Apr", value: 88 },
    { month: "May", value: 90 },
    { month: "Jun", value: 92 },
    { month: "Jul", value: 94 },
  ];

  const getActiveData = () => {
    switch (activeTab) {
      case "conversations":
        return conversationData;
      case "users":
        return userData;
      case "performance":
        return performanceData;
      default:
        return conversationData;
    }
  };

  const maxValue = Math.max(...getActiveData().map((item) => item.value));

  return (
    <GlassCard className="h-full" delay={0.1}>
      <CardHeader className="pb-3">
        <div className="flex justify-between items-center">
          <div className="flex items-center gap-2">
            <CardTitle>Overview</CardTitle>
            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger asChild>
                  <Info className="h-4 w-4 text-muted-foreground cursor-help" />
                </TooltipTrigger>
                <TooltipContent>
                  <p>Click on any bar for detailed information</p>
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>
          </div>
          <motion.div
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="flex items-center text-sm text-primary cursor-pointer"
            onClick={onViewDetails}
          >
            <span>View Details</span>
            <ArrowUpRight className="ml-1 h-4 w-4" />
          </motion.div>
        </div>
      </CardHeader>
      <CardContent>
        <Tabs value={activeTab} onValueChange={setActiveTab}>
          <TabsList className="grid w-full grid-cols-3 mb-6">
            <TabsTrigger value="conversations">Conversations</TabsTrigger>
            <TabsTrigger value="users">Users</TabsTrigger>
            <TabsTrigger value="performance">Performance</TabsTrigger>
          </TabsList>

          <div className="h-[300px] relative">
            <div className="absolute inset-0 flex items-end justify-between px-2">
              {getActiveData().map((item, index) => (
                <div key={index} className="flex flex-col items-center w-1/7">
                  <motion.div
                    initial={{ height: 0 }}
                    animate={{ height: `${(item.value / maxValue) * 220}px` }}
                    transition={{
                      duration: 0.8,
                      delay: index * 0.1,
                      ease: "easeOut",
                    }}
                    className="w-12 bg-gradient-to-t from-primary/60 to-primary rounded-t-lg relative group cursor-pointer"
                    onMouseEnter={() => setHoveredBar(index)}
                    onMouseLeave={() => setHoveredBar(null)}
                    onClick={() => {
                      // Handle bar click - could show detailed data for this specific month
                      if (onViewDetails) onViewDetails();
                    }}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    <motion.div
                      initial={{ opacity: 0, y: -10 }}
                      animate={{
                        opacity: hoveredBar === index ? 1 : 0,
                        y: hoveredBar === index ? 0 : -10,
                      }}
                      className="absolute -top-10 left-1/2 transform -translate-x-1/2 bg-primary text-primary-foreground px-2 py-1 rounded text-xs z-10 min-w-[60px] text-center"
                    >
                      <div className="font-bold">{item.value}</div>
                      <div className="text-[10px]">{item.month}</div>
                    </motion.div>
                  </motion.div>
                  <span className="text-xs text-muted-foreground mt-2">
                    {item.month}
                  </span>
                </div>
              ))}
            </div>
          </div>

          <div className="flex justify-between mt-4 text-sm text-muted-foreground">
            <div>
              <div className="flex items-center">
                <div className="w-3 h-3 rounded-full bg-primary mr-2"></div>
                <span>
                  {activeTab === "conversations"
                    ? "Total Conversations"
                    : activeTab === "users"
                      ? "Active Users"
                      : "AI Accuracy"}
                </span>
              </div>
            </div>
            <div>
              <span className="font-medium">
                {activeTab === "conversations"
                  ? "+24.5%"
                  : activeTab === "users"
                    ? "+32.7%"
                    : "+8.3%"}
              </span>{" "}
              vs last period
            </div>
          </div>
        </Tabs>
      </CardContent>
    </GlassCard>
  );
};

export default OverviewChart;
