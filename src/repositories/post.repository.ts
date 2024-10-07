import { IPostEntity } from "../entities/post.entity/post";
import { pool } from "../utils/db/db";
import { CustomError } from "../utils/errors/errors";

export class PostRepository {
	static createPost = async (postCreationData: IPostEntity): Promise<IPostEntity> => {
		const { rows } = await pool.query("INSERT INTO posts (id, user_id, group_id, title, text, picture, attachment, created_at, type) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9) RETURNING id, user_id, group_id, title, text, picture, attachment, created_at, type", [postCreationData.id, postCreationData.user_id, postCreationData.group_id, postCreationData.title, postCreationData.text, postCreationData.picture, postCreationData.attachment, postCreationData.created_at, postCreationData.type]);
		if (!rows[0]) {
			throw new CustomError("Failed to create a post, please try again later", 500);
		}
		return rows[0];
	};

	static selectPost = async (post_id: string): Promise<IPostEntity> => {
		const { rows } = await pool.query("SELECT id, user_id, group_id, title, text, picture, attachment, created_at, type FROM posts WHERE id = $1", [post_id]);
		if (!rows[0]) {
			throw new CustomError("Failed to find a post, please try again later", 500);
		}
		return rows[0];
	};

	static editPost = async (post: IPostEntity): Promise<IPostEntity> => {
		const { rows } = await pool.query("UPDATE posts SET title = COALESCE($1, title), text = COALESCE($2, text), picture = COALESCE($3, picture), attachment = COALESCE($4, attachment) WHERE id = $5 AND user_id = $6 RETURNING id, user_id, group_id, title, text, picture, attachment, created_at, type", [post.title, post.text, post.picture, post.attachment, post.id, post.user_id]);
		if (!rows[0]) {
			throw new CustomError("Failed to edit a post, please try again later", 500);
		}
		return rows[0];
	};

	static deletePost = async (user_id: string, post_id: string): Promise<void> => {
		await pool.query("DELETE FROM posts WHERE user_id = $1 AND id = $2", [user_id, post_id]);
	};

	static loadUserPosts = async (user_id: string, offset: number): Promise<IPostEntity[]> => {
		const { rows } = await pool.query("SELECT id, user_id, group_id, title, text, picture, attachment, created_at, type FROM posts WHERE user_id = $1 LIMIT 10 OFFSET $2", [user_id, offset]);
		if (!rows[0]) {
			throw new CustomError("Failed to load user's posts, please try again later", 500);
		}
		return rows;
	};

	static loadPost = async (post_id: string): Promise<IPostEntity> => {
		const { rows } = await pool.query("SELECT id, user_id, group_id, title, text, picture, attachment, created_at, type FROM posts WHERE id = $1", [post_id]);
		return rows[0];
	};
}
