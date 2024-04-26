import { LikeEntity, PostEntity } from "../entities/post.entity/post.types";
import { pool } from "../utils/db/db";
import { CustomError } from "../utils/errors/errors";
//posts
export const createPostRepo = async (postCreationData: PostEntity): Promise<string> => {
	const { rows } = await pool.query("INSERT INTO posts (id, user_id, group_id, title, text, picture, attachment, created_at, type) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9) RETURNING id", [postCreationData.id, postCreationData.user_id, postCreationData.group_id, postCreationData.title, postCreationData.text, postCreationData.picture, postCreationData.attachment, postCreationData.created_at, postCreationData.type]);
	if (!rows[0]) {
		throw new CustomError("Upload failed!", 500);
	}
	const id: string = rows[0];

	return id;
};
export const editPostRepo = async (postEdtionData: PostEntity): Promise<boolean> => {
	const { rows } = await pool.query("UPADTE posts SET title = $1, text = $2, picture = $3, attachment = $4, WHERE id = $5 AND user_id = $6 RETURNING id", [postEdtionData.title, postEdtionData.text, postEdtionData.picture, postEdtionData.attachment, postEdtionData.id, postEdtionData.user_id]);
	if (!rows[0]) {
		throw new CustomError("Failed to edit post! Please try again later", 500);
	}
	return true;
};
//@TODO: turn into transactions and delete like and comments also
export const deletePostRepo = async (postDeletionData: Pick<PostEntity, "id" | "user_id">): Promise<boolean> => {
	await pool.query("DELETE FROM posts WHERE id = $1 AND user_id = $2", [postDeletionData.id, postDeletionData.user_id]);
	return true;
};
//likes
export const giveLike = async (likeData: LikeEntity): Promise<string> => {
	const { rows } = await pool.query("INSERT INTO likes (id, user_id, post_id, created_at) VALUES ($1, $2, $3, $4) RETURNING id", [likeData.id, likeData.user_id, likeData.post_id, likeData.created_at]);
	if (!rows[0]) {
		throw new CustomError("Unable to give like to this post", 500);
	}
	const id = rows[0].id;
	return id;
};
//@TODO: turn into transactions and delete like and comments also
export const removeLike = async (likeData: Omit<LikeEntity, "created_at">) => {
	await pool.query("DELETE FROM likes WHERE id = $1 AND user_id = $2 AND post_id = $3", [likeData.id, likeData.user_id, likeData.post_id]);

	return true;
};
