import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { Copy, Code, ExternalLink } from "lucide-react";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

interface EmbedCodeGeneratorProps {
  config: any;
}

const EmbedCodeGenerator = ({ config }: EmbedCodeGeneratorProps) => {
  const [codeType, setCodeType] = useState<"script" | "iframe" | "react">(
    "script",
  );

  const generateScriptCode = () => {
    return `<script src="https://widget.example.com/loader.js" data-widget-id="unique-id" data-config='${JSON.stringify(config)}'></script>`;
  };

  const generateIframeCode = () => {
    // Create a sanitized config object with only the necessary properties
    const sanitizedConfig = {
      appearance: { ...config.appearance },
      behavior: { ...config.behavior },
      content: { ...config.content },
      messages: { ...config.messages },
      ai: { ...config.ai },
      surveys: config.surveys ? { ...config.surveys } : undefined,
    };

    return `<iframe 
  src="https://widget.example.com/embed?config=${encodeURIComponent(JSON.stringify(sanitizedConfig))}" 
  width="100%" 
  height="600px" 
  frameborder="0" 
  allow="microphone; camera" 
  style="border: none; width: 100%; height: 600px;"
></iframe>`;
  };

  const generateReactCode = () => {
    // Create a sanitized config object with only the necessary properties
    const sanitizedConfig = {
      appearance: { ...config.appearance },
      behavior: { ...config.behavior },
      content: { ...config.content },
      messages: { ...config.messages },
      ai: { ...config.ai },
      surveys: config.surveys ? { ...config.surveys } : undefined,
    };

    return `// Install the package first
// npm install @yourcompany/chat-widget-react

import { ChatWidget } from '@yourcompany/chat-widget-react';

const YourComponent = () => {
  return (
    <ChatWidget 
      config={${JSON.stringify(sanitizedConfig, null, 2)}}
    />
  );
};

export default YourComponent;`;
  };

  const getCode = () => {
    switch (codeType) {
      case "script":
        return generateScriptCode();
      case "iframe":
        return generateIframeCode();
      case "react":
        return generateReactCode();
      default:
        return generateScriptCode();
    }
  };

  const copyToClipboard = () => {
    navigator.clipboard.writeText(getCode());
    // You could add a toast notification here
  };

  return (
    <Card className="w-full border-border dark:border-gray-700">
      <CardHeader className="pb-3">
        <CardTitle className="text-lg font-semibold">Embed Code</CardTitle>
        <CardDescription>
          Add this code to your website to display the chat widget
        </CardDescription>
      </CardHeader>
      <CardContent>
        <Tabs
          defaultValue="script"
          value={codeType}
          onValueChange={(value) => setCodeType(value as any)}
        >
          <TabsList className="grid w-full grid-cols-3 mb-4">
            <TabsTrigger value="script" className="text-xs">
              <Code className="h-3.5 w-3.5 mr-1.5" />
              Script Tag
            </TabsTrigger>
            <TabsTrigger value="iframe" className="text-xs">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="14"
                height="14"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="h-3.5 w-3.5 mr-1.5"
              >
                <rect x="2" y="2" width="20" height="20" rx="2" ry="2"></rect>
                <line x1="2" y1="10" x2="22" y2="10"></line>
              </svg>
              iFrame
            </TabsTrigger>
            <TabsTrigger value="react" className="text-xs">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="14"
                height="14"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="h-3.5 w-3.5 mr-1.5"
              >
                <circle cx="12" cy="12" r="10"></circle>
                <circle cx="12" cy="12" r="4"></circle>
                <line x1="4.93" y1="4.93" x2="19.07" y2="19.07"></line>
              </svg>
              React Component
            </TabsTrigger>
          </TabsList>

          <TabsContent value="script" className="space-y-4">
            <div className="relative group">
              <Textarea
                value={generateScriptCode()}
                readOnly
                className="font-mono text-xs pr-16 bg-gray-50 dark:bg-gray-900 border-gray-200 dark:border-gray-700 h-24"
              />
              <Button
                size="sm"
                variant="ghost"
                className="absolute right-2 top-2 h-7 px-2 opacity-0 group-hover:opacity-100 transition-opacity"
                onClick={copyToClipboard}
              >
                <Copy className="h-3.5 w-3.5" />
              </Button>
            </div>
            <div className="text-xs text-muted-foreground">
              <p>
                Add this script tag to your HTML, preferably right before the
                closing{" "}
                <code className="bg-muted px-1 py-0.5 rounded text-xs">
                  &lt;/body&gt;
                </code>{" "}
                tag.
              </p>
            </div>
          </TabsContent>

          <TabsContent value="iframe" className="space-y-4">
            <div className="relative group">
              <Textarea
                value={generateIframeCode()}
                readOnly
                className="font-mono text-xs pr-16 bg-gray-50 dark:bg-gray-900 border-gray-200 dark:border-gray-700 h-32"
              />
              <Button
                size="sm"
                variant="ghost"
                className="absolute right-2 top-2 h-7 px-2 opacity-0 group-hover:opacity-100 transition-opacity"
                onClick={copyToClipboard}
              >
                <Copy className="h-3.5 w-3.5" />
              </Button>
            </div>
            <div className="text-xs text-muted-foreground">
              <p>
                Use this iframe code to embed the chat widget in your website.
                You can adjust the width and height as needed.
              </p>
            </div>
          </TabsContent>

          <TabsContent value="react" className="space-y-4">
            <div className="relative group">
              <Textarea
                value={generateReactCode()}
                readOnly
                className="font-mono text-xs pr-16 bg-gray-50 dark:bg-gray-900 border-gray-200 dark:border-gray-700 h-64"
              />
              <Button
                size="sm"
                variant="ghost"
                className="absolute right-2 top-2 h-7 px-2 opacity-0 group-hover:opacity-100 transition-opacity"
                onClick={copyToClipboard}
              >
                <Copy className="h-3.5 w-3.5" />
              </Button>
            </div>
            <div className="text-xs text-muted-foreground">
              <p>
                Install our React component package and use this code to
                integrate the chat widget in your React application.
              </p>
            </div>
          </TabsContent>
        </Tabs>
      </CardContent>
      <CardFooter className="flex justify-between border-t pt-4">
        <Button variant="outline" size="sm" className="text-xs">
          <ExternalLink className="h-3.5 w-3.5 mr-1.5" />
          View Documentation
        </Button>
        <Button size="sm" className="text-xs" onClick={copyToClipboard}>
          <Copy className="h-3.5 w-3.5 mr-1.5" />
          Copy Code
        </Button>
      </CardFooter>
    </Card>
  );
};

export default EmbedCodeGenerator;
