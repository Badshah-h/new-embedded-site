import React, { useState } from "react";
import { CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";
import { ArrowUpRight } from "lucide-react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import GlassCard from "./GlassCard";
import { useDashboard } from "@/api/hooks";

interface RecentActivityCardProps {
  onViewAll?: () => void;
}

const RecentActivityCard = ({ onViewAll }: RecentActivityCardProps) => {
  const [activityFilter, setActivityFilter] = useState("all");
  const [selectedActivity, setSelectedActivity] = useState<string | null>(null);
  const { activities, isLoading } = useDashboard();

  // Filter activities based on selected filter
  const filteredActivities =
    activityFilter === "all"
      ? activities
      : activities.filter((activity) => activity.type === activityFilter);

  const handleActivityClick = (id: string) => {
    setSelectedActivity(id);
    // Could show more details about this specific activity
    if (onViewAll) onViewAll();
  };

  const handleFilterChange = (value: string) => {
    setActivityFilter(value);
  };

  return (
    <GlassCard className="h-full" delay={0.2}>
      <CardHeader className="pb-3">
        <div className="flex justify-between items-center">
          <CardTitle>Recent Activity</CardTitle>
          <div className="flex items-center gap-2">
            <Select value={activityFilter} onValueChange={handleFilterChange}>
              <SelectTrigger className="w-[130px] h-8">
                <SelectValue placeholder="Filter" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Activity</SelectItem>
                <SelectItem value="conversation">Conversations</SelectItem>
                <SelectItem value="user">Users</SelectItem>
                <SelectItem value="ai">AI Updates</SelectItem>
                <SelectItem value="system">System</SelectItem>
              </SelectContent>
            </Select>
            <motion.div
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="flex items-center text-sm text-primary cursor-pointer"
              onClick={onViewAll}
            >
              <span>View All</span>
              <ArrowUpRight className="ml-1 h-4 w-4" />
            </motion.div>
          </div>
        </div>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="space-y-4">
          {isLoading ? (
            <div className="text-center py-4 text-muted-foreground">
              Loading activities...
            </div>
          ) : (
            filteredActivities.map((activity, index) => (
              <motion.div
                key={activity.id}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{
                  duration: 0.5,
                  delay: 0.3 + index * 0.1,
                  ease: "easeOut",
                }}
                className="group cursor-pointer"
                onClick={() => handleActivityClick(activity.id)}
                whileHover={{ x: 5 }}
                whileTap={{ scale: 0.98 }}
              >
                <div className="flex items-center space-x-4 rounded-md border border-border/50 p-3 transition-all group-hover:bg-muted/50 group-hover:border-primary/20 group-hover:shadow-sm">
                  <Avatar className="ring-2 ring-background">
                    <AvatarImage src={activity.user.avatar} />
                    <AvatarFallback>
                      {activity.user.name.substring(0, 2)}
                    </AvatarFallback>
                  </Avatar>
                  <div className="flex-1 space-y-1">
                    <div className="flex items-center gap-2">
                      <p className="text-sm font-medium leading-none">
                        {activity.user.name}
                      </p>
                      <Badge
                        variant="outline"
                        className={`text-xs font-normal ${
                          activity.type === "conversation"
                            ? "bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-400"
                            : activity.type === "user"
                              ? "bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400"
                              : activity.type === "ai"
                                ? "bg-purple-100 text-purple-800 dark:bg-purple-900/30 dark:text-purple-400"
                                : "bg-gray-100 text-gray-800 dark:bg-gray-800 dark:text-gray-400"
                        }`}
                      >
                        {activity.type}
                      </Badge>
                    </div>
                    <p className="text-sm text-muted-foreground">
                      {activity.action}{" "}
                      <span className="font-medium text-foreground">
                        {activity.target}
                      </span>
                    </p>
                    <p className="text-xs text-muted-foreground">
                      {activity.time}
                    </p>
                  </div>
                </div>
              </motion.div>
            ))
          )}

          {filteredActivities.length === 0 && (
            <div className="text-center py-4 text-muted-foreground">
              No activities matching the selected filter
            </div>
          )}
        </div>

        <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
          <Button
            variant="outline"
            className="w-full group relative overflow-hidden"
            onClick={onViewAll}
          >
            <span className="relative z-10">View All Activity</span>
            <span className="absolute inset-0 bg-primary/10 transform scale-x-0 group-hover:scale-x-100 transition-transform origin-left"></span>
          </Button>
        </motion.div>
      </CardContent>
    </GlassCard>
  );
};

export default RecentActivityCard;
