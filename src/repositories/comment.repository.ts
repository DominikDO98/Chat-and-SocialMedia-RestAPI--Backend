import { ICommentEntity } from "../entities/comment.entity/comment";
import { pool } from "../utils/db/db";

export class CommentRepository {
	static addComment = async (commentData: ICommentEntity): Promise<ICommentEntity> => {
		const { rows } = await pool.query("INSERT INTO comments (id, post_id, user_id, text, picture, attachment, created_at) VALUES ($1, $2, $3, $4, $5, $6, $7) RETURNING id, post_id, user_id, text, picture, attachment, created_at", [commentData.id, commentData.post_id, commentData.user_id, commentData.text, commentData.picture, commentData.attachment, commentData.created_at]);
		return rows[0];
	};

	static editComment = async (commentChanges: ICommentEntity): Promise<ICommentEntity> => {
		const { rows } = await pool.query("UPDATE comments SET text = COALESCE($1, text), picture =  COALESCE($2, picture), attachment = COALESCE($3, attachment) WHERE id = $4 AND user_id = $5 AND id = $6 RETURNING id, post_id, user_id, text, picture, attachment, created_at", [commentChanges.text, commentChanges.picture, commentChanges.attachment, commentChanges.id, commentChanges.user_id, commentChanges.id]);
		return rows[0];
	};
	static deleteComment = async (comment_id: string, user_id: string): Promise<void> => {
		await pool.query("DELETE FROM comments WHERE id = $1 AND user_id = $2", [comment_id, user_id]);
	};

	static loadComments = async (post_id: string, offset: number): Promise<ICommentEntity[]> => {
		// const { rows } = await pool.query("SELECT id, text, picture, attachment, created_at, username FROM comments FULL JOIN users ON comments.user_id = users.id WHERE post_id = $1 LIMIT 10 OFFSET $2", [post_id, offset]);
		const { rows } = await pool.query("SELECT id, text, picture, attachment, created_at FROM comments WHERE post_id = $1 LIMIT 10 OFFSET $2", [post_id, offset]);
		return rows;
	};
	static loadLastComment = async (post_id: string): Promise<ICommentEntity | undefined> => {
		const { rows } = await pool.query("SELECT id, post_id, user_id, text, picture, attachment, created_at FROM comments WHERE post_id = $1", [post_id]);
		return rows[0];
	};
	static countComments = async (post_id: string): Promise<number> => {
		const { rows } = await pool.query("SELECT COUNT(user_id) FROM comments WHERE post_id = $1", [post_id]);
		return rows[0].count;
	};
	static deleteAllPostComments = async (post_id: string): Promise<void> => {
		await pool.query("DELETE FROM comments WHERE post_id = $1", [post_id]);
	};
}
