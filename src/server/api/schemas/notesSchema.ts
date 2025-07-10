import { z } from "zod";

const titleSchema = z
	.string()
	.min(1, "Title is required")
	.max(100, "Title must be under 100 characters")
	.trim();

const contentSchema = z.string().max(10_000, "Content is too long").optional();

const workspaceIdSchema = z.string().uuid("Invalid workspace ID").optional();

const noteIdSchema = z.string().uuid("Invalid note ID");

const paginationSchema = z.object({
	limit: z.number().min(1).max(100).default(10),
	offset: z.number().min(0).default(0),
});

export {
	contentSchema,
	noteIdSchema,
	paginationSchema,
	titleSchema,
	workspaceIdSchema,
};
