import { v4 as uuid } from "uuid";
import { IComment } from "./comment.types";

export class Comment implements IComment {
	id;
	post_id;
	user_id;
	text;
	created_at;
	picture?;
	attachment?;
	constructor(newComment: Omit<IComment, "id" | "user_id" | "created_at">, user_id: string) {
		this.id = uuid();
		this.user_id = user_id;
		this.post_id = newComment.post_id;
		this.text = newComment.text;
		this.attachment = newComment.attachment ? newComment.attachment : undefined;
		this.picture = newComment.picture ? newComment.picture : undefined;
		this.created_at = new Date();
	}
}
