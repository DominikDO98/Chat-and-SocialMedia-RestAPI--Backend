import { z } from "zod";

export const CommentEntitySchema = z.object({
	id: z.string().uuid(),
	postId: z.string().uuid(),
	userId: z.string().uuid(),
	text: z.string().min(3).max(50),
	createdAt: z.date(),
	picture: z.instanceof(Buffer).optional(),
	attachment: z.string().min(3).max(200).optional(),
});
export const CommentCreationSchema = CommentEntitySchema.omit({
	id: true,
	userId: true,
	createdAt: true,
});
export const CommentEditionSchema = CommentEntitySchema.omit({
	postId: true,
	userId: true,
	createdAt: true,
});
