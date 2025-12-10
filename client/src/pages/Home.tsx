import { Link } from "wouter";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  MessageSquare,
  FileText,
  Search,
  Scale,
  Building,
  Home,
  FileCheck,
  Building2,
  Key,
  UserCheck,
  FileSearch,
  ShieldCheck,
  FileDown,
  Languages,
  Brain,
  Lightbulb,
  Mic,
  Image,
  Gauge,
  CheckCircle,
  Settings,
  ArrowRight,
  Sparkles,
  TrendingUp,
} from "lucide-react";
import { versionHistory, getLatestVersion, getTotalStats } from "@/lib/versionHistory";
import { VersionTimeline } from "@/components/VersionTimeline";

const iconMap: Record<string, any> = {
  MessageSquare,
  FileText,
  Search,
  Scale,
  Building,
  Home,
  FileCheck,
  Building2,
  Key,
  UserCheck,
  FileSearch,
  ShieldCheck,
  FileDown,
  Languages,
  Brain,
  Lightbulb,
  Mic,
  Image,
  Gauge,
  CheckCircle,
  Settings,
};

export default function HomePage() {
  const latestVersion = getLatestVersion();
  const stats = getTotalStats();

  const categoryColors: Record<string, string> = {
    core: "bg-blue-500/10 text-blue-700 dark:text-blue-300",
    knowledge: "bg-purple-500/10 text-purple-700 dark:text-purple-300",
    quality: "bg-green-500/10 text-green-700 dark:text-green-300",
    automation: "bg-orange-500/10 text-orange-700 dark:text-orange-300",
    intelligence: "bg-pink-500/10 text-pink-700 dark:text-pink-300",
  };

  const categoryLabels: Record<string, string> = {
    core: "Core Features",
    knowledge: "Legal Knowledge",
    quality: "Quality Control",
    automation: "Automation",
    intelligence: "AI Intelligence",
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-background to-muted/20">
      {/* Header */}
      <header className="border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="container flex h-16 items-center justify-between">
          <div className="flex items-center gap-2">
            <Scale className="h-6 w-6 text-primary" />
            <span className="text-xl font-bold">Paris Group Legal AI</span>
          </div>
          <Link href="/dashboard">
            <Button>Go to Dashboard</Button>
          </Link>
        </div>
      </header>

      {/* Hero Section */}
      <section className="container py-16 md:py-24">
        <div className="flex flex-col items-center text-center space-y-6">
          <Badge className="px-4 py-1 text-sm" variant="secondary">
            <Sparkles className="h-3 w-3 mr-1" />
            Version {latestVersion.version} - {latestVersion.name}
          </Badge>
          
          <h1 className="text-4xl md:text-6xl font-bold tracking-tight">
            Expert Legal Consultation for
            <br />
            <span className="text-primary">Dubai Real Estate</span>
          </h1>
          
          <p className="text-xl text-muted-foreground max-w-3xl">
            AI-powered legal assistant specializing in rental disputes, real estate
            transactions, property mortgages, and DIFC regulations, backed by
            comprehensive UAE/Dubai law knowledge including{" "}
            <span className="font-semibold text-foreground">33 newly added articles</span>
          </p>

          <div className="flex flex-wrap gap-4 justify-center">
            <Link href="/dashboard">
              <Button size="lg" className="gap-2">
                Start New Consultation
                <ArrowRight className="h-4 w-4" />
              </Button>
            </Link>
            <Button size="lg" variant="outline" asChild>
              <a href="#version-history">View Version History</a>
            </Button>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 pt-8 w-full max-w-4xl">
            <div className="flex flex-col items-center">
              <div className="text-3xl font-bold text-primary">{stats.totalVersions}</div>
              <div className="text-sm text-muted-foreground">Major Versions</div>
            </div>
            <div className="flex flex-col items-center">
              <div className="text-3xl font-bold text-primary">{stats.legalArticles}</div>
              <div className="text-sm text-muted-foreground">Legal Articles</div>
            </div>
            <div className="flex flex-col items-center">
              <div className="text-3xl font-bold text-primary">{stats.casePrecedents}</div>
              <div className="text-sm text-muted-foreground">Case Precedents</div>
            </div>
            <div className="flex flex-col items-center">
              <div className="text-3xl font-bold text-primary">{stats.testPassRate}</div>
              <div className="text-sm text-muted-foreground">Test Pass Rate</div>
            </div>
          </div>
        </div>
      </section>

      {/* What's New Section */}
      <section className="container py-16 bg-muted/30">
        <div className="flex items-center gap-3 mb-8">
          <TrendingUp className="h-6 w-6 text-primary" />
          <h2 className="text-3xl font-bold">What's New in v{latestVersion.version}</h2>
          <Badge variant="default">Latest</Badge>
        </div>
        
        <p className="text-lg text-muted-foreground mb-8">
          {latestVersion.tagline}
        </p>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {latestVersion.features.map((feature, idx) => {
            const Icon = iconMap[feature.icon] || FileText;
            return (
              <Card key={idx} className="hover:shadow-lg transition-shadow">
                <CardHeader>
                  <div className="flex items-start justify-between">
                    <div className={`p-2 rounded-lg ${categoryColors[feature.category]}`}>
                      <Icon className="h-5 w-5" />
                    </div>
                    <Badge variant="secondary" className="text-xs">
                      {categoryLabels[feature.category]}
                    </Badge>
                  </div>
                  <CardTitle className="text-lg mt-4">{feature.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <CardDescription>{feature.description}</CardDescription>
                </CardContent>
              </Card>
            );
          })}
        </div>

        {latestVersion.stats && (
          <div className="flex flex-wrap gap-6 justify-center mt-8 pt-8 border-t">
            {latestVersion.stats.map((stat, idx) => (
              <div key={idx} className="flex items-center gap-2">
                <div className="text-2xl font-bold text-primary">{stat.value}</div>
                <div className="text-sm text-muted-foreground">{stat.label}</div>
              </div>
            ))}
          </div>
        )}
      </section>

      {/* All Capabilities Section */}
      <section className="container py-16">
        <h2 className="text-3xl font-bold mb-8 text-center">All Capabilities</h2>
        
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {Object.entries(categoryLabels).map(([category, label]) => {
            const features = versionHistory
              .flatMap((v) => v.features)
              .filter((f) => f.category === category);
            
            return (
              <Card key={category} className="overflow-hidden">
                <CardHeader className={`${categoryColors[category]} border-b`}>
                  <CardTitle className="text-lg">{label}</CardTitle>
                  <CardDescription className="text-xs">
                    {features.length} features
                  </CardDescription>
                </CardHeader>
                <CardContent className="pt-4">
                  <ul className="space-y-3">
                    {features.map((feature, idx) => {
                      const Icon = iconMap[feature.icon] || FileText;
                      return (
                        <li key={idx} className="flex items-start gap-2">
                          <Icon className="h-4 w-4 mt-0.5 text-muted-foreground flex-shrink-0" />
                          <span className="text-sm">{feature.title}</span>
                        </li>
                      );
                    })}
                  </ul>
                </CardContent>
              </Card>
            );
          })}
        </div>
      </section>

      {/* Version History Timeline */}
      <section id="version-history" className="container py-16 bg-muted/30">
        <h2 className="text-3xl font-bold mb-12 text-center">Version History</h2>
        <p className="text-center text-muted-foreground mb-8 max-w-2xl mx-auto">
          Click on any version to expand and see detailed features and improvements
        </p>
        <VersionTimeline
          versions={versionHistory}
          iconMap={iconMap}
          categoryColors={categoryColors}
        />
      </section>

      {/* CTA Section */}
      <section className="container py-16">
        <Card className="bg-primary text-primary-foreground">
          <CardContent className="flex flex-col md:flex-row items-center justify-between gap-6 p-8">
            <div>
              <h3 className="text-2xl font-bold mb-2">Ready to Get Started?</h3>
              <p className="text-primary-foreground/90">
                Start your legal consultation now with our AI-powered assistant
              </p>
            </div>
            <Link href="/dashboard">
              <Button size="lg" variant="secondary" className="gap-2">
                Start New Consultation
                <ArrowRight className="h-4 w-4" />
              </Button>
            </Link>
          </CardContent>
        </Card>
      </section>

      {/* Footer */}
      <footer className="border-t py-8 bg-background">
        <div className="container text-center text-sm text-muted-foreground">
          <p>© 2025 Paris Group Dubai Legal Consultant AI. All rights reserved.</p>
          <p className="mt-2">
            Powered by advanced AI • {stats.legalArticles} legal articles • {stats.casePrecedents} case precedents
          </p>
        </div>
      </footer>
    </div>
  );
}
