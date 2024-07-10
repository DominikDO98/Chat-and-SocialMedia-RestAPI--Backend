import { commentFactory } from "../entities/comment.entity/comment.entity";
import { CommentEntity } from "../entities/comment.entity/comment.types";
import { CommentRepository } from "../repositories/comment.repository";

export class CommnetService {
	private _commentReposiotory = CommentRepository;
	constructor() {
		this._commentReposiotory;
	}
	addComment = async (commentData: Omit<CommentEntity, "user_id">, user_id: string): Promise<void> => {
		const newComment = commentFactory(commentData, user_id);
		await this._commentReposiotory.addComment(newComment);
	};

	editComment = async (commentChanges: Omit<CommentEntity, "post_id" | "user_id" | "created_at">, user_id: string): Promise<void> => {
		await this._commentReposiotory.editComment(commentChanges, user_id);
	};

	deleteComment = async (comment_id: string, user_id: string): Promise<void> => {
		const ids = {
			id: comment_id,
			user_id: user_id,
		};
		await this._commentReposiotory.deleteComment(ids);
	};

	loadComments = async (post_id: string, offset: number): Promise<CommentEntity[]> => {
		const comments = await this._commentReposiotory.loadComments(post_id, offset);
		return comments;
	};
}
