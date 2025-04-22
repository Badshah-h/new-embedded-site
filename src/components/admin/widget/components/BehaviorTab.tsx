import React from "react";
import { Label } from "@/components/ui/label";
import { Slider } from "@/components/ui/slider";
import { Switch } from "@/components/ui/switch";
import { Separator } from "@/components/ui/separator";
import { Button } from "@/components/ui/button";
import { RefreshCw } from "lucide-react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

interface BehaviorTabProps {
  config: any;
  handleConfigChange: (section: string, field: string, value: any) => void;
  resetSection: (section: string) => void;
}

const BehaviorTab = ({
  config,
  handleConfigChange,
  resetSection,
}: BehaviorTabProps) => {
  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h3 className="text-lg font-semibold">Behavior Settings</h3>
        <Button
          variant="outline"
          size="sm"
          onClick={() => resetSection("behavior")}
          className="flex items-center gap-1"
        >
          <RefreshCw className="h-3 w-3" />
          Reset
        </Button>
      </div>
      <p className="text-sm text-muted-foreground">
        Configure how your widget behaves
      </p>

      <div className="space-y-6">
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
                  <SelectItem value="scroll">Scroll Percentage</SelectItem>
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
                    handleConfigChange("behavior", "autoOpenDelay", value[0])
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
              handleConfigChange("behavior", "persistConversation", checked)
            }
          />
          <Label htmlFor="persistConversation">Persist Conversation</Label>
        </div>
      </div>
    </div>
  );
};

export default BehaviorTab;
