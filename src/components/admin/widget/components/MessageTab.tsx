import React from "react";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Button } from "@/components/ui/button";
import { RefreshCw } from "lucide-react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Separator } from "@/components/ui/separator";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";

interface MessageTabProps {
  config: any;
  handleConfigChange: (section: string, field: string, value: any) => void;
  resetSection: (section: string) => void;
}

const MessageTab = ({
  config,
  handleConfigChange,
  resetSection,
}: MessageTabProps) => {
  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h3 className="text-lg font-semibold">Message Settings</h3>
        <Button
          variant="outline"
          size="sm"
          onClick={() => resetSection("messages")}
          className="flex items-center gap-1"
        >
          <RefreshCw className="h-3 w-3" />
          Reset
        </Button>
      </div>
      <p className="text-sm text-muted-foreground">
        Configure message appearance and behavior
      </p>

      <div className="space-y-6">
        {/* Message Style */}
        <div className="space-y-2">
          <Label htmlFor="messageStyle">Message Style</Label>
          <RadioGroup
            id="messageStyle"
            value={config.messages.messageStyle}
            onValueChange={(value) =>
              handleConfigChange("messages", "messageStyle", value)
            }
            className="grid grid-cols-3 gap-4"
          >
            <Label
              htmlFor="bubble-style"
              className="flex flex-col items-center justify-between rounded-md border-2 border-muted bg-popover p-4 hover:bg-accent hover:text-accent-foreground cursor-pointer"
              style={{
                borderColor:
                  config.messages.messageStyle === "bubble"
                    ? config.appearance.primaryColor
                    : undefined,
              }}
            >
              <RadioGroupItem
                value="bubble"
                id="bubble-style"
                className="sr-only"
              />
              <div className="space-y-2 w-full">
                <div className="rounded-lg bg-muted-foreground/20 p-2 text-xs">
                  Hello there!
                </div>
                <div className="rounded-lg bg-primary p-2 text-xs text-primary-foreground text-right ml-auto">
                  Hi!
                </div>
              </div>
              <span className="block w-full text-center text-sm font-medium mt-2">
                Bubble
              </span>
            </Label>

            <Label
              htmlFor="modern-style"
              className="flex flex-col items-center justify-between rounded-md border-2 border-muted bg-popover p-4 hover:bg-accent hover:text-accent-foreground cursor-pointer"
              style={{
                borderColor:
                  config.messages.messageStyle === "modern"
                    ? config.appearance.primaryColor
                    : undefined,
              }}
            >
              <RadioGroupItem
                value="modern"
                id="modern-style"
                className="sr-only"
              />
              <div className="space-y-2 w-full">
                <div className="rounded-md border border-border/50 bg-muted-foreground/20 p-2 text-xs">
                  Hello there!
                </div>
                <div className="rounded-md border border-primary/30 bg-primary p-2 text-xs text-primary-foreground text-right ml-auto">
                  Hi!
                </div>
              </div>
              <span className="block w-full text-center text-sm font-medium mt-2">
                Modern
              </span>
            </Label>

            <Label
              htmlFor="minimal-style"
              className="flex flex-col items-center justify-between rounded-md border-2 border-muted bg-popover p-4 hover:bg-accent hover:text-accent-foreground cursor-pointer"
              style={{
                borderColor:
                  config.messages.messageStyle === "minimal"
                    ? config.appearance.primaryColor
                    : undefined,
              }}
            >
              <RadioGroupItem
                value="minimal"
                id="minimal-style"
                className="sr-only"
              />
              <div className="space-y-2 w-full">
                <div className="border-b border-border/30 bg-muted-foreground/10 p-2 text-xs">
                  Hello there!
                </div>
                <div className="border-b border-primary/30 bg-primary/90 p-2 text-xs text-primary-foreground text-right ml-auto">
                  Hi!
                </div>
              </div>
              <span className="block w-full text-center text-sm font-medium mt-2">
                Minimal
              </span>
            </Label>
          </RadioGroup>
        </div>

        <Separator />

        {/* Real-time Indicators */}
        <div className="space-y-4">
          <h4 className="text-md font-medium">Real-time Indicators</h4>

          <div className="flex items-center space-x-2">
            <Switch
              id="showTypingIndicator"
              checked={config.messages.showTypingIndicator}
              onCheckedChange={(checked) =>
                handleConfigChange("messages", "showTypingIndicator", checked)
              }
            />
            <Label htmlFor="showTypingIndicator">Show Typing Indicator</Label>
          </div>

          <div className="flex items-center space-x-2">
            <Switch
              id="showReadReceipts"
              checked={config.messages.showReadReceipts}
              onCheckedChange={(checked) =>
                handleConfigChange("messages", "showReadReceipts", checked)
              }
            />
            <Label htmlFor="showReadReceipts">Show Read Receipts</Label>
          </div>
        </div>

        <Separator />

        {/* Message Feedback */}
        <div className="space-y-4">
          <h4 className="text-md font-medium">Message Feedback</h4>

          <div className="flex items-center space-x-2">
            <Switch
              id="enableFeedback"
              checked={config.messages.enableFeedback}
              onCheckedChange={(checked) =>
                handleConfigChange("messages", "enableFeedback", checked)
              }
            />
            <Label htmlFor="enableFeedback">Enable Message Feedback</Label>
          </div>

          {config.messages.enableFeedback && (
            <div className="space-y-2 pl-6 border-l-2 border-muted">
              <p className="text-sm text-muted-foreground">
                Allow users to rate individual AI responses
              </p>

              <div className="space-y-2">
                <Label htmlFor="feedbackType">Feedback Type</Label>
                <Select
                  value={config.messages.feedbackType}
                  onValueChange={(value) =>
                    handleConfigChange("messages", "feedbackType", value)
                  }
                >
                  <SelectTrigger id="feedbackType">
                    <SelectValue placeholder="Select feedback type" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="rating">Rating (1-5)</SelectItem>
                    <SelectItem value="thumbs">Thumbs Up/Down</SelectItem>
                    <SelectItem value="emoji">Emoji Reactions</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="flex items-center space-x-2">
                <Switch
                  id="collectFeedbackComments"
                  checked={config.messages.collectFeedbackComments}
                  onCheckedChange={(checked) =>
                    handleConfigChange(
                      "messages",
                      "collectFeedbackComments",
                      checked,
                    )
                  }
                />
                <Label htmlFor="collectFeedbackComments">
                  Collect Feedback Comments
                </Label>
              </div>
            </div>
          )}
        </div>

        <Separator />

        {/* Attachments */}
        <div className="space-y-4">
          <h4 className="text-md font-medium">Attachments</h4>

          <div className="flex items-center space-x-2">
            <Switch
              id="allowAttachments"
              checked={config.messages.allowAttachments}
              onCheckedChange={(checked) =>
                handleConfigChange("messages", "allowAttachments", checked)
              }
            />
            <Label htmlFor="allowAttachments">Allow File Attachments</Label>
          </div>

          {config.messages.allowAttachments && (
            <div className="space-y-4 pl-6 border-l-2 border-muted">
              <div className="space-y-2">
                <Label htmlFor="maxAttachmentSize">
                  Max File Size (MB): {config.messages.maxAttachmentSize}
                </Label>
                <Select
                  value={config.messages.maxAttachmentSize.toString()}
                  onValueChange={(value) =>
                    handleConfigChange(
                      "messages",
                      "maxAttachmentSize",
                      parseInt(value),
                    )
                  }
                >
                  <SelectTrigger id="maxAttachmentSize">
                    <SelectValue placeholder="Select max size" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="2">2 MB</SelectItem>
                    <SelectItem value="5">5 MB</SelectItem>
                    <SelectItem value="10">10 MB</SelectItem>
                    <SelectItem value="20">20 MB</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label>Allowed File Types</Label>
                <div className="grid grid-cols-2 gap-2">
                  <div className="flex items-center space-x-2">
                    <Switch
                      id="allowImages"
                      checked={config.messages.allowedFileTypes.images}
                      onCheckedChange={(checked) =>
                        handleConfigChange("messages", "allowedFileTypes", {
                          ...config.messages.allowedFileTypes,
                          images: checked,
                        })
                      }
                    />
                    <Label htmlFor="allowImages">Images</Label>
                  </div>

                  <div className="flex items-center space-x-2">
                    <Switch
                      id="allowDocuments"
                      checked={config.messages.allowedFileTypes.documents}
                      onCheckedChange={(checked) =>
                        handleConfigChange("messages", "allowedFileTypes", {
                          ...config.messages.allowedFileTypes,
                          documents: checked,
                        })
                      }
                    />
                    <Label htmlFor="allowDocuments">Documents</Label>
                  </div>

                  <div className="flex items-center space-x-2">
                    <Switch
                      id="allowAudio"
                      checked={config.messages.allowedFileTypes.audio}
                      onCheckedChange={(checked) =>
                        handleConfigChange("messages", "allowedFileTypes", {
                          ...config.messages.allowedFileTypes,
                          audio: checked,
                        })
                      }
                    />
                    <Label htmlFor="allowAudio">Audio</Label>
                  </div>

                  <div className="flex items-center space-x-2">
                    <Switch
                      id="allowVideo"
                      checked={config.messages.allowedFileTypes.video}
                      onCheckedChange={(checked) =>
                        handleConfigChange("messages", "allowedFileTypes", {
                          ...config.messages.allowedFileTypes,
                          video: checked,
                        })
                      }
                    />
                    <Label htmlFor="allowVideo">Video</Label>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default MessageTab;
