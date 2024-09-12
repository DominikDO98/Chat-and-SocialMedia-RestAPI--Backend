import { ILikeEntity } from "./like.type";

export class LikeEntity implements ILikeEntity {
	public post_id;
	public user_id;
	constructor(newLike: Omit<ILikeEntity, "id" | "user_id">, user_id: string) {
		this.post_id = newLike.post_id;
		this.user_id = user_id;
	}
}
