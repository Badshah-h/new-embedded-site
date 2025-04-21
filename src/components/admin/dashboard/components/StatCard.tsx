import React from "react";
import { LucideIcon } from "lucide-react";
import { cn } from "@/lib/utils";
import { motion } from "framer-motion";
import AnimatedCounter from "./AnimatedCounter";
import GradientCard from "./GradientCard";

interface StatCardProps {
  title: string;
  value: string;
  description: string;
  icon: LucideIcon;
  trend: "up" | "down" | "neutral";
  trendValue: string;
  iconColor?: string;
  iconBgColor?: string;
  gradient?: string;
  delay?: number;
  onClick?: () => void;
}

const StatCard = ({
  title,
  value,
  description,
  icon: Icon,
  trend,
  trendValue,
  iconColor = "text-primary",
  iconBgColor = "bg-primary/10",
  gradient,
  delay = 0,
  onClick,
}: StatCardProps) => {
  return (
    <GradientCard
      gradient={gradient}
      className={onClick ? "cursor-pointer" : ""}
      onClick={onClick}
    >
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{
          duration: 0.5,
          delay: delay,
          ease: [0.22, 1, 0.36, 1],
        }}
        className="p-1 relative group"
        whileHover={onClick ? { y: -5 } : undefined}
      >
        {/* Subtle indicator for clickable cards */}
        {onClick && (
          <div className="absolute inset-0 bg-primary/5 opacity-0 group-hover:opacity-100 transition-opacity rounded-[0.65rem]"></div>
        )}

        <div className="flex items-start justify-between">
          <div>
            <p className="text-sm font-medium text-muted-foreground">{title}</p>
            <h3 className="mt-2 text-3xl font-bold">
              <AnimatedCounter value={value} />
            </h3>
            <p className="mt-1 text-sm text-muted-foreground">{description}</p>
          </div>
          <div
            className={cn(
              "flex h-12 w-12 items-center justify-center rounded-full transition-transform group-hover:scale-110",
              iconBgColor,
            )}
          >
            <Icon className={cn("h-6 w-6", iconColor)} />
          </div>
        </div>
        <div className="mt-4 flex items-center">
          <span
            className={cn(
              "inline-flex items-center rounded-full px-2 py-1 text-xs font-medium",
              {
                "bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400":
                  trend === "up",
                "bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-400":
                  trend === "down",
                "bg-gray-100 text-gray-800 dark:bg-gray-800 dark:text-gray-400":
                  trend === "neutral",
              },
            )}
          >
            {trend === "up" && "↑"}
            {trend === "down" && "↓"}
            {trendValue}
          </span>
          <span className="ml-2 text-sm text-muted-foreground">
            vs previous period
          </span>
        </div>

        {/* Click to view details indicator */}
        {onClick && (
          <div className="absolute bottom-1 right-1 text-xs text-primary opacity-0 group-hover:opacity-100 transition-opacity">
            Click for details
          </div>
        )}
      </motion.div>
    </GradientCard>
  );
};

export default StatCard;
