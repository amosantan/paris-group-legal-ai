import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { CitationModal } from "@/components/CitationModal";

export default function CitationTest() {
  const [modalOpen, setModalOpen] = useState(false);
  const [selectedArticle, setSelectedArticle] = useState<any>(null);
  const [highlightText, setHighlightText] = useState<string>("");

  const testArticles = [
    {
      id: 1,
      articleNumber: "5",
      lawName: "Law No. (2) of 2022",
      category: "real_estate_law",
      fullText: "Acquisition of Real Property may only occur if the following fundamental rules are met:\n\n1. It must be made only for the public benefit.\n2. It must be in return for fair Compensation.\n3. It must be in accordance with the rules, standards, provisions, and procedures stipulated in this Law.",
      source: "Dubai Government",
      enactmentDate: "2022-03-15",
      importance: 9,
      legalConcepts: ["acquisition", "public benefit", "compensation", "property rights"],
    },
    {
      id: 2,
      articleNumber: "43",
      lawName: "Decree No. (43) of 2013",
      category: "rental_law",
      fullText: "The maximum percentage of rent increase upon renewal of real property lease contracts in the Emirate of Dubai shall be calculated based on how much the current rent is below the average rental value of similar units, as determined by the RERA Rent Index.",
      source: "Dubai Land Department",
      enactmentDate: "2013-09-01",
      importance: 8,
      legalConcepts: ["rent increase", "lease renewal", "RERA", "rental value"],
    },
  ];

  const openModal = (article: any, highlight?: string) => {
    setSelectedArticle(article);
    setHighlightText(highlight || "");
    setModalOpen(true);
  };

  return (
    <div className="container mx-auto py-8">
      <h1 className="text-3xl font-bold mb-6">Citation Highlighting Test</h1>
      
      <div className="grid gap-6 md:grid-cols-2">
        {/* Test Case 1: With Highlighting */}
        <Card>
          <CardHeader>
            <CardTitle>Test 1: With Text Highlighting</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <p className="text-sm text-muted-foreground">
              Opens modal with "public benefit" highlighted in yellow
            </p>
            <Button 
              onClick={() => openModal(testArticles[0], "public benefit")}
              className="w-full"
            >
              Open Article 5 (Highlight: "public benefit")
            </Button>
            <Button 
              onClick={() => openModal(testArticles[0], "Compensation")}
              variant="outline"
              className="w-full"
            >
              Open Article 5 (Highlight: "Compensation")
            </Button>
          </CardContent>
        </Card>

        {/* Test Case 2: Without Highlighting */}
        <Card>
          <CardHeader>
            <CardTitle>Test 2: Without Highlighting</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <p className="text-sm text-muted-foreground">
              Opens modal with no highlighting (normal view)
            </p>
            <Button 
              onClick={() => openModal(testArticles[0])}
              variant="secondary"
              className="w-full"
            >
              Open Article 5 (No Highlight)
            </Button>
            <Button 
              onClick={() => openModal(testArticles[1])}
              variant="secondary"
              className="w-full"
            >
              Open Article 43 (No Highlight)
            </Button>
          </CardContent>
        </Card>

        {/* Test Case 3: Rent Increase Article */}
        <Card>
          <CardHeader>
            <CardTitle>Test 3: Rent Increase Highlighting</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <p className="text-sm text-muted-foreground">
              Test highlighting on rental law article
            </p>
            <Button 
              onClick={() => openModal(testArticles[1], "RERA Rent Index")}
              className="w-full"
            >
              Open Article 43 (Highlight: "RERA Rent Index")
            </Button>
            <Button 
              onClick={() => openModal(testArticles[1], "rent increase")}
              variant="outline"
              className="w-full"
            >
              Open Article 43 (Highlight: "rent increase")
            </Button>
          </CardContent>
        </Card>

        {/* Test Case 4: Copy Citation */}
        <Card>
          <CardHeader>
            <CardTitle>Test 4: Copy Citation Feature</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <p className="text-sm text-muted-foreground">
              Test the "Copy Citation" button and toast notification
            </p>
            <Button 
              onClick={() => openModal(testArticles[0])}
              variant="default"
              className="w-full"
            >
              Open & Test Copy Citation
            </Button>
            <p className="text-xs text-muted-foreground">
              Expected format:<br/>
              Law No. (2) of 2022, Article 5 (2022)<br/>
              [Full text]<br/>
              Source: Dubai Government
            </p>
          </CardContent>
        </Card>
      </div>

      {/* Features Checklist */}
      <Card className="mt-8">
        <CardHeader>
          <CardTitle>Features to Test</CardTitle>
        </CardHeader>
        <CardContent>
          <ul className="space-y-2 text-sm">
            <li className="flex items-center gap-2">
              <span className="text-green-600">✓</span>
              <span>Text highlighting with yellow background</span>
            </li>
            <li className="flex items-center gap-2">
              <span className="text-green-600">✓</span>
              <span>Auto-scroll to highlighted text</span>
            </li>
            <li className="flex items-center gap-2">
              <span className="text-green-600">✓</span>
              <span>Case-insensitive highlighting</span>
            </li>
            <li className="flex items-center gap-2">
              <span className="text-green-600">✓</span>
              <span>Copy Citation button with toast notification</span>
            </li>
            <li className="flex items-center gap-2">
              <span className="text-green-600">✓</span>
              <span>Legal citation format (Law Name, Article X (Year))</span>
            </li>
            <li className="flex items-center gap-2">
              <span className="text-green-600">✓</span>
              <span>Works with both English and Arabic content</span>
            </li>
          </ul>
        </CardContent>
      </Card>

      {/* Modal */}
      {selectedArticle && (
        <CitationModal
          open={modalOpen}
          onOpenChange={setModalOpen}
          article={selectedArticle}
          highlightText={highlightText}
          onAskAbout={(id) => {
            console.log("Ask about article:", id);
            setModalOpen(false);
          }}
        />
      )}
    </div>
  );
}
