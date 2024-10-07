import { ILikeEntity, TCreateLike } from "./like";

export class LikeEntity implements ILikeEntity {
	public post_id;
	public user_id;
	constructor(newLike: TCreateLike, user_id: string) {
		this.post_id = newLike.postId;
		this.user_id = user_id;
	}
}
