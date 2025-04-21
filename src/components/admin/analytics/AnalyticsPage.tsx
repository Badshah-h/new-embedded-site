import React, { useState, useEffect } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

// Import modular components
import AnalyticsHeader from "./components/AnalyticsHeader";
import OverviewTab from "./components/OverviewTab";
import ConversationsTab from "./components/ConversationsTab";
import UsersTab from "./components/UsersTab";
import AIPerformanceTab from "./components/AIPerformanceTab";

const AnalyticsPage = () => {
  const [timeRange, setTimeRange] = useState("7d");
  const [isDarkMode, setIsDarkMode] = useState(false);

  // Set initial dark mode based on system preference
  useEffect(() => {
    const isDark = window.matchMedia("(prefers-color-scheme: dark)").matches;
    setIsDarkMode(isDark);
    if (isDark) {
      document.documentElement.classList.add("dark");
    }
  }, []);

  // Toggle dark mode
  const toggleDarkMode = () => {
    setIsDarkMode(!isDarkMode);
    document.documentElement.classList.toggle("dark");
  };

  return (
    <div className="space-y-6">
      <AnalyticsHeader
        timeRange={timeRange}
        setTimeRange={setTimeRange}
        isDarkMode={isDarkMode}
        toggleDarkMode={toggleDarkMode}
      />

      <Tabs defaultValue="overview" className="space-y-6">
        <TabsList className="grid w-full grid-cols-4 md:w-auto">
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="conversations">Conversations</TabsTrigger>
          <TabsTrigger value="users">Users</TabsTrigger>
          <TabsTrigger value="ai-performance">AI Performance</TabsTrigger>
        </TabsList>

        <TabsContent value="overview">
          <OverviewTab />
        </TabsContent>

        <TabsContent value="conversations">
          <ConversationsTab />
        </TabsContent>

        <TabsContent value="users">
          <UsersTab />
        </TabsContent>

        <TabsContent value="ai-performance">
          <AIPerformanceTab />
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default AnalyticsPage;
