CREATE TABLE `aiResponseMetadata` (
	`id` int AUTO_INCREMENT NOT NULL,
	`messageId` int,
	`consultationId` int,
	`llmProvider` varchar(50) NOT NULL,
	`llmModel` varchar(100),
	`confidenceScore` int NOT NULL,
	`confidenceLevel` enum('very_high','high','medium','low','very_low') NOT NULL,
	`citationCount` int NOT NULL,
	`verifiedCitations` int NOT NULL,
	`groundingScore` int NOT NULL,
	`knowledgeBaseCoverage` int NOT NULL,
	`legalClarityScore` int NOT NULL,
	`queryComplexityScore` int NOT NULL,
	`requiresLawyerReview` int NOT NULL DEFAULT 0,
	`usedArticles` text,
	`warnings` text,
	`createdAt` timestamp NOT NULL DEFAULT (now()),
	CONSTRAINT `aiResponseMetadata_id` PRIMARY KEY(`id`)
);
--> statement-breakpoint
CREATE TABLE `auditLogs` (
	`id` int AUTO_INCREMENT NOT NULL,
	`userId` int NOT NULL,
	`userName` varchar(255),
	`action` varchar(100) NOT NULL,
	`entityType` varchar(50) NOT NULL,
	`entityId` int NOT NULL,
	`details` text,
	`ipAddress` varchar(45),
	`userAgent` varchar(512),
	`timestamp` timestamp NOT NULL DEFAULT (now()),
	CONSTRAINT `auditLogs_id` PRIMARY KEY(`id`)
);
--> statement-breakpoint
CREATE TABLE `lawyerReviews` (
	`id` int AUTO_INCREMENT NOT NULL,
	`consultationId` int,
	`contractReviewId` int,
	`reportId` int,
	`reviewerId` int NOT NULL,
	`reviewerName` varchar(255) NOT NULL,
	`status` enum('pending','approved','rejected','needs_revision') NOT NULL DEFAULT 'pending',
	`reviewNotes` text,
	`originalContent` text NOT NULL,
	`revisedContent` text,
	`confidenceScore` int,
	`reviewedAt` timestamp,
	`createdAt` timestamp NOT NULL DEFAULT (now()),
	CONSTRAINT `lawyerReviews_id` PRIMARY KEY(`id`)
);
