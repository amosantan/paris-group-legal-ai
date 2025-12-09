CREATE TABLE `bookmarks` (
	`id` int AUTO_INCREMENT NOT NULL,
	`userId` int NOT NULL,
	`articleId` varchar(255) NOT NULL,
	`notes` text,
	`createdAt` timestamp NOT NULL DEFAULT (now()),
	CONSTRAINT `bookmarks_id` PRIMARY KEY(`id`)
);
