import { AlertTriangle, CheckCircle2, FileText, DollarSign, Calendar, Users, Shield, AlertCircle, Info } from "lucide-react";
import type { DocumentAnalysisResult, KeyClause, IdentifiedRisk } from "../../../shared/documentAnalysis";
import { Card } from "./ui/card";
import { Badge } from "./ui/badge";

interface DocumentAnalysisDisplayProps {
  analysis: DocumentAnalysisResult;
  className?: string;
}

const severityConfig = {
  critical: { color: "bg-red-100 text-red-800 border-red-200", icon: AlertTriangle, label: "Critical" },
  high: { color: "bg-orange-100 text-orange-800 border-orange-200", icon: AlertCircle, label: "High" },
  medium: { color: "bg-yellow-100 text-yellow-800 border-yellow-200", icon: Info, label: "Medium" },
  low: { color: "bg-blue-100 text-blue-800 border-blue-200", icon: CheckCircle2, label: "Low" }
};

const importanceConfig = {
  critical: { color: "bg-red-500", label: "Critical" },
  high: { color: "bg-orange-500", label: "High" },
  medium: { color: "bg-yellow-500", label: "Medium" },
  low: { color: "bg-blue-500", label: "Low" }
};

const categoryIcons = {
  payment: DollarSign,
  termination: AlertTriangle,
  liability: Shield,
  maintenance: FileText,
  insurance: Shield,
  dispute_resolution: Users,
  other: FileText
};

export function DocumentAnalysisDisplay({ analysis, className = "" }: DocumentAnalysisDisplayProps) {
  const overallRiskConfig = severityConfig[analysis.overallRiskLevel];
  const OverallRiskIcon = overallRiskConfig.icon;

  return (
    <div className={`space-y-6 ${className}`}>
      {/* Overall Summary */}
      <Card className="p-6">
        <div className="flex items-start gap-4">
          <div className={`p-3 rounded-lg ${overallRiskConfig.color}`}>
            <OverallRiskIcon className="h-6 w-6" />
          </div>
          <div className="flex-1">
            <div className="flex items-center gap-2 mb-2">
              <h3 className="text-lg font-semibold">{analysis.documentType}</h3>
              <Badge variant="outline" className={overallRiskConfig.color}>
                {overallRiskConfig.label} Risk
              </Badge>
            </div>
            <p className="text-sm text-muted-foreground mb-4">{analysis.summary}</p>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-4">
              {analysis.parties.length > 0 && (
                <div className="flex items-center gap-2">
                  <Users className="h-4 w-4 text-muted-foreground" />
                  <div>
                    <div className="text-xs text-muted-foreground">Parties</div>
                    <div className="text-sm font-medium">{analysis.parties.join(", ")}</div>
                  </div>
                </div>
              )}
              
              {analysis.keyDates.length > 0 && (
                <div className="flex items-center gap-2">
                  <Calendar className="h-4 w-4 text-muted-foreground" />
                  <div>
                    <div className="text-xs text-muted-foreground">{analysis.keyDates[0].label}</div>
                    <div className="text-sm font-medium">{analysis.keyDates[0].date}</div>
                  </div>
                </div>
              )}
              
              {analysis.keyAmounts.length > 0 && (
                <div className="flex items-center gap-2">
                  <DollarSign className="h-4 w-4 text-muted-foreground" />
                  <div>
                    <div className="text-xs text-muted-foreground">{analysis.keyAmounts[0].label}</div>
                    <div className="text-sm font-medium">{analysis.keyAmounts[0].amount}</div>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </Card>

      {/* Identified Risks */}
      {analysis.risks.length > 0 && (
        <div>
          <h3 className="text-lg font-semibold mb-3 flex items-center gap-2">
            <AlertTriangle className="h-5 w-5 text-orange-500" />
            Identified Risks ({analysis.risks.length})
          </h3>
          <div className="space-y-3">
            {analysis.risks.map((risk) => (
              <RiskCard key={risk.id} risk={risk} />
            ))}
          </div>
        </div>
      )}

      {/* Key Clauses */}
      {analysis.clauses.length > 0 && (
        <div>
          <h3 className="text-lg font-semibold mb-3 flex items-center gap-2">
            <FileText className="h-5 w-5 text-blue-500" />
            Key Clauses ({analysis.clauses.length})
          </h3>
          <div className="space-y-3">
            {analysis.clauses.map((clause) => (
              <ClauseCard key={clause.id} clause={clause} />
            ))}
          </div>
        </div>
      )}

      {/* Additional Details */}
      {(analysis.keyDates.length > 1 || analysis.keyAmounts.length > 1) && (
        <Card className="p-6">
          <h4 className="font-semibold mb-4">Additional Details</h4>
          
          {analysis.keyDates.length > 1 && (
            <div className="mb-4">
              <div className="text-sm font-medium text-muted-foreground mb-2">Important Dates</div>
              <div className="space-y-2">
                {analysis.keyDates.slice(1).map((date, idx) => (
                  <div key={idx} className="flex items-center gap-2 text-sm">
                    <Calendar className="h-4 w-4 text-muted-foreground" />
                    <span className="font-medium">{date.label}:</span>
                    <span>{date.date}</span>
                  </div>
                ))}
              </div>
            </div>
          )}
          
          {analysis.keyAmounts.length > 1 && (
            <div>
              <div className="text-sm font-medium text-muted-foreground mb-2">Financial Terms</div>
              <div className="space-y-2">
                {analysis.keyAmounts.slice(1).map((amount, idx) => (
                  <div key={idx} className="flex items-center gap-2 text-sm">
                    <DollarSign className="h-4 w-4 text-muted-foreground" />
                    <span className="font-medium">{amount.label}:</span>
                    <span>{amount.amount}</span>
                  </div>
                ))}
              </div>
            </div>
          )}
        </Card>
      )}
    </div>
  );
}

function RiskCard({ risk }: { risk: IdentifiedRisk }) {
  const config = severityConfig[risk.severity];
  const Icon = config.icon;

  return (
    <Card className={`p-4 border-l-4 ${config.color}`}>
      <div className="flex items-start gap-3">
        <div className={`p-2 rounded-lg ${config.color}`}>
          <Icon className="h-5 w-5" />
        </div>
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2 mb-1">
            <h4 className="font-semibold text-sm">{risk.title}</h4>
            <Badge variant="outline" className={`text-xs ${config.color}`}>
              {config.label}
            </Badge>
            <Badge variant="secondary" className="text-xs">
              {risk.category}
            </Badge>
          </div>
          <p className="text-sm text-muted-foreground mb-2">{risk.description}</p>
          <div className="bg-muted/50 rounded-md p-3 mt-2">
            <div className="text-xs font-medium text-muted-foreground mb-1">Recommendation</div>
            <p className="text-sm">{risk.recommendation}</p>
          </div>
          {risk.relatedClause && (
            <div className="text-xs text-muted-foreground mt-2">
              Related to: {risk.relatedClause}
            </div>
          )}
        </div>
      </div>
    </Card>
  );
}

function ClauseCard({ clause }: { clause: KeyClause }) {
  const importanceColor = importanceConfig[clause.importance].color;
  const CategoryIcon = categoryIcons[clause.category];

  return (
    <Card className="p-4 hover:shadow-md transition-shadow">
      <div className="flex items-start gap-3">
        <div className="p-2 rounded-lg bg-muted">
          <CategoryIcon className="h-5 w-5 text-muted-foreground" />
        </div>
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2 mb-1">
            <div className={`w-2 h-2 rounded-full ${importanceColor}`} />
            <h4 className="font-semibold text-sm">{clause.title}</h4>
            <Badge variant="secondary" className="text-xs">
              {clause.category.replace(/_/g, " ")}
            </Badge>
            {clause.reference && (
              <span className="text-xs text-muted-foreground ml-auto">{clause.reference}</span>
            )}
          </div>
          <p className="text-sm text-muted-foreground">{clause.content}</p>
        </div>
      </div>
    </Card>
  );
}
