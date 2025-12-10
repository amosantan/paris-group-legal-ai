import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { User, Calendar, DollarSign, Home, Scale, X } from "lucide-react";

interface ConversationContext {
  people?: string[];
  dates?: string[];
  amounts?: string[];
  properties?: string[];
  legalIssues?: string[];
}

interface ConversationContextSidebarProps {
  context?: ConversationContext;
  onClearContext?: () => void;
}

export function ConversationContextSidebar({ context, onClearContext }: ConversationContextSidebarProps) {
  if (!context) {
    return (
      <Card className="h-full">
        <CardHeader>
          <CardTitle className="text-sm">Conversation Context</CardTitle>
          <CardDescription className="text-xs">
            Key facts will appear here as you chat
          </CardDescription>
        </CardHeader>
      </Card>
    );
  }

  const hasFacts = 
    (context.people?.length || 0) > 0 ||
    (context.dates?.length || 0) > 0 ||
    (context.amounts?.length || 0) > 0 ||
    (context.properties?.length || 0) > 0 ||
    (context.legalIssues?.length || 0) > 0;

  return (
    <Card className="h-full overflow-y-auto">
      <CardHeader className="pb-3">
        <div className="flex items-center justify-between">
          <div>
            <CardTitle className="text-sm">Conversation Context</CardTitle>
            <CardDescription className="text-xs">
              AI-tracked key facts
            </CardDescription>
          </div>
          {hasFacts && onClearContext && (
            <Button 
              variant="ghost" 
              size="sm"
              onClick={onClearContext}
              className="h-7 text-xs"
            >
              <X className="h-3 w-3 mr-1" />
              Clear
            </Button>
          )}
        </div>
      </CardHeader>
      <CardContent className="space-y-4">
        {!hasFacts && (
          <p className="text-xs text-muted-foreground italic">
            No key facts tracked yet. Start chatting to see context appear.
          </p>
        )}

        {context.people && context.people.length > 0 && (
          <div className="space-y-2">
            <div className="flex items-center gap-2 text-xs font-semibold text-muted-foreground">
              <User className="h-3 w-3" />
              People
            </div>
            <div className="flex flex-wrap gap-1">
              {context.people.map((person, idx) => (
                <Badge key={idx} variant="secondary" className="text-xs">
                  {person}
                </Badge>
              ))}
            </div>
          </div>
        )}

        {context.dates && context.dates.length > 0 && (
          <div className="space-y-2">
            <div className="flex items-center gap-2 text-xs font-semibold text-muted-foreground">
              <Calendar className="h-3 w-3" />
              Dates
            </div>
            <div className="flex flex-wrap gap-1">
              {context.dates.map((date, idx) => (
                <Badge key={idx} variant="outline" className="text-xs">
                  {date}
                </Badge>
              ))}
            </div>
          </div>
        )}

        {context.amounts && context.amounts.length > 0 && (
          <div className="space-y-2">
            <div className="flex items-center gap-2 text-xs font-semibold text-muted-foreground">
              <DollarSign className="h-3 w-3" />
              Amounts
            </div>
            <div className="flex flex-wrap gap-1">
              {context.amounts.map((amount, idx) => (
                <Badge key={idx} variant="outline" className="text-xs">
                  {amount}
                </Badge>
              ))}
            </div>
          </div>
        )}

        {context.properties && context.properties.length > 0 && (
          <div className="space-y-2">
            <div className="flex items-center gap-2 text-xs font-semibold text-muted-foreground">
              <Home className="h-3 w-3" />
              Properties
            </div>
            <div className="flex flex-wrap gap-1">
              {context.properties.map((property, idx) => (
                <Badge key={idx} variant="outline" className="text-xs">
                  {property}
                </Badge>
              ))}
            </div>
          </div>
        )}

        {context.legalIssues && context.legalIssues.length > 0 && (
          <div className="space-y-2">
            <div className="flex items-center gap-2 text-xs font-semibold text-muted-foreground">
              <Scale className="h-3 w-3" />
              Legal Issues
            </div>
            <div className="flex flex-wrap gap-1">
              {context.legalIssues.map((issue, idx) => (
                <Badge key={idx} variant="default" className="text-xs">
                  {issue}
                </Badge>
              ))}
            </div>
          </div>
        )}

        <div className="pt-2 border-t">
          <p className="text-xs text-muted-foreground italic">
            💡 The AI uses this context to provide more accurate, personalized advice.
          </p>
        </div>
      </CardContent>
    </Card>
  );
}
