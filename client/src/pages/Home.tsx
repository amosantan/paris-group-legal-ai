import { useAuth } from "@/_core/hooks/useAuth";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { getLoginUrl } from "@/const";
import { FileText, MessageSquare, Scale, Shield, Upload, Database } from "lucide-react";
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
            <div className="inline-block px-4 py-2 bg-primary/10 text-primary rounded-full text-sm font-semibold mb-4">
              Version 6.0 - Expanded Knowledge Base
            </div>
            <h2 className="text-5xl font-bold tracking-tight">
              Expert Legal Consultation for Dubai Real Estate
            </h2>
            <p className="text-xl text-muted-foreground">
              AI-powered legal assistant specializing in rental disputes, real estate transactions, property mortgages, and DIFC regulations, 
              backed by <strong>740 comprehensive legal articles</strong> from official UAE government sources including Civil Code, Commercial Law, Labor Law, and Real Estate regulations
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
                    Get expert guidance on rental disputes, mortgage enforcement, property ownership, and DIFC regulations
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-2 text-sm text-muted-foreground">
                    <li>• Tenant-landlord disputes</li>
                    <li>• Mortgage enforcement procedures</li>
                    <li>• Property ownership restrictions</li>
                    <li>• DIFC vs mainland Dubai laws</li>
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
                    Guidance on property transfers, mortgages, DLD registration, and DIFC real estate transactions
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-2 text-sm text-muted-foreground">
                    <li>• Property ownership & transfer</li>
                    <li>• Mortgage registration & discharge</li>
                    <li>• DLD registration requirements</li>
                    <li>• DIFC property transactions</li>
                  </ul>
                </CardContent>
              </Card>
            </div>

            <div className="mt-12 max-w-4xl mx-auto">
              <Card className="border-primary/50 bg-primary/5">
                <CardHeader>
                  <div className="flex items-center gap-4">
                    <div className="p-3 bg-primary/10 rounded-lg">
                      <Upload className="h-8 w-8 text-primary" />
                    </div>
                    <div className="flex-1">
                      <CardTitle className="text-2xl">Expand Legal Knowledge Base</CardTitle>
                      <CardDescription className="text-base mt-2">
                        Upload official UAE legal PDFs to continuously improve AI accuracy and coverage
                      </CardDescription>
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="grid md:grid-cols-2 gap-6">
                    <div>
                      <h4 className="font-semibold mb-3 flex items-center gap-2">
                        <Database className="h-5 w-5 text-primary" />
                        Current Knowledge Base
                      </h4>
                      <ul className="space-y-2 text-sm text-muted-foreground">
                        <li>• <strong>740 legal articles</strong> across all categories</li>
                        <li>• UAE Civil Code (357 entries)</li>
                        <li>• Commercial Law (227 entries)</li>
                        <li>• Real Estate & Rental Law (115 entries)</li>
                        <li>• Labor Law (40 entries)</li>
                      </ul>
                    </div>
                    <div>
                      <h4 className="font-semibold mb-3">Supported Sources</h4>
                      <ul className="space-y-2 text-sm text-muted-foreground">
                        <li>• Ministry of Justice (moj.gov.ae)</li>
                        <li>• Dubai Land Department</li>
                        <li>• Ministry of Economy</li>
                        <li>• MOHRE Labor Laws</li>
                        <li>• DIFC Legal Database</li>
                      </ul>
                    </div>
                  </div>
                  {isAuthenticated ? (
                    <div className="mt-6">
                      <Link href="/pdf-upload">
                        <Button size="lg" className="w-full md:w-auto">
                          <Upload className="mr-2 h-5 w-5" />
                          Upload Legal PDFs
                        </Button>
                      </Link>
                    </div>
                  ) : (
                    <div className="mt-6">
                      <Button size="lg" variant="outline" disabled className="w-full md:w-auto">
                        <Upload className="mr-2 h-5 w-5" />
                        Sign in to Upload PDFs
                      </Button>
                    </div>
                  )}
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
                  <p>• <strong>UAE Civil Code</strong> (Federal Law 5/1985) - 357 articles</p>
                  <p>• <strong>Commercial Law</strong> (Companies & Transactions) - 227 articles</p>
                  <p>• <strong>Dubai Real Estate Legislation</strong> - 71 articles</p>
                  <p>• <strong>Dubai Rental Law</strong> 26/2007 & 33/2008 - 44 articles</p>
                  <p>• <strong>UAE Labor Law</strong> (Federal Law 8/1980) - 40 articles</p>
                  <p>• DIFC Laws, RERA regulations & Strata Law</p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Key Features</CardTitle>
                </CardHeader>
                <CardContent className="space-y-2 text-sm">
                  <p>• AI confidence scoring with visual indicators</p>
                  <p>• Automatic lawyer review for low confidence</p>
                  <p>• Citation verification for all legal claims</p>
                  <p>• Bilingual support (English & Arabic)</p>
                  <p>• Exact article and law citations</p>
                  <p>• Professional report generation</p>
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
