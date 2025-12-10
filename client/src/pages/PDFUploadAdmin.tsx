import { useState } from "react";
import DashboardLayout from "@/components/DashboardLayout";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { trpc } from "@/lib/trpc";
import { toast } from "sonner";
import { Upload, Loader2, FileText, Trash2, ExternalLink } from "lucide-react";
import { Badge } from "@/components/ui/badge";

export default function PDFUploadAdmin() {
  const [pdfUrl, setPdfUrl] = useState("");
  const [filename, setFilename] = useState("");
  const [lawName, setLawName] = useState("");
  const [lawNumber, setLawNumber] = useState("");
  const [category, setCategory] = useState<string>("other");

  const uploadMutation = trpc.knowledgeBase.uploadPDF.useMutation({
    onSuccess: (result) => {
      if (result.success) {
        toast.success(`Successfully ingested ${result.chunksCreated} chunks!`);
        // Reset form
        setPdfUrl("");
        setFilename("");
        setLawName("");
        setLawNumber("");
        setCategory("other");
        // Refetch stats and list
        statsQuery.refetch();
        listQuery.refetch();
      } else {
        toast.error(`Failed to ingest PDF: ${result.error}`);
      }
    },
    onError: (error) => {
      toast.error(`Upload failed: ${error.message}`);
    },
  });

  const statsQuery = trpc.knowledgeBase.stats.useQuery();
  const listQuery = trpc.knowledgeBase.listAll.useQuery({
    sourceType: "pdf_upload",
    limit: 20,
  });

  const deleteMutation = trpc.knowledgeBase.deleteEntry.useMutation({
    onSuccess: () => {
      toast.success("Entry deleted successfully");
      listQuery.refetch();
      statsQuery.refetch();
    },
    onError: (error) => {
      toast.error(`Delete failed: ${error.message}`);
    },
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!pdfUrl || !filename) {
      toast.error("Please provide PDF URL and filename");
      return;
    }

    uploadMutation.mutate({
      fileUrl: pdfUrl,
      filename,
      lawName: lawName || undefined,
      lawNumber: lawNumber || undefined,
      category: category as any,
    });
  };

  const getCategoryLabel = (cat: string) => {
    const labels: Record<string, string> = {
      rental_law: "Rental Law",
      civil_code: "Civil Code",
      rera_regulation: "RERA Regulation",
      escrow_law: "Escrow Law",
      real_estate_law: "Real Estate Law",
      labor_law: "Labor Law",
      commercial_law: "Commercial Law",
      difc_law: "DIFC Law",
      other: "Other",
    };
    return labels[cat] || cat;
  };

  return (
    <DashboardLayout>
      <div className="container max-w-6xl py-8 space-y-8">
        <div>
          <h1 className="text-3xl font-bold">PDF Knowledge Base Manager</h1>
          <p className="text-muted-foreground mt-2">
            Upload legal PDFs from UAE government portals to expand the AI knowledge base
          </p>
        </div>

        {/* Statistics */}
        {statsQuery.data && (
          <Card>
            <CardHeader>
              <CardTitle>Knowledge Base Statistics</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                <div>
                  <p className="text-2xl font-bold">{statsQuery.data.total}</p>
                  <p className="text-sm text-muted-foreground">Total Entries</p>
                </div>
                <div>
                  <p className="text-2xl font-bold">
                    {statsQuery.data.bySourceType?.pdf_upload || 0}
                  </p>
                  <p className="text-sm text-muted-foreground">From PDFs</p>
                </div>
                <div>
                  <p className="text-2xl font-bold">
                    {statsQuery.data.bySourceType?.manual || 0}
                  </p>
                  <p className="text-sm text-muted-foreground">Manual Entries</p>
                </div>
                <div>
                  <p className="text-2xl font-bold">
                    {Object.keys(statsQuery.data.byCategory || {}).length}
                  </p>
                  <p className="text-sm text-muted-foreground">Categories</p>
                </div>
              </div>
            </CardContent>
          </Card>
        )}

        {/* Upload Form */}
        <Card>
          <CardHeader>
            <CardTitle>Upload New PDF</CardTitle>
            <CardDescription>
              Provide a URL to a legal PDF document. The system will automatically extract text,
              chunk it, and add it to the knowledge base.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="pdfUrl">PDF URL *</Label>
                <Input
                  id="pdfUrl"
                  type="url"
                  placeholder="https://example.com/law-document.pdf"
                  value={pdfUrl}
                  onChange={(e) => setPdfUrl(e.target.value)}
                  required
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="filename">Filename *</Label>
                <Input
                  id="filename"
                  placeholder="UAE_Labor_Law.pdf"
                  value={filename}
                  onChange={(e) => setFilename(e.target.value)}
                  required
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="lawName">Law Name (Optional)</Label>
                  <Input
                    id="lawName"
                    placeholder="UAE Labor Law"
                    value={lawName}
                    onChange={(e) => setLawName(e.target.value)}
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="lawNumber">Law Number (Optional)</Label>
                  <Input
                    id="lawNumber"
                    placeholder="8/1980"
                    value={lawNumber}
                    onChange={(e) => setLawNumber(e.target.value)}
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="category">Category</Label>
                <Select value={category} onValueChange={setCategory}>
                  <SelectTrigger id="category">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="rental_law">Rental Law</SelectItem>
                    <SelectItem value="civil_code">Civil Code</SelectItem>
                    <SelectItem value="rera_regulation">RERA Regulation</SelectItem>
                    <SelectItem value="escrow_law">Escrow Law</SelectItem>
                    <SelectItem value="real_estate_law">Real Estate Law</SelectItem>
                    <SelectItem value="labor_law">Labor Law</SelectItem>
                    <SelectItem value="commercial_law">Commercial Law</SelectItem>
                    <SelectItem value="difc_law">DIFC Law</SelectItem>
                    <SelectItem value="other">Other</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <Button
                type="submit"
                disabled={uploadMutation.isPending}
                className="w-full"
              >
                {uploadMutation.isPending ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Processing PDF...
                  </>
                ) : (
                  <>
                    <Upload className="mr-2 h-4 w-4" />
                    Upload and Ingest PDF
                  </>
                )}
              </Button>
            </form>
          </CardContent>
        </Card>

        {/* Recent Uploads */}
        <Card>
          <CardHeader>
            <CardTitle>Recent PDF Uploads</CardTitle>
            <CardDescription>
              Latest 20 documents ingested from PDFs
            </CardDescription>
          </CardHeader>
          <CardContent>
            {listQuery.isLoading ? (
              <div className="flex items-center justify-center py-8">
                <Loader2 className="h-6 w-6 animate-spin text-muted-foreground" />
              </div>
            ) : listQuery.data && listQuery.data.length > 0 ? (
              <div className="space-y-3">
                {listQuery.data.map((entry: any) => (
                  <div
                    key={entry.id}
                    className="flex items-start justify-between p-4 border rounded-lg"
                  >
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-1">
                        <FileText className="h-4 w-4 text-muted-foreground" />
                        <p className="font-medium">{entry.lawName}</p>
                        <Badge variant="outline">{getCategoryLabel(entry.category)}</Badge>
                        {entry.chunkIndex !== null && (
                          <Badge variant="secondary">
                            Chunk {entry.chunkIndex + 1}/{entry.totalChunks}
                          </Badge>
                        )}
                      </div>
                      <p className="text-sm text-muted-foreground line-clamp-2">
                        {entry.contentEn}
                      </p>
                      {entry.sourceUrl && (
                        <a
                          href={entry.sourceUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-xs text-blue-600 hover:underline flex items-center gap-1 mt-1"
                        >
                          <ExternalLink className="h-3 w-3" />
                          Source PDF
                        </a>
                      )}
                    </div>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => {
                        if (confirm("Delete this entry?")) {
                          deleteMutation.mutate({ id: entry.id });
                        }
                      }}
                      disabled={deleteMutation.isPending}
                    >
                      <Trash2 className="h-4 w-4 text-destructive" />
                    </Button>
                  </div>
                ))}
              </div>
            ) : (
              <p className="text-center text-muted-foreground py-8">
                No PDF uploads yet. Upload your first document above!
              </p>
            )}
          </CardContent>
        </Card>

        {/* Quick Links */}
        <Card>
          <CardHeader>
            <CardTitle>UAE Legal Resources</CardTitle>
            <CardDescription>
              Official government portals where you can find legal PDFs
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid gap-2">
              <a
                href="https://uaelegislation.gov.ae/en"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 text-blue-600 hover:underline"
              >
                <ExternalLink className="h-4 w-4" />
                UAE Legislation Portal
              </a>
              <a
                href="https://www.moj.gov.ae/en/laws-and-legislation.aspx"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 text-blue-600 hover:underline"
              >
                <ExternalLink className="h-4 w-4" />
                Ministry of Justice - Laws & Legislation
              </a>
              <a
                href="https://www.difc.com/business/laws-and-regulations/legal-database"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 text-blue-600 hover:underline"
              >
                <ExternalLink className="h-4 w-4" />
                DIFC Legal Database
              </a>
              <a
                href="https://dlp.dubai.gov.ae/en/pages/default.aspx"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 text-blue-600 hover:underline"
              >
                <ExternalLink className="h-4 w-4" />
                Dubai Legislation Portal
              </a>
              <a
                href="https://www.mohre.gov.ae/en/laws-and-regulations/laws.aspx"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 text-blue-600 hover:underline"
              >
                <ExternalLink className="h-4 w-4" />
                MOHRE - Labor Laws
              </a>
              <a
                href="https://dubailand.gov.ae/en/about-dubai-land-department/rules-regulations/#/"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 text-blue-600 hover:underline"
              >
                <ExternalLink className="h-4 w-4" />
                Dubai Land Department - Rules & Regulations
              </a>
            </div>
          </CardContent>
        </Card>
      </div>
    </DashboardLayout>
  );
}
