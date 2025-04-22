import React from "react";
import WidgetConfigurator from "./WidgetConfigurator";

const WidgetConfigPage = () => {
  return (
    <div className="space-y-6">
      <WidgetConfigurator
        onConfigChange={(config) => {
          console.log("Widget config updated:", config);
          // Here you would typically save the configuration to your backend
        }}
      />
    </div>
  );
};

export default WidgetConfigPage;
