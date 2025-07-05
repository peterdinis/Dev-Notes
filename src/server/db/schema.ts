import { sql } from "drizzle-orm";
import { relations } from "drizzle-orm";
import { sqliteTableCreator } from "drizzle-orm/sqlite-core";

export const createTable = sqliteTableCreator((name) => `dev-notes_${name}`);

export const users = createTable("users", (d) => ({
	id: d.text().primaryKey(),
	name: d.text({ length: 256 }),
	email: d.text({ length: 256 }).unique(),
	password: d.text({ length: 256 }),
	createdAt: d
		.integer({ mode: "timestamp" })
		.default(sql`(unixepoch())`)
		.notNull(),
	updatedAt: d.integer({ mode: "timestamp" }).$onUpdate(() => new Date()),
}));
 
export const sessions = createTable("sessions", (d) => ({
	id: d.text().primaryKey(),
	userId: d
		.text()
		.notNull()
		.references(() => users.id),
	expiresAt: d.integer({ mode: "number" }).notNull(),
}));

export const chats = createTable("chats", (d) => ({
	id: d.text().primaryKey(),
	userId: d.text().notNull().references(() => users.id),
	workspaceId: d.text().references(() => workspaces.id),
	title: d.text({ length: 256 }),
	createdAt: d.integer({ mode: "timestamp" }).default(sql`(unixepoch())`).notNull(),
}));

export const workspaces = createTable("workspaces", (d) => ({
	id: d.text().primaryKey(),
	name: d.text({ length: 256 }).notNull(),
	ownerId: d.text().notNull().references(() => users.id),
	createdAt: d.integer({ mode: "timestamp" }).default(sql`(unixepoch())`).notNull(),
}));

export const chatMessages = createTable("chat_messages", (d) => ({
	id: d.text().primaryKey(),
	chatId: d.text().notNull().references(() => chats.id),
	role: d.text({ enum: ['user', 'assistant'] }).notNull(),
	content: d.text().notNull(),
	createdAt: d.integer({ mode: "timestamp" }).default(sql`(unixepoch())`).notNull(),
}));


export const notes = createTable("notes", (d) => ({
	id: d.text().primaryKey(),
	userId: d.text().notNull().references(() => users.id),
	workspaceId: d.text().references(() => workspaces.id),
	title: d.text({ length: 256 }),
	content: d.text(),
	createdAt: d.integer({ mode: "timestamp" }).default(sql`(unixepoch())`).notNull(),
	updatedAt: d.integer({ mode: "timestamp" }).$onUpdate(() => new Date()),
}));

export const workspaceMembers = createTable("workspace_members", (d) => ({
	id: d.text().primaryKey(),
	workspaceId: d.text().notNull().references(() => workspaces.id),
	userId: d.text().notNull().references(() => users.id),
	role: d.text({ enum: ['owner', 'editor', 'viewer'] }).notNull(),
	addedAt: d.integer({ mode: "timestamp" }).default(sql`(unixepoch())`).notNull(),
}));

export const diagrams = createTable("diagrams", (d) => ({
	id: d.text().primaryKey(),
	userId: d.text().notNull().references(() => users.id),
	workspaceId: d.text().references(() => workspaces.id),
	title: d.text({ length: 256 }),
	type: d.text({ enum: ['class', 'sequence', 'activity', 'custom'] }).notNull(),
	content: d.text().notNull(), 
	createdAt: d.integer({ mode: "timestamp" }).default(sql`(unixepoch())`).notNull(),
	updatedAt: d.integer({ mode: "timestamp" }).$onUpdate(() => new Date()),
}));

export const events = createTable("events", (d) => ({
	id: d.text().primaryKey(),
	userId: d.text().notNull().references(() => users.id),
	workspaceId: d.text().references(() => workspaces.id),
	title: d.text({ length: 256 }),
	description: d.text(),
	startTime: d.integer({ mode: "timestamp" }).notNull(),
	endTime: d.integer({ mode: "timestamp" }).notNull(),
	createdAt: d.integer({ mode: "timestamp" }).default(sql`(unixepoch())`).notNull(),
}));

// Relations
export const usersRelations = relations(users, ({ many }) => ({
	sessions: many(sessions),
}));

export const sessionsRelations = relations(sessions, ({ one }) => ({
	user: one(users, {
		fields: [sessions.userId],
		references: [users.id],
	}),
}));

export const notesRelations = relations(notes, ({ one }) => ({
	user: one(users, {
		fields: [notes.userId],
		references: [users.id],
	}),
	workspace: one(workspaces, {
		fields: [notes.workspaceId],
		references: [workspaces.id],
	}),
}));

// CHATS
export const chatsRelations = relations(chats, ({ one, many }) => ({
	user: one(users, {
		fields: [chats.userId],
		references: [users.id],
	}),
	workspace: one(workspaces, {
		fields: [chats.workspaceId],
		references: [workspaces.id],
	}),
	messages: many(chatMessages),
}));

export const chatMessagesRelations = relations(chatMessages, ({ one }) => ({
	chat: one(chats, {
		fields: [chatMessages.chatId],
		references: [chats.id],
	}),
}));

// WORKSPACES
export const workspacesRelations = relations(workspaces, ({ one, many }) => ({
	owner: one(users, {
		fields: [workspaces.ownerId],
		references: [users.id],
	}),
	members: many(workspaceMembers),
	notes: many(notes),
	chats: many(chats),
	diagrams: many(diagrams),
	events: many(events),
}));

// WORKSPACE MEMBERS
export const workspaceMembersRelations = relations(workspaceMembers, ({ one }) => ({
	workspace: one(workspaces, {
		fields: [workspaceMembers.workspaceId],
		references: [workspaces.id],
	}),
	user: one(users, {
		fields: [workspaceMembers.userId],
		references: [users.id],
	}),
}));

// DIAGRAMS
export const diagramsRelations = relations(diagrams, ({ one }) => ({
	user: one(users, {
		fields: [diagrams.userId],
		references: [users.id],
	}),
	workspace: one(workspaces, {
		fields: [diagrams.workspaceId],
		references: [workspaces.id],
	}),
}));

// EVENTS
export const eventsRelations = relations(events, ({ one }) => ({
	user: one(users, {
		fields: [events.userId],
		references: [users.id],
	}),
	workspace: one(workspaces, {
		fields: [events.workspaceId],
		references: [workspaces.id],
	}),
}));