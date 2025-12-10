import DashboardLayout from "@/components/DashboardLayout";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { trpc } from "@/lib/trpc";
import { FileText, Loader2, Send, Upload, Download } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { useParams } from "wouter";
import { toast } from "sonner";
import { Streamdown } from "streamdown";
import { Badge } from "@/components/ui/badge";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { ConfidenceIndicator } from "@/components/ConfidenceIndicator";
import { ConfidenceWarning } from "@/components/ConfidenceWarning";
import { DisclaimerBadge } from "@/components/DisclaimerBadge";
import { ConversationContextSidebar } from "@/components/ConversationContextSidebar";
import { VoiceInputButton } from "@/components/VoiceInputButton";
import { ProactiveSuggestionsPanel } from "@/components/ProactiveSuggestionsPanel";
import { ImageOCRUpload } from "@/components/ImageOCRUpload";

export default function Consultation() {
  const { id } = useParams<{ id: string }>();
  const consultationId = parseInt(id || "0");
  const [message, setMessage] = useState("");
  const [suggestions, setSuggestions] = useState<any>(null);
  const [uploadingFile, setUploadingFile] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const utils = trpc.useUtils();
  const { data: consultation } = trpc.consultations.getById.useQuery({ id: consultationId });
  const { data: messages, isLoading: messagesLoading } = trpc.messages.list.useQuery({ consultationId });
  const { data: documents } = trpc.documents.list.useQuery({ consultationId });

  const exportPDFMutation = trpc.reports.exportConsultationPDF.useMutation({
    onSuccess: (data) => {
      toast.success("PDF report generated successfully");
      // Open PDF in new tab
      window.open(data.url, "_blank");
    },
    onError: (error) => {
      toast.error(`Failed to generate PDF: ${error.message}`);
    },
  });

  const sendMutation = trpc.messages.send.useMutation({
    onSuccess: (data) => {
      utils.messages.list.invalidate({ consultationId });
      setMessage("");
      // Store suggestions from response
      if (data.suggestions) {
        setSuggestions(data.suggestions);
      }
    },
    onError: (error) => {
      toast.error("Failed to send message: " + error.message);
    },
  });

  const uploadMutation = trpc.documents.upload.useMutation({
    onSuccess: (data) => {
      utils.documents.list.invalidate({ consultationId });
      
      if (data.extractedText) {
        toast.success("PDF uploaded and text extracted successfully!");
      } else {
        toast.success("Document uploaded successfully");
      }
      
      // Show PDF metadata if available
      if (data.pdfMetadata) {
        const { numPages, contractInfo } = data.pdfMetadata;
        console.log(`PDF Info: ${numPages} pages, Language: ${contractInfo.language}`);
      }
    },
    onError: (error) => {
      toast.error("Failed to upload document: " + error.message);
    },
  });

  const updateStatusMutation = trpc.consultations.updateStatus.useMutation({
    onSuccess: () => {
      utils.consultations.getById.invalidate({ id: consultationId });
      utils.consultations.list.invalidate();
      toast.success("Status updated");
    },
  });

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const handleSendMessage = (e: React.FormEvent) => {
    e.preventDefault();
    if (!message.trim()) return;
    sendMutation.mutate({
      consultationId,
      content: message,
      language: consultation?.language || "en",
    });
  };

  const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setUploadingFile(true);
    try {
      const reader = new FileReader();
      reader.onload = async (event) => {
        const base64 = event.target?.result as string;
        const base64Data = base64.split(",")[1] || "";

        uploadMutation.mutate({
          consultationId,
          filename: file.name,
          fileData: base64Data,
          mimeType: file.type,
          documentType: file.name.toLowerCase().includes("contract") ? "contract" : "other",
        });
        setUploadingFile(false);
      };
      reader.readAsDataURL(file);
    } catch (error) {
      toast.error("Failed to read file");
      setUploadingFile(false);
    }
  };

  if (!consultation) {
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
            <h1 className="text-3xl font-bold tracking-tight">{consultation.title}</h1>
            <p className="text-muted-foreground mt-2">
              {consultation.category.replace(/_/g, " ").replace(/\b\w/g, l => l.toUpperCase())}
            </p>
          </div>
          <div className="flex items-center gap-4">
            <Button
              variant="outline"
              size="sm"
              onClick={() => exportPDFMutation.mutate({ consultationId })}
              disabled={exportPDFMutation.isPending}
            >
              {exportPDFMutation.isPending ? (
                <Loader2 className="h-4 w-4 mr-2 animate-spin" />
              ) : (
                <Download className="h-4 w-4 mr-2" />
              )}
              Export PDF
            </Button>
            <Select
              value={consultation.status}
              onValueChange={(v) => updateStatusMutation.mutate({ id: consultationId, status: v as any })}
            >
              <SelectTrigger className="w-40">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="active">Active</SelectItem>
                <SelectItem value="completed">Completed</SelectItem>
                <SelectItem value="archived">Archived</SelectItem>
              </SelectContent>
            </Select>
            <Badge variant={consultation.language === "ar" ? "secondary" : "default"}>
              {consultation.language === "ar" ? "العربية" : "English"}
            </Badge>
          </div>
        </div>

        <Tabs defaultValue="chat" className="w-full">
          <TabsList>
            <TabsTrigger value="chat">Chat</TabsTrigger>
            <TabsTrigger value="documents">Documents ({documents?.length || 0})</TabsTrigger>
          </TabsList>

          <TabsContent value="chat" className="space-y-4">
            <div className="grid grid-cols-1 lg:grid-cols-[1fr_280px] gap-4">
              <Card className="h-[600px] flex flex-col">
              <CardHeader>
                <CardTitle>Legal Consultation Chat</CardTitle>
                <CardDescription>
                  Ask questions and get expert legal guidance based on UAE/Dubai law
                </CardDescription>
              </CardHeader>
              <CardContent className="flex-1 flex flex-col overflow-hidden">
                <div className="flex-1 overflow-y-auto space-y-4 mb-4">
                  {messagesLoading ? (
                    <div className="flex items-center justify-center h-full">
                      <Loader2 className="h-8 w-8 animate-spin" />
                    </div>
                  ) : (
                    <>
                      {messages?.map((msg) => (
                        <div
                          key={msg.id}
                          className={`flex ${msg.role === "user" ? "justify-end" : "justify-start"}`}
                        >
                          <div className={`max-w-[80%] space-y-2`}>
                            <div
                              className={`rounded-lg p-4 ${
                                msg.role === "user"
                                  ? "bg-primary text-primary-foreground"
                                  : msg.role === "system"
                                  ? "bg-muted text-muted-foreground italic"
                                  : "bg-accent text-accent-foreground"
                              }`}
                            >
                              {msg.role === "assistant" ? (
                                <Streamdown>{msg.content}</Streamdown>
                              ) : (
                                <p className="whitespace-pre-wrap">{msg.content}</p>
                              )}
                            </div>
                            {msg.role === "assistant" && (
                              <>
                                <DisclaimerBadge />
                                {msg.aiMetadata && (
                                  <>
                                    <ConfidenceWarning 
                                      confidenceScore={msg.aiMetadata.confidenceScore}
                                      onRequestReview={() => {
                                        toast.info("Lawyer review request feature coming soon");
                                      }}
                                    />
                                    <ConfidenceIndicator
                                      score={msg.aiMetadata.confidenceScore}
                                      level={msg.aiMetadata.confidenceLevel}
                                      requiresReview={msg.aiMetadata.requiresLawyerReview === 1}
                                      citationStats={{
                                        total: msg.aiMetadata.citationCount,
                                        verified: msg.aiMetadata.verifiedCitations,
                                        unverified: msg.aiMetadata.citationCount - msg.aiMetadata.verifiedCitations,
                                      }}
                                      compact={false}
                                    />
                                  </>
                                )}
                              </>
                            )}
                          </div>
                        </div>
                      ))}
                      <div ref={messagesEndRef} />
                    </>
                  )}
                </div>

                {suggestions && (
                  <ProactiveSuggestionsPanel
                    suggestions={suggestions}
                    onSuggestionClick={(suggestion) => {
                      setMessage(suggestion.action || suggestion.description);
                      setSuggestions(null);
                    }}
                  />
                )}

                <form onSubmit={handleSendMessage} className="flex gap-2">
                  <Input
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    placeholder="Type your legal question..."
                    disabled={sendMutation.isPending}
                  />
                  <VoiceInputButton
                    onTranscription={(text) => setMessage(text)}
                    language="en"
                  />
                  <Button type="submit" disabled={sendMutation.isPending || !message.trim()}>
                    {sendMutation.isPending ? (
                      <Loader2 className="h-4 w-4 animate-spin" />
                    ) : (
                      <Send className="h-4 w-4" />
                    )}
                  </Button>
                </form>
              </CardContent>
            </Card>
            
            
            <div className="hidden lg:block">
              <ConversationContextSidebar 
                context={undefined}
                onClearContext={() => {
                  toast.info("Clear context feature coming soon");
                }}
              />
            </div>
            </div>
          </TabsContent>

          <TabsContent value="documents" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>Upload Documents</CardTitle>
                <CardDescription>
                  Upload contracts, leases, or other legal documents for review
                </CardDescription>
              </CardHeader>
              <CardContent>
                <input
                  ref={fileInputRef}
                  type="file"
                  accept=".pdf,.doc,.docx,.txt"
                  onChange={handleFileUpload}
                  className="hidden"
                />
                <Button
                  onClick={() => fileInputRef.current?.click()}
                  disabled={uploadingFile}
                  variant="outline"
                  className="w-full"
                >
                  {uploadingFile ? (
                    <>
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                      Uploading...
                    </>
                  ) : (
                    <>
                      <Upload className="mr-2 h-4 w-4" />
                      Upload Document
                    </>
                  )}
                </Button>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Extract Text from Image</CardTitle>
                <CardDescription>
                  Upload a photo of a document to extract text automatically
                </CardDescription>
              </CardHeader>
              <CardContent>
                <ImageOCRUpload
                  onTextExtracted={(text) => {
                    toast.success("Text extracted! You can now ask questions about it.");
                    setMessage(`Analyze this document: ${text.substring(0, 500)}...`);
                  }}
                />
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Uploaded Documents</CardTitle>
              </CardHeader>
              <CardContent>
                {documents && documents.length > 0 ? (
                  <div className="space-y-2">
                    {documents.map((doc) => (
                      <div
                        key={doc.id}
                        className="flex items-center justify-between p-4 border rounded-lg"
                      >
                        <div className="flex items-center gap-3">
                          <FileText className="h-5 w-5 text-muted-foreground" />
                          <div>
                            <p className="font-medium">{doc.filename}</p>
                            <p className="text-sm text-muted-foreground">
                              {new Date(doc.uploadedAt).toLocaleString()}
                            </p>
                          </div>
                        </div>
                        <Badge variant="outline">{doc.documentType}</Badge>
                      </div>
                    ))}
                  </div>
                ) : (
                  <p className="text-center text-muted-foreground py-8">No documents uploaded yet</p>
                )}
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </DashboardLayout>
  );
}
