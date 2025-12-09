import { useState } from "react";
import { trpc } from "@/lib/trpc";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { AlertCircle, CheckCircle, XCircle, Clock, FileText, Search } from "lucide-react";
import { toast } from "sonner";
import { ConfidenceIndicator } from "@/components/ConfidenceIndicator";

type ReviewStatus = "pending" | "approved" | "rejected" | "needs_revision";

export default function LawyerReviewDashboard() {
  const [statusFilter, setStatusFilter] = useState<ReviewStatus | "all">("all");
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedReview, setSelectedReview] = useState<number | null>(null);
  const [reviewNotes, setReviewNotes] = useState("");
  const [revisedContent, setRevisedContent] = useState("");
  const [actionType, setActionType] = useState<"approve" | "reject" | "needs_revision" | null>(null);

  // Fetch reviews with filtering
  const { data: reviews, refetch } = trpc.lawyerReview.list.useQuery(
    statusFilter === "all" ? {} : { status: statusFilter }
  );

  // Fetch statistics
  const { data: stats } = trpc.lawyerReview.statistics.useQuery();

  // Mutations
  const approveMutation = trpc.lawyerReview.approve.useMutation({
    onSuccess: () => {
      toast.success("Review approved successfully");
      refetch();
      closeDialog();
    },
    onError: (error) => {
      toast.error(`Failed to approve: ${error.message}`);
    },
  });

  const rejectMutation = trpc.lawyerReview.reject.useMutation({
    onSuccess: () => {
      toast.success("Review rejected successfully");
      refetch();
      closeDialog();
    },
    onError: (error) => {
      toast.error(`Failed to reject: ${error.message}`);
    },
  });

  const needsRevisionMutation = trpc.lawyerReview.needsRevision.useMutation({
    onSuccess: () => {
      toast.success("Review marked as needs revision");
      refetch();
      closeDialog();
    },
    onError: (error) => {
      toast.error(`Failed to update: ${error.message}`);
    },
  });

  const handleAction = () => {
    if (!selectedReview) return;

    if (actionType === "approve") {
      approveMutation.mutate({
        reviewId: selectedReview,
        reviewNotes: reviewNotes || undefined,
      });
    } else if (actionType === "reject") {
      if (!reviewNotes) {
        toast.error("Please provide review notes for rejection");
        return;
      }
      rejectMutation.mutate({
        reviewId: selectedReview,
        reviewNotes,
        revisedContent: revisedContent || undefined,
      });
    } else if (actionType === "needs_revision") {
      if (!reviewNotes) {
        toast.error("Please provide review notes");
        return;
      }
      needsRevisionMutation.mutate({
        reviewId: selectedReview,
        reviewNotes,
        revisedContent: revisedContent || undefined,
      });
    }
  };

  const closeDialog = () => {
    setSelectedReview(null);
    setReviewNotes("");
    setRevisedContent("");
    setActionType(null);
  };

  const openReviewDialog = (reviewId: number, action: "approve" | "reject" | "needs_revision") => {
    setSelectedReview(reviewId);
    setActionType(action);
  };

  const getStatusBadge = (status: ReviewStatus) => {
    const variants = {
      pending: { icon: Clock, variant: "secondary" as const, label: "Pending" },
      approved: { icon: CheckCircle, variant: "default" as const, label: "Approved" },
      rejected: { icon: XCircle, variant: "destructive" as const, label: "Rejected" },
      needs_revision: { icon: AlertCircle, variant: "outline" as const, label: "Needs Revision" },
    };

    const config = variants[status];
    const Icon = config.icon;

    return (
      <Badge variant={config.variant} className="flex items-center gap-1">
        <Icon className="h-3 w-3" />
        {config.label}
      </Badge>
    );
  };

  const filteredReviews = reviews?.filter((review) => {
    if (searchQuery) {
      const query = searchQuery.toLowerCase();
      return (
        review.originalContent.toLowerCase().includes(query) ||
        review.reviewerName.toLowerCase().includes(query) ||
        review.reviewNotes?.toLowerCase().includes(query)
      );
    }
    return true;
  });

  const selectedReviewData = reviews?.find((r) => r.id === selectedReview);

  return (
    <div className="container mx-auto py-8 space-y-6">
      <div>
        <h1 className="text-3xl font-bold">Lawyer Review Dashboard</h1>
        <p className="text-muted-foreground">
          Review AI-generated legal advice flagged for low confidence or requiring human verification
        </p>
      </div>

      {/* Statistics Cards */}
      {stats && (
        <div className="grid gap-4 md:grid-cols-5">
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium">Total Reviews</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stats.total}</div>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium">Pending</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-yellow-600">{stats.pending}</div>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium">Approved</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-green-600">{stats.approved}</div>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium">Rejected</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-red-600">{stats.rejected}</div>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium">Needs Revision</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-orange-600">{stats.needsRevision}</div>
            </CardContent>
          </Card>
        </div>
      )}

      {/* Filters */}
      <Card>
        <CardHeader>
          <CardTitle>Filters</CardTitle>
        </CardHeader>
        <CardContent className="flex gap-4">
          <div className="flex-1">
            <div className="relative">
              <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search reviews..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-9"
              />
            </div>
          </div>
          <Select value={statusFilter} onValueChange={(value) => setStatusFilter(value as ReviewStatus | "all")}>
            <SelectTrigger className="w-[200px]">
              <SelectValue placeholder="Filter by status" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Statuses</SelectItem>
              <SelectItem value="pending">Pending</SelectItem>
              <SelectItem value="approved">Approved</SelectItem>
              <SelectItem value="rejected">Rejected</SelectItem>
              <SelectItem value="needs_revision">Needs Revision</SelectItem>
            </SelectContent>
          </Select>
        </CardContent>
      </Card>

      {/* Reviews List */}
      <div className="space-y-4">
        {filteredReviews && filteredReviews.length === 0 && (
          <Card>
            <CardContent className="py-8 text-center text-muted-foreground">
              No reviews found matching your filters.
            </CardContent>
          </Card>
        )}

        {filteredReviews?.map((review) => (
          <Card key={review.id}>
            <CardHeader>
              <div className="flex items-start justify-between">
                <div className="space-y-1">
                  <CardTitle className="flex items-center gap-2">
                    <FileText className="h-5 w-5" />
                    Review #{review.id}
                    {getStatusBadge(review.status)}
                  </CardTitle>
                  <CardDescription>
                    Created {new Date(review.createdAt).toLocaleDateString()} • 
                    Reviewer: {review.reviewerName}
                    {review.consultationId && ` • Consultation #${review.consultationId}`}
                  </CardDescription>
                </div>
                {review.confidenceScore !== null && (
                  <ConfidenceIndicator 
                    score={review.confidenceScore} 
                    level={
                      review.confidenceScore >= 90 ? "very_high" :
                      review.confidenceScore >= 80 ? "high" :
                      review.confidenceScore >= 70 ? "medium" :
                      review.confidenceScore >= 60 ? "low" : "very_low"
                    }
                  />
                )}
              </div>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <h4 className="font-semibold mb-2">Original AI Response:</h4>
                <div className="bg-muted p-4 rounded-md text-sm max-h-40 overflow-y-auto">
                  {review.originalContent}
                </div>
              </div>

              {review.reviewNotes && (
                <div>
                  <h4 className="font-semibold mb-2">Review Notes:</h4>
                  <div className="bg-muted p-4 rounded-md text-sm">
                    {review.reviewNotes}
                  </div>
                </div>
              )}

              {review.revisedContent && (
                <div>
                  <h4 className="font-semibold mb-2">Revised Content:</h4>
                  <div className="bg-green-50 dark:bg-green-950 p-4 rounded-md text-sm">
                    {review.revisedContent}
                  </div>
                </div>
              )}

              {review.status === "pending" && (
                <div className="flex gap-2 pt-2">
                  <Button
                    onClick={() => openReviewDialog(review.id, "approve")}
                    variant="default"
                    size="sm"
                  >
                    <CheckCircle className="h-4 w-4 mr-1" />
                    Approve
                  </Button>
                  <Button
                    onClick={() => openReviewDialog(review.id, "needs_revision")}
                    variant="outline"
                    size="sm"
                  >
                    <AlertCircle className="h-4 w-4 mr-1" />
                    Needs Revision
                  </Button>
                  <Button
                    onClick={() => openReviewDialog(review.id, "reject")}
                    variant="destructive"
                    size="sm"
                  >
                    <XCircle className="h-4 w-4 mr-1" />
                    Reject
                  </Button>
                </div>
              )}
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Review Action Dialog */}
      <Dialog open={selectedReview !== null} onOpenChange={(open) => !open && closeDialog()}>
        <DialogContent className="max-w-2xl max-h-[80vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>
              {actionType === "approve" && "Approve Review"}
              {actionType === "reject" && "Reject Review"}
              {actionType === "needs_revision" && "Mark as Needs Revision"}
            </DialogTitle>
            <DialogDescription>
              {actionType === "approve" && "Confirm that this AI response is accurate and appropriate."}
              {actionType === "reject" && "Provide detailed notes explaining why this response is rejected."}
              {actionType === "needs_revision" && "Provide guidance for improving this response."}
            </DialogDescription>
          </DialogHeader>

          {selectedReviewData && (
            <div className="space-y-4">
              <div>
                <h4 className="font-semibold mb-2">Original AI Response:</h4>
                <div className="bg-muted p-4 rounded-md text-sm max-h-40 overflow-y-auto">
                  {selectedReviewData.originalContent}
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium mb-2">
                  Review Notes {actionType !== "approve" && <span className="text-red-500">*</span>}
                </label>
                <Textarea
                  value={reviewNotes}
                  onChange={(e) => setReviewNotes(e.target.value)}
                  placeholder={
                    actionType === "approve"
                      ? "Optional: Add any notes about this approval..."
                      : "Explain the issues with this response..."
                  }
                  rows={4}
                />
              </div>

              {(actionType === "reject" || actionType === "needs_revision") && (
                <div>
                  <label className="block text-sm font-medium mb-2">
                    Revised Content (Optional)
                  </label>
                  <Textarea
                    value={revisedContent}
                    onChange={(e) => setRevisedContent(e.target.value)}
                    placeholder="Provide a corrected version of the response..."
                    rows={6}
                  />
                </div>
              )}
            </div>
          )}

          <DialogFooter>
            <Button variant="outline" onClick={closeDialog}>
              Cancel
            </Button>
            <Button
              onClick={handleAction}
              disabled={
                approveMutation.isPending ||
                rejectMutation.isPending ||
                needsRevisionMutation.isPending
              }
            >
              {approveMutation.isPending || rejectMutation.isPending || needsRevisionMutation.isPending
                ? "Processing..."
                : "Confirm"}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
