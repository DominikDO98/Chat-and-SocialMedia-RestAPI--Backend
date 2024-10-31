import { IProfileDTO } from "../profile.entity/profile";
import { ICommentDTO, ICommentEntity } from "./comment";
export class CommentDTO implements ICommentDTO {
	public id: string;
	public postId: string;
	public text: string;
	public createdAt: Date;
	public picture?: Buffer | undefined;
	public attachment?: string | undefined;
	public username: string;
	public lastname?: string | undefined;
	public firstname?: string | undefined;
	public profilePhoto?: Buffer | undefined;
	constructor(commentEntity: ICommentEntity, username: string, profile: IProfileDTO) {
		this.id = commentEntity.id;
		this.postId = commentEntity.post_id;
		this.text = commentEntity.text;
		this.attachment = commentEntity.attachment ? commentEntity.attachment : undefined;
		this.picture = commentEntity.picture ? commentEntity.picture : undefined;
		this.createdAt = commentEntity.created_at;
		this.username = username;
		this.firstname = profile.firstname ? profile.firstname : undefined;
		this.lastname = profile.lastname ? profile.lastname : undefined;
		this.profilePhoto = profile.profilePhoto ? profile.profilePhoto : undefined;
	}

	static createDTO(entity: ICommentEntity, username: string, profile: IProfileDTO) {
		return new CommentDTO(entity, username, profile);
	}
}
