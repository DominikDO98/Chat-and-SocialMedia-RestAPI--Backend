import { v4 as uuid } from "uuid";
import { z } from "zod";
import { PostEntity } from "./post.types";

export const PostSchema = z.object({
	id: z.string().uuid(),
	user_id: z.string().uuid(),
	group_id: z.string().uuid().optional(),
	title: z.string().min(3).max(30),
	text: z.string().min(3).max(200),
	picture: z.instanceof(Blob).optional(),
	attachment: z.string().min(3).max(200).optional(),
	created_at: z.date(),
	type: z.number(),
});

export const postFactory = (newPost: Omit<PostEntity, "id" | "created_at">): PostEntity => {
	const post: PostEntity = {
		id: uuid(),
		user_id: newPost.user_id,
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
