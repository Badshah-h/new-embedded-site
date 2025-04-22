import React from "react";
import WidgetConfigurator from "../WidgetConfigurator";

const WidgetConfigPage = () => {
  return (
    <div className="space-y-6">
      <div className="flex flex-col space-y-2">
        <h2 className="text-3xl font-bold tracking-tight">
          Widget Configuration
        </h2>
        <p className="text-muted-foreground">
          Customize your chat widget appearance, behavior, and AI settings.
        </p>
      </div>

      <div className="flex flex-col lg:flex-row gap-6">
        <WidgetConfigurator
          onConfigChange={(config) => {
            console.log("Widget config updated:", config);
            // Here you would typically save the configuration to your backend
          }}
        />
      </div>
    </div>
  );
};

export default WidgetConfigPage;
