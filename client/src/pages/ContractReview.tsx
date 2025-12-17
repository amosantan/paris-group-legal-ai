import DashboardLayout from "@/components/DashboardLayout";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { trpc } from "@/lib/trpc";
import { AlertTriangle, CheckCircle2, FileText, Loader2, XCircle } from "lucide-react";
import { useParams } from "wouter";
import { toast } from "sonner";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";

export default function ContractReview() {
  const { documentId } = useParams<{ documentId: string }>();
  const docId = parseInt(documentId || "0");

  const utils = trpc.useUtils();
  const { data: document } = trpc.documents.getById.useQuery({ id: docId });
  const { data: review, isLoading: reviewLoading } = trpc.contractReview.getByDocumentId.useQuery({ documentId: docId });

  const analyzeMutation = trpc.contractReview.analyze.useMutation({
    onSuccess: () => {
      utils.contractReview.getByDocumentId.invalidate({ documentId: docId });
      toast.success("Contract analysis completed");
    },
    onError: (error) => {
      toast.error("Analysis failed: " + error.message);
    },
  });

  const handleAnalyze = () => {
    if (!document) return;
    analyzeMutation.mutate({
      documentId: docId,
      consultationId: document.consultationId,
      language: "en",
    });
  };

  const getRiskColor = (score: number) => {
    if (score < 30) return "text-green-600";
    if (score < 60) return "text-yellow-600";
    return "text-red-600";
  };

  const getRiskLabel = (score: number) => {
    if (score < 30) return "Low Risk";
    if (score < 60) return "Medium Risk";
    return "High Risk";
  };

  if (!document) {
    return (
      <DashboardLayout>
        <div className="flex items-center justify-center h-96">
          <Loader2 className="h-8 w-8 animate-spin" />
        </div>
      </DashboardLayout>
    );
  }

  return (
    <DashboardLayout>
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold tracking-tight">Contract Review</h1>
            <p className="text-muted-foreground mt-2">{document.filename}</p>
          </div>
          <Button
            onClick={handleAnalyze}
            disabled={analyzeMutation.isPending}
          >
            {analyzeMutation.isPending ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Analyzing...
              </>
            ) : (
              <>
                <FileText className="mr-2 h-4 w-4" />
                {review ? "Re-analyze" : "Analyze Contract"}
              </>
            )}
          </Button>
        </div>

        {reviewLoading ? (
          <div className="flex items-center justify-center h-96">
            <Loader2 className="h-8 w-8 animate-spin" />
          </div>
        ) : review ? (
          <div className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Risk Assessment</CardTitle>
                <CardDescription>Overall contract risk evaluation</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-muted-foreground">Overall Risk Score</p>
                    <p className={`text-3xl font-bold ${getRiskColor(review.overallRiskScore)}`}>
                      {review.overallRiskScore}/100
                    </p>
                    <Badge className="mt-2" variant={review.overallRiskScore < 30 ? "default" : review.overallRiskScore < 60 ? "secondary" : "destructive"}>
                      {getRiskLabel(review.overallRiskScore)}
                    </Badge>
                  </div>
                  <Progress value={review.overallRiskScore} className="w-1/2" />
                </div>
                <Separator />
                <div>
                  <h3 className="font-semibold mb-2">Summary</h3>
                  <p className="text-sm text-muted-foreground">{review.summary}</p>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <AlertTriangle className="h-5 w-5 text-yellow-600" />
                  Key Findings
                </CardTitle>
              </CardHeader>
              <CardContent>
                {review.findings && review.findings.length > 0 ? (
                  <ul className="space-y-2">
                    {review.findings.map((finding: string, idx: number) => (
                      <li key={idx} className="flex items-start gap-2">
                        <span className="text-yellow-600 mt-1">•</span>
                        <span className="text-sm">{finding}</span>
                      </li>
                    ))}
                  </ul>
                ) : (
                  <p className="text-sm text-muted-foreground">No findings</p>
                )}
              </CardContent>
            </Card>

            <div className="grid gap-6 md:grid-cols-2">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <XCircle className="h-5 w-5 text-red-600" />
                    Problematic Clauses
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  {review.problematicClauses && review.problematicClauses.length > 0 ? (
                    <ul className="space-y-3">
                      {review.problematicClauses.map((clause: string, idx: number) => (
                        <li key={idx} className="p-3 bg-red-50 dark:bg-red-950 rounded-lg">
                          <p className="text-sm">{clause}</p>
                        </li>
                      ))}
                    </ul>
                  ) : (
                    <p className="text-sm text-muted-foreground">No problematic clauses identified</p>
                  )}
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <AlertTriangle className="h-5 w-5 text-orange-600" />
                    Missing Clauses
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  {review.missingClauses && review.missingClauses.length > 0 ? (
                    <ul className="space-y-3">
                      {review.missingClauses.map((clause: string, idx: number) => (
                        <li key={idx} className="p-3 bg-orange-50 dark:bg-orange-950 rounded-lg">
                          <p className="text-sm">{clause}</p>
                        </li>
                      ))}
                    </ul>
                  ) : (
                    <p className="text-sm text-muted-foreground">No missing clauses identified</p>
                  )}
                </CardContent>
              </Card>
            </div>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <CheckCircle2 className="h-5 w-5 text-green-600" />
                  Recommendations
                </CardTitle>
              </CardHeader>
              <CardContent>
                {review.recommendations && review.recommendations.length > 0 ? (
                  <ul className="space-y-3">
                    {review.recommendations.map((rec: string, idx: number) => (
                      <li key={idx} className="flex items-start gap-2">
                        <CheckCircle2 className="h-4 w-4 text-green-600 mt-0.5 flex-shrink-0" />
                        <span className="text-sm">{rec}</span>
                      </li>
                    ))}
                  </ul>
                ) : (
                  <p className="text-sm text-muted-foreground">No recommendations</p>
                )}
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Legal References</CardTitle>
                <CardDescription>Applicable UAE/Dubai laws and regulations</CardDescription>
              </CardHeader>
              <CardContent>
                {review.legalReferences && review.legalReferences.length > 0 ? (
                  <div className="space-y-2">
                    {review.legalReferences.map((ref: string, idx: number) => (
                      <Alert key={idx}>
                        <AlertTitle className="text-sm font-medium">Reference {idx + 1}</AlertTitle>
                        <AlertDescription className="text-sm">{ref}</AlertDescription>
                      </Alert>
                    ))}
                  </div>
                ) : (
                  <p className="text-sm text-muted-foreground">No legal references</p>
                )}
              </CardContent>
            </Card>

            <Alert>
              <AlertTriangle className="h-4 w-4" />
              <AlertTitle>Legal Disclaimer</AlertTitle>
              <AlertDescription>
                This AI-powered analysis is informational and does not constitute legal advice. It is based on current UAE/Dubai law and SANZEN internal documents. For binding legal counsel, please consult with a licensed attorney.
              </AlertDescription>
            </Alert>
          </div>
        ) : (
          <Card>
            <CardContent className="py-12 text-center">
              <FileText className="mx-auto h-12 w-12 text-muted-foreground mb-4" />
              <h3 className="text-lg font-semibold mb-2">No Analysis Yet</h3>
              <p className="text-muted-foreground mb-4">
                Click "Analyze Contract" to start a comprehensive legal review
              </p>
            </CardContent>
          </Card>
        )}
      </div>
    </DashboardLayout>
  );
}
