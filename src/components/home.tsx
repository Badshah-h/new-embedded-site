import React, { useState } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import ChatWidget from "./chat/ChatWidget";
import WidgetConfigurator from "./admin/WidgetConfigurator";
import { motion } from "framer-motion";
import { Code, Copy, ExternalLink, Settings, Sparkles } from "lucide-react";

const Home = () => {
  const [activeTab, setActiveTab] = useState("preview");
  const [widgetConfig, setWidgetConfig] = useState({
    appearance: {
      primaryColor: "#7c3aed",
      secondaryColor: "#e9d5ff",
      borderRadius: "rounded-lg",
      position: "bottom-right",
      width: "350px",
      height: "500px",
      fontFamily: "Inter, sans-serif",
      darkMode: false,
    },
    branding: {
      logo: "https://api.dicebear.com/7.x/avataaars/svg?seed=chatbot",
      title: "AI Assistant",
      welcomeMessage: "Hello! How can I help you today?",
    },
    behavior: {
      autoOpen: false,
      openDelay: 3,
      notifications: true,
      soundEffects: false,
    },
    ai: {
      model: "gemini-pro",
      temperature: 0.7,
      knowledgeBase: true,
      responseFormatting: true,
    },
  });

  const handleConfigChange = (newConfig) => {
    setWidgetConfig({ ...widgetConfig, ...newConfig });
  };

  const copyEmbedCode = () => {
    const embedCode = `<script src="https://example.com/widget.js" data-widget-id="unique-id" data-primary-color="${widgetConfig.appearance.primaryColor}"></script>`;
    navigator.clipboard.writeText(embedCode);
    // Add a toast or notification if needed
  };

  return (
    <div className="min-h-screen bg-background">
      <header className="border-b bg-card">
        <div className="container mx-auto px-4 py-4 flex justify-between items-center">
          <div className="flex items-center space-x-2">
            <Sparkles className="h-6 w-6 text-primary" />
            <h1 className="text-xl font-bold">Embeddable Chat Widget</h1>
          </div>
          <nav className="flex items-center space-x-4">
            <Button variant="ghost">Documentation</Button>
            <Button variant="ghost">Support</Button>
            <Button variant="outline">Dashboard</Button>
            <Button>Sign In</Button>
          </nav>
        </div>
      </header>

      <main className="container mx-auto px-4 py-8">
        <div className="flex flex-col lg:flex-row gap-8">
          <div className="lg:w-2/3">
            <Card className="h-full">
              <CardHeader>
                <CardTitle>Widget Preview</CardTitle>
                <CardDescription>
                  See how your chat widget will appear on your website.
                </CardDescription>
                <Tabs
                  value={activeTab}
                  onValueChange={setActiveTab}
                  className="w-full"
                >
                  <TabsList className="grid w-full grid-cols-3">
                    <TabsTrigger value="preview">Preview</TabsTrigger>
                    <TabsTrigger value="code">Embed Code</TabsTrigger>
                    <TabsTrigger value="settings">Advanced</TabsTrigger>
                  </TabsList>
                </Tabs>
              </CardHeader>
              <CardContent>
                <TabsContent value="preview">
                  <div className="relative h-[600px] w-full border rounded-lg bg-slate-50 dark:bg-slate-900 overflow-hidden">
                    <div className="absolute p-4 flex items-center justify-between w-full">
                      <span className="text-sm text-muted-foreground">
                        example.com
                      </span>
                      <div className="flex space-x-2">
                        <Button variant="outline" size="sm">
                          <ExternalLink className="h-4 w-4 mr-2" />
                          View Fullscreen
                        </Button>
                      </div>
                    </div>
                    <div className="flex items-center justify-center h-full">
                      <div className="text-center mb-32">
                        <h2 className="text-2xl font-bold mb-4">
                          Your Website Content
                        </h2>
                        <p className="text-muted-foreground mb-8">
                          The chat widget will appear in the corner of your
                          site.
                        </p>
                      </div>
                      <motion.div
                        className="absolute"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ duration: 0.5 }}
                        style={{
                          bottom: widgetConfig.appearance.position.includes(
                            "bottom",
                          )
                            ? "20px"
                            : "auto",
                          top: widgetConfig.appearance.position.includes("top")
                            ? "20px"
                            : "auto",
                          right: widgetConfig.appearance.position.includes(
                            "right",
                          )
                            ? "20px"
                            : "auto",
                          left: widgetConfig.appearance.position.includes(
                            "left",
                          )
                            ? "20px"
                            : "auto",
                        }}
                      >
                        <ChatWidget config={widgetConfig} />
                      </motion.div>
                    </div>
                  </div>
                </TabsContent>

                <TabsContent value="code">
                  <div className="space-y-4">
                    <div className="bg-muted p-4 rounded-md">
                      <div className="flex justify-between items-center mb-2">
                        <h3 className="text-sm font-medium">Embed Code</h3>
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={copyEmbedCode}
                        >
                          <Copy className="h-4 w-4 mr-2" />
                          Copy
                        </Button>
                      </div>
                      <pre className="text-xs overflow-x-auto p-2 bg-card rounded border">
                        {`<script 
  src="https://example.com/widget.js" 
  data-widget-id="unique-id" 
  data-primary-color="${widgetConfig.appearance.primaryColor}"
></script>`}
                      </pre>
                    </div>
                    <div className="space-y-2">
                      <h3 className="text-sm font-medium">
                        Installation Instructions
                      </h3>
                      <ol className="list-decimal list-inside space-y-2 text-sm text-muted-foreground">
                        <li>Copy the embed code above</li>
                        <li>
                          Paste it into the{" "}
                          <code className="bg-muted px-1 rounded">
                            &lt;head&gt;
                          </code>{" "}
                          section of your website
                        </li>
                        <li>
                          The chat widget will automatically appear on your site
                        </li>
                        <li>
                          Any configuration changes made here will be reflected
                          automatically
                        </li>
                      </ol>
                    </div>
                  </div>
                </TabsContent>

                <TabsContent value="settings">
                  <div className="space-y-4">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <Card>
                        <CardHeader className="pb-2">
                          <CardTitle className="text-sm">
                            API Configuration
                          </CardTitle>
                        </CardHeader>
                        <CardContent>
                          <div className="text-sm text-muted-foreground">
                            <p>API Key: ••••••••••••••••</p>
                            <p>Endpoint: api.example.com/v1</p>
                            <Button
                              variant="outline"
                              size="sm"
                              className="mt-2"
                            >
                              <Settings className="h-4 w-4 mr-2" />
                              Manage API Settings
                            </Button>
                          </div>
                        </CardContent>
                      </Card>

                      <Card>
                        <CardHeader className="pb-2">
                          <CardTitle className="text-sm">
                            Usage Statistics
                          </CardTitle>
                        </CardHeader>
                        <CardContent>
                          <div className="text-sm text-muted-foreground">
                            <p>Monthly conversations: 1,245</p>
                            <p>API calls: 8,932</p>
                            <Button
                              variant="outline"
                              size="sm"
                              className="mt-2"
                            >
                              <ExternalLink className="h-4 w-4 mr-2" />
                              View Analytics
                            </Button>
                          </div>
                        </CardContent>
                      </Card>
                    </div>

                    <Card>
                      <CardHeader className="pb-2">
                        <CardTitle className="text-sm">
                          Developer Tools
                        </CardTitle>
                      </CardHeader>
                      <CardContent>
                        <div className="space-y-2">
                          <Button
                            variant="outline"
                            size="sm"
                            className="w-full justify-start"
                          >
                            <Code className="h-4 w-4 mr-2" />
                            REST API Documentation
                          </Button>
                          <Button
                            variant="outline"
                            size="sm"
                            className="w-full justify-start"
                          >
                            <Code className="h-4 w-4 mr-2" />
                            Webhook Configuration
                          </Button>
                          <Button
                            variant="outline"
                            size="sm"
                            className="w-full justify-start"
                          >
                            <Code className="h-4 w-4 mr-2" />
                            Custom JavaScript Events
                          </Button>
                        </div>
                      </CardContent>
                    </Card>
                  </div>
                </TabsContent>
              </CardContent>
            </Card>
          </div>

          <div className="lg:w-1/3">
            <WidgetConfigurator
              config={widgetConfig}
              onChange={handleConfigChange}
            />
          </div>
        </div>
      </main>
    </div>
  );
};

export default Home;
