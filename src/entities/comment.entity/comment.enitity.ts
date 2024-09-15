import { v4 as uuid } from "uuid";
import { ICommentEntity } from "./comment.types";

export class CommentEntity implements ICommentEntity {
	public id;
	public post_id;
	public user_id;
	public text;
	public created_at;
	public picture?;
	public attachment?;
	constructor(newComment: Omit<ICommentEntity, "id" | "user_id" | "created_at">, user_id: string) {
		this.id = uuid();
		this.user_id = user_id;
		this.post_id = newComment.post_id;
		this.text = newComment.text;
		this.attachment = newComment.attachment ? newComment.attachment : undefined;
		this.picture = newComment.picture ? newComment.picture : undefined;
		this.created_at = new Date();
	}
}
