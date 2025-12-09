CREATE TABLE `savedSearches` (
	`id` int AUTO_INCREMENT NOT NULL,
	`userId` int NOT NULL,
	`name` varchar(255) NOT NULL,
	`query` varchar(500),
	`categories` text,
	`dateFrom` varchar(50),
	`dateTo` varchar(50),
	`language` enum('en','ar') NOT NULL DEFAULT 'en',
	`createdAt` timestamp NOT NULL DEFAULT (now()),
	`lastUsed` timestamp NOT NULL DEFAULT (now()),
	CONSTRAINT `savedSearches_id` PRIMARY KEY(`id`)
);
