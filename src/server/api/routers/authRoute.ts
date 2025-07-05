import bcrypt from "bcryptjs";
import { eq } from "drizzle-orm";
import { cookies } from "next/headers";
import { z } from "zod";
import { lucia } from "~/lib/lucia";
import { db } from "~/server/db";
import { users } from "~/server/db/schema";
import {
	createTRPCRouter,
	publicProcedure,
} from "../trpc";
import { TRPCError } from "@trpc/server";

const registerSchema = z.object({
	name: z.string().min(2),
	email: z.string().email(),
	password: z.string().min(6),
});

const loginSchema = z.object({
	email: z.string().email(),
	password: z.string(),
});

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
				sessionCookie.attributes
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

		const session = await lucia.createSession(user.id, {});
		const sessionCookie = lucia.createSessionCookie(session.id);
		(await cookies()).set(
			sessionCookie.name,
			sessionCookie.value,
			sessionCookie.attributes
		);

		return { success: true };
	}),

	me: publicProcedure.query(async ({ ctx }) => {
		const cookieStore = cookies();
		const sessionCookie = (await cookieStore).get(lucia.sessionCookieName);

		const sessionId = sessionCookie?.value ?? null;
		const { user } = sessionId
			? await lucia.validateSession(sessionId)
			: { user: null };

	}),

	logout: publicProcedure.mutation(async ({ ctx }) => {
		const sessionId = lucia.readSessionCookie(
			(await cookies()).get(lucia.sessionCookieName)?.value ?? '',
		);

		if (sessionId) {
			await lucia.invalidateSession(sessionId);
		}

		const emptySessionCookie = lucia.createBlankSessionCookie();

		return {
			status: 200,
			headers: {
				'Set-Cookie': emptySessionCookie.serialize(),
			},
		}
	}),
});
