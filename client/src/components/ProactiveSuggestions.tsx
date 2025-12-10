import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { AlertCircle, BookOpen, Scale, TrendingUp, Lightbulb } from "lucide-react";
import { useState } from "react";

interface ProactiveSuggestion {
  type: "missing_info" | "related_topic" | "case_precedent" | "next_step";
  title: string;
  description: string;
  priority: "high" | "medium" | "low";
  actionable: boolean;
}

interface ProactiveSuggestionsProps {
  suggestions: ProactiveSuggestion[];
  onAskAbout?: (suggestion: ProactiveSuggestion) => void;
}

const suggestionIcons = {
  missing_info: AlertCircle,
  related_topic: BookOpen,
  case_precedent: Scale,
  next_step: TrendingUp,
};

const suggestionColors = {
  missing_info: "bg-orange-100 text-orange-800 dark:bg-orange-900 dark:text-orange-200",
  related_topic: "bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200",
  case_precedent: "bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-200",
  next_step: "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200",
};

const suggestionLabels = {
  missing_info: "Missing Information",
  related_topic: "Related Topic",
  case_precedent: "Case Precedent",
  next_step: "Next Step",
};

const priorityColors = {
  high: "border-red-500 bg-red-50 dark:bg-red-950",
  medium: "border-yellow-500 bg-yellow-50 dark:bg-yellow-950",
  low: "border-blue-500 bg-blue-50 dark:bg-blue-950",
};

export function ProactiveSuggestions({ suggestions, onAskAbout }: ProactiveSuggestionsProps) {
  const [expanded, setExpanded] = useState(true);

  if (suggestions.length === 0) {
    return null;
  }

  return (
    <Card className="mb-4 border-l-4 border-l-primary">
      <CardHeader className="cursor-pointer" onClick={() => setExpanded(!expanded)}>
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Lightbulb className="h-5 w-5 text-primary" />
            <CardTitle className="text-lg">AI Suggestions</CardTitle>
            <Badge variant="secondary">{suggestions.length}</Badge>
          </div>
          <Button variant="ghost" size="sm">
            {expanded ? "Hide" : "Show"}
          </Button>
        </div>
        <CardDescription>
          Helpful recommendations based on your conversation
        </CardDescription>
      </CardHeader>

      {expanded && (
        <CardContent className="space-y-3">
          {suggestions.map((suggestion, idx) => {
            const Icon = suggestionIcons[suggestion.type];
            const colorClass = suggestionColors[suggestion.type];
            const label = suggestionLabels[suggestion.type];
            const priorityClass = priorityColors[suggestion.priority];

            return (
              <div
                key={idx}
                className={`p-4 rounded-lg border-2 ${priorityClass} transition-all hover:shadow-md`}
              >
                <div className="flex items-start gap-3">
                  <div className={`p-2 rounded-lg ${colorClass}`}>
                    <Icon className="h-4 w-4" />
                  </div>
                  <div className="flex-1 space-y-2">
                    <div className="flex items-start justify-between gap-2">
                      <div>
                        <Badge variant="outline" className="mb-1 text-xs">
                          {label}
                        </Badge>
                        <h4 className="font-semibold text-sm">{suggestion.title}</h4>
                      </div>
                      {suggestion.priority === "high" && (
                        <Badge variant="destructive" className="text-xs">
                          High Priority
                        </Badge>
                      )}
                    </div>
                    <p className="text-sm text-muted-foreground">
                      {suggestion.description}
                    </p>
                    {suggestion.actionable && onAskAbout && (
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => onAskAbout(suggestion)}
                        className="mt-2"
                      >
                        Ask About This
                      </Button>
                    )}
                  </div>
                </div>
              </div>
            );
          })}
        </CardContent>
      )}
    </Card>
  );
}
