import React from "react";
import { Label } from "@/components/ui/label";
import { Slider } from "@/components/ui/slider";
import { Switch } from "@/components/ui/switch";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { RefreshCw } from "lucide-react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

interface AITabProps {
  config: any;
  handleConfigChange: (section: string, field: string, value: any) => void;
  resetSection: (section: string) => void;
}

const AITab = ({ config, handleConfigChange, resetSection }: AITabProps) => {
  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h3 className="text-lg font-semibold">AI Settings</h3>
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
      <p className="text-sm text-muted-foreground">
        Configure the AI behavior and responses
      </p>

      <div className="space-y-6">
        <div className="space-y-2">
          <Label htmlFor="model">AI Model</Label>
          <Select
            value={config.ai.model}
            onValueChange={(value) => handleConfigChange("ai", "model", value)}
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
          <Label htmlFor="maxTokens">Max Tokens: {config.ai.maxTokens}</Label>
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
    </div>
  );
};

export default AITab;
