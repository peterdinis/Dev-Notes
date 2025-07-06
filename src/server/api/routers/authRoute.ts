import { TRPCError } from "@trpc/server";
import bcrypt from "bcryptjs";
import { eq } from "drizzle-orm";
import { cookies } from "next/headers";
import { lucia } from "~/lib/lucia";
import { db } from "~/server/db";
import { users } from "~/server/db/schema";
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
		console.log("User found:", user);
		if (!user) throw new Error("Invalid credentials");

		const valid = await bcrypt.compare(password, user.password!);
		if (!valid) throw new Error("Invalid credentials");

		const session = await lucia.createSession(user.id, {});
		const sessionCookie = lucia.createSessionCookie(session.id);

		console.log("Session created:", session);
		(await cookies()).set(
			sessionCookie.name,
			sessionCookie.value,
			sessionCookie.attributes,
		);

		return { success: true };
	}),

	me: publicProcedure.query(async () => {
		const cookieStore = cookies();

		const sessionCookie = (await cookieStore).get(lucia.sessionCookieName);

		console.log("Session cookie:", sessionCookie);
		const sessionId = sessionCookie?.value ?? null;

		console.log("sessionID", sessionId)
		if (!sessionId) {
			throw new TRPCError({
				code: "UNAUTHORIZED",
				message: "Not authenticated",
			});
		}

		try {
			const { user} = await lucia.validateSession(sessionId);
			if (!user) {
				throw new TRPCError({
					code: "UNAUTHORIZED",
					message: "Invalid session",
				});
			}

			return {
				id: user.id,
				email: user.email,
			};
		} catch (err) {
			throw new TRPCError({
				code: "UNAUTHORIZED",
				message: "Session validation failed",
			});
		}
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
