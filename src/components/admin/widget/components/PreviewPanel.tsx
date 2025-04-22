import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Monitor, Smartphone, Tablet } from "lucide-react";
import ChatWidget from "@/components/chat/ChatWidget";

interface PreviewPanelProps {
  config: any;
}

const PreviewPanel = ({ config }: PreviewPanelProps) => {
  const [deviceType, setDeviceType] = useState<"desktop" | "tablet" | "mobile">(
    "desktop",
  );

  const getPreviewSize = () => {
    switch (deviceType) {
      case "desktop":
        return { width: "100%", height: "500px" };
      case "tablet":
        return { width: "768px", height: "500px" };
      case "mobile":
        return { width: "375px", height: "500px" };
      default:
        return { width: "100%", height: "500px" };
    }
  };

  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center">
        <h3 className="text-lg font-semibold">Widget Preview</h3>
        <Tabs
          defaultValue="desktop"
          value={deviceType}
          onValueChange={(value) => setDeviceType(value as any)}
          className="w-auto"
        >
          <TabsList className="grid w-auto grid-cols-3">
            <TabsTrigger value="desktop" className="px-3">
              <Monitor className="h-4 w-4 mr-1" />
              <span className="hidden sm:inline">Desktop</span>
            </TabsTrigger>
            <TabsTrigger value="tablet" className="px-3">
              <Tablet className="h-4 w-4 mr-1" />
              <span className="hidden sm:inline">Tablet</span>
            </TabsTrigger>
            <TabsTrigger value="mobile" className="px-3">
              <Smartphone className="h-4 w-4 mr-1" />
              <span className="hidden sm:inline">Mobile</span>
            </TabsTrigger>
          </TabsList>
        </Tabs>
      </div>

      <div className="flex-1 relative bg-gray-100 dark:bg-gray-800 rounded-md overflow-hidden flex justify-center">
        <div
          style={{
            width: getPreviewSize().width,
            height: getPreviewSize().height,
            maxWidth: "100%",
            transition: "width 0.3s ease",
          }}
          className="relative bg-white dark:bg-gray-900 shadow-md overflow-hidden"
        >
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
            showReadReceipts={config.messages.showReadReceipts}
            messageStyle={
              config.messages.messageStyle as "bubble" | "modern" | "minimal"
            }
            enableFeedback={config.messages.enableFeedback}
            showPreChatForm={config.surveys.showPreChatForm}
            preChatFormFields={config.surveys.preChatFormFields}
            showPostChatSurvey={config.surveys.showPostChatSurvey}
            postChatSurveyQuestions={config.surveys.postChatSurveyQuestions}
          />
        </div>
      </div>

      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Button
            variant="outline"
            size="sm"
            className={`text-xs ${!config.appearance.darkMode ? "bg-primary/10" : ""}`}
          >
            {config.appearance.darkMode ? "Dark" : "Light"} Theme
          </Button>
          <Button variant="outline" size="sm" className="text-xs">
            {config.appearance.position}
          </Button>
        </div>
        <Button variant="outline" size="sm">
          Test Chat
        </Button>
      </div>
    </div>
  );
};

export default PreviewPanel;
