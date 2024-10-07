import { LikeEntity } from "../entities/like.entity/like.entity";
import { ILikeEntity } from "../entities/like.entity/like";
import { pool } from "../utils/db/db";
import { CustomError } from "../utils/errors/errors";

export class LikeRepository {
	static giveLike = async (likeData: ILikeEntity): Promise<void> => {
		await pool.query("INSERT INTO likes (user_id, post_id) SELECT $1, $2 WHERE NOT EXISTS (SELECT user_id, post_id FROM likes WHERE user_id = $1 AND post_id = $2);", [likeData.user_id, likeData.post_id]);
	};
	static getLike = async (user_id: string, post_id: string): Promise<LikeEntity | undefined> => {
		const { rows } = await pool.query("SELECT user_id, post_id FROM likes WHERE user_id = $1 AND post_id = $2", [user_id, post_id]);
		return rows[0];
	};
	static removeLike = async (post_id: string, user_id: string): Promise<void> => {
		await pool.query("DELETE FROM likes WHERE post_id = $1 AND user_id = $2", [post_id, user_id]);
	};
	static countLikes = async (post_id: string): Promise<number> => {
		const { rows } = await pool.query("SELECT COUNT(user_id) FROM likes WHERE post_id = $1", [post_id]);
		if (!rows[0]) {
			throw new CustomError("Failed to count all the likes, please try again later", 500, true);
		}
		return rows[0].count;
	};
	static deleteLikes = async (post_id: string): Promise<void> => {
		await pool.query("DELETE FROM likes WHERE post_id = $1", [post_id]);
	};
}
