import { useAuth } from "@/_core/hooks/useAuth";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { getLoginUrl } from "@/const";
import { FileText, MessageSquare, Scale, Shield } from "lucide-react";
import { Link } from "wouter";

export default function Home() {
  const { user, isAuthenticated } = useAuth();

  return (
    <div className="min-h-screen flex flex-col">
      <header className="border-b">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Scale className="h-8 w-8 text-primary" />
            <h1 className="text-2xl font-bold">Paris Group Legal AI</h1>
          </div>
          <div>
            {isAuthenticated ? (
              <Link href="/dashboard">
                <Button>Go to Dashboard</Button>
              </Link>
            ) : (
              <Button asChild>
                <a href={getLoginUrl()}>Sign In</a>
              </Button>
            )}
          </div>
        </div>
      </header>

      <main className="flex-1">
        <section className="container mx-auto px-4 py-20 text-center">
          <div className="max-w-3xl mx-auto space-y-6">
            <h2 className="text-5xl font-bold tracking-tight">
              Expert Legal Consultation for Dubai Real Estate
            </h2>
            <p className="text-xl text-muted-foreground">
              AI-powered legal assistant specializing in rental disputes and real estate transactions, 
              backed by comprehensive UAE/Dubai law knowledge
            </p>
            {isAuthenticated ? (
              <div className="flex gap-4 justify-center">
                <Link href="/dashboard">
                  <Button size="lg">View Consultations</Button>
                </Link>
                <Link href="/new-consultation">
                  <Button size="lg" variant="outline">Start New Consultation</Button>
                </Link>
              </div>
            ) : (
              <Button size="lg" asChild>
                <a href={getLoginUrl()}>Get Started</a>
              </Button>
            )}
          </div>
        </section>

        <section className="bg-muted py-20">
          <div className="container mx-auto px-4">
            <h3 className="text-3xl font-bold text-center mb-12">Our Services</h3>
            <div className="grid gap-8 md:grid-cols-3">
              <Card>
                <CardHeader>
                  <MessageSquare className="h-12 w-12 text-primary mb-4" />
                  <CardTitle>Legal Consultation</CardTitle>
                  <CardDescription>
                    Get expert guidance on rental disputes, eviction processes, maintenance issues, and security deposits
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-2 text-sm text-muted-foreground">
                    <li>• Tenant-landlord disputes</li>
                    <li>• Lease renewals and terminations</li>
                    <li>• Maintenance obligations</li>
                    <li>• Security deposit recovery</li>
                  </ul>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <FileText className="h-12 w-12 text-primary mb-4" />
                  <CardTitle>Contract Review</CardTitle>
                  <CardDescription>
                    Advanced clause-by-clause analysis with risk assessment and compliance checking
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-2 text-sm text-muted-foreground">
                    <li>• Identify problematic clauses</li>
                    <li>• Risk scoring and assessment</li>
                    <li>• Missing clause detection</li>
                    <li>• Revision suggestions</li>
                  </ul>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <Scale className="h-12 w-12 text-primary mb-4" />
                  <CardTitle>Real Estate Transactions</CardTitle>
                  <CardDescription>
                    Guidance on property transfers, RERA compliance, escrow procedures, and Oqood registration
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-2 text-sm text-muted-foreground">
                    <li>• Property ownership transfer</li>
                    <li>• RERA regulations compliance</li>
                    <li>• Escrow account procedures</li>
                    <li>• Dubai Land Department processes</li>
                  </ul>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>

        <section className="container mx-auto px-4 py-20">
          <div className="max-w-4xl mx-auto">
            <h3 className="text-3xl font-bold text-center mb-12">Legal Framework Coverage</h3>
            <div className="grid gap-6 md:grid-cols-2">
              <Card>
                <CardHeader>
                  <CardTitle>UAE/Dubai Laws</CardTitle>
                </CardHeader>
                <CardContent className="space-y-2 text-sm">
                  <p>• Dubai Rental Law 26/2007 and amendments (33/2008)</p>
                  <p>• UAE Civil Code (Federal Law 5/1985)</p>
                  <p>• RERA regulations and guidelines</p>
                  <p>• Strata Law 27/2007</p>
                  <p>• Escrow and Oqood procedures</p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Key Features</CardTitle>
                </CardHeader>
                <CardContent className="space-y-2 text-sm">
                  <p>• Bilingual support (English & Arabic)</p>
                  <p>• Exact article and law citations</p>
                  <p>• Formal legal tone and terminology</p>
                  <p>• Professional report generation</p>
                  <p>• 70% informational, 30% advisory</p>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>

        <section className="bg-muted py-20">
          <div className="container mx-auto px-4 text-center">
            <Shield className="h-16 w-16 text-primary mx-auto mb-6" />
            <h3 className="text-3xl font-bold mb-4">Restricted Access</h3>
            <p className="text-muted-foreground max-w-2xl mx-auto mb-8">
              This legal consultant AI is exclusively available to the Paris Group Legal Department. 
              All consultations and documents are handled with strict confidentiality and comply with 
              internal data protection policies.
            </p>
            {!isAuthenticated && (
              <Button size="lg" asChild>
                <a href={getLoginUrl()}>Sign In to Access</a>
              </Button>
            )}
          </div>
        </section>
      </main>

      <footer className="border-t py-8">
        <div className="container mx-auto px-4 text-center text-sm text-muted-foreground">
          <p className="mb-2">
            <strong>Legal Disclaimer:</strong> This AI provides guidance based on current UAE/Dubai law 
            and Paris Group internal documents. It is not a substitute for a licensed lawyer.
          </p>
          <p>© 2024 Paris Group Dubai. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
}
