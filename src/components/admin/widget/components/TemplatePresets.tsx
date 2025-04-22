import React from "react";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

interface TemplatePreset {
  id: string;
  name: string;
  description: string;
  image: string;
  config: any;
}

interface TemplatePresetsProps {
  presets: TemplatePreset[];
  selectedPreset: string | null;
  onSelectPreset: (preset: TemplatePreset) => void;
}

const TemplatePresets = ({
  presets,
  selectedPreset,
  onSelectPreset,
}: TemplatePresetsProps) => {
  return (
    <div className="space-y-4">
      <h3 className="text-lg font-semibold">Template Presets</h3>
      <p className="text-sm text-muted-foreground">
        Choose a pre-designed template as a starting point
      </p>

      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
        {presets.map((preset) => (
          <motion.div
            key={preset.id}
            className={cn(
              "border rounded-lg p-2 cursor-pointer hover:border-primary transition-colors",
              selectedPreset === preset.id &&
                "border-primary ring-2 ring-primary/20",
            )}
            whileHover={{ y: -5 }}
            whileTap={{ scale: 0.98 }}
            onClick={() => onSelectPreset(preset)}
          >
            <div className="bg-gray-100 dark:bg-gray-700 rounded-md h-24 mb-2 overflow-hidden">
              <img
                src={preset.image}
                alt={preset.name}
                className="w-full h-full object-cover"
              />
            </div>
            <p className="text-sm font-medium">{preset.name}</p>
            <p className="text-xs text-muted-foreground">
              {preset.description}
            </p>
          </motion.div>
        ))}
      </div>
    </div>
  );
};

export default TemplatePresets;
