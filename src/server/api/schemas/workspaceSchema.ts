import { z } from "zod";

export const workspaceIdSchema = z
	.string()
	.uuid({ message: "Invalid workspace ID" });

export const createWorkspaceSchema = z.object({
	name: z
		.string()
		.min(2, { message: "Workspace name must be at least 2 characters long" })
		.max(100, { message: "Workspace name must be at most 100 characters" }),
});

export const updateWorkspaceSchema = z.object({
	id: workspaceIdSchema,
	name: createWorkspaceSchema.shape.name,
});

export const deleteWorkspaceSchema = z.object({
	id: workspaceIdSchema,
});

export const getWorkspaceByIdSchema = z.object({
	id: workspaceIdSchema,
});

export const getAllWorkspacesSchema = z.object({
	page: z.number().min(1, { message: "Page must be at least 1" }).default(1),
	pageSize: z
		.number()
		.min(1, { message: "Page size must be at least 1" })
		.max(100, { message: "Page size cannot exceed 100" })
		.default(10),
	search: z
		.string()
		.trim()
		.max(100, { message: "Search term too long" })
		.optional(),
});
