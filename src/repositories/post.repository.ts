import { PostEntity } from "../entities/post.entity/post.types";
import { pool } from "../utils/db/db";
import { CustomError } from "../utils/errors/errors";

export const createPostRepo = async (newPostData: PostEntity): Promise<boolean> => {
	const { rows } = await pool.query("INSERT INTO posts (id, user_id, group_id, title, text, picture, attachment, created_at, type) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9) RETURNING id", [newPostData.id, newPostData.user_id, newPostData.group_id, newPostData.title, newPostData.text, newPostData.picture, newPostData.attachment, newPostData.created_at, newPostData.type]);
	if (!rows[0]) {
		throw new CustomError("Upload failed!", 500);
	}
	return true;
};
