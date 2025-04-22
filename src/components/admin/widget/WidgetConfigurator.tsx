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
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import {
  Palette,
  Settings,
  MessageSquare,
  Zap,
  RefreshCw,
  Save,
  Download,
} from "lucide-react";

import {
  AppearanceTab,
  BehaviorTab,
  ContentTab,
  AITab,
  TemplatePresets,
  EmbedCodeSection,
  PreviewPanel,
} from "./components";

interface WidgetConfiguratorProps {
  onConfigChange?: (config: any) => void;
}

const templatePresets = [
  {
    id: "modern",
    name: "Modern Clean",
    description: "Clean and modern design with rounded corners",
    image:
      "https://images.unsplash.com/photo-1611162617213-7d7a39e9b1d7?w=300&q=80",
    config: {
      appearance: {
        template: "modern",
        primaryColor: "#7C3AED",
        secondaryColor: "#E9D5FF",
        fontFamily: "Inter",
        borderRadius: 8,
      },
    },
  },
  {
    id: "minimal",
    name: "Minimal Dark",
    description: "Sleek dark theme with minimal design",
    image:
      "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?w=300&q=80",
    config: {
      appearance: {
        template: "dark",
        primaryColor: "#2D3748",
        secondaryColor: "#4A5568",
        fontFamily: "Inter",
        borderRadius: 4,
        darkMode: true,
      },
    },
  },
  {
    id: "friendly",
    name: "Friendly Rounded",
    description: "Friendly design with soft colors and rounded corners",
    image:
      "https://images.unsplash.com/photo-1618172193763-c511deb635ca?w=300&q=80",
    config: {
      appearance: {
        template: "rounded",
        primaryColor: "#38B2AC",
        secondaryColor: "#B2F5EA",
        fontFamily: "Poppins",
        borderRadius: 12,
      },
    },
  },
  {
    id: "corporate",
    name: "Corporate Pro",
    description: "Professional design for business websites",
    image:
      "https://images.unsplash.com/photo-1618556450994-a6a128ef0d9d?w=300&q=80",
    config: {
      appearance: {
        template: "corporate",
        primaryColor: "#2B6CB0",
        secondaryColor: "#BEE3F8",
        fontFamily: "Roboto",
        borderRadius: 4,
      },
    },
  },
  {
    id: "vibrant",
    name: "Vibrant Modern",
    description: "Colorful modern design with vibrant accents",
    image:
      "https://images.unsplash.com/photo-1618172193622-ae2d025f2c95?w=300&q=80",
    config: {
      appearance: {
        template: "vibrant",
        primaryColor: "#ED64A6",
        secondaryColor: "#FED7E2",
        fontFamily: "Poppins",
        borderRadius: 8,
      },
    },
  },
];

const WidgetConfigurator = ({
  onConfigChange = () => {},
}: WidgetConfiguratorProps) => {
  const [showPreview, setShowPreview] = useState(true);
  const [selectedPreset, setSelectedPreset] = useState<string | null>(null);
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
    messages: {
      messageStyle: "bubble",
      showTypingIndicator: true,
      showReadReceipts: true,
      enableFeedback: false,
      feedbackType: "rating",
      collectFeedbackComments: false,
      allowAttachments: true,
      maxAttachmentSize: 5,
      allowedFileTypes: {
        images: true,
        documents: true,
        audio: false,
        video: false,
      },
    },
    surveys: {
      showPreChatForm: false,
      preChatFormFields: [
        { id: "name", label: "Name", type: "text", required: true },
        { id: "email", label: "Email", type: "email", required: true },
        { id: "phone", label: "Phone", type: "phone", required: false },
      ],
      showPostChatSurvey: false,
      postChatSurveyQuestions: [
        {
          id: "satisfaction",
          question: "How satisfied are you with our service?",
          type: "rating",
          required: true,
        },
        {
          id: "feedback",
          question: "Do you have any additional feedback?",
          type: "text",
          required: false,
        },
      ],
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
      messages: {
        messageStyle: "bubble",
        showTypingIndicator: true,
        showReadReceipts: true,
        enableFeedback: false,
        feedbackType: "rating",
        collectFeedbackComments: false,
        allowAttachments: true,
        maxAttachmentSize: 5,
        allowedFileTypes: {
          images: true,
          documents: true,
          audio: false,
          video: false,
        },
        enablePrebuiltMessages: false,
        prebuiltMessages: [
          {
            id: "1",
            text: "Hello, how can I help you today?",
            triggerType: "button",
          },
          {
            id: "2",
            text: "I'd like to know more about your services",
            triggerType: "button",
          },
          {
            id: "3",
            text: "What are your business hours?",
            triggerType: "button",
          },
        ],
      },
      surveys: {
        showPreChatForm: false,
        preChatFormFields: [
          { id: "name", label: "Name", type: "text", required: true },
          { id: "email", label: "Email", type: "email", required: true },
          { id: "phone", label: "Phone", type: "phone", required: false },
        ],
        showPostChatSurvey: false,
        postChatSurveyQuestions: [
          {
            id: "satisfaction",
            question: "How satisfied are you with our service?",
            type: "rating",
            required: true,
          },
          {
            id: "feedback",
            question: "Do you have any additional feedback?",
            type: "text",
            required: false,
          },
        ],
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

    const newConfig = {
      ...config,
      [section]: defaultValues[section],
    };

    setConfig(newConfig);
    onConfigChange(newConfig);
  };

  const handleSelectPreset = (preset: any) => {
    setSelectedPreset(preset.id);

    const newConfig = {
      ...config,
      appearance: {
        ...config.appearance,
        ...preset.config.appearance,
      },
    };

    setConfig(newConfig);
    onConfigChange(newConfig);
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-6">
        <div>
          <h2 className="text-2xl font-bold tracking-tight">
            Widget Configurator
          </h2>
          <p className="text-muted-foreground">
            Customize your chat widget appearance, behavior, and AI settings
          </p>
        </div>
        <div className="flex items-center gap-2">
          <Button
            variant="outline"
            size="sm"
            className="flex items-center gap-1"
          >
            <Download className="h-4 w-4" />
            Export
          </Button>
          <Button size="sm" className="flex items-center gap-1">
            <Save className="h-4 w-4" />
            Save Changes
          </Button>
        </div>
      </div>

      <div className="flex flex-col xl:flex-row gap-6">
        <Card className="w-full xl:w-3/5 bg-background border-border dark:bg-gray-800">
          <CardContent className="p-6">
            <TemplatePresets
              presets={templatePresets}
              selectedPreset={selectedPreset}
              onSelectPreset={handleSelectPreset}
            />

            <Separator className="my-6" />

            <Tabs defaultValue="appearance" className="w-full">
              <TabsList className="grid grid-cols-4 mb-6 w-full">
                <TabsTrigger
                  value="appearance"
                  className="flex items-center gap-1"
                >
                  <Palette className="h-4 w-4" />
                  <span className="hidden sm:inline">Appearance</span>
                </TabsTrigger>
                <TabsTrigger
                  value="behavior"
                  className="flex items-center gap-1"
                >
                  <Settings className="h-4 w-4" />
                  <span className="hidden sm:inline">Behavior</span>
                </TabsTrigger>
                <TabsTrigger
                  value="content"
                  className="flex items-center gap-1"
                >
                  <MessageSquare className="h-4 w-4" />
                  <span className="hidden sm:inline">Content</span>
                </TabsTrigger>
                <TabsTrigger value="ai" className="flex items-center gap-1">
                  <Zap className="h-4 w-4" />
                  <span className="hidden sm:inline">AI</span>
                </TabsTrigger>
              </TabsList>

              <TabsContent value="appearance">
                <AppearanceTab
                  config={config}
                  handleConfigChange={handleConfigChange}
                  resetSection={resetSection}
                />
              </TabsContent>

              <TabsContent value="behavior">
                <BehaviorTab
                  config={config}
                  handleConfigChange={handleConfigChange}
                  resetSection={resetSection}
                />
              </TabsContent>

              <TabsContent value="content">
                <ContentTab
                  config={config}
                  handleConfigChange={handleConfigChange}
                  resetSection={resetSection}
                />
              </TabsContent>

              <TabsContent value="ai">
                <AITab
                  config={config}
                  handleConfigChange={handleConfigChange}
                  resetSection={resetSection}
                />
              </TabsContent>
            </Tabs>

            <Separator className="my-6" />

            <EmbedCodeSection embedCode={generateEmbedCode()} />

            <div className="flex justify-between items-center mt-6 pt-4 border-t">
              <Button
                variant="outline"
                size="sm"
                onClick={() => {
                  Object.keys(config).forEach((section) =>
                    resetSection(section),
                  );
                  setSelectedPreset(null);
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
          </CardContent>
        </Card>

        {showPreview && (
          <Card className="w-full xl:w-2/5 bg-background border-border dark:bg-gray-800">
            <CardContent className="p-6">
              <PreviewPanel config={config} />
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  );
};

export default WidgetConfigurator;
