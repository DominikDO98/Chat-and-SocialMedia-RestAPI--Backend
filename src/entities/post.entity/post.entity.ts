import { v4 as uuid } from "uuid";
import { TPost } from "./post.types";

export const postFactory = (newPost: Omit<TPost, "id" | "user_id" | "created_at">, user_id: string): TPost => {
	const post: TPost = {
		id: uuid(),
		user_id: user_id,
		group_id: newPost.group_id ? newPost.group_id : undefined,
		title: newPost.title,
		text: newPost.text,
		picture: newPost.picture ? newPost.picture : undefined,
		attachment: newPost.attachment ? newPost.attachment : undefined,
		created_at: new Date(),
		type: newPost.type ? newPost.type : 0,
	};
	return post;
};
