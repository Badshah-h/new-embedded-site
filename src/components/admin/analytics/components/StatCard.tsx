import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";

interface StatCardProps {
  title: string;
  value: string;
  change: string;
  positive: boolean;
  progress: number;
}

const StatCard = ({
  title,
  value,
  change,
  positive,
  progress,
}: StatCardProps) => {
  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="text-sm font-medium">{title}</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="text-2xl font-bold">{value}</div>
        <p className="text-xs text-muted-foreground">
          <span
            className={`font-medium ${positive ? "text-green-500" : "text-red-500"}`}
          >
            {change}
          </span>{" "}
          from previous period
        </p>
        <Progress value={progress} className="h-1 mt-3" />
      </CardContent>
    </Card>
  );
};

export default StatCard;
