import { z } from "zod";

export const CommentEntitySchema = z.object({
	id: z.string().uuid(),
	post_id: z.string().uuid(),
	user_id: z.string().uuid(),
	text: z.string().min(3).max(50),
	created_at: z.date(),
	picture: z.instanceof(Buffer).optional(),
	attachment: z.string().min(3).max(200).optional(),
});
export const CommentCreationSchema = CommentEntitySchema.omit({
	id: true,
	user_id: true,
	created_at: true,
});
export const CommentEditionSchema = CommentEntitySchema.omit({
	post_id: true,
	user_id: true,
	created_at: true,
});
