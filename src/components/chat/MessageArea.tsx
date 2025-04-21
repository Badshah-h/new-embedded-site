import React from "react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Skeleton } from "@/components/ui/skeleton";

interface Message {
  id: string;
  content: string;
  sender: "user" | "ai";
  timestamp: Date;
  isTyping?: boolean;
  format?: {
    headings?: boolean;
    bullets?: boolean;
    links?: boolean;
  };
}

interface MessageAreaProps {
  messages?: Message[];
  isTyping?: boolean;
  aiName?: string;
  aiAvatar?: string;
  userAvatar?: string;
  brandColor?: string;
}

const MessageArea = ({
  messages = [
    {
      id: "1",
      content: "Hello! How can I help you today?",
      sender: "ai",
      timestamp: new Date(Date.now() - 60000 * 5),
      format: { headings: false, bullets: false, links: false },
    },
    {
      id: "2",
      content: "I have a question about your services.",
      sender: "user",
      timestamp: new Date(Date.now() - 60000 * 4),
    },
    {
      id: "3",
      content:
        "Sure, I'd be happy to help with that! Here's some information about our services:\n\n## Our Services\n\n* 24/7 Customer Support\n* AI-powered solutions\n* Custom integrations\n* Knowledge base management\n\nYou can learn more at [our website](https://example.com/services).",
      sender: "ai",
      timestamp: new Date(Date.now() - 60000 * 3),
      format: { headings: true, bullets: true, links: true },
    },
    {
      id: "4",
      content: "Thanks! That's helpful.",
      sender: "user",
      timestamp: new Date(Date.now() - 60000 * 1),
    },
  ],
  isTyping = false,
  aiName = "AI Assistant",
  aiAvatar = "",
  userAvatar = "",
  brandColor = "#7c3aed",
}: MessageAreaProps) => {
  // Function to format message content with markdown-like syntax
  const formatMessageContent = (content: string) => {
    // Replace headings
    let formattedContent = content.replace(
      /##\s(.+)/g,
      '<h3 class="text-lg font-semibold mt-2 mb-1">$1</h3>',
    );

    // Replace bullet points
    formattedContent = formattedContent.replace(
      /\*\s(.+)/g,
      '<li class="ml-5 list-disc">$1</li>',
    );
    formattedContent = formattedContent.replace(/<\/li>\n<li/g, "</li><li");
    formattedContent = formattedContent.replace(
      /(<li[^>]*>[\s\S]*?<\/li>)/g,
      "<ul>$1</ul>",
    );
    formattedContent = formattedContent.replace(/<\/ul>\s*<ul>/g, "");

    // Replace links
    formattedContent = formattedContent.replace(
      /\[([^\]]+)\]\(([^)]+)\)/g,
      '<a href="$2" class="text-blue-600 underline hover:text-blue-800" target="_blank" rel="noopener noreferrer">$1</a>',
    );

    // Replace newlines with <br>
    formattedContent = formattedContent.replace(/\n/g, "<br>");

    return formattedContent;
  };

  // Function to render timestamp
  const formatTimestamp = (date: Date) => {
    return date.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });
  };

  return (
    <div className="flex flex-col h-full bg-background">
      <ScrollArea className="flex-1 p-4">
        <div className="flex flex-col space-y-4">
          {messages.map((message) => (
            <div
              key={message.id}
              className={`flex ${message.sender === "user" ? "justify-end" : "justify-start"}`}
            >
              <div
                className={`flex ${message.sender === "user" ? "flex-row-reverse" : "flex-row"} max-w-[80%] items-start gap-2`}
              >
                {message.sender === "ai" ? (
                  <Avatar className="h-8 w-8 mt-1">
                    {aiAvatar ? (
                      <AvatarImage src={aiAvatar} alt={aiName} />
                    ) : (
                      <AvatarFallback style={{ backgroundColor: brandColor }}>
                        {aiName.substring(0, 2).toUpperCase()}
                      </AvatarFallback>
                    )}
                  </Avatar>
                ) : (
                  <Avatar className="h-8 w-8 mt-1">
                    {userAvatar ? (
                      <AvatarImage src={userAvatar} alt="You" />
                    ) : (
                      <AvatarFallback className="bg-gray-400">U</AvatarFallback>
                    )}
                  </Avatar>
                )}
                <div
                  className={`rounded-lg px-4 py-2 ${message.sender === "user" ? "bg-primary text-primary-foreground" : "bg-muted"}`}
                >
                  {message.sender === "ai" && message.format ? (
                    <div
                      dangerouslySetInnerHTML={{
                        __html: formatMessageContent(message.content),
                      }}
                    />
                  ) : (
                    <p>{message.content}</p>
                  )}
                  <div
                    className={`text-xs mt-1 ${message.sender === "user" ? "text-right text-primary-foreground/70" : "text-muted-foreground"}`}
                  >
                    {formatTimestamp(message.timestamp)}
                  </div>
                </div>
              </div>
            </div>
          ))}

          {/* Typing indicator */}
          {isTyping && (
            <div className="flex justify-start">
              <div className="flex flex-row max-w-[80%] items-start gap-2">
                <Avatar className="h-8 w-8 mt-1">
                  {aiAvatar ? (
                    <AvatarImage src={aiAvatar} alt={aiName} />
                  ) : (
                    <AvatarFallback style={{ backgroundColor: brandColor }}>
                      {aiName.substring(0, 2).toUpperCase()}
                    </AvatarFallback>
                  )}
                </Avatar>
                <div className="rounded-lg px-4 py-2 bg-muted">
                  <div className="flex space-x-1 items-center h-6">
                    <div
                      className="w-2 h-2 rounded-full bg-gray-400 animate-bounce"
                      style={{ animationDelay: "0ms" }}
                    ></div>
                    <div
                      className="w-2 h-2 rounded-full bg-gray-400 animate-bounce"
                      style={{ animationDelay: "150ms" }}
                    ></div>
                    <div
                      className="w-2 h-2 rounded-full bg-gray-400 animate-bounce"
                      style={{ animationDelay: "300ms" }}
                    ></div>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </ScrollArea>
    </div>
  );
};

export default MessageArea;
