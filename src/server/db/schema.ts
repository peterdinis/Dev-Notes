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
