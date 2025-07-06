import { DrizzleSQLiteAdapter } from "@lucia-auth/adapter-drizzle";
import { Lucia } from "lucia";
import { db } from "~/server/db";
import { sessions, users } from "~/server/db/schema";

export const lucia = new Lucia(new DrizzleSQLiteAdapter(db, sessions, users), {
	sessionCookie: {
      name: "auth_session",
      attributes: {
        secure: process.env.NODE_ENV === "production",
        sameSite: "lax",
        path: "/"
      }
    },
	getUserAttributes: (data) => {
		return {
			email: data.email,
		};
	},
});

// Lucia type augmentation
declare module "lucia" {
	interface Register {
		Lucia: typeof lucia;
		DatabaseUserAttributes: {
			email: string;
		};
	}
}
