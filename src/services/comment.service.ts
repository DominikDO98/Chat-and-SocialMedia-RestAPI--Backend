import { commentFactory } from "../entities/comment.entity/comment.entity";
import { CommentEntity } from "../entities/comment.entity/comment.types";
import { addCommentRepo, deleteCommentRepo, editCommentRepo, loadCommentsRepo } from "../repositories/comment.repository";

//comments
export const addCommentService = async (commentData: Omit<CommentEntity, "user_id">, user_id: string): Promise<void> => {
	const newComment = commentFactory(commentData, user_id);
	await addCommentRepo(newComment);
};

export const editCommentService = async (commentChanges: Omit<CommentEntity, "post_id" | "user_id" | "created_at">, user_id: string): Promise<void> => {
	await editCommentRepo(commentChanges, user_id);
};

export const deleteCommentService = async (comment_id: string, user_id: string): Promise<void> => {
	const ids = {
		id: comment_id,
		user_id: user_id,
	};
	await deleteCommentRepo(ids);
};

export const loadCommentsService = async (post_id: string, offset: number): Promise<CommentEntity[]> => {
	const comments = await loadCommentsRepo(post_id, offset);
	return comments;
};
