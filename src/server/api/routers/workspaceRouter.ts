import { workspaces} from "~/server/db/schema";
import {
  createWorkspaceSchema,
  getAllWorkspacesSchema,
  getWorkspaceByIdSchema,
  updateWorkspaceSchema,
  deleteWorkspaceSchema,
} from "../schemas/workspaceSchema";
import { createTRPCRouter, publicProcedure } from "../trpc";
import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server";
import { and, eq, ilike, sql } from "drizzle-orm";

async function getValidatedUser(ctx: any) {
  const { getUser } = getKindeServerSession();
  const user = await getUser();
  if (!user?.id) throw new Error("Unauthorized");

  const dbUser = await ctx.db.query.users.findFirst({
    where: (u: { id: number; }, { eq }: any) => eq(u.id, user.id),
  });

  if (!dbUser) throw new Error("User not found in database");

  return dbUser;
}

export const workspaceRouter = createTRPCRouter({
  create: publicProcedure
    .input(createWorkspaceSchema)
    .mutation(async ({ ctx, input }) => {
      const user = await getValidatedUser(ctx);
      const result = await ctx.db
        .insert(workspaces)
        .values({
          id: crypto.randomUUID(),
          name: input.name,
          ownerId: user.id,
        })
        .returning();
      return result[0];
    }),

  getAll: publicProcedure
    .input(getAllWorkspacesSchema)
    .query(async ({ ctx, input }) => {
      const { page, pageSize, search } = input;
      const offset = (page - 1) * pageSize;
      const user = await getValidatedUser(ctx);

      const where = and(
        eq(workspaces.ownerId, user.id),
        search ? ilike(workspaces.name, `%${search}%`) : undefined
      );

      const [items, total] = await Promise.all([
        ctx.db
          .select()
          .from(workspaces)
          .where(where)
          .orderBy(workspaces.createdAt)
          .limit(pageSize)
          .offset(offset),
        ctx.db
          .select({ count: sql<number>`count(*)` })
          .from(workspaces)
          .where(where)
          .then((res) => Number(res[0]?.count ?? 0)),
      ]);

      return {
        items,
        total,
        page,
        pageSize,
        totalPages: Math.ceil(total / pageSize),
      };
    }),

  getById: publicProcedure
    .input(getWorkspaceByIdSchema)
    .query(async ({ ctx, input }) => {
      const user = await getValidatedUser(ctx);

      const workspace = await ctx.db.query.workspaces.findFirst({
        where: (w, { eq }) =>
          and(eq(w.id, input.id), eq(w.ownerId, user.id)),
      });

      if (!workspace) throw new Error("Workspace not found");
      return workspace;
    }),

  update: publicProcedure
    .input(updateWorkspaceSchema)
    .mutation(async ({ ctx, input }) => {
      const user = await getValidatedUser(ctx);

      const result = await ctx.db
        .update(workspaces)
        .set({ name: input.name })
        .where(
          and(eq(workspaces.id, input.id), eq(workspaces.ownerId, user.id))
        )
        .returning();

      if (!result[0]) throw new Error("Workspace not found or not authorized");
      return result[0];
    }),

  delete: publicProcedure
    .input(deleteWorkspaceSchema)
    .mutation(async ({ ctx, input }) => {
      const user = await getValidatedUser(ctx);

      const result = await ctx.db
        .delete(workspaces)
        .where(
          and(eq(workspaces.id, input.id), eq(workspaces.ownerId, user.id))
        )
        .returning();

      if (!result[0]) throw new Error("Workspace not found or not authorized");
      return result[0];
    }),
});
