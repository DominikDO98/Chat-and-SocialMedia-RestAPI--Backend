import { v4 as uuid } from "uuid";
import { IPostEntity } from "./post.types";

export class PostEntity {
	public id;
	public user_id;
	public group_id;
	public title;
	public text;
	public picture;
	public attachment;
	public created_at;
	public type;
	constructor(newPost: Omit<IPostEntity, "id" | "user_id" | "created_at">, user_id: string) {
		this.id = uuid();
		this.user_id = user_id;
		this.group_id = newPost.group_id ? newPost.group_id : undefined;
		this.title = newPost.title;
		this.text = newPost.text;
		this.picture = newPost.picture ? newPost.picture : undefined;
		this.attachment = newPost.attachment ? newPost.attachment : undefined;
		this.created_at = new Date();
		this.type = newPost.type ? newPost.type : 0;
	}
}
