import React from "react";
import { CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
  ArrowUpRight,
  MessageSquare,
  Users,
  Zap,
  Settings,
  Plus,
  Upload,
  BarChart3,
  Bot,
} from "lucide-react";
import { motion } from "framer-motion";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import GlassCard from "./GlassCard";

const QuickActionsCard = () => {
  const primaryActions = [
    {
      icon: Users,
      label: "Manage Users",
      color: "from-blue-500 to-blue-600",
      href: "/admin/users",
    },
    {
      icon: MessageSquare,
      label: "View Chats",
      color: "from-indigo-500 to-indigo-600",
      href: "/admin/conversations",
    },
    {
      icon: Zap,
      label: "AI Settings",
      color: "from-purple-500 to-purple-600",
      href: "/admin/settings",
    },
    {
      icon: Settings,
      label: "Configure Widget",
      color: "from-pink-500 to-pink-600",
      href: "/admin/widget",
    },
  ];

  const secondaryActions = [
    { icon: Plus, label: "New Knowledge Base", href: "/admin/knowledge" },
    { icon: Upload, label: "Import Data", href: "/admin/import" },
    { icon: BarChart3, label: "Analytics", href: "/admin/analytics" },
    { icon: Bot, label: "Train AI", href: "/admin/training" },
  ];

  const handleActionClick = (href: string) => {
    window.location.href = href;
  };

  return (
    <GlassCard delay={0.5}>
      <CardHeader>
        <div className="flex justify-between items-center">
          <CardTitle>Quick Actions</CardTitle>
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild>
                <motion.div
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="flex items-center text-sm text-primary cursor-pointer"
                >
                  <span>More</span>
                  <ArrowUpRight className="ml-1 h-4 w-4" />
                </motion.div>
              </TooltipTrigger>
              <TooltipContent>
                <p>View all available actions</p>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
        </div>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            {primaryActions.map((action, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{
                  duration: 0.5,
                  delay: 0.6 + index * 0.1,
                  ease: [0.22, 1, 0.36, 1],
                }}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <Button
                  className="w-full justify-start h-auto py-3 group relative overflow-hidden"
                  variant="outline"
                  onClick={() => handleActionClick(action.href)}
                >
                  <div
                    className={`absolute inset-0 bg-gradient-to-r ${action.color} opacity-0 group-hover:opacity-10 transition-opacity`}
                  ></div>
                  <div className="flex items-center">
                    <div
                      className={`flex items-center justify-center w-8 h-8 rounded-full bg-gradient-to-r ${action.color} text-white mr-3`}
                    >
                      <action.icon className="h-4 w-4" />
                    </div>
                    <span>{action.label}</span>
                  </div>
                </Button>
              </motion.div>
            ))}
          </div>

          <div className="grid grid-cols-2 gap-2">
            {secondaryActions.map((action, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{
                  duration: 0.3,
                  delay: 0.8 + index * 0.1,
                  ease: "easeOut",
                }}
                whileHover={{ y: -2 }}
                whileTap={{ y: 0 }}
              >
                <Button
                  variant="ghost"
                  size="sm"
                  className="w-full justify-start text-muted-foreground hover:text-foreground"
                  onClick={() => handleActionClick(action.href)}
                >
                  <action.icon className="mr-2 h-4 w-4" />
                  {action.label}
                </Button>
              </motion.div>
            ))}
          </div>
        </div>
      </CardContent>
    </GlassCard>
  );
};

export default QuickActionsCard;
