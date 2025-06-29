PRAGMA foreign_keys=OFF;--> statement-breakpoint
CREATE TABLE `__new_dev-notes_sessions` (
	`id` text PRIMARY KEY NOT NULL,
	`userId` text NOT NULL,
	`expiresAt` integer NOT NULL,
	FOREIGN KEY (`userId`) REFERENCES `dev-notes_users`(`id`) ON UPDATE no action ON DELETE no action
);
--> statement-breakpoint
INSERT INTO `__new_dev-notes_sessions`("id", "userId", "expiresAt") SELECT "id", "userId", "expiresAt" FROM `dev-notes_sessions`;--> statement-breakpoint
DROP TABLE `dev-notes_sessions`;--> statement-breakpoint
ALTER TABLE `__new_dev-notes_sessions` RENAME TO `dev-notes_sessions`;--> statement-breakpoint
PRAGMA foreign_keys=ON;--> statement-breakpoint
CREATE TABLE `__new_dev-notes_users` (
	`id` text PRIMARY KEY NOT NULL,
	`name` text(256),
	`email` text(256),
	`password` text(256),
	`createdAt` integer DEFAULT (unixepoch()) NOT NULL,
	`updatedAt` integer
);
--> statement-breakpoint
INSERT INTO `__new_dev-notes_users`("id", "name", "email", "password", "createdAt", "updatedAt") SELECT "id", "name", "email", "password", "createdAt", "updatedAt" FROM `dev-notes_users`;--> statement-breakpoint
DROP TABLE `dev-notes_users`;--> statement-breakpoint
ALTER TABLE `__new_dev-notes_users` RENAME TO `dev-notes_users`;--> statement-breakpoint
CREATE UNIQUE INDEX `dev-notes_users_email_unique` ON `dev-notes_users` (`email`);