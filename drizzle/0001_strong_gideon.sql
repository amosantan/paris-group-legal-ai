CREATE TABLE `consultations` (
	`id` int AUTO_INCREMENT NOT NULL,
	`userId` int NOT NULL,
	`title` varchar(255) NOT NULL,
	`category` enum('rental_dispute','real_estate_transaction','contract_review','general_inquiry') NOT NULL,
	`language` enum('en','ar') NOT NULL DEFAULT 'en',
	`status` enum('active','completed','archived') NOT NULL DEFAULT 'active',
	`createdAt` timestamp NOT NULL DEFAULT (now()),
	`updatedAt` timestamp NOT NULL DEFAULT (now()) ON UPDATE CURRENT_TIMESTAMP,
	CONSTRAINT `consultations_id` PRIMARY KEY(`id`)
);
--> statement-breakpoint
CREATE TABLE `contractReviews` (
	`id` int AUTO_INCREMENT NOT NULL,
	`documentId` int NOT NULL,
	`consultationId` int NOT NULL,
	`userId` int NOT NULL,
	`overallRiskScore` int NOT NULL,
	`summary` text NOT NULL,
	`findings` text NOT NULL,
	`recommendations` text NOT NULL,
	`missingClauses` text,
	`problematicClauses` text,
	`legalReferences` text,
	`language` enum('en','ar') NOT NULL DEFAULT 'en',
	`createdAt` timestamp NOT NULL DEFAULT (now()),
	CONSTRAINT `contractReviews_id` PRIMARY KEY(`id`)
);
--> statement-breakpoint
CREATE TABLE `documents` (
	`id` int AUTO_INCREMENT NOT NULL,
	`consultationId` int NOT NULL,
	`userId` int NOT NULL,
	`filename` varchar(255) NOT NULL,
	`fileKey` varchar(512) NOT NULL,
	`fileUrl` varchar(1024) NOT NULL,
	`mimeType` varchar(100) NOT NULL,
	`fileSize` int NOT NULL,
	`extractedText` text,
	`documentType` enum('contract','lease','agreement','notice','other') NOT NULL DEFAULT 'other',
	`uploadedAt` timestamp NOT NULL DEFAULT (now()),
	CONSTRAINT `documents_id` PRIMARY KEY(`id`)
);
--> statement-breakpoint
CREATE TABLE `legalKnowledge` (
	`id` int AUTO_INCREMENT NOT NULL,
	`lawName` varchar(255) NOT NULL,
	`lawNumber` varchar(100) NOT NULL,
	`articleNumber` varchar(100),
	`titleEn` varchar(500) NOT NULL,
	`titleAr` varchar(500),
	`contentEn` text NOT NULL,
	`contentAr` text,
	`category` enum('rental_law','civil_code','rera_regulation','escrow_law','real_estate_law','other') NOT NULL,
	`keywords` text,
	`createdAt` timestamp NOT NULL DEFAULT (now()),
	`updatedAt` timestamp NOT NULL DEFAULT (now()) ON UPDATE CURRENT_TIMESTAMP,
	CONSTRAINT `legalKnowledge_id` PRIMARY KEY(`id`)
);
--> statement-breakpoint
CREATE TABLE `messages` (
	`id` int AUTO_INCREMENT NOT NULL,
	`consultationId` int NOT NULL,
	`role` enum('user','assistant','system') NOT NULL,
	`content` text NOT NULL,
	`createdAt` timestamp NOT NULL DEFAULT (now()),
	CONSTRAINT `messages_id` PRIMARY KEY(`id`)
);
--> statement-breakpoint
CREATE TABLE `reports` (
	`id` int AUTO_INCREMENT NOT NULL,
	`consultationId` int NOT NULL,
	`userId` int NOT NULL,
	`title` varchar(255) NOT NULL,
	`reportType` enum('consultation_summary','contract_review','legal_analysis','advisory_memo') NOT NULL,
	`content` text NOT NULL,
	`language` enum('en','ar') NOT NULL DEFAULT 'en',
	`pdfUrl` varchar(1024),
	`createdAt` timestamp NOT NULL DEFAULT (now()),
	CONSTRAINT `reports_id` PRIMARY KEY(`id`)
);
