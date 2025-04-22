import React from "react";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Slider } from "@/components/ui/slider";
import { Switch } from "@/components/ui/switch";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { RefreshCw } from "lucide-react";

interface AppearanceTabProps {
  config: any;
  handleConfigChange: (section: string, field: string, value: any) => void;
  resetSection: (section: string) => void;
}

const AppearanceTab = ({
  config,
  handleConfigChange,
  resetSection,
}: AppearanceTabProps) => {
  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h3 className="text-lg font-semibold">Appearance Settings</h3>
        <Button
          variant="outline"
          size="sm"
          onClick={() => resetSection("appearance")}
          className="flex items-center gap-1"
        >
          <RefreshCw className="h-3 w-3" />
          Reset
        </Button>
      </div>
      <p className="text-sm text-muted-foreground">
        Customize how your chat widget looks
      </p>

      <div className="space-y-6">
        <div className="space-y-2">
          <Label htmlFor="template">Template</Label>
          <Select
            value={config.appearance.template}
            onValueChange={(value) =>
              handleConfigChange("appearance", "template", value)
            }
          >
            <SelectTrigger id="template">
              <SelectValue placeholder="Select template" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="modern">Modern Clean</SelectItem>
              <SelectItem value="glass">Glass Effect</SelectItem>
              <SelectItem value="dark">Dark Mode</SelectItem>
              <SelectItem value="rounded">Soft Rounded</SelectItem>
              <SelectItem value="minimal">Minimalist</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div className="space-y-2">
            <Label htmlFor="primaryColor">Primary Color</Label>
            <div className="flex items-center gap-2">
              <div
                className="w-8 h-8 rounded-md border"
                style={{
                  backgroundColor: config.appearance.primaryColor,
                }}
              />
              <Input
                id="primaryColor"
                type="text"
                value={config.appearance.primaryColor}
                onChange={(e) =>
                  handleConfigChange(
                    "appearance",
                    "primaryColor",
                    e.target.value,
                  )
                }
              />
            </div>
          </div>
          <div className="space-y-2">
            <Label htmlFor="secondaryColor">Secondary Color</Label>
            <div className="flex items-center gap-2">
              <div
                className="w-8 h-8 rounded-md border"
                style={{
                  backgroundColor: config.appearance.secondaryColor,
                }}
              />
              <Input
                id="secondaryColor"
                type="text"
                value={config.appearance.secondaryColor}
                onChange={(e) =>
                  handleConfigChange(
                    "appearance",
                    "secondaryColor",
                    e.target.value,
                  )
                }
              />
            </div>
          </div>
        </div>

        <div className="space-y-2">
          <Label htmlFor="fontFamily">Font Family</Label>
          <Select
            value={config.appearance.fontFamily}
            onValueChange={(value) =>
              handleConfigChange("appearance", "fontFamily", value)
            }
          >
            <SelectTrigger id="fontFamily">
              <SelectValue placeholder="Select font" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="Inter">Inter</SelectItem>
              <SelectItem value="Roboto">Roboto</SelectItem>
              <SelectItem value="Open Sans">Open Sans</SelectItem>
              <SelectItem value="Lato">Lato</SelectItem>
              <SelectItem value="Poppins">Poppins</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div className="space-y-2">
          <Label htmlFor="borderRadius">
            Border Radius: {config.appearance.borderRadius}px
          </Label>
          <Slider
            id="borderRadius"
            min={0}
            max={20}
            step={1}
            value={[config.appearance.borderRadius]}
            onValueChange={(value) =>
              handleConfigChange("appearance", "borderRadius", value[0])
            }
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="position">Widget Position</Label>
          <Select
            value={config.appearance.position}
            onValueChange={(value) =>
              handleConfigChange("appearance", "position", value)
            }
          >
            <SelectTrigger id="position">
              <SelectValue placeholder="Select position" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="bottom-right">Bottom Right</SelectItem>
              <SelectItem value="bottom-left">Bottom Left</SelectItem>
              <SelectItem value="top-right">Top Right</SelectItem>
              <SelectItem value="top-left">Top Left</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div className="space-y-2">
            <Label htmlFor="width">Width: {config.appearance.width}px</Label>
            <Slider
              id="width"
              min={250}
              max={500}
              step={10}
              value={[config.appearance.width]}
              onValueChange={(value) =>
                handleConfigChange("appearance", "width", value[0])
              }
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="height">Height: {config.appearance.height}px</Label>
            <Slider
              id="height"
              min={300}
              max={700}
              step={10}
              value={[config.appearance.height]}
              onValueChange={(value) =>
                handleConfigChange("appearance", "height", value[0])
              }
            />
          </div>
        </div>

        <div className="flex items-center space-x-2">
          <Switch
            id="darkMode"
            checked={config.appearance.darkMode}
            onCheckedChange={(checked) =>
              handleConfigChange("appearance", "darkMode", checked)
            }
          />
          <Label htmlFor="darkMode">Dark Mode</Label>
        </div>

        <div className="space-y-2">
          <Label htmlFor="logo">Logo URL</Label>
          <Input
            id="logo"
            type="text"
            value={config.appearance.logo}
            onChange={(e) =>
              handleConfigChange("appearance", "logo", e.target.value)
            }
          />
          <div className="mt-2 flex justify-center">
            <img
              src={config.appearance.logo}
              alt="Widget Logo"
              className="h-12 w-12 rounded-full object-cover border"
            />
          </div>
        </div>

        <div className="space-y-2">
          <Label htmlFor="customCSS">Custom CSS</Label>
          <Textarea
            id="customCSS"
            placeholder="Add custom CSS here..."
            value={config.appearance.customCSS}
            onChange={(e) =>
              handleConfigChange("appearance", "customCSS", e.target.value)
            }
            className="font-mono text-xs"
            rows={4}
          />
        </div>
      </div>
    </div>
  );
};

export default AppearanceTab;
