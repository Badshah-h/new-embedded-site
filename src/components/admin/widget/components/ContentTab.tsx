import React from "react";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { RefreshCw } from "lucide-react";

interface ContentTabProps {
  config: any;
  handleConfigChange: (section: string, field: string, value: any) => void;
  resetSection: (section: string) => void;
}

const ContentTab = ({
  config,
  handleConfigChange,
  resetSection,
}: ContentTabProps) => {
  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h3 className="text-lg font-semibold">Content Settings</h3>
        <Button
          variant="outline"
          size="sm"
          onClick={() => resetSection("content")}
          className="flex items-center gap-1"
        >
          <RefreshCw className="h-3 w-3" />
          Reset
        </Button>
      </div>
      <p className="text-sm text-muted-foreground">
        Customize the text and messages
      </p>

      <div className="space-y-6">
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
              handleConfigChange("content", "welcomeMessage", e.target.value)
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
              handleConfigChange("content", "inputPlaceholder", e.target.value)
            }
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="offlineMessage">Offline Message</Label>
          <Textarea
            id="offlineMessage"
            value={config.content.offlineMessage}
            onChange={(e) =>
              handleConfigChange("content", "offlineMessage", e.target.value)
            }
            rows={3}
          />
        </div>
      </div>
    </div>
  );
};

export default ContentTab;
