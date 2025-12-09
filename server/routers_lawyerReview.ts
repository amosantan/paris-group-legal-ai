/**
 * tRPC router for lawyer review operations
 */

import { z } from "zod";
import { publicProcedure, protectedProcedure, router } from "./_core/trpc";
import {
  createLawyerReview,
  getPendingLawyerReviews,
  getLawyerReviews,
  getLawyerReviewById,
  getConsultationReviews,
  updateLawyerReview,
  getReviewsNeedingAttention,
  getReviewStatistics,
  createAuditLog,
  getAuditLogs,
  getEntityAuditLogs,
  getRecentAuditLogs,
  logAIInteraction,
} from "./db_lawyerReviews";
import { TRPCError } from "@trpc/server";

export const lawyerReviewRouter = router({
  /**
   * Get all lawyer reviews with optional filtering
   */
  list: protectedProcedure
    .input(
      z.object({
        status: z.enum(["pending", "approved", "rejected", "needs_revision"]).optional(),
        reviewerId: z.number().optional(),
        consultationId: z.number().optional(),
      }).optional()
    )
    .query(async ({ input }) => {
      const reviews = await getLawyerReviews(input);
      return reviews;
    }),

  /**
   * Get pending reviews (for dashboard badge count)
   */
  pending: protectedProcedure.query(async () => {
    const reviews = await getPendingLawyerReviews();
    return reviews;
  }),

  /**
   * Get reviews needing attention (pending or needs_revision)
   */
  needingAttention: protectedProcedure.query(async () => {
    const reviews = await getReviewsNeedingAttention();
    return reviews;
  }),

  /**
   * Get review by ID
   */
  getById: protectedProcedure
    .input(z.object({ id: z.number() }))
    .query(async ({ input }) => {
      const review = await getLawyerReviewById(input.id);
      if (!review) {
        throw new TRPCError({
          code: "NOT_FOUND",
          message: "Review not found",
        });
      }
      return review;
    }),

  /**
   * Get reviews for a consultation
   */
  byConsultation: protectedProcedure
    .input(z.object({ consultationId: z.number() }))
    .query(async ({ input }) => {
      const reviews = await getConsultationReviews(input.consultationId);
      return reviews;
    }),

  /**
   * Approve a review
   */
  approve: protectedProcedure
    .input(
      z.object({
        reviewId: z.number(),
        reviewNotes: z.string().optional(),
      })
    )
    .mutation(async ({ input, ctx }) => {
      const review = await getLawyerReviewById(input.reviewId);
      if (!review) {
        throw new TRPCError({
          code: "NOT_FOUND",
          message: "Review not found",
        });
      }

      await updateLawyerReview(input.reviewId, {
        status: "approved",
        reviewNotes: input.reviewNotes,
        reviewedAt: new Date(),
      });

      // Log the approval
      await logAIInteraction(
        ctx.user.id,
        ctx.user.name,
        "review_approved",
        "lawyer_review",
        input.reviewId,
        { consultationId: review.consultationId, reviewNotes: input.reviewNotes }
      );

      return { success: true };
    }),

  /**
   * Reject a review with notes
   */
  reject: protectedProcedure
    .input(
      z.object({
        reviewId: z.number(),
        reviewNotes: z.string(),
        revisedContent: z.string().optional(),
      })
    )
    .mutation(async ({ input, ctx }) => {
      const review = await getLawyerReviewById(input.reviewId);
      if (!review) {
        throw new TRPCError({
          code: "NOT_FOUND",
          message: "Review not found",
        });
      }

      await updateLawyerReview(input.reviewId, {
        status: "rejected",
        reviewNotes: input.reviewNotes,
        revisedContent: input.revisedContent,
        reviewedAt: new Date(),
      });

      // Log the rejection
      await logAIInteraction(
        ctx.user.id,
        ctx.user.name,
        "review_rejected",
        "lawyer_review",
        input.reviewId,
        { consultationId: review.consultationId, reviewNotes: input.reviewNotes }
      );

      return { success: true };
    }),

  /**
   * Mark review as needs revision
   */
  needsRevision: protectedProcedure
    .input(
      z.object({
        reviewId: z.number(),
        reviewNotes: z.string(),
        revisedContent: z.string().optional(),
      })
    )
    .mutation(async ({ input, ctx }) => {
      const review = await getLawyerReviewById(input.reviewId);
      if (!review) {
        throw new TRPCError({
          code: "NOT_FOUND",
          message: "Review not found",
        });
      }

      await updateLawyerReview(input.reviewId, {
        status: "needs_revision",
        reviewNotes: input.reviewNotes,
        revisedContent: input.revisedContent,
        reviewedAt: new Date(),
      });

      // Log the action
      await logAIInteraction(
        ctx.user.id,
        ctx.user.name,
        "review_needs_revision",
        "lawyer_review",
        input.reviewId,
        { consultationId: review.consultationId, reviewNotes: input.reviewNotes }
      );

      return { success: true };
    }),

  /**
   * Get review statistics
   */
  statistics: protectedProcedure.query(async () => {
    const stats = await getReviewStatistics();
    return stats;
  }),
});

export const auditLogRouter = router({
  /**
   * Get recent audit logs (for admin dashboard)
   */
  recent: protectedProcedure
    .input(z.object({ limit: z.number().optional() }).optional())
    .query(async ({ input }) => {
      const logs = await getRecentAuditLogs(input?.limit);
      return logs;
    }),

  /**
   * Get audit logs with filtering
   */
  list: protectedProcedure
    .input(
      z.object({
        userId: z.number().optional(),
        action: z.string().optional(),
        entityType: z.string().optional(),
        entityId: z.number().optional(),
        limit: z.number().optional(),
      }).optional()
    )
    .query(async ({ input }) => {
      const logs = await getAuditLogs(input);
      return logs;
    }),

  /**
   * Get audit logs for a specific entity
   */
  byEntity: protectedProcedure
    .input(
      z.object({
        entityType: z.string(),
        entityId: z.number(),
      })
    )
    .query(async ({ input }) => {
      const logs = await getEntityAuditLogs(input.entityType, input.entityId);
      return logs;
    }),
});
