import { IPostDTO, IPostEntity } from "./post";

export class PostDTO implements IPostDTO {
	public readonly id: string;
	public readonly groupId: string | undefined;
	public title: string;
	public text: string;
	public picture: Buffer | undefined;
	public attachment: string | undefined;
	public createdAt: Date;
	public type: number;
	public likes: number;
	public comments: number;
	public liked: boolean;
	constructor(post: IPostEntity, likes: number, comments: number, liked: boolean) {
		this.id = post.id;
		this.groupId = post.group_id ? post.group_id : undefined;
		this.title = post.title;
		this.text = post.text;
		this.picture = post.picture ? post.picture : undefined;
		this.attachment = post.attachment ? post.attachment : undefined;
		this.createdAt = post.created_at;
		this.type = post.type;
		this.likes = likes;
		this.comments = comments;
		this.liked = liked;
	}

	static createDTO(entity: IPostEntity, likes: number, comments: number, liked: boolean) {
		return new PostDTO(entity, likes, comments, liked);
	}
}
