import { and, eq, ilike, sql } from "drizzle-orm";
import { cookies } from "next/headers";
import { z } from "zod";
import { lucia } from "~/lib/lucia";
import { db } from "~/server/db";
import { notes } from "~/server/db/schema";
import {
	contentSchema,
	noteIdSchema,
	paginationSchema,
	titleSchema,
	workspaceIdSchema,
} from "../schemas/notesSchema";
import { createTRPCRouter, publicProcedure } from "../trpc";

export const noteRouter = createTRPCRouter({
	list: publicProcedure
		.input(
			z
				.object({
					query: z.string().max(100).optional(),
					workspaceId: workspaceIdSchema,
				})
				.merge(paginationSchema),
		)
		.query(async ({ input }) => {
			const sessionCookie = (await cookies()).get(lucia.sessionCookieName);
			const sessionId = sessionCookie?.value ?? null;
			if (!sessionId) throw new Error("Unauthorized");

			const { user } = await lucia.validateSession(sessionId);
			if (!user) throw new Error("Unauthorized");

			const { limit, offset, query, workspaceId } = input;

			const whereClause = and(
				eq(notes.userId, user.id),
				workspaceId ? eq(notes.workspaceId, workspaceId) : undefined,
				query ? ilike(notes.title, `%${query}%`) : undefined,
			);

			const [items, countResult] = await Promise.all([
				db
					.select()
					.from(notes)
					.where(whereClause)
					.orderBy(notes.createdAt)
					.limit(limit)
					.offset(offset),

				db
					.select({ count: sql<number>`COUNT(*)` })
					.from(notes)
					.where(whereClause),
			]);

			const count = Number(countResult[0]?.count ?? 0);

			return {
				items,
				total: count,
			};
		}),

	get: publicProcedure
		.input(z.object({ id: noteIdSchema }))
		.query(async ({ input }) => {
			const sessionCookie = (await cookies()).get(lucia.sessionCookieName);
			const sessionId = sessionCookie?.value ?? null;
			if (!sessionId) throw new Error("Unauthorized");

			const { user } = await lucia.validateSession(sessionId);
			if (!user) throw new Error("Unauthorized");

			const note = await db.query.notes.findFirst({
				where: and(eq(notes.id, input.id), eq(notes.userId, user.id)),
			});

			if (!note) throw new Error("Note not found");
			return note;
		}),

	create: publicProcedure
		.input(
			z.object({
				title: titleSchema,
				content: contentSchema,
				workspaceId: workspaceIdSchema,
			}),
		)
		.mutation(async ({ input }) => {
			const sessionCookie = (await cookies()).get(lucia.sessionCookieName);
			const sessionId = sessionCookie?.value ?? null;
			if (!sessionId) throw new Error("Unauthorized");

			const { user } = await lucia.validateSession(sessionId);
			if (!user) throw new Error("Unauthorized");

			const newNote = {
				id: crypto.randomUUID(),
				userId: user.id,
				title: input.title,
				content: input.content ?? "",
				workspaceId: input.workspaceId ?? null,
			};

			await db.insert(notes).values(newNote);
			return newNote;
		}),

	update: publicProcedure
		.input(
			z.object({
				id: noteIdSchema,
				title: titleSchema.optional(),
				content: contentSchema,
			}),
		)
		.mutation(async ({ input }) => {
			const sessionCookie = (await cookies()).get(lucia.sessionCookieName);
			const sessionId = sessionCookie?.value ?? null;
			if (!sessionId) throw new Error("Unauthorized");

			const { user } = await lucia.validateSession(sessionId);
			if (!user) throw new Error("Unauthorized");

			const updated = await db
				.update(notes)
				.set({
					...(input.title && { title: input.title }),
					...(input.content !== undefined && { content: input.content }),
				})
				.where(and(eq(notes.id, input.id), eq(notes.userId, user.id)))
				.returning();

			if (updated.length === 0)
				throw new Error("Note not found or unauthorized");
			return updated[0];
		}),

	delete: publicProcedure
		.input(z.object({ id: noteIdSchema }))
		.mutation(async ({ input }) => {
			const sessionCookie = (await cookies()).get(lucia.sessionCookieName);
			const sessionId = sessionCookie?.value ?? null;
			if (!sessionId) throw new Error("Unauthorized");

			const { user } = await lucia.validateSession(sessionId);
			if (!user) throw new Error("Unauthorized");

			const deleted = await db
				.delete(notes)
				.where(and(eq(notes.id, input.id), eq(notes.userId, user.id)))
				.returning();

			if (deleted.length === 0)
				throw new Error("Note not found or unauthorized");
			return deleted[0];
		}),
});
