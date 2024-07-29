import { likeFactory } from "../entities/like.entity/like.entity";
import { TLike } from "../entities/like.entity/like.type";
import { LikeRepository } from "../repositories/like.repository";

export class LikeService {
	private _likeRepository = LikeRepository;
	constructor() {
		this._likeRepository;
	}
	giveLike = async (likeData: Omit<TLike, "user_id">, user_id: string): Promise<void> => {
		const newLike = likeFactory(likeData, user_id);
		await this._likeRepository.giveLike(newLike);
	};

	removeLike = async (likeData: Omit<TLike, "user_id" | "created_at">, user_id: string): Promise<void> => {
		await this._likeRepository.removeLike(likeData, user_id);
	};
}
