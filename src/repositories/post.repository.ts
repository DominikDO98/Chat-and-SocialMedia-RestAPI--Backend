import { IPostEntity } from "../entities/post.entity/post.types";
import { pool } from "../utils/db/db";
import { ValidationError } from "../utils/errors/errors";

export class PostRepository {
	//add load single post
	static createPost = async (postCreationData: IPostEntity): Promise<void> => {
		await pool.query("INSERT INTO posts (id, user_id, group_id, title, text, picture, attachment, created_at, type) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9) ", [postCreationData.id, postCreationData.user_id, postCreationData.group_id, postCreationData.title, postCreationData.text, postCreationData.picture, postCreationData.attachment, postCreationData.created_at, postCreationData.type]);
	};

	static editPost = async (postEdtionData: Omit<IPostEntity, "created_at" | "group_id" | "user_id">, user_id: string): Promise<void> => {
		await pool.query("UPDATE posts SET title = COALESCE($1, title), text = COALESCE($2, text), picture = COALESCE($3, picture), attachment = COALESCE($4, attachment) WHERE id = $5 AND user_id = $6 ", [postEdtionData.title, postEdtionData.text, postEdtionData.picture, postEdtionData.attachment, postEdtionData.id, user_id]);
	};

	static deletePost = async (user_id: string, post_id: string): Promise<void> => {
		const client = await pool.connect();
		try {
			await client.query("BEGIN;");
			const { rows } = await client.query("SELECT id, (SELECT COUNT (id) FROM posts WHERE id = $2) as count FROM posts WHERE user_id = $1 AND id = $2 LIMIT 1", [user_id, post_id]);
			if (!rows[0]) {
				throw new ValidationError("Unauthorized post operation!", 401);
			}
			await client.query("DELETE FROM likes WHERE post_id = $1", [post_id]); //use likes
			await client.query("DELETE FROM comments WHERE post_id = $1", [post_id]); //use comments
			await client.query("DELETE FROM posts WHERE user_id = $1 AND id = $2", [user_id, post_id]);
			await client.query("COMMIT");
		} catch (err) {
			console.log(err);
			client.query("ROLLBACK");
			throw err;
		} finally {
			client.release();
		}
	};

	static loadMyPosts = async (user_id: string, offset: number): Promise<IPostEntity[]> => {
		const { rows } = await pool.query(
			"WITH postsArr AS (SELECT posts.id, posts.group_id, posts.title, posts.text, posts.picture, posts.attachment, posts.created_at, posts.type, (SELECT COUNT(user_id) FROM likes WHERE post_id = posts.id) AS likes, (SELECT COUNT (user_id) FROM likes WHERE user_id = $1 and post_id = posts.id) as likedByUser, (SELECT COUNT (id) FROM comments WHERE post_id = posts.id) AS comments, (SELECT username FROM users WHERE id = comments.user_id) AS commentusername, comments.id AS commentid, comments.text AS commenttext, comments.picture AS commentpicture, comments.attachment AS commentattachment, comments.created_at AS commentcreated_at, ROW_NUMBER() OVER(PARTITION BY posts.id ORDER BY posts.created_at DESC) as row_num FROM posts  FULL JOIN comments ON posts.id = comments.post_id WHERE posts.user_id = $1 ORDER BY posts.created_at DESC) SELECT id, group_id, title, text, picture, attachment, created_at, type, likes, likedByUser, comments, commentusername, commentid, commenttext, commentpicture, commentattachment, commentcreated_at FROM postsArr WHERE row_num = 1 LIMIT 10 OFFSET $2",
			[user_id, offset],
		);
		return rows;
	};
}
