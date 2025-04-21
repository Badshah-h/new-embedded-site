import React, { useState } from "react";
import { CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { motion } from "framer-motion";
import { ArrowUpRight, Info } from "lucide-react";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import GlassCard from "./GlassCard";

interface ModelItem {
  model: string;
  accuracy: number;
  usage: number;
}

interface AIPerformanceCardProps {
  onViewDetails?: () => void;
}

const AIPerformanceCard = ({ onViewDetails }: AIPerformanceCardProps) => {
  const [selectedModel, setSelectedModel] = useState<string | null>(null);

  const models: ModelItem[] = [
    { model: "Gemini Pro", accuracy: 94.2, usage: 68 },
    { model: "Hugging Face - Mistral", accuracy: 91.7, usage: 22 },
    { model: "Hugging Face - Llama", accuracy: 89.5, usage: 10 },
  ];

  const handleModelClick = (model: string) => {
    setSelectedModel(model);
    // Could show more details about this specific model
    if (onViewDetails) onViewDetails();
  };

  return (
    <GlassCard delay={0.4}>
      <CardHeader>
        <div className="flex justify-between items-center">
          <div className="flex items-center gap-2">
            <CardTitle>AI Model Performance</CardTitle>
            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger asChild>
                  <Info className="h-4 w-4 text-muted-foreground cursor-help" />
                </TooltipTrigger>
                <TooltipContent>
                  <p>Click on any model for detailed performance metrics</p>
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
        <div className="space-y-6">
          {models.map((model, index) => (
            <motion.div
              key={index}
              className="space-y-2 cursor-pointer"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{
                duration: 0.5,
                delay: 0.5 + index * 0.1,
                ease: "easeOut",
              }}
              onClick={() => handleModelClick(model.model)}
              whileHover={{ x: 5 }}
              whileTap={{ scale: 0.98 }}
            >
              <div className="flex items-center justify-between">
                <p className="text-sm font-medium">{model.model}</p>
                <div className="flex items-center gap-2">
                  <Badge
                    variant="outline"
                    className="bg-primary/10 text-primary"
                  >
                    {model.accuracy}%
                  </Badge>
                  <span className="text-xs text-muted-foreground">
                    {model.usage}% usage
                  </span>
                </div>
              </div>
              <div className="relative">
                <Progress value={0} className="h-1 bg-muted" />
                <motion.div
                  className="absolute top-0 left-0 h-1 bg-gradient-to-r from-primary/60 to-primary rounded-full"
                  initial={{ width: 0 }}
                  animate={{ width: `${model.accuracy}%` }}
                  transition={{
                    duration: 1.5,
                    delay: 0.7 + index * 0.1,
                    ease: "easeOut",
                  }}
                />
              </div>
              <div className="h-2"></div>
              <div className="flex justify-between items-center">
                <div className="flex space-x-1">
                  {[...Array(5)].map((_, i) => (
                    <motion.div
                      key={i}
                      className={`w-1 h-4 rounded-full ${i < Math.floor(model.usage / 20) ? "bg-primary" : "bg-muted"}`}
                      initial={{ height: 0 }}
                      animate={{ height: 16 }}
                      transition={{
                        duration: 0.4,
                        delay: 1 + index * 0.1 + i * 0.05,
                      }}
                    />
                  ))}
                </div>
                <div className="text-xs text-muted-foreground">
                  Response time:{" "}
                  {index === 0 ? "0.8s" : index === 1 ? "1.2s" : "1.5s"}
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </CardContent>
    </GlassCard>
  );
};

export default AIPerformanceCard;
