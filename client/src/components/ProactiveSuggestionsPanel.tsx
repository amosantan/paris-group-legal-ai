import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Lightbulb, AlertCircle, FileText, ArrowRight } from "lucide-react";

interface Suggestion {
  type: "missing_info" | "related_topic" | "case_precedent" | "next_step";
  title: string;
  description: string;
  action?: string;
}

interface ProactiveSuggestionsPanelProps {
  suggestions?: Suggestion[];
  onSuggestionClick?: (suggestion: Suggestion) => void;
}

export function ProactiveSuggestionsPanel({ suggestions, onSuggestionClick }: ProactiveSuggestionsPanelProps) {
  if (!suggestions || suggestions.length === 0) {
    return null;
  }

  const getIcon = (type: Suggestion["type"]) => {
    switch (type) {
      case "missing_info":
        return <AlertCircle className="h-4 w-4 text-amber-600" />;
      case "related_topic":
        return <Lightbulb className="h-4 w-4 text-blue-600" />;
      case "case_precedent":
        return <FileText className="h-4 w-4 text-purple-600" />;
      case "next_step":
        return <ArrowRight className="h-4 w-4 text-green-600" />;
    }
  };

  const getTypeLabel = (type: Suggestion["type"]) => {
    switch (type) {
      case "missing_info":
        return "Missing Info";
      case "related_topic":
        return "Related Topic";
      case "case_precedent":
        return "Case Precedent";
      case "next_step":
        return "Next Step";
    }
  };

  const getTypeColor = (type: Suggestion["type"]) => {
    switch (type) {
      case "missing_info":
        return "bg-amber-100 text-amber-800 border-amber-300";
      case "related_topic":
        return "bg-blue-100 text-blue-800 border-blue-300";
      case "case_precedent":
        return "bg-purple-100 text-purple-800 border-purple-300";
      case "next_step":
        return "bg-green-100 text-green-800 border-green-300";
    }
  };

  return (
    <Card className="border-l-4 border-l-blue-500">
      <CardHeader className="pb-3">
        <div className="flex items-center gap-2">
          <Lightbulb className="h-5 w-5 text-blue-600" />
          <div>
            <CardTitle className="text-sm">AI Suggestions</CardTitle>
            <CardDescription className="text-xs">
              Proactive recommendations based on your conversation
            </CardDescription>
          </div>
        </div>
      </CardHeader>
      <CardContent className="space-y-3">
        {suggestions.map((suggestion, idx) => (
          <div 
            key={idx} 
            className="p-3 rounded-lg border bg-card hover:bg-accent/50 transition-colors"
          >
            <div className="flex items-start gap-3">
              <div className="mt-0.5">
                {getIcon(suggestion.type)}
              </div>
              <div className="flex-1 space-y-2">
                <div className="flex items-center gap-2">
                  <Badge 
                    variant="outline" 
                    className={`text-xs ${getTypeColor(suggestion.type)}`}
                  >
                    {getTypeLabel(suggestion.type)}
                  </Badge>
                </div>
                <div>
                  <p className="text-sm font-medium">{suggestion.title}</p>
                  <p className="text-xs text-muted-foreground mt-1">
                    {suggestion.description}
                  </p>
                </div>
                {suggestion.action && onSuggestionClick && (
                  <Button
                    size="sm"
                    variant="outline"
                    className="text-xs h-7"
                    onClick={() => onSuggestionClick(suggestion)}
                  >
                    {suggestion.action}
                  </Button>
                )}
              </div>
            </div>
          </div>
        ))}
      </CardContent>
    </Card>
  );
}
