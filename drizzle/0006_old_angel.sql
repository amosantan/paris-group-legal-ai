ALTER TABLE `legalKnowledge` ADD `legalConcepts` text;--> statement-breakpoint
ALTER TABLE `legalKnowledge` ADD `relatedArticles` text;--> statement-breakpoint
ALTER TABLE `legalKnowledge` ADD `importance` int DEFAULT 5;--> statement-breakpoint
ALTER TABLE `legalKnowledge` ADD `applicableScenarios` text;--> statement-breakpoint
ALTER TABLE `legalKnowledge` ADD `searchKeywords` text;