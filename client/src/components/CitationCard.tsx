import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  BookOpen,
  ExternalLink,
  Copy,
  Check,
  ChevronDown,
  ChevronUp,
} from "lucide-react";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";

interface CitationCardProps {
  articleNumber: string;
  lawName: string;
  category: string;
  preview: string;
  fullText: string;
  source?: string;
  importance?: number;
  onViewFull?: () => void;
  onAskAbout?: () => void;
}

export function CitationCard({
  articleNumber,
  lawName,
  category,
  preview,
  fullText,
  source,
  importance,
  onViewFull,
  onAskAbout,
}: CitationCardProps) {
  const [isExpanded, setIsExpanded] = useState(false);
  const [isCopied, setIsCopied] = useState(false);

  const handleCopy = async () => {
    const citationText = `${lawName} - Article ${articleNumber}\n\n${fullText}\n\nSource: ${source || "UAE Legal Database"}`;
    await navigator.clipboard.writeText(citationText);
    setIsCopied(true);
    setTimeout(() => setIsCopied(false), 2000);
  };

  const getCategoryColor = (cat: string) => {
    const colors: Record<string, string> = {
      rental_law: "bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200",
      civil_code: "bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-200",
      commercial_law: "bg-amber-100 text-amber-800 dark:bg-amber-900 dark:text-amber-200",
      labor_law: "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200",
      real_estate_law: "bg-orange-100 text-orange-800 dark:bg-orange-900 dark:text-orange-200",
      rera_regulation: "bg-cyan-100 text-cyan-800 dark:bg-cyan-900 dark:text-cyan-200",
      escrow_law: "bg-pink-100 text-pink-800 dark:bg-pink-900 dark:text-pink-200",
      difc_law: "bg-indigo-100 text-indigo-800 dark:bg-indigo-900 dark:text-indigo-200",
    };
    return colors[cat] || "bg-gray-100 text-gray-800 dark:bg-gray-900 dark:text-gray-200";
  };

  const getImportanceBadge = (imp?: number) => {
    if (!imp) return null;
    if (imp >= 8) return <Badge variant="destructive">Critical</Badge>;
    if (imp >= 6) return <Badge className="bg-amber-500">Important</Badge>;
    return <Badge variant="secondary">Standard</Badge>;
  };

  return (
    <Card className="my-3 border-l-4 border-l-primary bg-muted/30">
      <div className="p-4">
        {/* Header */}
        <div className="flex items-start justify-between gap-3 mb-3">
          <div className="flex items-center gap-2 flex-wrap">
            <BookOpen className="h-5 w-5 text-primary flex-shrink-0" />
            <div className="flex flex-col sm:flex-row sm:items-center gap-1 sm:gap-2">
              <span className="font-semibold text-foreground">
                Article {articleNumber}
              </span>
              <span className="text-sm text-muted-foreground">{lawName}</span>
            </div>
          </div>
          <div className="flex items-center gap-2 flex-shrink-0">
            {getImportanceBadge(importance)}
            <Badge className={getCategoryColor(category)}>
              {category.replace(/_/g, " ").toUpperCase()}
            </Badge>
          </div>
        </div>

        {/* Preview */}
        <div className="mb-3">
          <p className="text-sm text-foreground leading-relaxed">
            {isExpanded ? fullText : preview}
            {!isExpanded && preview.length < fullText.length && "..."}
          </p>
        </div>

        {/* Actions */}
        <div className="flex items-center gap-2 flex-wrap">
          {preview.length < fullText.length && (
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setIsExpanded(!isExpanded)}
              className="text-primary hover:text-primary"
            >
              {isExpanded ? (
                <>
                  <ChevronUp className="h-4 w-4 mr-1" />
                  Show Less
                </>
              ) : (
                <>
                  <ChevronDown className="h-4 w-4 mr-1" />
                  Show Full Text
                </>
              )}
            </Button>
          )}

          {onViewFull && (
            <Button
              variant="ghost"
              size="sm"
              onClick={onViewFull}
              className="text-primary hover:text-primary"
            >
              <ExternalLink className="h-4 w-4 mr-1" />
              View Details
            </Button>
          )}

          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={handleCopy}
                  className="text-primary hover:text-primary"
                >
                  {isCopied ? (
                    <>
                      <Check className="h-4 w-4 mr-1" />
                      Copied!
                    </>
                  ) : (
                    <>
                      <Copy className="h-4 w-4 mr-1" />
                      Copy
                    </>
                  )}
                </Button>
              </TooltipTrigger>
              <TooltipContent>
                <p>Copy full citation text</p>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>

          {onAskAbout && (
            <Button
              variant="outline"
              size="sm"
              onClick={onAskAbout}
              className="ml-auto"
            >
              Ask about this article
            </Button>
          )}
        </div>

        {/* Source */}
        {source && (
          <div className="mt-3 pt-3 border-t border-border">
            <p className="text-xs text-muted-foreground">
              Source: {source}
            </p>
          </div>
        )}
      </div>
    </Card>
  );
}
