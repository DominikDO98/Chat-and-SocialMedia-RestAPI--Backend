import { v4 as uuid } from "uuid";
import { TComment } from "./comment.types";

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
