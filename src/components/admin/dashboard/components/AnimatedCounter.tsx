import React, { useEffect, useRef, useState } from "react";
import { motion, useInView, useAnimation } from "framer-motion";

interface AnimatedCounterProps {
  value: string;
  duration?: number;
  className?: string;
}

const AnimatedCounter = ({
  value,
  duration = 1.5,
  className = "",
}: AnimatedCounterProps) => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true });
  const controls = useAnimation();
  const [displayValue, setDisplayValue] = useState("0");

  useEffect(() => {
    if (isInView) {
      controls.start("visible");

      // Handle numeric values with commas
      const numericValue = value.replace(/,/g, "");
      const isNumeric = !isNaN(Number(numericValue));

      if (isNumeric) {
        const endValue = parseInt(numericValue, 10);
        const startTime = Date.now();
        const endTime = startTime + duration * 1000;

        const updateCounter = () => {
          const now = Date.now();
          const progress = Math.min(
            (now - startTime) / (endTime - startTime),
            1,
          );
          const currentValue = Math.floor(endValue * progress);

          // Format with commas if original had commas
          if (value.includes(",")) {
            setDisplayValue(currentValue.toLocaleString());
          } else {
            setDisplayValue(currentValue.toString());
          }

          if (progress < 1) {
            requestAnimationFrame(updateCounter);
          } else {
            setDisplayValue(value); // Ensure final value matches exactly
          }
        };

        requestAnimationFrame(updateCounter);
      } else {
        // For non-numeric values (like "1.2s"), just display the value
        setDisplayValue(value);
      }
    }
  }, [isInView, value, controls, duration]);

  return (
    <motion.span
      ref={ref}
      initial="hidden"
      animate={controls}
      variants={{
        hidden: { opacity: 0, y: 10 },
        visible: { opacity: 1, y: 0 },
      }}
      transition={{ duration: 0.5 }}
      className={className}
    >
      {displayValue}
    </motion.span>
  );
};

export default AnimatedCounter;
