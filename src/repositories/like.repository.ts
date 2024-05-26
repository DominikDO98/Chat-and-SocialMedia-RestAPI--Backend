import { LikeEntity } from "../entities/like.entity/like.type";
import { pool } from "../utils/db/db";

//likes
export const giveLikeRepo = async (likeData: LikeEntity): Promise<void> => {
	await pool.query("INSERT INTO likes (user_id, post_id) SELECT $1, $2 WHERE NOT EXISTS (SELECT user_id, post_id FROM likes WHERE user_id = $1 AND post_id = $2);", [likeData.user_id, likeData.post_id]);
};
export const removeLikeRepo = async (likeData: Omit<LikeEntity, "created_at" | "user_id">, user_id: string): Promise<void> => {
	await pool.query("DELETE FROM likes WHERE post_id = $1 AND user_id = $2", [likeData.post_id, user_id]);
};
