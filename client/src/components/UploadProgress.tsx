import { CheckCircle2, Loader2, Upload, FileText, Grid3x3, Brain } from "lucide-react";
import { Progress } from "@/components/ui/progress";
import { Card, CardContent } from "@/components/ui/card";

export type UploadStage = "uploading" | "extracting" | "chunking" | "embedding" | "complete" | "error";

interface UploadProgressProps {
  stage: UploadStage;
  progress: number;
  filename: string;
  error?: string;
}

const stageConfig = {
  uploading: {
    icon: Upload,
    label: "Uploading to Storage",
    description: "Transferring PDF file to secure storage...",
    color: "text-blue-500",
  },
  extracting: {
    icon: FileText,
    label: "Extracting Text",
    description: "Reading PDF content and extracting text...",
    color: "text-purple-500",
  },
  chunking: {
    icon: Grid3x3,
    label: "Chunking Content",
    description: "Breaking down text into manageable sections...",
    color: "text-orange-500",
  },
  embedding: {
    icon: Brain,
    label: "Generating Embeddings",
    description: "Creating vector embeddings for intelligent search...",
    color: "text-green-500",
  },
  complete: {
    icon: CheckCircle2,
    label: "Complete",
    description: "PDF successfully added to knowledge base!",
    color: "text-green-600",
  },
  error: {
    icon: CheckCircle2,
    label: "Error",
    description: "Failed to process PDF",
    color: "text-red-600",
  },
};

export default function UploadProgress({ stage, progress, filename, error }: UploadProgressProps) {
  const config = stageConfig[stage];
  const Icon = config.icon;

  return (
    <Card className="border-2">
      <CardContent className="pt-6">
        <div className="space-y-4">
          <div className="flex items-start gap-3">
            <div className={`${config.color} mt-1`}>
              {stage === "complete" ? (
                <CheckCircle2 className="h-6 w-6" />
              ) : stage === "error" ? (
                <CheckCircle2 className="h-6 w-6 text-red-600" />
              ) : (
                <Loader2 className="h-6 w-6 animate-spin" />
              )}
            </div>
            <div className="flex-1 min-w-0">
              <h3 className="font-semibold text-lg">{config.label}</h3>
              <p className="text-sm text-muted-foreground">{config.description}</p>
              <p className="text-xs text-muted-foreground mt-1 truncate">
                File: {filename}
              </p>
            </div>
          </div>

          {stage !== "error" && (
            <div className="space-y-2">
              <Progress value={progress} className="h-2" />
              <div className="flex justify-between text-xs text-muted-foreground">
                <span>{Math.round(progress)}% complete</span>
                {stage !== "complete" && <span>Processing...</span>}
              </div>
            </div>
          )}

          {error && (
            <div className="p-3 bg-red-50 border border-red-200 rounded-md">
              <p className="text-sm text-red-800">{error}</p>
            </div>
          )}

          <div className="flex items-center justify-between pt-2">
            {(["uploading", "extracting", "chunking", "embedding"] as const).map((s) => {
              const isActive = s === stage;
              const isComplete = 
                (s === "uploading" && ["extracting", "chunking", "embedding", "complete"].includes(stage)) ||
                (s === "extracting" && ["chunking", "embedding", "complete"].includes(stage)) ||
                (s === "chunking" && ["embedding", "complete"].includes(stage)) ||
                (s === "embedding" && stage === "complete");
              
              const StageIcon = stageConfig[s].icon;
              
              return (
                <div key={s} className="flex flex-col items-center gap-1">
                  <div
                    className={`w-8 h-8 rounded-full flex items-center justify-center transition-colors ${
                      isComplete
                        ? "bg-green-100 text-green-600"
                        : isActive
                        ? "bg-blue-100 text-blue-600"
                        : "bg-gray-100 text-gray-400"
                    }`}
                  >
                    <StageIcon className="h-4 w-4" />
                  </div>
                  <span className="text-xs text-muted-foreground capitalize hidden sm:block">
                    {s}
                  </span>
                </div>
              );
            })}
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
