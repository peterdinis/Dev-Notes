import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server";
import { and, eq, ilike, sql } from "drizzle-orm";
import { workspaces } from "~/server/db/schema";
import {
	createWorkspaceSchema,
	deleteWorkspaceSchema,
	getAllWorkspacesSchema,
	getWorkspaceByIdSchema,
	updateWorkspaceSchema,
} from "../schemas/workspaceSchema";
import { createTRPCRouter, publicProcedure } from "../trpc";

export const workspaceRouter = createTRPCRouter({
	create: publicProcedure
		.input(createWorkspaceSchema)
		.mutation(async ({ ctx, input }) => {
			const { getUser } = getKindeServerSession();
			const user = await getUser();
			const result = await ctx.db
				.insert(workspaces)
				.values({
					id: crypto.randomUUID(),
					name: input.name,
					ownerId: user?.id!,
				})
				.returning();
			return result[0];
		}),

	getAll: publicProcedure
		.input(getAllWorkspacesSchema)
		.query(async ({ ctx, input }) => {
			const { page, pageSize, search } = input;
			const offset = (page - 1) * pageSize;
			const { getUser } = getKindeServerSession();
			const user = await getUser();
			const where = and(
				eq(workspaces.ownerId, user?.id!),
				search ? ilike(workspaces.name, `%${search}%`) : undefined,
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
			const { getUser } = getKindeServerSession();
			const user = await getUser();
			const workspace = await ctx.db.query.workspaces.findFirst({
				where: (w, { eq }) => and(eq(w.id, input.id), eq(w.ownerId, user?.id!)),
			});
			if (!workspace) throw new Error("Workspace not found");
			return workspace;
		}),

	update: publicProcedure
		.input(updateWorkspaceSchema)
		.mutation(async ({ ctx, input }) => {
			const { getUser } = getKindeServerSession();
			const user = await getUser();
			const result = await ctx.db
				.update(workspaces)
				.set({ name: input.name })
				.where(
					and(eq(workspaces.id, input.id), eq(workspaces.ownerId, user?.id!)),
				)
				.returning();

			if (!result[0]) throw new Error("Workspace not found or not authorized");
			return result[0];
		}),

	delete: publicProcedure
		.input(deleteWorkspaceSchema)
		.mutation(async ({ ctx, input }) => {
			const { getUser } = getKindeServerSession();
			const user = await getUser();
			const result = await ctx.db
				.delete(workspaces)
				.where(
					and(eq(workspaces.id, input.id), eq(workspaces.ownerId, user?.id!)),
				)
				.returning();

			if (!result[0]) throw new Error("Workspace not found or not authorized");
			return result[0];
		}),
});
