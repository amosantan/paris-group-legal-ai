import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Button } from "@/components/ui/button";
import { AlertTriangle, Phone } from "lucide-react";

interface ConfidenceWarningProps {
  confidenceScore: number;
  onRequestReview?: () => void;
}

export function ConfidenceWarning({ confidenceScore, onRequestReview }: ConfidenceWarningProps) {
  if (confidenceScore >= 70) return null;

  const severity = confidenceScore < 50 ? "critical" : "warning";
  
  return (
    <Alert variant="destructive" className="my-4 border-2">
      <AlertTriangle className="h-5 w-5" />
      <AlertTitle className="text-lg font-bold">
        {severity === "critical" ? "⚠️ CRITICAL: Low Confidence Response" : "⚠️ Warning: Low Confidence"}
      </AlertTitle>
      <AlertDescription className="space-y-3">
        <p className="text-sm">
          This AI response has a confidence score of <strong>{confidenceScore}%</strong>, which indicates
          {severity === "critical" 
            ? " significant uncertainty. This response may contain errors or incomplete information."
            : " moderate uncertainty. Please verify this information with additional sources."}
        </p>
        
        <div className="bg-destructive/10 p-3 rounded-md border border-destructive/20">
          <p className="text-sm font-semibold mb-2">
            ⚠️ YOU MUST CONSULT A LICENSED UAE LAWYER
          </p>
          <p className="text-xs">
            Do NOT rely on this response for legal decisions. Low confidence scores indicate the AI
            may be uncertain about laws, procedures, or how they apply to your situation. A qualified
            lawyer can provide accurate, personalized advice.
          </p>
        </div>

        <div className="flex gap-2 flex-wrap">
          {onRequestReview && (
            <Button 
              variant="outline" 
              size="sm"
              onClick={onRequestReview}
              className="border-destructive text-destructive hover:bg-destructive hover:text-destructive-foreground"
            >
              <Phone className="mr-2 h-4 w-4" />
              Request Lawyer Review
            </Button>
          )}
          <Button 
            variant="outline" 
            size="sm"
            onClick={() => window.open("https://parisgroup.ae/contact", "_blank")}
            className="border-destructive text-destructive hover:bg-destructive hover:text-destructive-foreground"
          >
            Contact Paris Group Lawyer
          </Button>
        </div>

        <p className="text-xs text-muted-foreground italic">
          This warning is automatically triggered when AI confidence falls below 70%. Paris Group
          is not liable for any outcomes resulting from reliance on low-confidence responses.
        </p>
      </AlertDescription>
    </Alert>
  );
}
