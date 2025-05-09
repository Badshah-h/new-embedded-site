import React, { useState, useEffect, useRef } from "react";
import {
  Card,
  CardContent,
  CardHeader,
  CardFooter,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Avatar } from "@/components/ui/avatar";
import { AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import {
  MessageSquare,
  Send,
  X,
  Minimize2,
  Maximize2,
  Volume2,
  VolumeX,
  Settings,
} from "lucide-react";
import MessageArea from "./MessageArea";

interface Message {
  id: string;
  content: string;
  sender: "user" | "ai";
  timestamp: Date;
  isTyping?: boolean;
}

interface ChatWidgetProps {
  title?: string;
  subtitle?: string;
  primaryColor?: string;
  secondaryColor?: string;
  position?: "bottom-right" | "bottom-left" | "top-right" | "top-left";
  logoUrl?: string;
  initialMessage?: string;
  isOpen?: boolean;
  darkMode?: boolean;
}

const ChatWidget = ({
  title = "Chat Assistant",
  subtitle = "Ask me anything!",
  primaryColor = "#7c3aed",
  secondaryColor = "#e5e7eb",
  position = "bottom-right",
  logoUrl = "https://api.dicebear.com/7.x/avataaars/svg?seed=chat",
  initialMessage = "Hello! How can I help you today?",
  isOpen = false,
  darkMode = false,
}: ChatWidgetProps) => {
  const [open, setOpen] = useState(isOpen);
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState("");
  const [sound, setSound] = useState(true);
  const [minimized, setMinimized] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);
  const messageEndRef = useRef<HTMLDivElement>(null);

  // Initialize with welcome message
  useEffect(() => {
    if (initialMessage) {
      setMessages([
        {
          id: "1",
          content: initialMessage,
          sender: "ai",
          timestamp: new Date(),
        },
      ]);
    }
  }, [initialMessage]);

  // Auto-scroll to bottom when messages change
  useEffect(() => {
    messageEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  // Focus input when chat opens
  useEffect(() => {
    if (open && !minimized) {
      inputRef.current?.focus();
    }
  }, [open, minimized]);

  const handleSendMessage = () => {
    if (!input.trim()) return;

    // Add user message
    const userMessage: Message = {
      id: Date.now().toString(),
      content: input,
      sender: "user",
      timestamp: new Date(),
    };

    setMessages((prev) => [...prev, userMessage]);
    setInput("");

    // Simulate AI typing
    const typingMessage: Message = {
      id: `typing-${Date.now()}`,
      content: "",
      sender: "ai",
      timestamp: new Date(),
      isTyping: true,
    };

    setMessages((prev) => [...prev, typingMessage]);

    // Simulate AI response after delay
    setTimeout(() => {
      setMessages((prev) => {
        const filtered = prev.filter((msg) => msg.id !== typingMessage.id);
        return [
          ...filtered,
          {
            id: Date.now().toString(),
            content: `This is a simulated response to: "${input}"`,
            sender: "ai",
            timestamp: new Date(),
          },
        ];
      });

      // Play sound if enabled
      if (sound) {
        // Sound effect would go here
      }
    }, 1500);
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter") {
      handleSendMessage();
    }
  };

  const toggleChat = () => {
    setOpen(!open);
    setMinimized(false);
  };

  const toggleMinimize = () => {
    setMinimized(!minimized);
  };

  const toggleSound = () => {
    setSound(!sound);
  };

  // Position styles
  const positionStyles = {
    "bottom-right": "bottom-4 right-4",
    "bottom-left": "bottom-4 left-4",
    "top-right": "top-4 right-4",
    "top-left": "top-4 left-4",
  };

  return (
    <div className="fixed z-50" style={{ backgroundColor: "transparent" }}>
      {/* Chat button */}
      {!open && (
        <button
          onClick={toggleChat}
          className={`fixed ${positionStyles[position]} rounded-full p-4 shadow-lg transition-all hover:shadow-xl`}
          style={{ backgroundColor: primaryColor }}
          aria-label="Open chat"
        >
          <MessageSquare className="h-6 w-6 text-white" />
        </button>
      )}

      {/* Chat widget */}
      {open && (
        <div
          className={`fixed ${positionStyles[position]} flex flex-col rounded-lg shadow-xl transition-all`}
          style={{
            width: "350px",
            height: minimized ? "auto" : "500px",
            backgroundColor: darkMode ? "#1f2937" : "white",
          }}
        >
          {/* Header */}
          <CardHeader
            className="flex flex-row items-center justify-between p-4 rounded-t-lg"
            style={{ backgroundColor: primaryColor, color: "white" }}
          >
            <div className="flex items-center">
              <Avatar className="h-8 w-8 mr-2">
                <AvatarImage src={logoUrl} alt="Chat logo" />
                <AvatarFallback>AI</AvatarFallback>
              </Avatar>
              <div>
                <h3 className="font-medium">{title}</h3>
                {!minimized && <p className="text-xs opacity-90">{subtitle}</p>}
              </div>
            </div>
            <div className="flex space-x-1">
              <TooltipProvider>
                <Tooltip>
                  <TooltipTrigger asChild>
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={toggleSound}
                      className="h-7 w-7 text-white hover:bg-white/20"
                    >
                      {sound ? (
                        <Volume2 className="h-4 w-4" />
                      ) : (
                        <VolumeX className="h-4 w-4" />
                      )}
                    </Button>
                  </TooltipTrigger>
                  <TooltipContent>
                    <p>{sound ? "Mute sounds" : "Unmute sounds"}</p>
                  </TooltipContent>
                </Tooltip>
              </TooltipProvider>

              <TooltipProvider>
                <Tooltip>
                  <TooltipTrigger asChild>
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={toggleMinimize}
                      className="h-7 w-7 text-white hover:bg-white/20"
                    >
                      {minimized ? (
                        <Maximize2 className="h-4 w-4" />
                      ) : (
                        <Minimize2 className="h-4 w-4" />
                      )}
                    </Button>
                  </TooltipTrigger>
                  <TooltipContent>
                    <p>{minimized ? "Expand" : "Minimize"}</p>
                  </TooltipContent>
                </Tooltip>
              </TooltipProvider>

              <TooltipProvider>
                <Tooltip>
                  <TooltipTrigger asChild>
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={toggleChat}
                      className="h-7 w-7 text-white hover:bg-white/20"
                    >
                      <X className="h-4 w-4" />
                    </Button>
                  </TooltipTrigger>
                  <TooltipContent>
                    <p>Close</p>
                  </TooltipContent>
                </Tooltip>
              </TooltipProvider>
            </div>
          </CardHeader>

          {/* Message area */}
          {!minimized && (
            <CardContent
              className="flex-1 overflow-y-auto p-4"
              style={{ backgroundColor: darkMode ? "#374151" : "#f9fafb" }}
            >
              <MessageArea
                messages={messages}
                darkMode={darkMode}
                primaryColor={primaryColor}
                secondaryColor={secondaryColor}
              />
              <div ref={messageEndRef} />
            </CardContent>
          )}

          {/* Input area */}
          {!minimized && !showingPreChatForm && !showingPostChatSurvey && (
            <CardFooter
              className="p-4 border-t"
              style={{
                backgroundColor: darkMode ? "#1f2937" : "white",
                borderColor: darkMode ? "#4b5563" : "#e5e7eb",
              }}
            >
              <div className="flex flex-col w-full space-y-2">
                <div className="flex w-full items-center space-x-2">
                  <Input
                    ref={inputRef}
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                    onKeyPress={handleKeyPress}
                    placeholder="Type your message..."
                    className="flex-1"
                    style={{
                      backgroundColor: darkMode ? "#374151" : "white",
                      color: darkMode ? "white" : "black",
                      borderColor: darkMode ? "#4b5563" : "#e5e7eb",
                    }}
                  />
                  <Button
                    onClick={handleSendMessage}
                    size="icon"
                    style={{ backgroundColor: primaryColor }}
                  >
                    <Send className="h-4 w-4" />
                  </Button>
                </div>

                {/* Additional actions */}
                <div className="flex justify-between items-center text-xs text-muted-foreground">
                  <div className="flex items-center space-x-2">
                    <button
                      className="hover:text-foreground flex items-center gap-1"
                      title="Attach file"
                    >
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
                      >
                        <path d="M21.44 11.05l-9.19 9.19a6 6 0 0 1-8.49-8.49l9.19-9.19a4 4 0 0 1 5.66 5.66l-9.2 9.19a2 2 0 0 1-2.83-2.83l8.49-8.48"></path>
                      </svg>
                      <span className="hidden sm:inline">Attach</span>
                    </button>
                    <button
                      className="hover:text-foreground flex items-center gap-1"
                      title="Take screenshot"
                    >
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
                      >
                        <path d="M23 19a2 2 0 0 1-2 2H3a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h4l2-3h6l2 3h4a2 2 0 0 1 2 2z"></path>
                        <circle cx="12" cy="13" r="4"></circle>
                      </svg>
                      <span className="hidden sm:inline">Screenshot</span>
                    </button>
                  </div>
                  <button
                    onClick={handleEndChat}
                    className="hover:text-foreground flex items-center gap-1"
                    title="End chat"
                  >
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
                    >
                      <rect
                        x="3"
                        y="3"
                        width="18"
                        height="18"
                        rx="2"
                        ry="2"
                      ></rect>
                      <line x1="9" y1="9" x2="15" y2="15"></line>
                      <line x1="15" y1="9" x2="9" y2="15"></line>
                    </svg>
                    <span className="hidden sm:inline">End chat</span>
                  </button>
                </div>
              </div>
            </CardFooter>
          )}
        </div>
      )}
    </div>
  );
};

export default ChatWidget;
