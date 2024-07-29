import { TLike } from "../entities/like.entity/like.type";
import { pool } from "../utils/db/db";

export class LikeRepository {
	constructor() {}

	static giveLike = async (likeData: TLike): Promise<void> => {
		await pool.query("INSERT INTO likes (user_id, post_id) SELECT $1, $2 WHERE NOT EXISTS (SELECT user_id, post_id FROM likes WHERE user_id = $1 AND post_id = $2);", [likeData.user_id, likeData.post_id]);
	};
	static removeLike = async (likeData: Omit<TLike, "created_at" | "user_id">, user_id: string): Promise<void> => {
		await pool.query("DELETE FROM likes WHERE post_id = $1 AND user_id = $2", [likeData.post_id, user_id]);
	};
}
