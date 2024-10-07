import { IPostEntity, TCretePost, TEditPost } from "./post";

export class PostEntity implements IPostEntity {
	public readonly id;
	public readonly user_id;
	public readonly group_id;
	public title;
	public text;
	public picture;
	public attachment;
	public created_at;
	public type;
	constructor(id: string, user_id: string, newPost: TCretePost | TEditPost) {
		this.id = id;
		this.user_id = user_id;
		this.group_id = newPost.groupId ? newPost.groupId : undefined;
		this.title = newPost.title;
		this.text = newPost.text;
		this.picture = newPost.picture ? newPost.picture : undefined;
		this.attachment = newPost.attachment ? newPost.attachment : undefined;
		this.created_at = newPost.createdAt;
		this.type = newPost.type ? newPost.type : 0;
	}
}
