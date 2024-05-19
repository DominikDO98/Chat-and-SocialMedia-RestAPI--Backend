import { v4 as uuid } from "uuid";
import { z } from "zod";
import { CommentEntity } from "./post.types";

export const CommentSchema = z.object({
	id: z.string().uuid(),
	post_id: z.string().uuid(),
	user_id: z.string().uuid(),
	text: z.string().min(3).max(50),
	created_at: z.date().optional(),
	picture: z.instanceof(Buffer).optional(),
	attachment: z.string().min(3).max(200).optional(),
});

export const commentFactory = (newComment: Omit<CommentEntity, "id" | "user_id" | "created_at">, user_id: string): CommentEntity => {
	const comment: CommentEntity = {
		id: uuid(),
		post_id: newComment.post_id,
		user_id: user_id,
		text: newComment.text,
		created_at: new Date(),
		picture: newComment.picture ? newComment.picture : undefined,
		attachment: newComment.attachment ? newComment.attachment : undefined,
	};
	return comment;
};
