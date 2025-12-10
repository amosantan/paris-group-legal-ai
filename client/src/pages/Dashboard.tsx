import { useAuth } from "@/_core/hooks/useAuth";
import DashboardLayout from "@/components/DashboardLayout";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { trpc } from "@/lib/trpc";
import { FileText, MessageSquare, Plus, Scale } from "lucide-react";
import { Link } from "wouter";
import { Badge } from "@/components/ui/badge";
import { DisclaimerModal } from "@/components/DisclaimerModal";
import { useState, useEffect } from "react";

export default function Dashboard() {
  const { user } = useAuth();
  const { data: consultations, isLoading } = trpc.consultations.list.useQuery();
  const { data: termsData } = trpc.terms.hasAccepted.useQuery({ termsVersion: "1.0" });
  const acceptTermsMutation = trpc.terms.accept.useMutation();
  const [showDisclaimer, setShowDisclaimer] = useState(false);

  useEffect(() => {
    if (termsData && !termsData.accepted) {
      setShowDisclaimer(true);
    }
  }, [termsData]);

  const handleAcceptTerms = async () => {
    try {
      await acceptTermsMutation.mutateAsync({
        termsVersion: "1.0",
        ipAddress: undefined, // Could be captured from request headers
        userAgent: navigator.userAgent,
      });
      setShowDisclaimer(false);
    } catch (error) {
      console.error("Failed to accept terms:", error);
    }
  };

  const activeCons = consultations?.filter(c => c.status === "active").length || 0;
  const completedCons = consultations?.filter(c => c.status === "completed").length || 0;

  return (
    <>
      <DisclaimerModal open={showDisclaimer} onAccept={handleAcceptTerms} />
      <DashboardLayout>
      <div className="space-y-8">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold tracking-tight">Legal Consultations</h1>
            <p className="text-muted-foreground mt-2">
              Manage your legal consultations, contracts, and reports
            </p>
          </div>
          <Link href="/new-consultation">
            <Button size="lg">
              <Plus className="mr-2 h-4 w-4" />
              New Consultation
            </Button>
          </Link>
        </div>

        <div className="grid gap-4 md:grid-cols-3">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Active Consultations</CardTitle>
              <MessageSquare className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{activeCons}</div>
              <p className="text-xs text-muted-foreground">Ongoing legal matters</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Completed</CardTitle>
              <Scale className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{completedCons}</div>
              <p className="text-xs text-muted-foreground">Resolved consultations</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Total Cases</CardTitle>
              <FileText className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{consultations?.length || 0}</div>
              <p className="text-xs text-muted-foreground">All time consultations</p>
            </CardContent>
          </Card>
        </div>

        <Card>
          <CardHeader>
            <CardTitle>Recent Consultations</CardTitle>
            <CardDescription>
              Your latest legal consultations and their status
            </CardDescription>
          </CardHeader>
          <CardContent>
            {isLoading ? (
              <div className="text-center py-8 text-muted-foreground">Loading...</div>
            ) : consultations && consultations.length > 0 ? (
              <div className="space-y-4">
                {consultations.map((consultation) => (
                  <Link key={consultation.id} href={`/consultation/${consultation.id}`}>
                    <div className="flex items-center justify-between p-4 border rounded-lg hover:bg-accent cursor-pointer transition-colors">
                      <div className="flex-1">
                        <h3 className="font-semibold">{consultation.title}</h3>
                        <p className="text-sm text-muted-foreground mt-1">
                          {consultation.category.replace(/_/g, " ").replace(/\b\w/g, l => l.toUpperCase())}
                        </p>
                      </div>
                      <div className="flex items-center gap-4">
                        <Badge variant={consultation.status === "active" ? "default" : "secondary"}>
                          {consultation.status}
                        </Badge>
                        <span className="text-sm text-muted-foreground">
                          {new Date(consultation.updatedAt).toLocaleDateString()}
                        </span>
                      </div>
                    </div>
                  </Link>
                ))}
              </div>
            ) : (
              <div className="text-center py-12">
                <Scale className="mx-auto h-12 w-12 text-muted-foreground mb-4" />
                <h3 className="text-lg font-semibold mb-2">No consultations yet</h3>
                <p className="text-muted-foreground mb-4">
                  Start your first legal consultation to get expert guidance
                </p>
                <Link href="/new-consultation">
                  <Button>
                    <Plus className="mr-2 h-4 w-4" />
                    New Consultation
                  </Button>
                </Link>
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </DashboardLayout>
    </>
  );
}
