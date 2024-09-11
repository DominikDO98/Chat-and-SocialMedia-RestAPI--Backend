import { z } from "zod";

export const LikeEntitySchema = z.object({
	post_id: z.string().uuid(),
	user_id: z.string().uuid(),
});

export const LikeCreationSchema = LikeEntitySchema.pick({
	post_id: true,
});
