PRAGMA foreign_keys=OFF;--> statement-breakpoint
CREATE TABLE `__new_dev-notes_users` (
	`id` text PRIMARY KEY NOT NULL,
	`first_name` text,
	`last_name` text,
	`email` text,
	`createdAt` integer DEFAULT (unixepoch()) NOT NULL,
	`updatedAt` integer
);
--> statement-breakpoint
INSERT INTO `__new_dev-notes_users`("id", "first_name", "last_name", "email", "createdAt", "updatedAt") SELECT "id", "first_name", "last_name", "email", "createdAt", "updatedAt" FROM `dev-notes_users`;--> statement-breakpoint
DROP TABLE `dev-notes_users`;--> statement-breakpoint
ALTER TABLE `__new_dev-notes_users` RENAME TO `dev-notes_users`;--> statement-breakpoint
PRAGMA foreign_keys=ON;