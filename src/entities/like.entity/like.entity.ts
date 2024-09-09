import { TLike } from "./like.type";

export const likeFactory = (newLike: Omit<TLike, "id" | "user_id">, user_id: string): TLike => {
	const like = {
		post_id: newLike.post_id,
		user_id: user_id,
	};
	return like;
};
