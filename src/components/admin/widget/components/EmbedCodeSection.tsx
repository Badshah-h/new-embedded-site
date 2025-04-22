import React from "react";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Copy, Code } from "lucide-react";
import { toast } from "@/components/ui/use-toast";

interface EmbedCodeSectionProps {
  embedCode: string;
}

const EmbedCodeSection = ({ embedCode }: EmbedCodeSectionProps) => {
  const copyToClipboard = () => {
    navigator.clipboard.writeText(embedCode);
    toast({
      title: "Copied to clipboard",
      description: "The embed code has been copied to your clipboard.",
      duration: 3000,
    });
  };

  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center">
        <div>
          <h3 className="text-lg font-semibold">Embed Code</h3>
          <p className="text-sm text-muted-foreground">
            Add this code to your website to display the chat widget
          </p>
        </div>
        <Button
          variant="outline"
          size="sm"
          onClick={copyToClipboard}
          className="flex items-center gap-1"
        >
          <Copy className="h-4 w-4" />
          Copy All
        </Button>
      </div>

      <div className="relative mt-2 group">
        <div className="absolute right-2 top-2 flex gap-1">
          <Button
            size="sm"
            variant="ghost"
            className="h-7 px-2 opacity-0 group-hover:opacity-100 transition-opacity"
            onClick={() => {
              // Logic to show code in a different format if needed
            }}
          >
            <Code className="h-3.5 w-3.5" />
          </Button>
          <Button
            size="sm"
            variant="ghost"
            className="h-7 px-2 opacity-0 group-hover:opacity-100 transition-opacity"
            onClick={copyToClipboard}
          >
            <Copy className="h-3.5 w-3.5" />
          </Button>
        </div>
        <Textarea
          value={embedCode}
          readOnly
          className="font-mono text-xs pr-16 bg-gray-50 dark:bg-gray-900 border-gray-200 dark:border-gray-700 h-32"
        />
      </div>

      <div className="bg-muted/50 p-3 rounded-md border border-border">
        <h4 className="text-sm font-medium mb-2">Quick Instructions</h4>
        <ol className="text-xs text-muted-foreground space-y-1 list-decimal list-inside">
          <li>Copy the code above</li>
          <li>
            Paste it before the closing{" "}
            <code className="bg-muted px-1 py-0.5 rounded text-xs">
              &lt;/body&gt;
            </code>{" "}
            tag on your website
          </li>
          <li>The widget will automatically appear on your site</li>
          <li>You can update the widget anytime from this dashboard</li>
        </ol>
      </div>
    </div>
  );
};

export default EmbedCodeSection;
