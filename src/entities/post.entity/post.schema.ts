import { z } from "zod";

export const PostEntitySchema = z.object({
	id: z.string().uuid(),
	userId: z.string().uuid(),
	groupId: z.string().uuid().optional(),
	title: z.string().min(3).max(30),
	text: z.string().min(3).max(200),
	picture: z.instanceof(Buffer).optional(),
	attachment: z.string().min(3).max(200).optional(),
	createdAt: z.date(),
	type: z.number(),
});

export const PostEditionSchema = PostEntitySchema.partial();

export const PostCreationSchema = PostEntitySchema.omit({
	id: true,
	userId: true,
	createdAt: true,
});
