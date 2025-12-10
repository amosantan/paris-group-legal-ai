import { AlertCircle } from "lucide-react";

export function DisclaimerBadge() {
  return (
    <div className="text-xs text-muted-foreground italic border-l-2 border-amber-500 pl-3 py-2 my-2 bg-amber-50/50">
      <div className="flex items-start gap-2">
        <AlertCircle className="h-3 w-3 mt-0.5 flex-shrink-0 text-amber-600" />
        <div>
          <strong className="text-amber-900">Jurisdiction Disclaimer:</strong>{" "}
          <span className="text-amber-800">
            This response applies to Dubai/UAE law as of the knowledge cutoff date. 
            Laws vary by jurisdiction and change frequently. This is not legal advice. 
            Always consult a licensed UAE lawyer before taking action.
          </span>
        </div>
      </div>
    </div>
  );
}
