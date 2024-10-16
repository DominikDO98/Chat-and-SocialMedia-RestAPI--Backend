import { v4 as uuid } from "uuid";
import { z } from "zod";
import { TComment } from "./comment.types";

export const CommentSchema = z.object({
	id: z.string().uuid(),
	post_id: z.string().uuid(),
	user_id: z.string().uuid(),
	text: z.string().min(3).max(50),
	created_at: z.date(),
	picture: z.instanceof(Buffer).optional(),
	attachment: z.string().min(3).max(200).optional(),
});
export const CommentCreationSchema = CommentSchema.omit({
	id: true,
	user_id: true,
	created_at: true,
});
export const CommentEditionSchema = CommentSchema.omit({
	post_id: true,
	user_id: true,
	created_at: true,
});

export const commentFactory = (newComment: Omit<TComment, "id" | "user_id" | "created_at">, user_id: string): TComment => {
	const comment: TComment = {
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
