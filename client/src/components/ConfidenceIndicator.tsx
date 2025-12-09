import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { AlertCircle, CheckCircle, Info, ShieldAlert, ShieldCheck } from "lucide-react";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";

interface ConfidenceIndicatorProps {
  score: number; // 0-100
  level: "very_high" | "high" | "medium" | "low" | "very_low";
  requiresReview?: boolean;
  citationStats?: {
    total: number;
    verified: number;
    unverified: number;
  };
  compact?: boolean;
}

export function ConfidenceIndicator({ 
  score, 
  level, 
  requiresReview = false, 
  citationStats,
  compact = false 
}: ConfidenceIndicatorProps) {
  
  const getLevelConfig = (level: string) => {
    switch (level) {
      case "very_high":
        return {
          label: "Very High Confidence",
          color: "text-green-600 dark:text-green-400",
          bgColor: "bg-green-100 dark:bg-green-900/30",
          borderColor: "border-green-300 dark:border-green-700",
          icon: ShieldCheck,
          progressColor: "bg-green-500",
        };
      case "high":
        return {
          label: "High Confidence",
          color: "text-blue-600 dark:text-blue-400",
          bgColor: "bg-blue-100 dark:bg-blue-900/30",
          borderColor: "border-blue-300 dark:border-blue-700",
          icon: CheckCircle,
          progressColor: "bg-blue-500",
        };
      case "medium":
        return {
          label: "Medium Confidence",
          color: "text-yellow-600 dark:text-yellow-400",
          bgColor: "bg-yellow-100 dark:bg-yellow-900/30",
          borderColor: "border-yellow-300 dark:border-yellow-700",
          icon: Info,
          progressColor: "bg-yellow-500",
        };
      case "low":
        return {
          label: "Low Confidence",
          color: "text-orange-600 dark:text-orange-400",
          bgColor: "bg-orange-100 dark:bg-orange-900/30",
          borderColor: "border-orange-300 dark:border-orange-700",
          icon: AlertCircle,
          progressColor: "bg-orange-500",
        };
      case "very_low":
        return {
          label: "Very Low Confidence",
          color: "text-red-600 dark:text-red-400",
          bgColor: "bg-red-100 dark:bg-red-900/30",
          borderColor: "border-red-300 dark:border-red-700",
          icon: ShieldAlert,
          progressColor: "bg-red-500",
        };
      default:
        return {
          label: "Unknown",
          color: "text-gray-600 dark:text-gray-400",
          bgColor: "bg-gray-100 dark:bg-gray-900/30",
          borderColor: "border-gray-300 dark:border-gray-700",
          icon: Info,
          progressColor: "bg-gray-500",
        };
    }
  };

  const config = getLevelConfig(level);
  const Icon = config.icon;

  if (compact) {
    return (
      <TooltipProvider>
        <Tooltip>
          <TooltipTrigger asChild>
            <Badge 
              variant="outline" 
              className={`${config.bgColor} ${config.borderColor} ${config.color} cursor-help`}
            >
              <Icon className="h-3 w-3 mr-1" />
              {score}%
            </Badge>
          </TooltipTrigger>
          <TooltipContent side="top" className="max-w-xs">
            <div className="space-y-2">
              <p className="font-semibold">{config.label}</p>
              <p className="text-sm">Confidence Score: {score}%</p>
              {citationStats && (
                <p className="text-sm">
                  Citations: {citationStats.verified}/{citationStats.total} verified
                </p>
              )}
              {requiresReview && (
                <p className="text-sm text-orange-500 font-medium">
                  ⚠️ Requires lawyer review
                </p>
              )}
            </div>
          </TooltipContent>
        </Tooltip>
      </TooltipProvider>
    );
  }

  return (
    <div className={`rounded-lg border p-3 space-y-2 ${config.bgColor} ${config.borderColor}`}>
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Icon className={`h-4 w-4 ${config.color}`} />
          <span className={`text-sm font-medium ${config.color}`}>
            {config.label}
          </span>
        </div>
        <span className={`text-sm font-bold ${config.color}`}>{score}%</span>
      </div>
      
      <Progress value={score} className="h-2" />
      
      {citationStats && citationStats.total > 0 && (
        <div className="flex items-center justify-between text-xs text-muted-foreground">
          <span>Citations: {citationStats.verified}/{citationStats.total} verified</span>
          {citationStats.unverified > 0 && (
            <span className="text-orange-500">
              {citationStats.unverified} unverified
            </span>
          )}
        </div>
      )}
      
      {requiresReview && (
        <div className="flex items-center gap-2 text-xs text-orange-600 dark:text-orange-400 font-medium">
          <AlertCircle className="h-3 w-3" />
          <span>This response requires lawyer review</span>
        </div>
      )}
    </div>
  );
}
