import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { User, Calendar, DollarSign, Home, Scale, CheckCircle } from "lucide-react";

interface KeyFact {
  type: "person" | "date" | "amount" | "property" | "legal_issue" | "decision";
  value: string;
  context: string;
}

interface ConversationContextProps {
  facts: KeyFact[];
  summary: string;
}

const factIcons = {
  person: User,
  date: Calendar,
  amount: DollarSign,
  property: Home,
  legal_issue: Scale,
  decision: CheckCircle,
};

const factLabels = {
  person: "People",
  date: "Dates",
  amount: "Amounts",
  property: "Property",
  legal_issue: "Legal Issues",
  decision: "Decisions",
};

const factColors = {
  person: "bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200",
  date: "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200",
  amount: "bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200",
  property: "bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-200",
  legal_issue: "bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200",
  decision: "bg-teal-100 text-teal-800 dark:bg-teal-900 dark:text-teal-200",
};

export function ConversationContext({ facts, summary }: ConversationContextProps) {
  if (facts.length === 0 && !summary) {
    return null;
  }

  // Group facts by type
  const groupedFacts: Record<string, KeyFact[]> = {};
  facts.forEach((fact) => {
    if (!groupedFacts[fact.type]) {
      groupedFacts[fact.type] = [];
    }
    groupedFacts[fact.type].push(fact);
  });

  return (
    <Card className="mb-4">
      <CardHeader>
        <CardTitle className="text-lg flex items-center gap-2">
          <Scale className="h-5 w-5" />
          Conversation Context
        </CardTitle>
        <CardDescription>
          Key information tracked from this consultation
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        {summary && (
          <div className="p-3 bg-muted rounded-lg">
            <p className="text-sm font-medium mb-1">Summary</p>
            <p className="text-sm text-muted-foreground">{summary}</p>
          </div>
        )}

        {Object.entries(groupedFacts).map(([type, typeFacts]) => {
          const Icon = factIcons[type as keyof typeof factIcons];
          const label = factLabels[type as keyof typeof factLabels];
          const colorClass = factColors[type as keyof typeof factColors];

          return (
            <div key={type} className="space-y-2">
              <div className="flex items-center gap-2 text-sm font-medium">
                <Icon className="h-4 w-4" />
                {label}
              </div>
              <div className="flex flex-wrap gap-2">
                {typeFacts.map((fact, idx) => (
                  <Badge
                    key={idx}
                    variant="secondary"
                    className={`${colorClass} text-xs`}
                  >
                    <span className="font-semibold">{fact.value}</span>
                    {fact.context && (
                      <span className="ml-1 opacity-75">({fact.context})</span>
                    )}
                  </Badge>
                ))}
              </div>
            </div>
          );
        })}

        {facts.length === 0 && summary && (
          <p className="text-sm text-muted-foreground italic">
            No key facts extracted yet. Continue the conversation to build context.
          </p>
        )}
      </CardContent>
    </Card>
  );
}
