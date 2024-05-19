import { v4 as uuid } from "uuid";
import { z } from "zod";
import { LikeEntity } from "./post.types";

export const LikeSchema = z.object({
	id: z.string().uuid(),
	post_id: z.string().uuid(),
	user_id: z.string().uuid(),
	created_at: z.date(),
});

export const LikeCreationSchema = LikeSchema.pick({
	post_id: true,
});

export const likeFactory = (newLike: Omit<LikeEntity, "id" | "user_id" | "created_at">, user_id: string): LikeEntity => {
	const like = {
		id: uuid(),
		post_id: newLike.post_id,
		user_id: user_id,
		created_at: new Date(),
	};
	return like;
};
