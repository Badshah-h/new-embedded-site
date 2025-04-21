import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Progress } from "@/components/ui/progress";
import {
  ArrowUpRight,
  BarChart3,
  Clock,
  Download,
  MessageSquare,
  RefreshCw,
  Users,
  Zap,
} from "lucide-react";

const Dashboard = () => {
  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Dashboard</h1>
          <p className="text-muted-foreground">
            Overview of your AI chat system performance and activity.
          </p>
        </div>
        <div className="flex items-center gap-2">
          <Button variant="outline" size="sm">
            <RefreshCw className="mr-2 h-4 w-4" />
            Refresh
          </Button>
          <Button variant="outline" size="sm">
            <Download className="mr-2 h-4 w-4" />
            Export
          </Button>
          <Button size="sm">View Reports</Button>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Users</CardTitle>
            <Users className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">12,345</div>
            <p className="text-xs text-muted-foreground">
              <span className="text-green-500 font-medium">+12%</span> from last
              month
            </p>
            <Progress value={65} className="h-1 mt-3" />
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              Active Conversations
            </CardTitle>
            <MessageSquare className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">1,234</div>
            <p className="text-xs text-muted-foreground">
              <span className="text-green-500 font-medium">+18%</span> from last
              month
            </p>
            <Progress value={78} className="h-1 mt-3" />
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              AI Response Time
            </CardTitle>
            <Clock className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">1.2s</div>
            <p className="text-xs text-muted-foreground">
              <span className="text-green-500 font-medium">-0.3s</span> from
              last month
            </p>
            <Progress value={92} className="h-1 mt-3" />
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              AI Accuracy Rate
            </CardTitle>
            <Zap className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">94.2%</div>
            <p className="text-xs text-muted-foreground">
              <span className="text-green-500 font-medium">+2.4%</span> from
              last month
            </p>
            <Progress value={94} className="h-1 mt-3" />
          </CardContent>
        </Card>
      </div>

      {/* Main Content */}
      <div className="grid gap-6 md:grid-cols-7">
        {/* Activity Chart */}
        <Card className="md:col-span-4">
          <CardHeader>
            <CardTitle>Activity Overview</CardTitle>
          </CardHeader>
          <CardContent>
            <Tabs defaultValue="conversations">
              <TabsList className="grid w-full grid-cols-3">
                <TabsTrigger value="conversations">Conversations</TabsTrigger>
                <TabsTrigger value="users">Users</TabsTrigger>
                <TabsTrigger value="performance">Performance</TabsTrigger>
              </TabsList>
              <TabsContent value="conversations" className="space-y-4">
                <div className="h-[300px] flex items-center justify-center bg-muted/20 rounded-md mt-4">
                  <div className="text-center">
                    <BarChart3 className="h-10 w-10 text-muted-foreground mx-auto mb-2" />
                    <p className="text-muted-foreground">
                      Conversation volume chart would appear here
                    </p>
                  </div>
                </div>
              </TabsContent>
              <TabsContent value="users" className="space-y-4">
                <div className="h-[300px] flex items-center justify-center bg-muted/20 rounded-md mt-4">
                  <div className="text-center">
                    <BarChart3 className="h-10 w-10 text-muted-foreground mx-auto mb-2" />
                    <p className="text-muted-foreground">
                      User growth chart would appear here
                    </p>
                  </div>
                </div>
              </TabsContent>
              <TabsContent value="performance" className="space-y-4">
                <div className="h-[300px] flex items-center justify-center bg-muted/20 rounded-md mt-4">
                  <div className="text-center">
                    <BarChart3 className="h-10 w-10 text-muted-foreground mx-auto mb-2" />
                    <p className="text-muted-foreground">
                      AI performance metrics would appear here
                    </p>
                  </div>
                </div>
              </TabsContent>
            </Tabs>
          </CardContent>
        </Card>

        {/* Recent Activity */}
        <Card className="md:col-span-3">
          <CardHeader>
            <CardTitle>Recent Activity</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {/* Activity Items */}
              {[
                {
                  type: "conversation",
                  user: "Sarah Johnson",
                  action: "started a new conversation",
                  time: "2 minutes ago",
                  avatar:
                    "https://api.dicebear.com/7.x/avataaars/svg?seed=Sarah",
                },
                {
                  type: "user",
                  user: "Michael Chen",
                  action: "registered a new account",
                  time: "15 minutes ago",
                  avatar:
                    "https://api.dicebear.com/7.x/avataaars/svg?seed=Michael",
                },
                {
                  type: "ai",
                  user: "AI Assistant",
                  action: "was updated to version 2.4",
                  time: "1 hour ago",
                  avatar: "https://api.dicebear.com/7.x/bottts/svg?seed=AI",
                },
                {
                  type: "conversation",
                  user: "Emily Rodriguez",
                  action: "completed a conversation with 5-star rating",
                  time: "3 hours ago",
                  avatar:
                    "https://api.dicebear.com/7.x/avataaars/svg?seed=Emily",
                },
                {
                  type: "system",
                  user: "System",
                  action: "performed knowledge base update",
                  time: "5 hours ago",
                  avatar: "https://api.dicebear.com/7.x/bottts/svg?seed=System",
                },
              ].map((activity, index) => (
                <div
                  key={index}
                  className="flex items-center space-x-4 rounded-md border p-3"
                >
                  <Avatar>
                    <AvatarImage src={activity.avatar} />
                    <AvatarFallback>
                      {activity.user.substring(0, 2)}
                    </AvatarFallback>
                  </Avatar>
                  <div className="flex-1 space-y-1">
                    <div className="flex items-center gap-2">
                      <p className="text-sm font-medium leading-none">
                        {activity.user}
                      </p>
                      <Badge variant="outline" className="text-xs font-normal">
                        {activity.type}
                      </Badge>
                    </div>
                    <p className="text-sm text-muted-foreground">
                      {activity.action}
                    </p>
                    <p className="text-xs text-muted-foreground">
                      {activity.time}
                    </p>
                  </div>
                </div>
              ))}

              <Button variant="outline" className="w-full">
                View All Activity
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Bottom Section */}
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {/* Top Queries */}
        <Card>
          <CardHeader>
            <CardTitle>Top Queries</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {[
                { query: "How do I reset my password?", count: 342 },
                { query: "What are your business hours?", count: 271 },
                { query: "How to upgrade my subscription?", count: 234 },
                { query: "Where is my order?", count: 198 },
                { query: "How to contact support?", count: 157 },
              ].map((item, index) => (
                <div
                  key={index}
                  className="flex items-center justify-between space-x-4"
                >
                  <div className="space-y-1">
                    <p className="text-sm font-medium leading-none">
                      {item.query}
                    </p>
                  </div>
                  <Badge variant="secondary">{item.count}</Badge>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* AI Performance */}
        <Card>
          <CardHeader>
            <CardTitle>AI Model Performance</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {[
                { model: "Gemini Pro", accuracy: 94.2, usage: 68 },
                { model: "Hugging Face - Mistral", accuracy: 91.7, usage: 22 },
                { model: "Hugging Face - Llama", accuracy: 89.5, usage: 10 },
              ].map((model, index) => (
                <div key={index} className="space-y-2">
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
                  <Progress value={model.accuracy} className="h-1" />
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Quick Actions */}
        <Card>
          <CardHeader>
            <CardTitle>Quick Actions</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-2 gap-4">
              <Button className="w-full justify-start">
                <Users className="mr-2 h-4 w-4" />
                <span>Manage Users</span>
              </Button>
              <Button className="w-full justify-start">
                <MessageSquare className="mr-2 h-4 w-4" />
                <span>View Chats</span>
              </Button>
              <Button className="w-full justify-start">
                <Zap className="mr-2 h-4 w-4" />
                <span>AI Settings</span>
              </Button>
              <Button className="w-full justify-start">
                <ArrowUpRight className="mr-2 h-4 w-4" />
                <span>View Widget</span>
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Dashboard;
