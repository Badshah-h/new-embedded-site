import React, { ReactNode } from "react";
import { cn } from "@/lib/utils";
import { motion } from "framer-motion";

interface GlassCardProps {
  children: ReactNode;
  className?: string;
  hoverEffect?: boolean;
  delay?: number;
}

const GlassCard = ({
  children,
  className,
  hoverEffect = true,
  delay = 0,
}: GlassCardProps) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{
        duration: 0.5,
        delay: delay,
        ease: [0.22, 1, 0.36, 1],
      }}
      className={cn(
        "backdrop-blur-md bg-background/60 dark:bg-background/40 border border-border/40 rounded-xl overflow-hidden",
        hoverEffect &&
          "hover:shadow-xl hover:shadow-primary/10 transition-all duration-300",
        className,
      )}
    >
      {children}
    </motion.div>
  );
};

export default GlassCard;
