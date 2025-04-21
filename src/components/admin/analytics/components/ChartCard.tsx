import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { LucideIcon } from "lucide-react";

interface ChartCardProps {
  title: string;
  height?: number;
  icon: LucideIcon;
  description?: string;
}

const ChartCard = ({
  title,
  height = 300,
  icon: Icon,
  description = "Chart would appear here",
}: ChartCardProps) => {
  return (
    <Card>
      <CardHeader>
        <CardTitle>{title}</CardTitle>
      </CardHeader>
      <CardContent>
        <div
          className="flex items-center justify-center bg-muted/20 rounded-md"
          style={{ height: `${height}px` }}
        >
          <div className="text-center">
            <Icon className="h-10 w-10 text-muted-foreground mx-auto mb-2" />
            <p className="text-muted-foreground">{description}</p>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default ChartCard;
