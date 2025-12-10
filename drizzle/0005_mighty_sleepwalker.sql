CREATE TABLE `audit_logs` (
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
	CONSTRAINT `audit_logs_id` PRIMARY KEY(`id`)
);
--> statement-breakpoint
CREATE TABLE `terms_acceptance` (
	`id` int AUTO_INCREMENT NOT NULL,
	`userId` int NOT NULL,
	`acceptedAt` timestamp NOT NULL,
	`ipAddress` varchar(45),
	`userAgent` text,
	`termsVersion` varchar(10) NOT NULL DEFAULT '1.0',
	CONSTRAINT `terms_acceptance_id` PRIMARY KEY(`id`)
);
--> statement-breakpoint
DROP TABLE `auditLogs`;