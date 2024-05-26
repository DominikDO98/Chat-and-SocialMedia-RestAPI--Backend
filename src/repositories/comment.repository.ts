import { CommentEntity } from "../entities/comment.entity/comment.types";
import { pool } from "../utils/db/db";

//comments
export const addCommentRepo = async (commentData: CommentEntity): Promise<void> => {
	await pool.query("INSERT INTO comments (id, post_id, user_id, text, picture, attachment, created_at) VALUES ($1, $2, $3, $4, $5, $6, $7) RETURNING id, post_id, user_id, text, picture, attachment, created_at", [commentData.id, commentData.post_id, commentData.user_id, commentData.text, commentData.picture, commentData.attachment, commentData.created_at]);
};

export const editCommentRepo = async (commentChanges: Omit<CommentEntity, "created_at" | "post_id" | "user_id">, user_id: string): Promise<void> => {
	await pool.query("UPDATE comments SET text = COALESCE($1, text), picture =  COALESCE($2, picture), attachment = COALESCE($3, attachment) WHERE id = $4 AND user_id = $5 AND id = $6 ", [commentChanges.text, commentChanges.picture, commentChanges.attachment, commentChanges.id, user_id, commentChanges.id]);
};
export const deleteCommentRepo = async (ids: Pick<CommentEntity, "id" | "user_id">): Promise<void> => {
	await pool.query("DELETE FROM comments WHERE id = $1 AND user_id = $2", [ids.id, ids.user_id]);
};

export const loadCommentsRepo = async (post_id: string, offset: number): Promise<CommentEntity[]> => {
	const { rows } = await pool.query("SELECT comments.id, text, picture, attachment, created_at, username FROM comments FULL JOIN users ON comments.user_id = users.id WHERE post_id = $1 LIMIT 10 OFFSET $2", [post_id, offset]);
	return rows;
};
