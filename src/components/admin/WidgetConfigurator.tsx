import React, { useState } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
  CardFooter,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import { Slider } from "@/components/ui/slider";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Separator } from "@/components/ui/separator";
import { Textarea } from "@/components/ui/textarea";
import {
  Copy,
  Code,
  Palette,
  Settings,
  MessageSquare,
  Database,
  Zap,
  RefreshCw,
} from "lucide-react";
import ChatWidget from "../chat/ChatWidget";
interface WidgetConfiguratorProps {
  onConfigChange?: (config: any) => void;
}

const WidgetConfigurator = ({
  onConfigChange = () => {},
}: WidgetConfiguratorProps) => {
  const [showPreview, setShowPreview] = useState(true);
  const [config, setConfig] = useState({
    appearance: {
      template: "modern",
      primaryColor: "#7C3AED",
      secondaryColor: "#E9D5FF",
      fontFamily: "Inter",
      borderRadius: 8,
      position: "bottom-right",
      width: 350,
      height: 500,
      darkMode: false,
      logo: "https://api.dicebear.com/7.x/avataaars/svg?seed=widget",
      customCSS: "",
    },
    behavior: {
      autoOpen: false,
      autoOpenDelay: 5,
      autoOpenTrigger: "time",
      showNotifications: true,
      soundEffects: false,
      persistConversation: true,
    },
    content: {
      welcomeMessage: "Hello! How can I help you today?",
      botName: "AI Assistant",
      inputPlaceholder: "Type your message...",
      offlineMessage: "Sorry, I'm currently offline. Please try again later.",
    },
    ai: {
      model: "gemini-pro",
      temperature: 0.7,
      maxTokens: 1024,
      knowledgeBase: true,
      responseFormat: "markdown",
      systemPrompt:
        "You are a helpful assistant that provides concise and accurate information.",
    },
  });

  const handleConfigChange = (section: string, field: string, value: any) => {
    const newConfig = {
      ...config,
      [section]: {
        ...config[section as keyof typeof config],
        [field]: value,
      },
    };
    setConfig(newConfig);
    onConfigChange(newConfig);
  };

  const generateEmbedCode = () => {
    return `<script src="https://widget.example.com/loader.js" data-widget-id="unique-id" data-config='${JSON.stringify(config)}'></script>`;
  };

  const resetSection = (section: string) => {
    // Default values for each section
    const defaultValues: Record<string, any> = {
      appearance: {
        template: "modern",
        primaryColor: "#7C3AED",
        secondaryColor: "#E9D5FF",
        fontFamily: "Inter",
        borderRadius: 8,
        position: "bottom-right",
        width: 350,
        height: 500,
        darkMode: false,
        logo: "https://api.dicebear.com/7.x/avataaars/svg?seed=widget",
        customCSS: "",
      },
      behavior: {
        autoOpen: false,
        autoOpenDelay: 5,
        autoOpenTrigger: "time",
        showNotifications: true,
        soundEffects: false,
        persistConversation: true,
      },
      content: {
        welcomeMessage: "Hello! How can I help you today?",
        botName: "AI Assistant",
        inputPlaceholder: "Type your message...",
        offlineMessage: "Sorry, I'm currently offline. Please try again later.",
      },
      ai: {
        model: "gemini-pro",
        temperature: 0.7,
        maxTokens: 1024,
        knowledgeBase: true,
        responseFormat: "markdown",
        systemPrompt:
          "You are a helpful assistant that provides concise and accurate information.",
      },
    };

    // Update the config with default values for the specified section
    const newConfig = {
      ...config,
      [section]: defaultValues[section],
    };

    setConfig(newConfig);
    onConfigChange(newConfig);
  };

  return (
    <div className="flex flex-col xl:flex-row gap-6">
      <Card className="w-full xl:w-3/5 bg-background border-border dark:bg-gray-800">
        <CardHeader className="pb-2">
          <CardTitle className="text-xl font-bold">Template Presets</CardTitle>
          <CardDescription>
            Choose a pre-designed template as a starting point
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4 mb-6">
            <div className="border rounded-lg p-2 cursor-pointer hover:border-primary transition-colors">
              <div className="bg-gray-100 dark:bg-gray-700 rounded-md h-24 mb-2 overflow-hidden">
                <img
                  src="https://images.unsplash.com/photo-1611162617213-7d7a39e9b1d7?w=300&q=80"
                  alt="Modern Clean"
                  className="w-full h-full object-cover"
                />
              </div>
              <p className="text-sm font-medium">Modern Clean</p>
              <p className="text-xs text-muted-foreground">
                Clean and modern design with rounded corners
              </p>
            </div>
            <div className="border rounded-lg p-2 cursor-pointer hover:border-primary transition-colors">
              <div className="bg-gray-100 dark:bg-gray-700 rounded-md h-24 mb-2 overflow-hidden">
                <img
                  src="https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?w=300&q=80"
                  alt="Minimal Dark"
                  className="w-full h-full object-cover"
                />
              </div>
              <p className="text-sm font-medium">Minimal Dark</p>
              <p className="text-xs text-muted-foreground">
                Sleek dark theme with minimal design
              </p>
            </div>
            <div className="border rounded-lg p-2 cursor-pointer hover:border-primary transition-colors">
              <div className="bg-gray-100 dark:bg-gray-700 rounded-md h-24 mb-2 overflow-hidden">
                <img
                  src="https://images.unsplash.com/photo-1618172193763-c511deb635ca?w=300&q=80"
                  alt="Friendly Rounded"
                  className="w-full h-full object-cover"
                />
              </div>
              <p className="text-sm font-medium">Friendly Rounded</p>
              <p className="text-xs text-muted-foreground">
                Friendly design with soft colors and rounded corners
              </p>
            </div>
            <div className="border rounded-lg p-2 cursor-pointer hover:border-primary transition-colors">
              <div className="bg-gray-100 dark:bg-gray-700 rounded-md h-24 mb-2 overflow-hidden">
                <img
                  src="https://images.unsplash.com/photo-1618556450994-a6a128ef0d9d?w=300&q=80"
                  alt="Corporate Pro"
                  className="w-full h-full object-cover"
                />
              </div>
              <p className="text-sm font-medium">Corporate Pro</p>
              <p className="text-xs text-muted-foreground">
                Professional design for business websites
              </p>
            </div>
            <div className="border rounded-lg p-2 cursor-pointer hover:border-primary transition-colors">
              <div className="bg-gray-100 dark:bg-gray-700 rounded-md h-24 mb-2 overflow-hidden">
                <img
                  src="https://images.unsplash.com/photo-1618172193622-ae2d025f2c95?w=300&q=80"
                  alt="Vibrant Modern"
                  className="w-full h-full object-cover"
                />
              </div>
              <p className="text-sm font-medium">Vibrant Modern</p>
              <p className="text-xs text-muted-foreground">
                Colorful modern design with vibrant accents
              </p>
            </div>
          </div>

          <Tabs defaultValue="appearance" className="w-full">
            <TabsList className="grid grid-cols-4 mb-6 w-full">
              <TabsTrigger
                value="appearance"
                className="flex items-center gap-1"
              >
                <Palette className="h-4 w-4" />
                <span className="hidden sm:inline">Appearance</span>
              </TabsTrigger>
              <TabsTrigger value="behavior" className="flex items-center gap-1">
                <Settings className="h-4 w-4" />
                <span className="hidden sm:inline">Behavior</span>
              </TabsTrigger>
              <TabsTrigger value="content" className="flex items-center gap-1">
                <MessageSquare className="h-4 w-4" />
                <span className="hidden sm:inline">Content</span>
              </TabsTrigger>
              <TabsTrigger value="ai" className="flex items-center gap-1">
                <Zap className="h-4 w-4" />
                <span className="hidden sm:inline">AI</span>
              </TabsTrigger>
            </TabsList>

            <TabsContent value="appearance" className="space-y-4">
              <h3 className="text-lg font-semibold mb-2">
                Appearance Settings
              </h3>
              <p className="text-sm text-muted-foreground mb-4">
                Customize how your chat widget looks
              </p>
              <div className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="template">Template</Label>
                  <Select
                    value={config.appearance.template}
                    onValueChange={(value) =>
                      handleConfigChange("appearance", "template", value)
                    }
                  >
                    <SelectTrigger id="template">
                      <SelectValue placeholder="Select template" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="modern">Modern Clean</SelectItem>
                      <SelectItem value="glass">Glass Effect</SelectItem>
                      <SelectItem value="dark">Dark Mode</SelectItem>
                      <SelectItem value="rounded">Soft Rounded</SelectItem>
                      <SelectItem value="minimal">Minimalist</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="primaryColor">Primary Color</Label>
                    <div className="flex items-center gap-2">
                      <div
                        className="w-8 h-8 rounded-md border"
                        style={{
                          backgroundColor: config.appearance.primaryColor,
                        }}
                      />
                      <Input
                        id="primaryColor"
                        type="text"
                        value={config.appearance.primaryColor}
                        onChange={(e) =>
                          handleConfigChange(
                            "appearance",
                            "primaryColor",
                            e.target.value,
                          )
                        }
                      />
                    </div>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="secondaryColor">Secondary Color</Label>
                    <div className="flex items-center gap-2">
                      <div
                        className="w-8 h-8 rounded-md border"
                        style={{
                          backgroundColor: config.appearance.secondaryColor,
                        }}
                      />
                      <Input
                        id="secondaryColor"
                        type="text"
                        value={config.appearance.secondaryColor}
                        onChange={(e) =>
                          handleConfigChange(
                            "appearance",
                            "secondaryColor",
                            e.target.value,
                          )
                        }
                      />
                    </div>
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="fontFamily">Font Family</Label>
                  <Select
                    value={config.appearance.fontFamily}
                    onValueChange={(value) =>
                      handleConfigChange("appearance", "fontFamily", value)
                    }
                  >
                    <SelectTrigger id="fontFamily">
                      <SelectValue placeholder="Select font" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="Inter">Inter</SelectItem>
                      <SelectItem value="Roboto">Roboto</SelectItem>
                      <SelectItem value="Open Sans">Open Sans</SelectItem>
                      <SelectItem value="Lato">Lato</SelectItem>
                      <SelectItem value="Poppins">Poppins</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="borderRadius">
                    Border Radius: {config.appearance.borderRadius}px
                  </Label>
                  <Slider
                    id="borderRadius"
                    min={0}
                    max={20}
                    step={1}
                    value={[config.appearance.borderRadius]}
                    onValueChange={(value) =>
                      handleConfigChange("appearance", "borderRadius", value[0])
                    }
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="position">Widget Position</Label>
                  <Select
                    value={config.appearance.position}
                    onValueChange={(value) =>
                      handleConfigChange("appearance", "position", value)
                    }
                  >
                    <SelectTrigger id="position">
                      <SelectValue placeholder="Select position" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="bottom-right">Bottom Right</SelectItem>
                      <SelectItem value="bottom-left">Bottom Left</SelectItem>
                      <SelectItem value="top-right">Top Right</SelectItem>
                      <SelectItem value="top-left">Top Left</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="width">
                      Width: {config.appearance.width}px
                    </Label>
                    <Slider
                      id="width"
                      min={250}
                      max={500}
                      step={10}
                      value={[config.appearance.width]}
                      onValueChange={(value) =>
                        handleConfigChange("appearance", "width", value[0])
                      }
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="height">
                      Height: {config.appearance.height}px
                    </Label>
                    <Slider
                      id="height"
                      min={300}
                      max={700}
                      step={10}
                      value={[config.appearance.height]}
                      onValueChange={(value) =>
                        handleConfigChange("appearance", "height", value[0])
                      }
                    />
                  </div>
                </div>

                <div className="flex items-center space-x-2">
                  <Switch
                    id="darkMode"
                    checked={config.appearance.darkMode}
                    onCheckedChange={(checked) =>
                      handleConfigChange("appearance", "darkMode", checked)
                    }
                  />
                  <Label htmlFor="darkMode">Dark Mode</Label>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="logo">Logo URL</Label>
                  <Input
                    id="logo"
                    type="text"
                    value={config.appearance.logo}
                    onChange={(e) =>
                      handleConfigChange("appearance", "logo", e.target.value)
                    }
                  />
                  <div className="mt-2 flex justify-center">
                    <img
                      src={config.appearance.logo}
                      alt="Widget Logo"
                      className="h-12 w-12 rounded-full object-cover border"
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="customCSS">Custom CSS</Label>
                  <Textarea
                    id="customCSS"
                    placeholder="Add custom CSS here..."
                    value={config.appearance.customCSS}
                    onChange={(e) =>
                      handleConfigChange(
                        "appearance",
                        "customCSS",
                        e.target.value,
                      )
                    }
                    className="font-mono text-xs"
                    rows={4}
                  />
                </div>
              </div>
            </TabsContent>

            <TabsContent value="behavior" className="space-y-4">
              <h3 className="text-lg font-semibold mb-2">Behavior Settings</h3>
              <p className="text-sm text-muted-foreground mb-4">
                Configure how your widget behaves
              </p>
              <div className="space-y-4">
                <div className="flex items-center space-x-2">
                  <Switch
                    id="autoOpen"
                    checked={config.behavior.autoOpen}
                    onCheckedChange={(checked) =>
                      handleConfigChange("behavior", "autoOpen", checked)
                    }
                  />
                  <Label htmlFor="autoOpen">Auto-open Widget</Label>
                </div>

                {config.behavior.autoOpen && (
                  <div className="space-y-4 pl-6 border-l-2 border-muted">
                    <div className="space-y-2">
                      <Label htmlFor="autoOpenTrigger">Auto-open Trigger</Label>
                      <Select
                        value={config.behavior.autoOpenTrigger}
                        onValueChange={(value) =>
                          handleConfigChange(
                            "behavior",
                            "autoOpenTrigger",
                            value,
                          )
                        }
                      >
                        <SelectTrigger id="autoOpenTrigger">
                          <SelectValue placeholder="Select trigger" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="time">Time Delay</SelectItem>
                          <SelectItem value="scroll">
                            Scroll Percentage
                          </SelectItem>
                          <SelectItem value="exit">Exit Intent</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>

                    {config.behavior.autoOpenTrigger === "time" && (
                      <div className="space-y-2">
                        <Label htmlFor="autoOpenDelay">
                          Delay (seconds): {config.behavior.autoOpenDelay}
                        </Label>
                        <Slider
                          id="autoOpenDelay"
                          min={1}
                          max={60}
                          step={1}
                          value={[config.behavior.autoOpenDelay]}
                          onValueChange={(value) =>
                            handleConfigChange(
                              "behavior",
                              "autoOpenDelay",
                              value[0],
                            )
                          }
                        />
                      </div>
                    )}
                  </div>
                )}

                <Separator />

                <div className="flex items-center space-x-2">
                  <Switch
                    id="showNotifications"
                    checked={config.behavior.showNotifications}
                    onCheckedChange={(checked) =>
                      handleConfigChange(
                        "behavior",
                        "showNotifications",
                        checked,
                      )
                    }
                  />
                  <Label htmlFor="showNotifications">Show Notifications</Label>
                </div>

                <div className="flex items-center space-x-2">
                  <Switch
                    id="soundEffects"
                    checked={config.behavior.soundEffects}
                    onCheckedChange={(checked) =>
                      handleConfigChange("behavior", "soundEffects", checked)
                    }
                  />
                  <Label htmlFor="soundEffects">Sound Effects</Label>
                </div>

                <div className="flex items-center space-x-2">
                  <Switch
                    id="persistConversation"
                    checked={config.behavior.persistConversation}
                    onCheckedChange={(checked) =>
                      handleConfigChange(
                        "behavior",
                        "persistConversation",
                        checked,
                      )
                    }
                  />
                  <Label htmlFor="persistConversation">
                    Persist Conversation
                  </Label>
                </div>
              </div>
            </TabsContent>

            <TabsContent value="content" className="space-y-4">
              <h3 className="text-lg font-semibold mb-2">Content Settings</h3>
              <p className="text-sm text-muted-foreground mb-4">
                Customize the text and messages
              </p>
              <div className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="botName">Bot Name</Label>
                  <Input
                    id="botName"
                    type="text"
                    value={config.content.botName}
                    onChange={(e) =>
                      handleConfigChange("content", "botName", e.target.value)
                    }
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="welcomeMessage">Welcome Message</Label>
                  <Textarea
                    id="welcomeMessage"
                    value={config.content.welcomeMessage}
                    onChange={(e) =>
                      handleConfigChange(
                        "content",
                        "welcomeMessage",
                        e.target.value,
                      )
                    }
                    rows={3}
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="inputPlaceholder">Input Placeholder</Label>
                  <Input
                    id="inputPlaceholder"
                    type="text"
                    value={config.content.inputPlaceholder}
                    onChange={(e) =>
                      handleConfigChange(
                        "content",
                        "inputPlaceholder",
                        e.target.value,
                      )
                    }
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="offlineMessage">Offline Message</Label>
                  <Textarea
                    id="offlineMessage"
                    value={config.content.offlineMessage}
                    onChange={(e) =>
                      handleConfigChange(
                        "content",
                        "offlineMessage",
                        e.target.value,
                      )
                    }
                    rows={3}
                  />
                </div>
              </div>
            </TabsContent>

            <TabsContent value="ai" className="space-y-4">
              <h3 className="text-lg font-semibold mb-2">AI Settings</h3>
              <p className="text-sm text-muted-foreground mb-4">
                Configure the AI behavior and responses
              </p>
              <div className="flex justify-between items-center">
                <h3 className="text-lg font-medium">AI Settings</h3>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => resetSection("ai")}
                  className="flex items-center gap-1"
                >
                  <RefreshCw className="h-3 w-3" />
                  Reset
                </Button>
              </div>
              <div className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="model">AI Model</Label>
                  <Select
                    value={config.ai.model}
                    onValueChange={(value) =>
                      handleConfigChange("ai", "model", value)
                    }
                  >
                    <SelectTrigger id="model">
                      <SelectValue placeholder="Select AI model" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="gemini-pro">Gemini Pro</SelectItem>
                      <SelectItem value="huggingface-mistral">
                        Hugging Face - Mistral
                      </SelectItem>
                      <SelectItem value="huggingface-llama">
                        Hugging Face - Llama
                      </SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="temperature">
                    Temperature: {config.ai.temperature}
                  </Label>
                  <Slider
                    id="temperature"
                    min={0}
                    max={1}
                    step={0.1}
                    value={[config.ai.temperature]}
                    onValueChange={(value) =>
                      handleConfigChange("ai", "temperature", value[0])
                    }
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="maxTokens">
                    Max Tokens: {config.ai.maxTokens}
                  </Label>
                  <Slider
                    id="maxTokens"
                    min={256}
                    max={4096}
                    step={128}
                    value={[config.ai.maxTokens]}
                    onValueChange={(value) =>
                      handleConfigChange("ai", "maxTokens", value[0])
                    }
                  />
                </div>

                <div className="flex items-center space-x-2">
                  <Switch
                    id="knowledgeBase"
                    checked={config.ai.knowledgeBase}
                    onCheckedChange={(checked) =>
                      handleConfigChange("ai", "knowledgeBase", checked)
                    }
                  />
                  <Label htmlFor="knowledgeBase">Use Knowledge Base</Label>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="responseFormat">Response Format</Label>
                  <Select
                    value={config.ai.responseFormat}
                    onValueChange={(value) =>
                      handleConfigChange("ai", "responseFormat", value)
                    }
                  >
                    <SelectTrigger id="responseFormat">
                      <SelectValue placeholder="Select format" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="markdown">Markdown</SelectItem>
                      <SelectItem value="html">HTML</SelectItem>
                      <SelectItem value="plain">Plain Text</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="systemPrompt">System Prompt</Label>
                  <Textarea
                    id="systemPrompt"
                    value={config.ai.systemPrompt}
                    onChange={(e) =>
                      handleConfigChange("ai", "systemPrompt", e.target.value)
                    }
                    rows={4}
                  />
                </div>
              </div>
            </TabsContent>
          </Tabs>

          <Separator className="my-4" />

          <div className="space-y-6 mt-8">
            <div className="space-y-2">
              <h3 className="text-lg font-semibold">Embed Code</h3>
              <p className="text-sm text-muted-foreground">
                Add this code to your website to display the chat widget
              </p>
              <div className="relative mt-4">
                <Textarea
                  id="embedCode"
                  value={generateEmbedCode()}
                  readOnly
                  className="font-mono text-xs pr-10 bg-gray-50 dark:bg-gray-900 border-gray-200 dark:border-gray-700"
                  rows={6}
                />
                <Button
                  size="sm"
                  variant="secondary"
                  className="absolute right-2 top-2 flex items-center gap-1"
                  onClick={() =>
                    navigator.clipboard.writeText(generateEmbedCode())
                  }
                >
                  <Copy className="h-3 w-3" />
                  Copy
                </Button>
              </div>
            </div>

            <div className="flex justify-between items-center border-t pt-4 mt-6">
              <Button
                variant="outline"
                size="sm"
                onClick={() => {
                  Object.keys(config).forEach((section) =>
                    resetSection(section),
                  );
                }}
                className="flex items-center gap-1"
              >
                <RefreshCw className="h-3 w-3" />
                Reset All
              </Button>
              <div className="flex space-x-2">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => setShowPreview(!showPreview)}
                >
                  {showPreview ? "Hide Preview" : "Show Preview"}
                </Button>
                <Button size="sm">Deploy to Production</Button>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {showPreview && (
        <Card className="w-full xl:w-2/5 bg-background border-border dark:bg-gray-800">
          <CardHeader>
            <CardTitle className="text-xl font-bold">Widget Preview</CardTitle>
            <CardDescription>Live preview of your chat widget</CardDescription>
            <div className="flex gap-2 mt-2">
              <Button variant="outline" size="icon" className="h-8 w-8">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="h-4 w-4"
                >
                  <rect width="18" height="18" x="3" y="3" rx="2" ry="2"></rect>
                </svg>
              </Button>
              <Button variant="outline" size="icon" className="h-8 w-8">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="h-4 w-4"
                >
                  <rect width="14" height="20" x="5" y="2" rx="2" ry="2"></rect>
                  <path d="M12 18h.01"></path>
                </svg>
              </Button>
              <Button variant="outline" size="icon" className="h-8 w-8">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="h-4 w-4"
                >
                  <rect width="20" height="14" x="2" y="5" rx="2" ry="2"></rect>
                  <path d="M2 10h20"></path>
                </svg>
              </Button>
            </div>
          </CardHeader>
          <CardContent className="flex-1 relative min-h-[500px] bg-gray-100 dark:bg-gray-800 rounded-md p-0 overflow-hidden">
            <div className="absolute inset-0 grid place-items-center">
              <div className="w-full h-full relative">
                <ChatWidget
                  title={config.content.botName}
                  subtitle="Ask me anything!"
                  primaryColor={config.appearance.primaryColor}
                  secondaryColor={config.appearance.secondaryColor}
                  position={
                    config.appearance.position as
                      | "bottom-right"
                      | "bottom-left"
                      | "top-right"
                      | "top-left"
                  }
                  logoUrl={config.appearance.logo}
                  initialMessage={config.content.welcomeMessage}
                  isOpen={true}
                  darkMode={config.appearance.darkMode}
                />
              </div>
            </div>
          </CardContent>
          <CardFooter className="flex flex-col items-start space-y-4">
            <div className="flex items-center gap-4 w-full">
              <Button variant="outline" size="sm" className="text-xs">
                light theme
              </Button>
              <Button variant="outline" size="sm" className="text-xs">
                bottom-right
              </Button>
              <Button variant="outline" size="sm" className="text-xs">
                desktop
              </Button>
            </div>

            <div className="w-full space-y-2 border-t pt-4">
              <h4 className="text-sm font-medium">Current Configuration</h4>
              <div className="grid grid-cols-2 gap-2 text-xs">
                <div className="text-muted-foreground">Primary Color:</div>
                <div className="font-mono">
                  {config.appearance.primaryColor}
                </div>

                <div className="text-muted-foreground">Border Radius:</div>
                <div>{config.appearance.borderRadius}px</div>

                <div className="text-muted-foreground">Font:</div>
                <div>{config.appearance.fontFamily}</div>

                <div className="text-muted-foreground">Auto Open:</div>
                <div>{config.behavior.autoOpen ? "Yes" : "No"}</div>
              </div>
            </div>

            <div className="w-full border-t pt-4">
              <div className="flex justify-between items-center mb-2">
                <h4 className="text-sm font-medium">Export & Deploy</h4>
                <Button variant="outline" size="sm" className="h-8">
                  <svg
                    className="mr-2 h-3 w-3"
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"></path>
                    <polyline points="17 8 12 3 7 8"></polyline>
                    <line x1="12" y1="3" x2="12" y2="15"></line>
                  </svg>
                  Export Config
                </Button>
              </div>
              <Button className="w-full">Deploy to Production</Button>
            </div>
          </CardFooter>
        </Card>
      )}
    </div>
  );
};

export default WidgetConfigurator;
