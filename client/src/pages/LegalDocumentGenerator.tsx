import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Textarea } from "@/components/ui/textarea";
import { trpc } from "@/lib/trpc";
import { FileText, Loader2 } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";
import DashboardLayout from "@/components/DashboardLayout";

export default function LegalDocumentGenerator() {
  // Demand Letter State
  const [demandLetter, setDemandLetter] = useState({
    senderName: "",
    senderNameAr: "",
    senderAddress: "",
    senderAddressAr: "",
    recipientName: "",
    recipientNameAr: "",
    recipientAddress: "",
    recipientAddressAr: "",
    propertyAddress: "",
    propertyAddressAr: "",
    amountOwed: 0,
    dueDate: "",
    details: "",
    detailsAr: "",
  });

  // Eviction Notice State
  const [evictionNotice, setEvictionNotice] = useState({
    landlordName: "",
    landlordNameAr: "",
    landlordAddress: "",
    landlordAddressAr: "",
    tenantName: "",
    tenantNameAr: "",
    tenantAddress: "",
    tenantAddressAr: "",
    propertyAddress: "",
    propertyAddressAr: "",
    evictionReason: "",
    evictionReasonAr: "",
    noticeDate: new Date().toISOString().split("T")[0],
    vacateDate: "",
    legalBasis: "",
    legalBasisAr: "",
  });

  // NOC State
  const [noc, setNOC] = useState({
    issuerName: "",
    issuerNameAr: "",
    issuerTitle: "",
    issuerTitleAr: "",
    issuerCompany: "",
    issuerCompanyAr: "",
    recipientName: "",
    recipientNameAr: "",
    propertyAddress: "",
    propertyAddressAr: "",
    purpose: "",
    purposeAr: "",
    conditions: "",
    conditionsAr: "",
    issueDate: new Date().toISOString().split("T")[0],
  });

  const demandLetterMutation = trpc.reports.generateDemandLetter.useMutation({
    onSuccess: (data) => {
      toast.success("Demand letter generated successfully!");
      window.open(data.url, "_blank");
    },
    onError: (error) => {
      toast.error(`Failed to generate demand letter: ${error.message}`);
    },
  });

  const evictionNoticeMutation = trpc.reports.generateEvictionNotice.useMutation({
    onSuccess: (data) => {
      toast.success("Eviction notice generated successfully!");
      window.open(data.url, "_blank");
    },
    onError: (error) => {
      toast.error(`Failed to generate eviction notice: ${error.message}`);
    },
  });

  const nocMutation = trpc.reports.generateNOC.useMutation({
    onSuccess: (data) => {
      toast.success("NOC generated successfully!");
      window.open(data.url, "_blank");
    },
    onError: (error) => {
      toast.error(`Failed to generate NOC: ${error.message}`);
    },
  });

  return (
    <DashboardLayout>
      <div className="space-y-6">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Legal Document Generator</h1>
          <p className="text-muted-foreground mt-2">
            Generate professional bilingual legal documents (English/Arabic)
          </p>
        </div>

        <Tabs defaultValue="demand" className="w-full">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="demand">Demand Letter</TabsTrigger>
            <TabsTrigger value="eviction">Eviction Notice</TabsTrigger>
            <TabsTrigger value="noc">NOC</TabsTrigger>
          </TabsList>

          {/* Demand Letter Tab */}
          <TabsContent value="demand">
            <Card>
              <CardHeader>
                <CardTitle>Demand Letter for Payment</CardTitle>
                <CardDescription>
                  Generate a formal demand letter for outstanding rent or payments
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label>Sender Name (English)</Label>
                    <Input
                      value={demandLetter.senderName}
                      onChange={(e) => setDemandLetter({ ...demandLetter, senderName: e.target.value })}
                      placeholder="John Smith"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label>Sender Name (Arabic)</Label>
                    <Input
                      value={demandLetter.senderNameAr}
                      onChange={(e) => setDemandLetter({ ...demandLetter, senderNameAr: e.target.value })}
                      placeholder="جون سميث"
                      dir="rtl"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label>Sender Address (English)</Label>
                    <Textarea
                      value={demandLetter.senderAddress}
                      onChange={(e) => setDemandLetter({ ...demandLetter, senderAddress: e.target.value })}
                      placeholder="123 Main Street, Dubai, UAE"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label>Sender Address (Arabic)</Label>
                    <Textarea
                      value={demandLetter.senderAddressAr}
                      onChange={(e) => setDemandLetter({ ...demandLetter, senderAddressAr: e.target.value })}
                      placeholder="123 الشارع الرئيسي، دبي، الإمارات"
                      dir="rtl"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label>Recipient Name (English)</Label>
                    <Input
                      value={demandLetter.recipientName}
                      onChange={(e) => setDemandLetter({ ...demandLetter, recipientName: e.target.value })}
                      placeholder="Jane Doe"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label>Recipient Name (Arabic)</Label>
                    <Input
                      value={demandLetter.recipientNameAr}
                      onChange={(e) => setDemandLetter({ ...demandLetter, recipientNameAr: e.target.value })}
                      placeholder="جين دو"
                      dir="rtl"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label>Recipient Address (English)</Label>
                    <Textarea
                      value={demandLetter.recipientAddress}
                      onChange={(e) => setDemandLetter({ ...demandLetter, recipientAddress: e.target.value })}
                      placeholder="456 Oak Avenue, Dubai, UAE"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label>Recipient Address (Arabic)</Label>
                    <Textarea
                      value={demandLetter.recipientAddressAr}
                      onChange={(e) => setDemandLetter({ ...demandLetter, recipientAddressAr: e.target.value })}
                      placeholder="456 شارع البلوط، دبي، الإمارات"
                      dir="rtl"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label>Property Address (English)</Label>
                    <Input
                      value={demandLetter.propertyAddress}
                      onChange={(e) => setDemandLetter({ ...demandLetter, propertyAddress: e.target.value })}
                      placeholder="Apartment 101, Building A"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label>Property Address (Arabic)</Label>
                    <Input
                      value={demandLetter.propertyAddressAr}
                      onChange={(e) => setDemandLetter({ ...demandLetter, propertyAddressAr: e.target.value })}
                      placeholder="شقة 101، مبنى أ"
                      dir="rtl"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label>Amount Owed (AED)</Label>
                    <Input
                      type="number"
                      value={demandLetter.amountOwed}
                      onChange={(e) => setDemandLetter({ ...demandLetter, amountOwed: Number(e.target.value) })}
                      placeholder="50000"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label>Due Date</Label>
                    <Input
                      type="date"
                      value={demandLetter.dueDate}
                      onChange={(e) => setDemandLetter({ ...demandLetter, dueDate: e.target.value })}
                    />
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label>Details (English)</Label>
                    <Textarea
                      value={demandLetter.details}
                      onChange={(e) => setDemandLetter({ ...demandLetter, details: e.target.value })}
                      placeholder="Outstanding rent for months of January, February, and March 2024..."
                      rows={4}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label>Details (Arabic)</Label>
                    <Textarea
                      value={demandLetter.detailsAr}
                      onChange={(e) => setDemandLetter({ ...demandLetter, detailsAr: e.target.value })}
                      placeholder="الإيجار المستحق لأشهر يناير وفبراير ومارس 2024..."
                      dir="rtl"
                      rows={4}
                    />
                  </div>
                </div>

                <Button
                  onClick={() => demandLetterMutation.mutate(demandLetter)}
                  disabled={demandLetterMutation.isPending}
                  className="w-full"
                >
                  {demandLetterMutation.isPending ? (
                    <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                  ) : (
                    <FileText className="h-4 w-4 mr-2" />
                  )}
                  Generate Demand Letter
                </Button>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Eviction Notice Tab */}
          <TabsContent value="eviction">
            <Card>
              <CardHeader>
                <CardTitle>Eviction Notice</CardTitle>
                <CardDescription>
                  Generate a formal eviction notice in accordance with Dubai Law 26/2007
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label>Landlord Name (English)</Label>
                    <Input
                      value={evictionNotice.landlordName}
                      onChange={(e) => setEvictionNotice({ ...evictionNotice, landlordName: e.target.value })}
                      placeholder="Property Owner LLC"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label>Landlord Name (Arabic)</Label>
                    <Input
                      value={evictionNotice.landlordNameAr}
                      onChange={(e) => setEvictionNotice({ ...evictionNotice, landlordNameAr: e.target.value })}
                      placeholder="شركة مالك العقار"
                      dir="rtl"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label>Landlord Address (English)</Label>
                    <Textarea
                      value={evictionNotice.landlordAddress}
                      onChange={(e) => setEvictionNotice({ ...evictionNotice, landlordAddress: e.target.value })}
                      placeholder="123 Main Street, Dubai, UAE"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label>Landlord Address (Arabic)</Label>
                    <Textarea
                      value={evictionNotice.landlordAddressAr}
                      onChange={(e) => setEvictionNotice({ ...evictionNotice, landlordAddressAr: e.target.value })}
                      placeholder="123 الشارع الرئيسي، دبي، الإمارات"
                      dir="rtl"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label>Tenant Name (English)</Label>
                    <Input
                      value={evictionNotice.tenantName}
                      onChange={(e) => setEvictionNotice({ ...evictionNotice, tenantName: e.target.value })}
                      placeholder="Tenant Name"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label>Tenant Name (Arabic)</Label>
                    <Input
                      value={evictionNotice.tenantNameAr}
                      onChange={(e) => setEvictionNotice({ ...evictionNotice, tenantNameAr: e.target.value })}
                      placeholder="اسم المستأجر"
                      dir="rtl"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label>Tenant Address (English)</Label>
                    <Textarea
                      value={evictionNotice.tenantAddress}
                      onChange={(e) => setEvictionNotice({ ...evictionNotice, tenantAddress: e.target.value })}
                      placeholder="456 Oak Avenue, Dubai, UAE"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label>Tenant Address (Arabic)</Label>
                    <Textarea
                      value={evictionNotice.tenantAddressAr}
                      onChange={(e) => setEvictionNotice({ ...evictionNotice, tenantAddressAr: e.target.value })}
                      placeholder="456 شارع البلوط، دبي، الإمارات"
                      dir="rtl"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label>Property Address (English)</Label>
                    <Input
                      value={evictionNotice.propertyAddress}
                      onChange={(e) => setEvictionNotice({ ...evictionNotice, propertyAddress: e.target.value })}
                      placeholder="Apartment 101, Building A"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label>Property Address (Arabic)</Label>
                    <Input
                      value={evictionNotice.propertyAddressAr}
                      onChange={(e) => setEvictionNotice({ ...evictionNotice, propertyAddressAr: e.target.value })}
                      placeholder="شقة 101، مبنى أ"
                      dir="rtl"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label>Notice Date</Label>
                    <Input
                      type="date"
                      value={evictionNotice.noticeDate}
                      onChange={(e) => setEvictionNotice({ ...evictionNotice, noticeDate: e.target.value })}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label>Vacate Date</Label>
                    <Input
                      type="date"
                      value={evictionNotice.vacateDate}
                      onChange={(e) => setEvictionNotice({ ...evictionNotice, vacateDate: e.target.value })}
                    />
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label>Eviction Reason (English)</Label>
                    <Textarea
                      value={evictionNotice.evictionReason}
                      onChange={(e) => setEvictionNotice({ ...evictionNotice, evictionReason: e.target.value })}
                      placeholder="Non-payment of rent for three consecutive months..."
                      rows={3}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label>Eviction Reason (Arabic)</Label>
                    <Textarea
                      value={evictionNotice.evictionReasonAr}
                      onChange={(e) => setEvictionNotice({ ...evictionNotice, evictionReasonAr: e.target.value })}
                      placeholder="عدم دفع الإيجار لمدة ثلاثة أشهر متتالية..."
                      dir="rtl"
                      rows={3}
                    />
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label>Legal Basis (English)</Label>
                    <Textarea
                      value={evictionNotice.legalBasis}
                      onChange={(e) => setEvictionNotice({ ...evictionNotice, legalBasis: e.target.value })}
                      placeholder="Article 25(1)(a) of Dubai Law No. 26 of 2007..."
                      rows={3}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label>Legal Basis (Arabic)</Label>
                    <Textarea
                      value={evictionNotice.legalBasisAr}
                      onChange={(e) => setEvictionNotice({ ...evictionNotice, legalBasisAr: e.target.value })}
                      placeholder="المادة 25(1)(أ) من القانون رقم 26 لسنة 2007..."
                      dir="rtl"
                      rows={3}
                    />
                  </div>
                </div>

                <Button
                  onClick={() => evictionNoticeMutation.mutate(evictionNotice)}
                  disabled={evictionNoticeMutation.isPending}
                  className="w-full"
                >
                  {evictionNoticeMutation.isPending ? (
                    <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                  ) : (
                    <FileText className="h-4 w-4 mr-2" />
                  )}
                  Generate Eviction Notice
                </Button>
              </CardContent>
            </Card>
          </TabsContent>

          {/* NOC Tab */}
          <TabsContent value="noc">
            <Card>
              <CardHeader>
                <CardTitle>No Objection Certificate (NOC)</CardTitle>
                <CardDescription>
                  Generate a formal No Objection Certificate for property-related matters
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label>Issuer Name (English)</Label>
                    <Input
                      value={noc.issuerName}
                      onChange={(e) => setNOC({ ...noc, issuerName: e.target.value })}
                      placeholder="Ahmed Al Maktoum"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label>Issuer Name (Arabic)</Label>
                    <Input
                      value={noc.issuerNameAr}
                      onChange={(e) => setNOC({ ...noc, issuerNameAr: e.target.value })}
                      placeholder="أحمد المكتوم"
                      dir="rtl"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label>Issuer Title (English)</Label>
                    <Input
                      value={noc.issuerTitle}
                      onChange={(e) => setNOC({ ...noc, issuerTitle: e.target.value })}
                      placeholder="Property Manager"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label>Issuer Title (Arabic)</Label>
                    <Input
                      value={noc.issuerTitleAr}
                      onChange={(e) => setNOC({ ...noc, issuerTitleAr: e.target.value })}
                      placeholder="مدير العقارات"
                      dir="rtl"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label>Issuer Company (English)</Label>
                    <Input
                      value={noc.issuerCompany}
                      onChange={(e) => setNOC({ ...noc, issuerCompany: e.target.value })}
                      placeholder="SANZEN Legal Consultant"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label>Issuer Company (Arabic)</Label>
                    <Input
                      value={noc.issuerCompanyAr}
                      onChange={(e) => setNOC({ ...noc, issuerCompanyAr: e.target.value })}
                      placeholder="مستشار باريس جروب القانوني"
                      dir="rtl"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label>Recipient Name (English)</Label>
                    <Input
                      value={noc.recipientName}
                      onChange={(e) => setNOC({ ...noc, recipientName: e.target.value })}
                      placeholder="John Smith"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label>Recipient Name (Arabic)</Label>
                    <Input
                      value={noc.recipientNameAr}
                      onChange={(e) => setNOC({ ...noc, recipientNameAr: e.target.value })}
                      placeholder="جون سميث"
                      dir="rtl"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label>Property Address (English)</Label>
                    <Input
                      value={noc.propertyAddress}
                      onChange={(e) => setNOC({ ...noc, propertyAddress: e.target.value })}
                      placeholder="Apartment 101, Building A"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label>Property Address (Arabic)</Label>
                    <Input
                      value={noc.propertyAddressAr}
                      onChange={(e) => setNOC({ ...noc, propertyAddressAr: e.target.value })}
                      placeholder="شقة 101، مبنى أ"
                      dir="rtl"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label>Purpose (English)</Label>
                    <Textarea
                      value={noc.purpose}
                      onChange={(e) => setNOC({ ...noc, purpose: e.target.value })}
                      placeholder="Renovation of the property including kitchen and bathroom upgrades..."
                      rows={3}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label>Purpose (Arabic)</Label>
                    <Textarea
                      value={noc.purposeAr}
                      onChange={(e) => setNOC({ ...noc, purposeAr: e.target.value })}
                      placeholder="تجديد العقار بما في ذلك ترقية المطبخ والحمام..."
                      dir="rtl"
                      rows={3}
                    />
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label>Conditions (English)</Label>
                    <Textarea
                      value={noc.conditions}
                      onChange={(e) => setNOC({ ...noc, conditions: e.target.value })}
                      placeholder="All work must be completed by licensed contractors..."
                      rows={3}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label>Conditions (Arabic)</Label>
                    <Textarea
                      value={noc.conditionsAr}
                      onChange={(e) => setNOC({ ...noc, conditionsAr: e.target.value })}
                      placeholder="يجب إتمام جميع الأعمال من قبل مقاولين مرخصين..."
                      dir="rtl"
                      rows={3}
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label>Issue Date</Label>
                  <Input
                    type="date"
                    value={noc.issueDate}
                    onChange={(e) => setNOC({ ...noc, issueDate: e.target.value })}
                  />
                </div>

                <Button
                  onClick={() => nocMutation.mutate(noc)}
                  disabled={nocMutation.isPending}
                  className="w-full"
                >
                  {nocMutation.isPending ? (
                    <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                  ) : (
                    <FileText className="h-4 w-4 mr-2" />
                  )}
                  Generate NOC
                </Button>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </DashboardLayout>
  );
}
