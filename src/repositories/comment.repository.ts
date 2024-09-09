import { TComment } from "../entities/comment.entity/comment.types";
import { pool } from "../utils/db/db";

export class CommentRepository {
	//add delete all comments by post id
	static addComment = async (commentData: TComment): Promise<void> => {
		await pool.query("INSERT INTO comments (id, post_id, user_id, text, picture, attachment, created_at) VALUES ($1, $2, $3, $4, $5, $6, $7) RETURNING id, post_id, user_id, text, picture, attachment, created_at", [commentData.id, commentData.post_id, commentData.user_id, commentData.text, commentData.picture, commentData.attachment, commentData.created_at]);
	};

	static editComment = async (commentChanges: Omit<TComment, "created_at" | "post_id" | "user_id">, user_id: string): Promise<void> => {
		await pool.query("UPDATE comments SET text = COALESCE($1, text), picture =  COALESCE($2, picture), attachment = COALESCE($3, attachment) WHERE id = $4 AND user_id = $5 AND id = $6 ", [commentChanges.text, commentChanges.picture, commentChanges.attachment, commentChanges.id, user_id, commentChanges.id]);
	};
	static deleteComment = async (ids: Pick<TComment, "id" | "user_id">): Promise<void> => {
		await pool.query("DELETE FROM comments WHERE id = $1 AND user_id = $2", [ids.id, ids.user_id]);
	};

	static loadComments = async (post_id: string, offset: number): Promise<TComment[]> => {
		const { rows } = await pool.query("SELECT comments.id, text, picture, attachment, created_at, username FROM comments FULL JOIN users ON comments.user_id = users.id WHERE post_id = $1 LIMIT 10 OFFSET $2", [post_id, offset]);
		return rows;
	};
}
