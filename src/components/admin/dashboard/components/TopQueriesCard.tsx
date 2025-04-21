import React, { useState } from "react";
import { CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { motion } from "framer-motion";
import { ArrowUpRight, Search } from "lucide-react";
import { Input } from "@/components/ui/input";
import GlassCard from "./GlassCard";

interface QueryItem {
  query: string;
  count: number;
}

interface TopQueriesCardProps {
  onViewDetails?: () => void;
}

const TopQueriesCard = ({ onViewDetails }: TopQueriesCardProps) => {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedQuery, setSelectedQuery] = useState<string | null>(null);

  const allQueries: QueryItem[] = [
    { query: "How do I reset my password?", count: 342 },
    { query: "What are your business hours?", count: 271 },
    { query: "How to upgrade my subscription?", count: 234 },
    { query: "Where is my order?", count: 198 },
    { query: "How to contact support?", count: 157 },
    { query: "Do you offer refunds?", count: 143 },
    { query: "How to change my email?", count: 128 },
    { query: "What payment methods do you accept?", count: 112 },
  ];

  // Filter queries based on search
  const queries = allQueries
    .filter((q) => q.query.toLowerCase().includes(searchQuery.toLowerCase()))
    .slice(0, 5);

  // Calculate max count for visualization
  const maxCount = Math.max(...queries.map((q) => q.count));

  const handleQueryClick = (query: string) => {
    setSelectedQuery(query);
    // Could show more details about this specific query
    if (onViewDetails) onViewDetails();
  };

  return (
    <GlassCard delay={0.3}>
      <CardHeader className="pb-3">
        <div className="flex justify-between items-center">
          <CardTitle>Top Queries</CardTitle>
          <motion.div
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="flex items-center text-sm text-primary cursor-pointer"
            onClick={onViewDetails}
          >
            <span>View All</span>
            <ArrowUpRight className="ml-1 h-4 w-4" />
          </motion.div>
        </div>
      </CardHeader>
      <CardContent>
        <div className="relative mb-4">
          <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Search queries..."
            className="pl-8"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>

        <div className="space-y-4">
          {queries.length > 0 ? (
            queries.map((item, index) => {
              const percentage = (item.count / maxCount) * 100;
              return (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{
                    duration: 0.5,
                    delay: 0.4 + index * 0.1,
                    ease: "easeOut",
                  }}
                  className="relative group cursor-pointer"
                  onClick={() => handleQueryClick(item.query)}
                  whileHover={{ x: 5 }}
                  whileTap={{ scale: 0.98 }}
                >
                  <div className="flex items-center justify-between space-x-4 transition-all hover:bg-muted/50 p-2 rounded-md relative z-10">
                    <div className="space-y-1 z-10 relative">
                      <p className="text-sm font-medium leading-none group-hover:text-primary transition-colors">
                        {item.query}
                      </p>
                    </div>
                    <Badge variant="secondary" className="z-10 relative">
                      {item.count}
                    </Badge>
                  </div>
                  <motion.div
                    initial={{ width: 0 }}
                    animate={{ width: `${percentage}%` }}
                    transition={{
                      duration: 1,
                      delay: 0.6 + index * 0.1,
                      ease: "easeOut",
                    }}
                    className="absolute left-0 top-0 h-full bg-primary/10 rounded-md"
                  />
                </motion.div>
              );
            })
          ) : (
            <div className="text-center py-4 text-muted-foreground">
              No queries matching your search
            </div>
          )}
        </div>
      </CardContent>
    </GlassCard>
  );
};

export default TopQueriesCard;
