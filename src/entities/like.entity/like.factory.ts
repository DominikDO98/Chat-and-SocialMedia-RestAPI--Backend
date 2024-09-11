import { ILikeEntity } from "./like.type";

// export const likeFactory = (newLike: Omit<TLike, "id" | "user_id">, user_id: string): TLike => {
// 	const like = {
// 		post_id: newLike.post_id,
// 		user_id: user_id,
// 	};
// 	return like;
// };

export class LikeEntity implements ILikeEntity {
	public post_id;
	public user_id;
	constructor(newLike: Omit<ILikeEntity, "id" | "user_id">, user_id: string) {
		this.post_id = newLike.post_id;
		this.user_id = user_id;
	}
}
