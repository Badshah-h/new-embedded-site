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
    <Card className="w-full max-w-md bg-background border-border">
      <CardHeader>
        <CardTitle className="text-xl font-bold">Widget Configurator</CardTitle>
        <CardDescription>
          Customize your chat widget appearance and behavior
        </CardDescription>
      </CardHeader>
      <CardContent>
        <Tabs defaultValue="appearance" className="w-full">
          <TabsList className="grid grid-cols-4 mb-4">
            <TabsTrigger value="appearance" className="flex items-center gap-1">
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
                        handleConfigChange("behavior", "autoOpenTrigger", value)
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
                    handleConfigChange("behavior", "showNotifications", checked)
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

        <div className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="embedCode">Embed Code</Label>
            <div className="relative">
              <Textarea
                id="embedCode"
                value={generateEmbedCode()}
                readOnly
                className="font-mono text-xs pr-10"
                rows={3}
              />
              <Button
                size="icon"
                variant="ghost"
                className="absolute right-2 top-2"
                onClick={() =>
                  navigator.clipboard.writeText(generateEmbedCode())
                }
              >
                <Copy className="h-4 w-4" />
              </Button>
            </div>
          </div>

          <div className="flex justify-end space-x-2">
            <Button
              variant="outline"
              onClick={() => {
                Object.keys(config).forEach((section) => resetSection(section));
              }}
            >
              Reset All
            </Button>
            <Button
              variant="outline"
              onClick={() => setShowPreview(!showPreview)}
            >
              {showPreview ? "Hide Preview" : "Show Preview"}
            </Button>
            <Button>Save Configuration</Button>
          </div>
        </div>
      </CardContent>

      {showPreview && (
        <div className="w-full lg:w-1/2 flex flex-col">
          <Card className="w-full h-full bg-background border-border">
            <CardHeader>
              <CardTitle className="text-xl font-bold">Live Preview</CardTitle>
              <CardDescription>
                See how your widget will appear to users
              </CardDescription>
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
            <CardFooter className="flex justify-between">
              <p className="text-sm text-muted-foreground">
                This preview shows how your widget will appear when embedded on
                a website.
              </p>
            </CardFooter>
          </Card>
        </div>
      )}
    </Card>
  );
};

export default WidgetConfigurator;
