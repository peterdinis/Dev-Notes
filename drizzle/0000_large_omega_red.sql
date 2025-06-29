CREATE TABLE `dev-notes_users` (
	`id` integer PRIMARY KEY AUTOINCREMENT NOT NULL,
	`name` text(256),
	`email` text(256),
	`password` text(256),
	`createdAt` integer DEFAULT (unixepoch()) NOT NULL,
	`updatedAt` integer
);
--> statement-breakpoint
CREATE UNIQUE INDEX `dev-notes_users_email_unique` ON `dev-notes_users` (`email`);