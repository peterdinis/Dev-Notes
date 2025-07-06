import { z } from "zod";
import { eq, ilike, and } from "drizzle-orm";
import { db } from "~/server/db";
import { notes } from "~/server/db/schema";
import { createTRPCRouter, publicProcedure } from "../trpc";

export const noteRouter = createTRPCRouter({
  // Get all notes (with pagination & search)
  list: publicProcedure
    .input(
      z.object({
        workspaceId: z.string().optional(),
        query: z.string().optional(),
        limit: z.number().min(1).max(100).default(10),
        offset: z.number().min(0).default(0),
      })
    )
    .query(async ({ input, ctx }) => {
      const { limit, offset, query, workspaceId } = input;

      const whereClause = and(
        eq(notes.userId, ctx.session.user.id),
        workspaceId ? eq(notes.workspaceId, workspaceId) : undefined,
        query ? ilike(notes.title, `%${query}%`) : undefined
      );

      const [items, count] = await Promise.all([
        db
          .select()
          .from(notes)
          .where(whereClause)
          .orderBy(notes.createdAt)
          .limit(limit)
          .offset(offset),
        db
          .select({ count: db.fn.count() })
          .from(notes)
          .where(whereClause)
          .then(res => Number(res[0]?.count ?? 0)),
      ]);

      return {
        items,
        total: count,
      };
    }),

  // Get a single note
  get: publicProcedure
    .input(z.object({ id: z.string() }))
    .query(async ({ input, ctx }) => {
      const note = await db.query.notes.findFirst({
        where: and(
          eq(notes.id, input.id),
          eq(notes.userId, ctx.session.user.id)
        ),
      });

      if (!note) throw new Error("Note not found");
      return note;
    }),

  // Create a new note
  create: publicProcedure
    .input(
      z.object({
        title: z.string().min(1),
        content: z.string().optional(),
        workspaceId: z.string().optional(),
      })
    )
    .mutation(async ({ input, ctx }) => {
      const newNote = {
        id: crypto.randomUUID(),
        userId: ctx.session.user.id,
        title: input.title,
        content: input.content ?? "",
        workspaceId: input.workspaceId ?? null,
        createdAt: Math.floor(Date.now() / 1000),
        updatedAt: Math.floor(Date.now() / 1000),
      };

      await db.insert(notes).values(newNote);
      return newNote;
    }),

  // Update a note
  update: publicProcedure
    .input(
      z.object({
        id: z.string(),
        title: z.string().optional(),
        content: z.string().optional(),
      })
    )
    .mutation(async ({ input, ctx }) => {
      const updated = await db
        .update(notes)
        .set({
          ...(input.title && { title: input.title }),
          ...(input.content && { content: input.content }),
          updatedAt: Math.floor(Date.now() / 1000),
        })
        .where(and(eq(notes.id, input.id), eq(notes.userId, ctx.session.user.id)))
        .returning();

      if (updated.length === 0) throw new Error("Note not found or unauthorized");
      return updated[0];
    }),

  // Delete a note
  delete: publicProcedure
    .input(z.object({ id: z.string() }))
    .mutation(async ({ input, ctx }) => {
      const deleted = await db
        .delete(notes)
        .where(and(eq(notes.id, input.id), eq(notes.userId, ctx.session.user.id)))
        .returning();

      if (deleted.length === 0) throw new Error("Note not found or unauthorized");
      return deleted[0];
    }),
});
