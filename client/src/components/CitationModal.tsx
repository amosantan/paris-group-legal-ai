import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Separator } from "@/components/ui/separator";
import {
  BookOpen,
  Calendar,
  Tag,
  Link2,
  MessageSquare,
  Copy,
  Check,
} from "lucide-react";
import { useState, useEffect, useRef } from "react";
import { toast } from "sonner";

interface RelatedArticle {
  id: number;
  articleNumber: string;
  title: string;
  category: string;
}

interface CitationModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  highlightText?: string; // Text to highlight in the article
  article: {
    id: number;
    articleNumber: string;
    lawName: string;
    category: string;
    fullText: string;
    source?: string;
    enactmentDate?: string;
    importance?: number;
    legalConcepts?: string[];
    relatedArticles?: RelatedArticle[];
  };
  onAskAbout?: (articleId: number) => void;
  onViewRelated?: (articleId: number) => void;
}

export function CitationModal({
  open,
  onOpenChange,
  article,
  highlightText,
  onAskAbout,
  onViewRelated,
}: CitationModalProps) {
  const [isCopied, setIsCopied] = useState(false);
  const highlightRef = useRef<HTMLDivElement>(null);

  // Scroll to highlighted text when modal opens
  useEffect(() => {
    if (open && highlightText && highlightRef.current) {
      const highlightElement = highlightRef.current.querySelector('.highlighted-text');
      if (highlightElement) {
        setTimeout(() => {
          highlightElement.scrollIntoView({ behavior: 'smooth', block: 'center' });
        }, 100);
      }
    }
  }, [open, highlightText]);

  // Render text with highlighted portions
  const renderHighlightedText = (text: string, highlight: string) => {
    if (!highlight || highlight.trim() === '') return text;
    
    // Escape special regex characters
    const escapeRegex = (str: string) => str.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
    
    // Create case-insensitive regex
    const regex = new RegExp(`(${escapeRegex(highlight)})`, 'gi');
    const parts = text.split(regex);
    
    return (
      <>
        {parts.map((part, index) => {
          if (part.toLowerCase() === highlight.toLowerCase()) {
            return (
              <mark
                key={index}
                className="highlighted-text bg-yellow-200 dark:bg-yellow-800 px-1 rounded"
              >
                {part}
              </mark>
            );
          }
          return <span key={index}>{part}</span>;
        })}
      </>
    );
  };

  const handleCopy = async () => {
    // Format citation in legal citation style
    const citationText = `${article.lawName}, Article ${article.articleNumber}${article.enactmentDate ? ` (${new Date(article.enactmentDate).getFullYear()})` : ''}\n\n${article.fullText}\n\nSource: ${article.source || "UAE Legal Database"}`;
    
    try {
      await navigator.clipboard.writeText(citationText);
      setIsCopied(true);
      toast.success("Citation copied to clipboard", {
        description: `${article.lawName}, Article ${article.articleNumber}`,
      });
      setTimeout(() => setIsCopied(false), 2000);
    } catch (error) {
      toast.error("Failed to copy citation", {
        description: "Please try again or copy manually",
      });
    }
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
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-3xl max-h-[90vh]">
        <DialogHeader>
          <div className="flex items-start justify-between gap-4">
            <div className="flex-1">
              <DialogTitle className="text-2xl flex items-center gap-2">
                <BookOpen className="h-6 w-6 text-primary" />
                Article {article.articleNumber}
              </DialogTitle>
              <DialogDescription className="text-base mt-2">
                {article.lawName}
              </DialogDescription>
            </div>
            <div className="flex flex-col gap-2 items-end">
              {getImportanceBadge(article.importance)}
              <Badge className={getCategoryColor(article.category)}>
                {article.category.replace(/_/g, " ").toUpperCase()}
              </Badge>
            </div>
          </div>
        </DialogHeader>

        <ScrollArea className="max-h-[60vh] pr-4">
          {/* Metadata Section */}
          <div className="space-y-4 mb-6">
            {article.source && (
              <div className="flex items-start gap-2">
                <Link2 className="h-4 w-4 text-muted-foreground mt-1 flex-shrink-0" />
                <div>
                  <p className="text-sm font-medium">Source</p>
                  <p className="text-sm text-muted-foreground">{article.source}</p>
                </div>
              </div>
            )}

            {article.enactmentDate && (
              <div className="flex items-start gap-2">
                <Calendar className="h-4 w-4 text-muted-foreground mt-1 flex-shrink-0" />
                <div>
                  <p className="text-sm font-medium">Enactment Date</p>
                  <p className="text-sm text-muted-foreground">
                    {new Date(article.enactmentDate).toLocaleDateString()}
                  </p>
                </div>
              </div>
            )}

            {article.legalConcepts && article.legalConcepts.length > 0 && (
              <div className="flex items-start gap-2">
                <Tag className="h-4 w-4 text-muted-foreground mt-1 flex-shrink-0" />
                <div className="flex-1">
                  <p className="text-sm font-medium mb-2">Legal Concepts</p>
                  <div className="flex flex-wrap gap-2">
                    {article.legalConcepts.map((concept, index) => (
                      <Badge key={index} variant="outline" className="text-xs">
                        {concept}
                      </Badge>
                    ))}
                  </div>
                </div>
              </div>
            )}
          </div>

          <Separator className="my-4" />

          {/* Full Text Section */}
          <div className="mb-6">
            <h3 className="text-lg font-semibold mb-3">Full Text</h3>
            <div className="bg-muted/50 p-4 rounded-lg" ref={highlightRef}>
              <p className="text-sm leading-relaxed whitespace-pre-wrap">
                {highlightText ? renderHighlightedText(article.fullText, highlightText) : article.fullText}
              </p>
            </div>
          </div>

          {/* Related Articles Section */}
          {article.relatedArticles && article.relatedArticles.length > 0 && (
            <>
              <Separator className="my-4" />
              <div>
                <h3 className="text-lg font-semibold mb-3">Related Articles</h3>
                <div className="space-y-2">
                  {article.relatedArticles.map((related) => (
                    <div
                      key={related.id}
                      className="flex items-center justify-between p-3 bg-muted/30 rounded-lg hover:bg-muted/50 transition-colors"
                    >
                      <div className="flex-1">
                        <p className="font-medium text-sm">
                          Article {related.articleNumber}
                        </p>
                        <p className="text-xs text-muted-foreground">
                          {related.title}
                        </p>
                      </div>
                      <Badge
                        variant="outline"
                        className={`${getCategoryColor(related.category)} text-xs`}
                      >
                        {related.category.replace(/_/g, " ")}
                      </Badge>
                      {onViewRelated && (
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => onViewRelated(related.id)}
                          className="ml-2"
                        >
                          View
                        </Button>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            </>
          )}
        </ScrollArea>

        {/* Action Buttons */}
        <div className="flex items-center gap-2 pt-4 border-t">
          <Button
            variant="outline"
            onClick={handleCopy}
            className="flex-1"
          >
            {isCopied ? (
              <>
                <Check className="h-4 w-4 mr-2" />
                Copied!
              </>
            ) : (
              <>
                <Copy className="h-4 w-4 mr-2" />
                Copy Citation
              </>
            )}
          </Button>
          {onAskAbout && (
            <Button
              onClick={() => {
                onAskAbout(article.id);
                onOpenChange(false);
              }}
              className="flex-1"
            >
              <MessageSquare className="h-4 w-4 mr-2" />
              Ask About This Article
            </Button>
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
}
