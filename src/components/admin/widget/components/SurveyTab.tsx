import React from "react";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Switch } from "@/components/ui/switch";
import { Button } from "@/components/ui/button";
import { RefreshCw, Plus, Trash2 } from "lucide-react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Separator } from "@/components/ui/separator";
import { Card, CardContent } from "@/components/ui/card";

interface SurveyTabProps {
  config: any;
  handleConfigChange: (section: string, field: string, value: any) => void;
  resetSection: (section: string) => void;
}

const SurveyTab = ({
  config,
  handleConfigChange,
  resetSection,
}: SurveyTabProps) => {
  const addPreChatField = () => {
    const newField = {
      id: `field_${Date.now()}`,
      label: "New Field",
      type: "text",
      required: false,
    };

    handleConfigChange("surveys", "preChatFormFields", [
      ...config.surveys.preChatFormFields,
      newField,
    ]);
  };

  const removePreChatField = (id: string) => {
    handleConfigChange(
      "surveys",
      "preChatFormFields",
      config.surveys.preChatFormFields.filter((field: any) => field.id !== id),
    );
  };

  const updatePreChatField = (id: string, field: string, value: any) => {
    handleConfigChange(
      "surveys",
      "preChatFormFields",
      config.surveys.preChatFormFields.map((f: any) =>
        f.id === id ? { ...f, [field]: value } : f,
      ),
    );
  };

  const addPostChatQuestion = () => {
    const newQuestion = {
      id: `question_${Date.now()}`,
      question: "New Question",
      type: "rating",
      required: false,
    };

    handleConfigChange("surveys", "postChatSurveyQuestions", [
      ...config.surveys.postChatSurveyQuestions,
      newQuestion,
    ]);
  };

  const removePostChatQuestion = (id: string) => {
    handleConfigChange(
      "surveys",
      "postChatSurveyQuestions",
      config.surveys.postChatSurveyQuestions.filter((q: any) => q.id !== id),
    );
  };

  const updatePostChatQuestion = (id: string, field: string, value: any) => {
    handleConfigChange(
      "surveys",
      "postChatSurveyQuestions",
      config.surveys.postChatSurveyQuestions.map((q: any) =>
        q.id === id ? { ...q, [field]: value } : q,
      ),
    );
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h3 className="text-lg font-semibold">Survey Settings</h3>
        <Button
          variant="outline"
          size="sm"
          onClick={() => resetSection("surveys")}
          className="flex items-center gap-1"
        >
          <RefreshCw className="h-3 w-3" />
          Reset
        </Button>
      </div>
      <p className="text-sm text-muted-foreground">
        Configure pre-chat forms and post-chat surveys
      </p>

      {/* Pre-Chat Form Section */}
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <h4 className="text-md font-medium">Pre-Chat Form</h4>
          <div className="flex items-center space-x-2">
            <Switch
              id="showPreChatForm"
              checked={config.surveys.showPreChatForm}
              onCheckedChange={(checked) =>
                handleConfigChange("surveys", "showPreChatForm", checked)
              }
            />
            <Label htmlFor="showPreChatForm">Enable Pre-Chat Form</Label>
          </div>
        </div>

        {config.surveys.showPreChatForm && (
          <div className="space-y-4 pl-6 border-l-2 border-muted">
            <div className="flex justify-between items-center">
              <p className="text-sm text-muted-foreground">
                Collect information before starting the chat
              </p>
              <Button
                variant="outline"
                size="sm"
                onClick={addPreChatField}
                className="flex items-center gap-1"
              >
                <Plus className="h-3 w-3" />
                Add Field
              </Button>
            </div>

            {config.surveys.preChatFormFields.map((field: any) => (
              <Card key={field.id} className="overflow-hidden">
                <CardContent className="p-4 space-y-4">
                  <div className="flex justify-between items-start">
                    <div className="space-y-2 flex-1">
                      <Label htmlFor={`${field.id}-label`}>Field Label</Label>
                      <Input
                        id={`${field.id}-label`}
                        value={field.label}
                        onChange={(e) =>
                          updatePreChatField(field.id, "label", e.target.value)
                        }
                      />
                    </div>
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={() => removePreChatField(field.id)}
                      className="text-destructive hover:text-destructive/90 hover:bg-destructive/10"
                    >
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor={`${field.id}-type`}>Field Type</Label>
                      <Select
                        value={field.type}
                        onValueChange={(value) =>
                          updatePreChatField(field.id, "type", value)
                        }
                      >
                        <SelectTrigger id={`${field.id}-type`}>
                          <SelectValue placeholder="Select type" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="text">Text</SelectItem>
                          <SelectItem value="email">Email</SelectItem>
                          <SelectItem value="phone">Phone</SelectItem>
                          <SelectItem value="select">Dropdown</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>

                    <div className="flex items-center space-x-2 pt-8">
                      <Switch
                        id={`${field.id}-required`}
                        checked={field.required}
                        onCheckedChange={(checked) =>
                          updatePreChatField(field.id, "required", checked)
                        }
                      />
                      <Label htmlFor={`${field.id}-required`}>Required</Label>
                    </div>
                  </div>

                  {field.type === "select" && (
                    <div className="space-y-2">
                      <Label htmlFor={`${field.id}-options`}>
                        Options (comma separated)
                      </Label>
                      <Input
                        id={`${field.id}-options`}
                        value={field.options?.join(", ") || ""}
                        onChange={(e) =>
                          updatePreChatField(
                            field.id,
                            "options",
                            e.target.value.split(",").map((o) => o.trim()),
                          )
                        }
                        placeholder="Option 1, Option 2, Option 3"
                      />
                    </div>
                  )}
                </CardContent>
              </Card>
            ))}

            {config.surveys.preChatFormFields.length === 0 && (
              <div className="text-center py-4 text-muted-foreground bg-muted/30 rounded-md">
                No fields added. Click "Add Field" to create your form.
              </div>
            )}
          </div>
        )}
      </div>

      <Separator />

      {/* Post-Chat Survey Section */}
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <h4 className="text-md font-medium">Post-Chat Survey</h4>
          <div className="flex items-center space-x-2">
            <Switch
              id="showPostChatSurvey"
              checked={config.surveys.showPostChatSurvey}
              onCheckedChange={(checked) =>
                handleConfigChange("surveys", "showPostChatSurvey", checked)
              }
            />
            <Label htmlFor="showPostChatSurvey">Enable Post-Chat Survey</Label>
          </div>
        </div>

        {config.surveys.showPostChatSurvey && (
          <div className="space-y-4 pl-6 border-l-2 border-muted">
            <div className="flex justify-between items-center">
              <p className="text-sm text-muted-foreground">
                Collect feedback after the chat ends
              </p>
              <Button
                variant="outline"
                size="sm"
                onClick={addPostChatQuestion}
                className="flex items-center gap-1"
              >
                <Plus className="h-3 w-3" />
                Add Question
              </Button>
            </div>

            {config.surveys.postChatSurveyQuestions.map((question: any) => (
              <Card key={question.id} className="overflow-hidden">
                <CardContent className="p-4 space-y-4">
                  <div className="flex justify-between items-start">
                    <div className="space-y-2 flex-1">
                      <Label htmlFor={`${question.id}-question`}>
                        Question Text
                      </Label>
                      <Input
                        id={`${question.id}-question`}
                        value={question.question}
                        onChange={(e) =>
                          updatePostChatQuestion(
                            question.id,
                            "question",
                            e.target.value,
                          )
                        }
                      />
                    </div>
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={() => removePostChatQuestion(question.id)}
                      className="text-destructive hover:text-destructive/90 hover:bg-destructive/10"
                    >
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor={`${question.id}-type`}>
                        Question Type
                      </Label>
                      <Select
                        value={question.type}
                        onValueChange={(value) =>
                          updatePostChatQuestion(question.id, "type", value)
                        }
                      >
                        <SelectTrigger id={`${question.id}-type`}>
                          <SelectValue placeholder="Select type" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="rating">Rating (1-5)</SelectItem>
                          <SelectItem value="text">Text Response</SelectItem>
                          <SelectItem value="select">Dropdown</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>

                    <div className="flex items-center space-x-2 pt-8">
                      <Switch
                        id={`${question.id}-required`}
                        checked={question.required}
                        onCheckedChange={(checked) =>
                          updatePostChatQuestion(
                            question.id,
                            "required",
                            checked,
                          )
                        }
                      />
                      <Label htmlFor={`${question.id}-required`}>
                        Required
                      </Label>
                    </div>
                  </div>

                  {question.type === "select" && (
                    <div className="space-y-2">
                      <Label htmlFor={`${question.id}-options`}>
                        Options (comma separated)
                      </Label>
                      <Input
                        id={`${question.id}-options`}
                        value={question.options?.join(", ") || ""}
                        onChange={(e) =>
                          updatePostChatQuestion(
                            question.id,
                            "options",
                            e.target.value.split(",").map((o) => o.trim()),
                          )
                        }
                        placeholder="Option 1, Option 2, Option 3"
                      />
                    </div>
                  )}
                </CardContent>
              </Card>
            ))}

            {config.surveys.postChatSurveyQuestions.length === 0 && (
              <div className="text-center py-4 text-muted-foreground bg-muted/30 rounded-md">
                No questions added. Click "Add Question" to create your survey.
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default SurveyTab;
