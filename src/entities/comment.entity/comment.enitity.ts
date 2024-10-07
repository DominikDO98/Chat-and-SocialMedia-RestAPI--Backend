import { ICommentEntity, TCreateComment, TEditComment } from "./comment";

export class CommentEntity implements ICommentEntity {
	public id;
	public post_id;
	public user_id;
	public text;
	public created_at;
	public picture?;
	public attachment?;
	constructor(id: string, userId: string, newComment: TCreateComment | TEditComment) {
		this.id = id;
		this.user_id = userId;
		this.post_id = newComment.postId;
		this.text = newComment.text;
		this.attachment = newComment.attachment ? newComment.attachment : undefined;
		this.picture = newComment.picture ? newComment.picture : undefined;
		this.created_at = newComment.createdAt;
	}
}
