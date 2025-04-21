import React from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { motion } from "framer-motion";
import { ArrowLeft, Download, Share2 } from "lucide-react";

interface DetailedViewProps {
  open: boolean;
  onClose: () => void;
  title: string;
  type: "users" | "conversations" | "queries" | "performance";
  data?: any;
}

const DetailedView = ({
  open,
  onClose,
  title,
  type,
  data,
}: DetailedViewProps) => {
  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="max-w-4xl max-h-[80vh] overflow-y-auto">
        <DialogHeader>
          <div className="flex items-center gap-2">
            <Button
              variant="ghost"
              size="icon"
              onClick={onClose}
              className="h-8 w-8"
            >
              <ArrowLeft className="h-4 w-4" />
            </Button>
            <DialogTitle className="text-xl">{title}</DialogTitle>
          </div>
          <DialogDescription>
            Detailed information and analytics for {type}
          </DialogDescription>
        </DialogHeader>

        <Tabs defaultValue="overview" className="mt-4">
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="overview">Overview</TabsTrigger>
            <TabsTrigger value="trends">Trends</TabsTrigger>
            <TabsTrigger value="details">Details</TabsTrigger>
            <TabsTrigger value="export">Export</TabsTrigger>
          </TabsList>

          <TabsContent value="overview" className="space-y-4 mt-4">
            <div className="bg-muted/40 rounded-lg p-6 text-center">
              {type === "users" && (
                <div className="space-y-4">
                  <h3 className="text-lg font-medium">
                    User Growth & Engagement
                  </h3>
                  <p className="text-muted-foreground">
                    Interactive user growth chart would appear here
                  </p>
                  <div className="h-[300px] flex items-center justify-center border border-dashed rounded-md">
                    <p className="text-muted-foreground">
                      User growth visualization
                    </p>
                  </div>
                </div>
              )}

              {type === "conversations" && (
                <div className="space-y-4">
                  <h3 className="text-lg font-medium">
                    Conversation Analytics
                  </h3>
                  <p className="text-muted-foreground">
                    Detailed conversation metrics would appear here
                  </p>
                  <div className="h-[300px] flex items-center justify-center border border-dashed rounded-md">
                    <p className="text-muted-foreground">
                      Conversation metrics visualization
                    </p>
                  </div>
                </div>
              )}

              {type === "queries" && (
                <div className="space-y-4">
                  <h3 className="text-lg font-medium">Query Analysis</h3>
                  <p className="text-muted-foreground">
                    Detailed query analysis would appear here
                  </p>
                  <div className="h-[300px] flex items-center justify-center border border-dashed rounded-md">
                    <p className="text-muted-foreground">
                      Query patterns visualization
                    </p>
                  </div>
                </div>
              )}

              {type === "performance" && (
                <div className="space-y-4">
                  <h3 className="text-lg font-medium">
                    AI Performance Metrics
                  </h3>
                  <p className="text-muted-foreground">
                    Detailed AI performance metrics would appear here
                  </p>
                  <div className="h-[300px] flex items-center justify-center border border-dashed rounded-md">
                    <p className="text-muted-foreground">
                      AI performance visualization
                    </p>
                  </div>
                </div>
              )}
            </div>
          </TabsContent>

          <TabsContent value="trends" className="space-y-4 mt-4">
            <div className="bg-muted/40 rounded-lg p-6 text-center">
              <h3 className="text-lg font-medium">Trend Analysis</h3>
              <p className="text-muted-foreground">
                Historical trends and patterns would appear here
              </p>
              <div className="h-[300px] flex items-center justify-center border border-dashed rounded-md">
                <p className="text-muted-foreground">Trend visualization</p>
              </div>
            </div>
          </TabsContent>

          <TabsContent value="details" className="space-y-4 mt-4">
            <div className="bg-muted/40 rounded-lg p-6 text-center">
              <h3 className="text-lg font-medium">Detailed Data</h3>
              <p className="text-muted-foreground">
                Detailed data table would appear here
              </p>
              <div className="h-[300px] flex items-center justify-center border border-dashed rounded-md">
                <p className="text-muted-foreground">Data table</p>
              </div>
            </div>
          </TabsContent>

          <TabsContent value="export" className="space-y-4 mt-4">
            <div className="bg-muted/40 rounded-lg p-6">
              <h3 className="text-lg font-medium text-center mb-4">
                Export Options
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <motion.div
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  <Button
                    variant="outline"
                    className="w-full justify-start h-auto py-3"
                  >
                    <Download className="mr-2 h-4 w-4" />
                    Export as CSV
                  </Button>
                </motion.div>
                <motion.div
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  <Button
                    variant="outline"
                    className="w-full justify-start h-auto py-3"
                  >
                    <Download className="mr-2 h-4 w-4" />
                    Export as PDF
                  </Button>
                </motion.div>
                <motion.div
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  <Button
                    variant="outline"
                    className="w-full justify-start h-auto py-3"
                  >
                    <Download className="mr-2 h-4 w-4" />
                    Export as Excel
                  </Button>
                </motion.div>
                <motion.div
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  <Button
                    variant="outline"
                    className="w-full justify-start h-auto py-3"
                  >
                    <Share2 className="mr-2 h-4 w-4" />
                    Share Report
                  </Button>
                </motion.div>
              </div>
            </div>
          </TabsContent>
        </Tabs>

        <DialogFooter className="mt-6">
          <Button variant="outline" onClick={onClose}>
            Close
          </Button>
          <Button>Save Changes</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default DetailedView;
