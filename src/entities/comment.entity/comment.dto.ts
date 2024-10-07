import { ICommentDTO, ICommentEntity } from "./comment";
export class CommentDTO implements ICommentDTO {
	public id;
	public postId;
	public text;
	public createdAt;
	public picture?;
	public attachment?;
	constructor(commentEntity: ICommentEntity) {
		this.id = commentEntity.id;
		this.postId = commentEntity.post_id;
		this.text = commentEntity.text;
		this.attachment = commentEntity.attachment ? commentEntity.attachment : undefined;
		this.picture = commentEntity.picture ? commentEntity.picture : undefined;
		this.createdAt = commentEntity.created_at;
	}

	static createDTO(entity: ICommentEntity) {
		return new CommentDTO(entity);
	}
}
