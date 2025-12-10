import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { ChevronDown, ChevronUp } from "lucide-react";
import { Version } from "@/lib/versionHistory";

interface VersionTimelineProps {
  versions: Version[];
  iconMap: Record<string, any>;
  categoryColors: Record<string, string>;
}

export function VersionTimeline({ versions, iconMap, categoryColors }: VersionTimelineProps) {
  const [expandedVersions, setExpandedVersions] = useState<Set<string>>(new Set([versions[0]?.version]));

  const toggleVersion = (version: string) => {
    setExpandedVersions((prev) => {
      const next = new Set(prev);
      if (next.has(version)) {
        next.delete(version);
      } else {
        next.add(version);
      }
      return next;
    });
  };

  return (
    <div className="max-w-4xl mx-auto space-y-8">
      {versions.map((version, idx) => {
        const isExpanded = expandedVersions.has(version.version);
        const isLatest = idx === 0;

        return (
          <div key={version.version} className="relative pl-8 border-l-2 border-primary/20">
            {/* Timeline dot */}
            <div
              className={`absolute left-[-9px] top-6 w-4 h-4 rounded-full border-4 border-background ${
                isLatest ? "bg-primary animate-pulse" : "bg-primary/60"
              }`}
            />

            <Card className={`transition-all ${isExpanded ? "shadow-lg" : ""}`}>
              <CardHeader className="cursor-pointer" onClick={() => toggleVersion(version.version)}>
                <div className="flex items-center justify-between flex-wrap gap-2">
                  <div className="flex items-center gap-3">
                    <Badge variant={isLatest ? "default" : "secondary"} className="text-sm">
                      v{version.version}
                    </Badge>
                    <CardTitle className="text-xl">{version.name}</CardTitle>
                    {isLatest && (
                      <Badge variant="outline" className="text-xs">
                        Latest
                      </Badge>
                    )}
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="text-sm text-muted-foreground">{version.date}</span>
                    <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
                      {isExpanded ? (
                        <ChevronUp className="h-4 w-4" />
                      ) : (
                        <ChevronDown className="h-4 w-4" />
                      )}
                    </Button>
                  </div>
                </div>
                <CardDescription className="text-base mt-2">{version.tagline}</CardDescription>
              </CardHeader>

              {isExpanded && (
                <CardContent>
                  <div className="grid md:grid-cols-2 gap-4">
                    {version.features.map((feature, fidx) => {
                      const Icon = iconMap[feature.icon];
                      return (
                        <div
                          key={fidx}
                          className="flex gap-3 p-3 rounded-lg hover:bg-muted/50 transition-colors"
                        >
                          <div
                            className={`p-2 rounded-lg h-fit flex-shrink-0 ${categoryColors[feature.category]}`}
                          >
                            <Icon className="h-4 w-4" />
                          </div>
                          <div className="flex-1 min-w-0">
                            <div className="font-medium text-sm">{feature.title}</div>
                            <div className="text-xs text-muted-foreground mt-1 line-clamp-2">
                              {feature.description}
                            </div>
                          </div>
                        </div>
                      );
                    })}
                  </div>

                  {version.stats && (
                    <div className="flex flex-wrap gap-4 mt-6 pt-4 border-t">
                      {version.stats.map((stat, sidx) => (
                        <div
                          key={sidx}
                          className="flex items-center gap-2 px-3 py-2 rounded-lg bg-muted/50"
                        >
                          <div className="font-bold text-primary">{stat.value}</div>
                          <div className="text-xs text-muted-foreground">{stat.label}</div>
                        </div>
                      ))}
                    </div>
                  )}
                </CardContent>
              )}
            </Card>
          </div>
        );
      })}
    </div>
  );
}
