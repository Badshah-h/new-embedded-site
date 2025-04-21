import React, { ReactNode } from "react";
import { cn } from "@/lib/utils";
import { motion } from "framer-motion";

interface GradientCardProps {
  children: ReactNode;
  className?: string;
  gradient?: string;
  hoverEffect?: boolean;
  onClick?: () => void;
}

const GradientCard = ({
  children,
  className,
  gradient = "from-purple-500 to-indigo-600",
  hoverEffect = true,
  onClick,
}: GradientCardProps) => {
  return (
    <motion.div
      className={cn(
        "relative overflow-hidden rounded-xl bg-gradient-to-br p-0.5 transition-all",
        gradient,
        hoverEffect && "hover:shadow-lg hover:shadow-primary/20",
        onClick && "cursor-pointer",
        className,
      )}
      onClick={onClick}
      whileHover={onClick ? { scale: 1.02 } : undefined}
      whileTap={onClick ? { scale: 0.98 } : undefined}
    >
      <div className="relative h-full w-full rounded-[0.65rem] bg-background p-5">
        {children}
      </div>
    </motion.div>
  );
};

export default GradientCard;
