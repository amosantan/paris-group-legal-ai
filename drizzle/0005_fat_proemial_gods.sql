ALTER TABLE `legalKnowledge` MODIFY COLUMN `category` enum('rental_law','civil_code','rera_regulation','escrow_law','real_estate_law','labor_law','commercial_law','difc_law','other') NOT NULL;--> statement-breakpoint
ALTER TABLE `legalKnowledge` ADD `sourceType` enum('manual','pdf_upload','pdf_url') DEFAULT 'manual' NOT NULL;--> statement-breakpoint
ALTER TABLE `legalKnowledge` ADD `sourceUrl` varchar(1024);--> statement-breakpoint
ALTER TABLE `legalKnowledge` ADD `sourceFileName` varchar(255);--> statement-breakpoint
ALTER TABLE `legalKnowledge` ADD `chunkIndex` int;--> statement-breakpoint
ALTER TABLE `legalKnowledge` ADD `totalChunks` int;--> statement-breakpoint
ALTER TABLE `legalKnowledge` ADD `pageNumber` int;