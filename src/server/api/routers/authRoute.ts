import { TRPCError } from "@trpc/server";
import bcrypt from "bcryptjs";
import { eq } from "drizzle-orm";
import { cookies } from "next/headers";
import { lucia } from "~/lib/lucia";
import { db } from "~/server/db";
import { users, sessions } from "~/server/db/schema";
import { loginSchema, registerSchema } from "../schemas/authSchema";
import { createTRPCRouter, publicProcedure } from "../trpc";

export const authRouter = createTRPCRouter({
	register: publicProcedure
		.input(registerSchema)
		.mutation(async ({ input }) => {
			const { name, email, password } = input;

			const existing = await db.query.users.findFirst({
				where: eq(users.email, email),
			});
			if (existing) throw new Error("Email already in use.");

			const hashedPassword = await bcrypt.hash(password, 10);

			const userId = crypto.randomUUID();

			await db.insert(users).values({
				id: userId,
				name,
				email,
				password: hashedPassword,
			});

			// Create session
			const session = await lucia.createSession(userId, {});
			const sessionCookie = lucia.createSessionCookie(session.id);
			(await cookies()).set(
				sessionCookie.name,
				sessionCookie.value,
				sessionCookie.attributes,
			);

			return { success: true };
		}),

	login: publicProcedure.input(loginSchema).mutation(async ({ input }) => {
		const { email, password } = input;

		const user = await db.query.users.findFirst({
			where: eq(users.email, email),
		});

		if (!user) throw new Error("Invalid credentials");

		const valid = await bcrypt.compare(password, user.password!);
		if (!valid) throw new Error("Invalid credentials");

		// Create session via Lucia
		const session = await lucia.createSession(user.id, {});

		// Decide session expiry, e.g., 24 hours from now
		const expiresAt = Math.floor(Date.now() / 1000) + 60 * 60 * 24;

		// Insert session in Drizzle sessions table
		await db.insert(sessions).values({
			id: session.id,
			userId: user.id,
			expiresAt,
		});

		// Create session cookie
		const sessionCookie = lucia.createSessionCookie(session.id);

		(await cookies()).set(
			sessionCookie.name,
			sessionCookie.value,
			sessionCookie.attributes,
		);

		return { success: true };
	}),

	me: publicProcedure.query(async () => {
		const cookieStore = await cookies();
		const sessionCookie = cookieStore.get(lucia.sessionCookieName);

		if (!sessionCookie) {
			throw new TRPCError({
				code: "UNAUTHORIZED",
				message: "Not authenticated",
			});
		}

		const sessionId = sessionCookie.value;

		// Find session row in DB
		const session = await db.query.sessions.findFirst({
			where: eq(sessions.id, sessionId),
		});

		if (!session) {
			throw new TRPCError({
				code: "UNAUTHORIZED",
				message: "Session not found",
			});
		}

		const now = Math.floor(Date.now() / 1000);

		if (session.expiresAt < now) {
			throw new TRPCError({
				code: "UNAUTHORIZED",
				message: "Session expired",
			});
		}

		// Find user by session.userId
		const user = await db.query.users.findFirst({
			where: eq(users.id, session.userId),
		});

		if (!user) {
			throw new TRPCError({
				code: "UNAUTHORIZED",
				message: "User not found",
			});
		}

		// Return user info safely
		return {
			id: user.id,
			email: user.email,
			name: user.name,
		};
	}),

	logout: publicProcedure.mutation(async () => {
		const sessionCookie = (await cookies()).get(lucia.sessionCookieName);
		const sessionId = sessionCookie?.value ?? "";

		if (sessionId) {
			await lucia.invalidateSession(sessionId);
		}
		const emptySessionCookie = lucia.createBlankSessionCookie();
		return {
			success: true,
			emptySessionCookie: emptySessionCookie.serialize(),
		};
	}),
});
