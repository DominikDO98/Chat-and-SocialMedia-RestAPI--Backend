import { z } from "zod";

export const PostSchema = z.object({
	id: z.string().uuid(),
	user_id: z.string().uuid(),
	group_id: z.string().uuid().optional(),
	title: z.string().min(3).max(30),
	text: z.string().min(3).max(200),
	picture: z.instanceof(Buffer).optional(),
	attachment: z.string().min(3).max(200).optional(),
	created_at: z.date(),
	type: z.number(),
});

export const PostEditionSchema = PostSchema.partial();

export const PostCreationSchema = PostSchema.omit({
	id: true,
	user_id: true,
	created_at: true,
});
