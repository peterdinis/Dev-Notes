CREATE TABLE `dev-notes_sessions` (
	`id` text PRIMARY KEY NOT NULL,
	`userId` integer NOT NULL,
	`expiresAt` integer NOT NULL,
	FOREIGN KEY (`userId`) REFERENCES `dev-notes_users`(`id`) ON UPDATE no action ON DELETE no action
);
