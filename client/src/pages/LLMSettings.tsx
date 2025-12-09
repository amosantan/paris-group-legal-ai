import DashboardLayout from "@/components/DashboardLayout";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Badge } from "@/components/ui/badge";
import { trpc } from "@/lib/trpc";
import { Brain, CheckCircle2, AlertCircle, ExternalLink } from "lucide-react";
import { toast } from "sonner";

export default function LLMSettings() {
  const { data: currentProvider, isLoading: loadingCurrent } = trpc.llmProvider.getCurrent.useQuery();
  const { data: availableProviders, isLoading: loadingProviders } = trpc.llmProvider.getAvailable.useQuery();

  const handleProviderInfo = (providerId: string) => {
    if (providerId === "gemini") {
      window.open("https://makersuite.google.com/app/apikey", "_blank");
    }
  };

  if (loadingCurrent || loadingProviders) {
    return (
      <DashboardLayout>
        <div className="flex items-center justify-center h-96">
          <Brain className="h-8 w-8 animate-pulse" />
        </div>
      </DashboardLayout>
    );
  }

  return (
    <DashboardLayout>
      <div className="space-y-6">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">LLM Provider Settings</h1>
          <p className="text-muted-foreground mt-2">
            Configure which AI model powers the legal consultant system
          </p>
        </div>

        <Alert>
          <Brain className="h-4 w-4" />
          <AlertTitle>Current Provider</AlertTitle>
          <AlertDescription>
            The system is currently using <strong>{currentProvider?.info?.name}</strong> for all AI-powered features including consultations, contract reviews, and report generation.
          </AlertDescription>
        </Alert>

        <div className="grid gap-6 md:grid-cols-2">
          {availableProviders?.map((provider) => (
            <Card key={provider.id} className={provider.current ? "border-primary" : ""}>
              <CardHeader>
                <div className="flex items-center justify-between">
                  <CardTitle className="flex items-center gap-2">
                    <Brain className="h-5 w-5" />
                    {provider.name}
                  </CardTitle>
                  {provider.current && (
                    <Badge variant="default">
                      <CheckCircle2 className="h-3 w-3 mr-1" />
                      Active
                    </Badge>
                  )}
                  {!provider.available && (
                    <Badge variant="destructive">
                      <AlertCircle className="h-3 w-3 mr-1" />
                      Requires Setup
                    </Badge>
                  )}
                </div>
              </CardHeader>
              <CardContent className="space-y-4">
                {provider.id === "manus" && (
                  <>
                    <p className="text-sm text-muted-foreground">
                      Pre-configured LLM with no setup required. Provides fast, reliable responses for all legal consultation features.
                    </p>
                    <div className="space-y-2">
                      <p className="text-sm font-semibold">Features:</p>
                      <ul className="text-sm text-muted-foreground space-y-1">
                        <li>• Fast response times</li>
                        <li>• No API key needed</li>
                        <li>• Structured output support</li>
                        <li>• Always available</li>
                      </ul>
                    </div>
                  </>
                )}

                {provider.id === "gemini" && (
                  <>
                    <p className="text-sm text-muted-foreground">
                      Google's advanced AI model with superior multilingual capabilities, especially for Arabic legal content.
                    </p>
                    <div className="space-y-2">
                      <p className="text-sm font-semibold">Features:</p>
                      <ul className="text-sm text-muted-foreground space-y-1">
                        <li>• Excellent Arabic language support</li>
                        <li>• Latest AI capabilities</li>
                        <li>• Large context window (2M tokens)</li>
                        <li>• Advanced reasoning</li>
                      </ul>
                    </div>
                    {!provider.available && (
                      <Alert variant="destructive">
                        <AlertCircle className="h-4 w-4" />
                        <AlertTitle>API Key Required</AlertTitle>
                        <AlertDescription className="space-y-2">
                          <p>To use Google Gemini, you need to:</p>
                          <ol className="text-sm space-y-1 ml-4">
                            <li>1. Get an API key from Google AI Studio</li>
                            <li>2. Add it as <code className="bg-muted px-1 py-0.5 rounded">GEMINI_API_KEY</code> in Settings → Secrets</li>
                            <li>3. Set <code className="bg-muted px-1 py-0.5 rounded">LLM_PROVIDER=gemini</code> environment variable</li>
                          </ol>
                        </AlertDescription>
                      </Alert>
                    )}
                    <Button
                      variant="outline"
                      className="w-full"
                      onClick={() => handleProviderInfo(provider.id)}
                    >
                      <ExternalLink className="mr-2 h-4 w-4" />
                      Get Gemini API Key
                    </Button>
                  </>
                )}
              </CardContent>
            </Card>
          ))}
        </div>

        <Card>
          <CardHeader>
            <CardTitle>How to Switch Providers</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <h3 className="font-semibold mb-2">Option 1: Environment Variable (Recommended)</h3>
              <p className="text-sm text-muted-foreground mb-2">
                Set the <code className="bg-muted px-1 py-0.5 rounded">LLM_PROVIDER</code> environment variable:
              </p>
              <div className="bg-muted p-3 rounded-lg space-y-1">
                <code className="text-sm">LLM_PROVIDER=manus</code>
                <br />
                <code className="text-sm">LLM_PROVIDER=gemini</code>
              </div>
            </div>

            <div>
              <h3 className="font-semibold mb-2">Option 2: Automatic Fallback</h3>
              <p className="text-sm text-muted-foreground">
                If Gemini is set as the provider but encounters an error, the system automatically falls back to Manus LLM to ensure uninterrupted service.
              </p>
            </div>

            <Alert>
              <AlertCircle className="h-4 w-4" />
              <AlertTitle>Note</AlertTitle>
              <AlertDescription>
                Changing the provider requires restarting the server. All existing consultations will continue to work with the new provider.
              </AlertDescription>
            </Alert>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Provider Comparison</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b">
                    <th className="text-left py-2">Feature</th>
                    <th className="text-left py-2">Manus LLM</th>
                    <th className="text-left py-2">Google Gemini</th>
                  </tr>
                </thead>
                <tbody className="text-muted-foreground">
                  <tr className="border-b">
                    <td className="py-2">Setup Required</td>
                    <td>None</td>
                    <td>API Key</td>
                  </tr>
                  <tr className="border-b">
                    <td className="py-2">Arabic Support</td>
                    <td>Good</td>
                    <td>Excellent</td>
                  </tr>
                  <tr className="border-b">
                    <td className="py-2">Response Speed</td>
                    <td>Fast</td>
                    <td>Fast</td>
                  </tr>
                  <tr className="border-b">
                    <td className="py-2">Context Window</td>
                    <td>128K tokens</td>
                    <td>2M tokens</td>
                  </tr>
                  <tr className="border-b">
                    <td className="py-2">Cost</td>
                    <td>Included</td>
                    <td>Pay per use</td>
                  </tr>
                  <tr>
                    <td className="py-2">Availability</td>
                    <td>Always</td>
                    <td>Requires key</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </CardContent>
        </Card>
      </div>
    </DashboardLayout>
  );
}
