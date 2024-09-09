import { z } from "zod";

export const LikeSchema = z.object({
	post_id: z.string().uuid(),
	user_id: z.string().uuid(),
});

export const LikeCreationSchema = LikeSchema.pick({
	post_id: true,
});
