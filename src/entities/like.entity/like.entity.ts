import { z } from "zod";
import { LikeEntity } from "./like.type";

export const LikeSchema = z.object({
	post_id: z.string().uuid(),
	user_id: z.string().uuid(),
});

export const LikeCreationSchema = LikeSchema.pick({
	post_id: true,
});

export const likeFactory = (newLike: Omit<LikeEntity, "id" | "user_id">, user_id: string): LikeEntity => {
	const like = {
		post_id: newLike.post_id,
		user_id: user_id,
	};
	return like;
};
