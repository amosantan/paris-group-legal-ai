import DashboardLayout from "@/components/DashboardLayout";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { trpc } from "@/lib/trpc";
import { useState } from "react";
import { useLocation } from "wouter";
import { toast } from "sonner";

export default function NewConsultation() {
  const [, setLocation] = useLocation();
  const [title, setTitle] = useState("");
  const [category, setCategory] = useState<"rental_dispute" | "real_estate_transaction" | "contract_review" | "general_inquiry">("rental_dispute");
  const [language, setLanguage] = useState<"en" | "ar">("en");

  const createMutation = trpc.consultations.create.useMutation({
    onSuccess: (data) => {
      toast.success("Consultation created successfully");
      setLocation(`/consultation/${data.consultationId}`);
    },
    onError: (error) => {
      toast.error("Failed to create consultation: " + error.message);
    },
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim()) {
      toast.error("Please enter a title");
      return;
    }
    createMutation.mutate({ title, category, language });
  };

  return (
    <DashboardLayout>
      <div className="max-w-2xl mx-auto space-y-8">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">New Legal Consultation</h1>
          <p className="text-muted-foreground mt-2">
            Start a new consultation with our legal AI assistant
          </p>
        </div>

        <Card>
          <CardHeader>
            <CardTitle>Consultation Details</CardTitle>
            <CardDescription>
              Provide information about your legal matter
            </CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="space-y-2">
                <Label htmlFor="title">Title</Label>
                <Input
                  id="title"
                  placeholder="e.g., Rental Dispute - Security Deposit Issue"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  required
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="category">Category</Label>
                <Select value={category} onValueChange={(v) => setCategory(v as any)}>
                  <SelectTrigger id="category">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="rental_dispute">Rental Dispute</SelectItem>
                    <SelectItem value="real_estate_transaction">Real Estate Transaction</SelectItem>
                    <SelectItem value="contract_review">Contract Review</SelectItem>
                    <SelectItem value="general_inquiry">General Inquiry</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label htmlFor="language">Language</Label>
                <Select value={language} onValueChange={(v) => setLanguage(v as any)}>
                  <SelectTrigger id="language">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="en">English</SelectItem>
                    <SelectItem value="ar">Arabic (العربية)</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="flex gap-4">
                <Button type="submit" disabled={createMutation.isPending}>
                  {createMutation.isPending ? "Creating..." : "Create Consultation"}
                </Button>
                <Button type="button" variant="outline" onClick={() => setLocation("/dashboard")}>
                  Cancel
                </Button>
              </div>
            </form>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>What We Can Help With</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <h3 className="font-semibold mb-2">Rental Disputes</h3>
              <p className="text-sm text-muted-foreground">
                Tenant-landlord disputes, lease renewals, eviction processes, maintenance issues, security deposits
              </p>
            </div>
            <div>
              <h3 className="font-semibold mb-2">Real Estate Transactions</h3>
              <p className="text-sm text-muted-foreground">
                Buying, selling, property transfers, escrow procedures, RERA and Dubai Land Department compliance
              </p>
            </div>
            <div>
              <h3 className="font-semibold mb-2">Contract Review</h3>
              <p className="text-sm text-muted-foreground">
                Clause-by-clause legal review, risk identification, enforceability assessment, revision suggestions
              </p>
            </div>
          </CardContent>
        </Card>
      </div>
    </DashboardLayout>
  );
}
