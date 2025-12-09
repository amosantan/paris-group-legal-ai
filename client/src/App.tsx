import { Toaster } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import NotFound from "@/pages/NotFound";
import KnowledgeBase from "@/pages/KnowledgeBase";
import { Route, Switch } from "wouter";
import ErrorBoundary from "./components/ErrorBoundary";
import { ThemeProvider } from "./contexts/ThemeContext";
import Home from "./pages/Home";
import Dashboard from "./pages/Dashboard";
import NewConsultation from "./pages/NewConsultation";
import Consultation from "./pages/Consultation";
import ContractReview from "./pages/ContractReview";
import Reports from "./pages/Reports";
import LLMSettings from "./pages/LLMSettings";
import LawyerReviewDashboard from "./pages/LawyerReviewDashboard";
import LegalDocumentGenerator from "./pages/LegalDocumentGenerator";
import AuditLogViewer from "./pages/AuditLogViewer";

function Router() {
  return (
    <Switch>
      <Route path={"/"} component={Home} />
      <Route path={"/knowledge-base"} component={KnowledgeBase} />
      <Route path={"/dashboard"} component={Dashboard} />
      <Route path={"/new-consultation"} component={NewConsultation} />
      <Route path={"/consultation/:id"} component={Consultation} />
      <Route path={"/contract-review/:documentId"} component={ContractReview} />
      <Route path={"/reports/:consultationId"} component={Reports} />
      <Route path={"/llm-settings"} component={LLMSettings} />
        <Route path="/lawyer-review" component={LawyerReviewDashboard} />
        <Route path="/document-generator" component={LegalDocumentGenerator} />
      <Route path={"/audit-logs"} component={AuditLogViewer} />
      <Route path={"/404"} component={NotFound} />
      <Route component={NotFound} />
    </Switch>
  );
}

function App() {
  return (
    <ErrorBoundary>
      <ThemeProvider defaultTheme="light">
        <TooltipProvider>
          <Toaster />
          <Router />
        </TooltipProvider>
      </ThemeProvider>
    </ErrorBoundary>
  );
}

export default App;
