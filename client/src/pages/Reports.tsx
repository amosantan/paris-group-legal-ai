import DashboardLayout from "@/components/DashboardLayout";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { trpc } from "@/lib/trpc";
import { FileText, Loader2, Plus } from "lucide-react";
import { useState } from "react";
import { useParams } from "wouter";
import { toast } from "sonner";
import { Streamdown } from "streamdown";

export default function Reports() {
  const { consultationId } = useParams<{ consultationId: string }>();
  const consId = parseInt(consultationId || "0");
  const [open, setOpen] = useState(false);
  const [title, setTitle] = useState("");
  const [reportType, setReportType] = useState<"consultation_summary" | "contract_review" | "legal_analysis" | "advisory_memo">("consultation_summary");
  const [selectedReport, setSelectedReport] = useState<number | null>(null);

  const utils = trpc.useUtils();
  const { data: reports, isLoading } = trpc.reports.list.useQuery({ consultationId: consId });
  const { data: reportDetail } = trpc.reports.getById.useQuery(
    { id: selectedReport || 0 },
    { enabled: !!selectedReport }
  );

  const generateMutation = trpc.reports.generate.useMutation({
    onSuccess: () => {
      utils.reports.list.invalidate({ consultationId: consId });
      toast.success("Report generated successfully");
      setOpen(false);
      setTitle("");
    },
    onError: (error) => {
      toast.error("Failed to generate report: " + error.message);
    },
  });

  const handleGenerate = () => {
    if (!title.trim()) {
      toast.error("Please enter a title");
      return;
    }
    generateMutation.mutate({
      consultationId: consId,
      title,
      reportType,
      language: "en",
    });
  };

  return (
    <DashboardLayout>
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold tracking-tight">Legal Reports</h1>
            <p className="text-muted-foreground mt-2">
              Generate and view formal legal reports
            </p>
          </div>
          <Dialog open={open} onOpenChange={setOpen}>
            <DialogTrigger asChild>
              <Button>
                <Plus className="mr-2 h-4 w-4" />
                Generate Report
              </Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Generate Legal Report</DialogTitle>
                <DialogDescription>
                  Create a formal legal report based on consultation data
                </DialogDescription>
              </DialogHeader>
              <div className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="title">Report Title</Label>
                  <Input
                    id="title"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    placeholder="e.g., Rental Dispute Analysis Report"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="type">Report Type</Label>
                  <Select value={reportType} onValueChange={(v) => setReportType(v as any)}>
                    <SelectTrigger id="type">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="consultation_summary">Consultation Summary</SelectItem>
                      <SelectItem value="contract_review">Contract Review</SelectItem>
                      <SelectItem value="legal_analysis">Legal Analysis</SelectItem>
                      <SelectItem value="advisory_memo">Advisory Memo</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <Button
                  onClick={handleGenerate}
                  disabled={generateMutation.isPending}
                  className="w-full"
                >
                  {generateMutation.isPending ? (
                    <>
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                      Generating...
                    </>
                  ) : (
                    "Generate Report"
                  )}
                </Button>
              </div>
            </DialogContent>
          </Dialog>
        </div>

        <div className="grid gap-6 md:grid-cols-2">
          <Card>
            <CardHeader>
              <CardTitle>Available Reports</CardTitle>
              <CardDescription>Click a report to view details</CardDescription>
            </CardHeader>
            <CardContent>
              {isLoading ? (
                <div className="flex items-center justify-center py-8">
                  <Loader2 className="h-8 w-8 animate-spin" />
                </div>
              ) : reports && reports.length > 0 ? (
                <div className="space-y-2">
                  {reports.map((report) => (
                    <div
                      key={report.id}
                      onClick={() => setSelectedReport(report.id)}
                      className={`p-4 border rounded-lg cursor-pointer transition-colors ${
                        selectedReport === report.id
                          ? "bg-accent border-primary"
                          : "hover:bg-accent"
                      }`}
                    >
                      <div className="flex items-start gap-3">
                        <FileText className="h-5 w-5 text-muted-foreground mt-0.5" />
                        <div className="flex-1">
                          <p className="font-medium">{report.title}</p>
                          <p className="text-sm text-muted-foreground">
                            {report.reportType.replace(/_/g, " ").replace(/\b\w/g, l => l.toUpperCase())}
                          </p>
                          <p className="text-xs text-muted-foreground mt-1">
                            {new Date(report.createdAt).toLocaleString()}
                          </p>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="text-center py-8">
                  <FileText className="mx-auto h-12 w-12 text-muted-foreground mb-4" />
                  <p className="text-muted-foreground">No reports generated yet</p>
                </div>
              )}
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Report Preview</CardTitle>
              <CardDescription>View report content</CardDescription>
            </CardHeader>
            <CardContent>
              {selectedReport && reportDetail ? (
                <div className="space-y-4">
                  <div>
                    <h3 className="font-semibold text-lg mb-2">{reportDetail.title}</h3>
                    <p className="text-sm text-muted-foreground">
                      {reportDetail.reportType.replace(/_/g, " ").replace(/\b\w/g, l => l.toUpperCase())}
                    </p>
                  </div>
                  <div className="prose prose-sm dark:prose-invert max-w-none max-h-[600px] overflow-y-auto">
                    <Streamdown>{reportDetail.content}</Streamdown>
                  </div>
                </div>
              ) : (
                <div className="text-center py-12 text-muted-foreground">
                  Select a report to view its content
                </div>
              )}
            </CardContent>
          </Card>
        </div>
      </div>
    </DashboardLayout>
  );
}
