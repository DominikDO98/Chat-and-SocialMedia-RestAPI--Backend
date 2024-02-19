import { v4 as uuid } from "uuid";
import { z } from "zod";
import { CommentEntity } from "./post.types";

export const newCommentSchema = z.object({
	id: z.string().uuid(),
	post_id: z.string().uuid(),
	user_id: z.string().uuid(),
	text: z.string().min(3).max(50),
	created_at: z.date(),
	picture: z.instanceof(Blob).optional(),
	attachment: z.string().min(3).max(200).optional(),
});

export const commentFactory = (newComment: Omit<CommentEntity, "id" | "created_at">) : CommentEntity => {
	const comment: CommentEntity = {
		id: uuid(),
		post_id: newComment.post_id,
		user_id: newComment.user_id,
		text: newComment.text,
		created_at: new Date(),
		picture: newComment.picture ? newComment.picture : undefined,
		attachment: newComment.attachment ? newComment.attachment : undefined,
	};
	return comment;
};