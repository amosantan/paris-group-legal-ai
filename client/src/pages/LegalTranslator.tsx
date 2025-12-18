import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { trpc } from "@/lib/trpc";
import { Languages, Loader2, ArrowRightLeft, Copy, Check } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";
import DashboardLayout from "@/components/DashboardLayout";

export default function LegalTranslator() {
  const [sourceText, setSourceText] = useState("");
  const [translatedText, setTranslatedText] = useState("");
  const [sourceLanguage, setSourceLanguage] = useState<"en" | "ar">("en");
  const [targetLanguage, setTargetLanguage] = useState<"en" | "ar">("ar");
  const [documentType, setDocumentType] = useState<"contract" | "agreement" | "legal_notice" | "general">("contract");
  const [copied, setCopied] = useState(false);

  const translateMutation = trpc.translator.translate.useMutation({
    onSuccess: (data) => {
      setTranslatedText(data.translatedText);
      toast.success("Translation completed successfully!");
    },
    onError: (error) => {
      toast.error(`Translation failed: ${error.message}`);
    },
  });

  const handleTranslate = () => {
    if (!sourceText.trim()) {
      toast.error("Please enter text to translate");
      return;
    }

    if (sourceLanguage === targetLanguage) {
      toast.error("Source and target languages must be different");
      return;
    }

    translateMutation.mutate({
      text: sourceText,
      sourceLanguage,
      targetLanguage,
      documentType,
    });
  };

  const handleSwapLanguages = () => {
    setSourceLanguage(targetLanguage);
    setTargetLanguage(sourceLanguage);
    setSourceText(translatedText);
    setTranslatedText(sourceText);
  };

  const handleCopyTranslation = () => {
    navigator.clipboard.writeText(translatedText);
    setCopied(true);
    toast.success("Translation copied to clipboard!");
    setTimeout(() => setCopied(false), 2000);
  };

  const handleClear = () => {
    setSourceText("");
    setTranslatedText("");
  };

  return (
    <DashboardLayout>
      <div className="space-y-6">
        <div>
          <h1 className="text-3xl font-bold tracking-tight flex items-center gap-2">
            <Languages className="h-8 w-8" />
            Legal Translator
          </h1>
          <p className="text-muted-foreground mt-2">
            Professional Arabic ↔ English translation specialized in legal contracts and documents
          </p>
        </div>

        <Card>
          <CardHeader>
            <CardTitle>Translation Settings</CardTitle>
            <CardDescription>
              Configure language direction and document type for accurate legal translation
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="space-y-2">
                <Label>Source Language</Label>
                <Select value={sourceLanguage} onValueChange={(value: "en" | "ar") => setSourceLanguage(value)}>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="en">English</SelectItem>
                    <SelectItem value="ar">Arabic (العربية)</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="flex items-end justify-center">
                <Button
                  variant="outline"
                  size="icon"
                  onClick={handleSwapLanguages}
                  title="Swap languages"
                >
                  <ArrowRightLeft className="h-4 w-4" />
                </Button>
              </div>

              <div className="space-y-2">
                <Label>Target Language</Label>
                <Select value={targetLanguage} onValueChange={(value: "en" | "ar") => setTargetLanguage(value)}>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="en">English</SelectItem>
                    <SelectItem value="ar">Arabic (العربية)</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            <div className="space-y-2">
              <Label>Document Type</Label>
              <Select value={documentType} onValueChange={(value: any) => setDocumentType(value)}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="contract">Contract (عقد)</SelectItem>
                  <SelectItem value="agreement">Agreement (اتفاقية)</SelectItem>
                  <SelectItem value="legal_notice">Legal Notice (إشعار قانوني)</SelectItem>
                  <SelectItem value="general">General Legal Text (نص قانوني عام)</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </CardContent>
        </Card>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Source Text */}
          <Card>
            <CardHeader>
              <CardTitle>
                {sourceLanguage === "en" ? "English Text" : "Arabic Text (النص العربي)"}
              </CardTitle>
              <CardDescription>
                Enter the legal text you want to translate
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Textarea
                value={sourceText}
                onChange={(e) => setSourceText(e.target.value)}
                placeholder={
                  sourceLanguage === "en"
                    ? "Enter English legal text here..."
                    : "أدخل النص القانوني العربي هنا..."
                }
                dir={sourceLanguage === "ar" ? "rtl" : "ltr"}
                rows={15}
                className="font-mono text-sm"
              />
              <div className="mt-2 text-xs text-muted-foreground">
                Characters: {sourceText.length}
              </div>
            </CardContent>
          </Card>

          {/* Translated Text */}
          <Card>
            <CardHeader>
              <CardTitle>
                {targetLanguage === "en" ? "English Translation" : "Arabic Translation (الترجمة العربية)"}
              </CardTitle>
              <CardDescription>
                Professional legal translation will appear here
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Textarea
                value={translatedText}
                readOnly
                placeholder={
                  targetLanguage === "en"
                    ? "Translation will appear here..."
                    : "ستظهر الترجمة هنا..."
                }
                dir={targetLanguage === "ar" ? "rtl" : "ltr"}
                rows={15}
                className="font-mono text-sm bg-muted"
              />
              <div className="mt-2 flex items-center justify-between">
                <div className="text-xs text-muted-foreground">
                  Characters: {translatedText.length}
                </div>
                {translatedText && (
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={handleCopyTranslation}
                  >
                    {copied ? (
                      <>
                        <Check className="h-4 w-4 mr-2" />
                        Copied!
                      </>
                    ) : (
                      <>
                        <Copy className="h-4 w-4 mr-2" />
                        Copy
                      </>
                    )}
                  </Button>
                )}
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="flex gap-4">
          <Button
            onClick={handleTranslate}
            disabled={translateMutation.isPending || !sourceText.trim()}
            className="flex-1"
            size="lg"
          >
            {translateMutation.isPending ? (
              <>
                <Loader2 className="h-5 w-5 mr-2 animate-spin" />
                Translating...
              </>
            ) : (
              <>
                <Languages className="h-5 w-5 mr-2" />
                Translate
              </>
            )}
          </Button>
          <Button
            variant="outline"
            onClick={handleClear}
            disabled={translateMutation.isPending}
            size="lg"
          >
            Clear
          </Button>
        </div>

        {/* Features Card */}
        <Card>
          <CardHeader>
            <CardTitle>Translation Features</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
              <div>
                <h4 className="font-semibold mb-2">✓ Specialized Legal Terminology</h4>
                <p className="text-muted-foreground">
                  Accurate translation of UAE and Dubai legal terms, contract clauses, and legal concepts
                </p>
              </div>
              <div>
                <h4 className="font-semibold mb-2">✓ Formal Legal Language</h4>
                <p className="text-muted-foreground">
                  Uses Modern Standard Arabic (MSA) and formal legal English appropriate for official documents
                </p>
              </div>
              <div>
                <h4 className="font-semibold mb-2">✓ Preserves Legal Intent</h4>
                <p className="text-muted-foreground">
                  Maintains the original legal meaning, structure, and intent of the document
                </p>
              </div>
              <div>
                <h4 className="font-semibold mb-2">✓ Professional Quality</h4>
                <p className="text-muted-foreground">
                  AI-powered translation trained on legal documents, contracts, and agreements
                </p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Disclaimer */}
        <Card className="border-amber-200 bg-amber-50">
          <CardContent className="pt-6">
            <p className="text-sm text-amber-900">
              <strong>Disclaimer:</strong> This is an AI-powered translation tool. While it provides professional-quality translations,
              we recommend having important legal documents reviewed by a qualified legal translator or attorney before use in official
              proceedings or legal matters.
            </p>
          </CardContent>
        </Card>
      </div>
    </DashboardLayout>
  );
}
