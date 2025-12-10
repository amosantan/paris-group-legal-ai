CREATE TABLE `articleAnalytics` (
	`id` int AUTO_INCREMENT NOT NULL,
	`articleId` int NOT NULL,
	`timesRetrieved` int NOT NULL DEFAULT 1,
	`timesClicked` int NOT NULL DEFAULT 0,
	`avgRelevanceScore` int,
	`lastRetrieved` timestamp NOT NULL DEFAULT (now()),
	`createdAt` timestamp NOT NULL DEFAULT (now()),
	CONSTRAINT `articleAnalytics_id` PRIMARY KEY(`id`)
);
--> statement-breakpoint
CREATE TABLE `queryAnalytics` (
	`id` int AUTO_INCREMENT NOT NULL,
	`query` text NOT NULL,
	`language` enum('en','ar') NOT NULL,
	`category` varchar(100),
	`resultsCount` int NOT NULL,
	`responseTime` int NOT NULL,
	`confidenceScore` int,
	`wasHelpful` int,
	`userId` int,
	`consultationId` int,
	`searchMethod` varchar(50) NOT NULL DEFAULT 'hybrid',
	`timestamp` timestamp NOT NULL DEFAULT (now()),
	CONSTRAINT `queryAnalytics_id` PRIMARY KEY(`id`)
);
