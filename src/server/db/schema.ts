import { sql } from "drizzle-orm";
import { sqliteTableCreator } from "drizzle-orm/sqlite-core";

/**
 * This is an example of how to use the multi-project schema feature of Drizzle ORM. Use the same
 * database instance for multiple projects.
 *
 * @see https://orm.drizzle.team/docs/goodies#multi-project-schema
 */
export const createTable = sqliteTableCreator((name) => `dev-notes_${name}`);


export const users = createTable("users", (d) => ({
	id: d.integer({ mode: "number" }).primaryKey({ autoIncrement: true }),
	name: d.text({ length: 256 }),
	email: d.text({ length: 256 }).unique(),
	password: d.text({ length: 256 }),
	createdAt: d
		.integer({ mode: "timestamp" })
		.default(sql`(unixepoch())`)
		.notNull(),
	updatedAt: d.integer({ mode: "timestamp" }).$onUpdate(() => new Date()),
}))