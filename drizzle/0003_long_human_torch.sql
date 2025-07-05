CREATE TABLE `dev-notes_chat_messages` (
	`id` text PRIMARY KEY NOT NULL,
	`chatId` text NOT NULL,
	`role` text NOT NULL,
	`content` text NOT NULL,
	`createdAt` integer DEFAULT (unixepoch()) NOT NULL,
	FOREIGN KEY (`chatId`) REFERENCES `dev-notes_chats`(`id`) ON UPDATE no action ON DELETE no action
);
--> statement-breakpoint
CREATE TABLE `dev-notes_chats` (
	`id` text PRIMARY KEY NOT NULL,
	`userId` text NOT NULL,
	`workspaceId` text,
	`title` text(256),
	`createdAt` integer DEFAULT (unixepoch()) NOT NULL,
	FOREIGN KEY (`userId`) REFERENCES `dev-notes_users`(`id`) ON UPDATE no action ON DELETE no action,
	FOREIGN KEY (`workspaceId`) REFERENCES `dev-notes_workspaces`(`id`) ON UPDATE no action ON DELETE no action
);
--> statement-breakpoint
CREATE TABLE `dev-notes_diagrams` (
	`id` text PRIMARY KEY NOT NULL,
	`userId` text NOT NULL,
	`workspaceId` text,
	`title` text(256),
	`type` text NOT NULL,
	`content` text NOT NULL,
	`createdAt` integer DEFAULT (unixepoch()) NOT NULL,
	`updatedAt` integer,
	FOREIGN KEY (`userId`) REFERENCES `dev-notes_users`(`id`) ON UPDATE no action ON DELETE no action,
	FOREIGN KEY (`workspaceId`) REFERENCES `dev-notes_workspaces`(`id`) ON UPDATE no action ON DELETE no action
);
--> statement-breakpoint
CREATE TABLE `dev-notes_events` (
	`id` text PRIMARY KEY NOT NULL,
	`userId` text NOT NULL,
	`workspaceId` text,
	`title` text(256),
	`description` text,
	`startTime` integer NOT NULL,
	`endTime` integer NOT NULL,
	`createdAt` integer DEFAULT (unixepoch()) NOT NULL,
	FOREIGN KEY (`userId`) REFERENCES `dev-notes_users`(`id`) ON UPDATE no action ON DELETE no action,
	FOREIGN KEY (`workspaceId`) REFERENCES `dev-notes_workspaces`(`id`) ON UPDATE no action ON DELETE no action
);
--> statement-breakpoint
CREATE TABLE `dev-notes_notes` (
	`id` text PRIMARY KEY NOT NULL,
	`userId` text NOT NULL,
	`workspaceId` text,
	`title` text(256),
	`content` text,
	`createdAt` integer DEFAULT (unixepoch()) NOT NULL,
	`updatedAt` integer,
	FOREIGN KEY (`userId`) REFERENCES `dev-notes_users`(`id`) ON UPDATE no action ON DELETE no action,
	FOREIGN KEY (`workspaceId`) REFERENCES `dev-notes_workspaces`(`id`) ON UPDATE no action ON DELETE no action
);
--> statement-breakpoint
CREATE TABLE `dev-notes_workspace_members` (
	`id` text PRIMARY KEY NOT NULL,
	`workspaceId` text NOT NULL,
	`userId` text NOT NULL,
	`role` text NOT NULL,
	`addedAt` integer DEFAULT (unixepoch()) NOT NULL,
	FOREIGN KEY (`workspaceId`) REFERENCES `dev-notes_workspaces`(`id`) ON UPDATE no action ON DELETE no action,
	FOREIGN KEY (`userId`) REFERENCES `dev-notes_users`(`id`) ON UPDATE no action ON DELETE no action
);
--> statement-breakpoint
CREATE TABLE `dev-notes_workspaces` (
	`id` text PRIMARY KEY NOT NULL,
	`name` text(256) NOT NULL,
	`ownerId` text NOT NULL,
	`createdAt` integer DEFAULT (unixepoch()) NOT NULL,
	FOREIGN KEY (`ownerId`) REFERENCES `dev-notes_users`(`id`) ON UPDATE no action ON DELETE no action
);
