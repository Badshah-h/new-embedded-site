import React, { useState } from "react";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Plus, Trash2, GripVertical, MessageSquare } from "lucide-react";
import { Switch } from "@/components/ui/switch";

interface PrebuiltMessagesProps {
  config: any;
  handleConfigChange: (section: string, field: string, value: any) => void;
}

const PrebuiltMessages = ({
  config,
  handleConfigChange,
}: PrebuiltMessagesProps) => {
  const [draggedIndex, setDraggedIndex] = useState<number | null>(null);

  const addPrebuiltMessage = () => {
    const newMessage = {
      id: `msg_${Date.now()}`,
      content: "New prebuilt message",
      trigger: "manual",
      delay: 0,
      enabled: true,
    };

    handleConfigChange("messages", "prebuiltMessages", [
      ...config.messages.prebuiltMessages,
      newMessage,
    ]);
  };

  const removePrebuiltMessage = (id: string) => {
    handleConfigChange(
      "messages",
      "prebuiltMessages",
      config.messages.prebuiltMessages.filter((msg: any) => msg.id !== id),
    );
  };

  const updatePrebuiltMessage = (id: string, field: string, value: any) => {
    handleConfigChange(
      "messages",
      "prebuiltMessages",
      config.messages.prebuiltMessages.map((msg: any) =>
        msg.id === id ? { ...msg, [field]: value } : msg,
      ),
    );
  };

  const handleDragStart = (index: number) => {
    setDraggedIndex(index);
  };

  const handleDragOver = (e: React.DragEvent, index: number) => {
    e.preventDefault();
    if (draggedIndex === null || draggedIndex === index) return;

    const messages = [...config.messages.prebuiltMessages];
    const draggedItem = messages[draggedIndex];
    messages.splice(draggedIndex, 1);
    messages.splice(index, 0, draggedItem);

    handleConfigChange("messages", "prebuiltMessages", messages);
    setDraggedIndex(index);
  };

  const handleDragEnd = () => {
    setDraggedIndex(null);
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h3 className="text-lg font-semibold">Prebuilt Messages</h3>
          <p className="text-sm text-muted-foreground">
            Create messages that will be automatically sent during the
            conversation
          </p>
        </div>
        <Button
          variant="outline"
          size="sm"
          onClick={addPrebuiltMessage}
          className="flex items-center gap-1"
        >
          <Plus className="h-3.5 w-3.5" />
          Add Message
        </Button>
      </div>

      <div className="space-y-4">
        {config.messages.prebuiltMessages.length === 0 ? (
          <div className="text-center py-8 border border-dashed rounded-md">
            <MessageSquare className="h-10 w-10 mx-auto text-muted-foreground/50 mb-3" />
            <p className="text-muted-foreground">No prebuilt messages yet</p>
            <p className="text-xs text-muted-foreground/70 mt-1">
              Add messages that will be automatically sent during conversations
            </p>
            <Button
              variant="outline"
              size="sm"
              onClick={addPrebuiltMessage}
              className="mt-4"
            >
              <Plus className="h-3.5 w-3.5 mr-1.5" />
              Add First Message
            </Button>
          </div>
        ) : (
          config.messages.prebuiltMessages.map(
            (message: any, index: number) => (
              <Card
                key={message.id}
                className={`overflow-hidden ${draggedIndex === index ? "border-primary" : ""}`}
                draggable
                onDragStart={() => handleDragStart(index)}
                onDragOver={(e) => handleDragOver(e, index)}
                onDragEnd={handleDragEnd}
              >
                <CardContent className="p-4 space-y-4">
                  <div className="flex justify-between items-start">
                    <div className="flex items-center gap-2">
                      <div className="cursor-move p-1">
                        <GripVertical className="h-4 w-4 text-muted-foreground" />
                      </div>
                      <div className="flex items-center space-x-2">
                        <Switch
                          id={`${message.id}-enabled`}
                          checked={message.enabled}
                          onCheckedChange={(checked) =>
                            updatePrebuiltMessage(
                              message.id,
                              "enabled",
                              checked,
                            )
                          }
                        />
                        <Label
                          htmlFor={`${message.id}-enabled`}
                          className="text-sm font-medium"
                        >
                          {message.enabled ? "Enabled" : "Disabled"}
                        </Label>
                      </div>
                    </div>
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={() => removePrebuiltMessage(message.id)}
                      className="text-destructive hover:text-destructive/90 hover:bg-destructive/10"
                    >
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>

                  <div className="space-y-4">
                    <div className="space-y-2">
                      <Label htmlFor={`${message.id}-content`}>
                        Message Content
                      </Label>
                      <Textarea
                        id={`${message.id}-content`}
                        value={message.content}
                        onChange={(e) =>
                          updatePrebuiltMessage(
                            message.id,
                            "content",
                            e.target.value,
                          )
                        }
                        rows={3}
                      />
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor={`${message.id}-trigger`}>Trigger</Label>
                        <select
                          id={`${message.id}-trigger`}
                          value={message.trigger}
                          onChange={(e) =>
                            updatePrebuiltMessage(
                              message.id,
                              "trigger",
                              e.target.value,
                            )
                          }
                          className="w-full p-2 rounded-md border border-input bg-background"
                        >
                          <option value="manual">Manual</option>
                          <option value="onOpen">On Chat Open</option>
                          <option value="afterGreeting">After Greeting</option>
                          <option value="afterInactivity">
                            After Inactivity
                          </option>
                          <option value="onClose">Before Chat Close</option>
                        </select>
                      </div>

                      {message.trigger === "afterInactivity" && (
                        <div className="space-y-2">
                          <Label htmlFor={`${message.id}-delay`}>
                            Delay (seconds)
                          </Label>
                          <Input
                            id={`${message.id}-delay`}
                            type="number"
                            min="0"
                            value={message.delay}
                            onChange={(e) =>
                              updatePrebuiltMessage(
                                message.id,
                                "delay",
                                parseInt(e.target.value),
                              )
                            }
                          />
                        </div>
                      )}
                    </div>
                  </div>
                </CardContent>
              </Card>
            ),
          )
        )}
      </div>
    </div>
  );
};

export default PrebuiltMessages;
