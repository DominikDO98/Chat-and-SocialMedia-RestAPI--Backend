import { z } from "zod";

export const LikeEntitySchema = z.object({
	postId: z.string().uuid(),
	userId: z.string().uuid(),
});

export const LikeCreationSchema = LikeEntitySchema.pick({
	postId: true,
});
