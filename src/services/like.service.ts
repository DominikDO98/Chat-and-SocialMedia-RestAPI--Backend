import { likeFactory } from "../entities/post.entity/like.entity";
import { LikeEntity } from "../entities/post.entity/post.types";
import { giveLikeRepo, removeLikeRepo } from "../repositories/like.repository";

//likes
export const giveLikeService = async (likeData: Omit<LikeEntity, "user_id">, user_id: string): Promise<void> => {
	const newLike = likeFactory(likeData, user_id);
	await giveLikeRepo(newLike);
};

export const removeLikeService = async (likeData: Omit<LikeEntity, "user_id" | "created_at">, user_id: string): Promise<void> => {
	await removeLikeRepo(likeData, user_id);
};
