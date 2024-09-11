import { LikeEntity } from "../entities/like.entity/like.factory";
import { ILikeEntity } from "../entities/like.entity/like.type";
import { LikeRepository } from "../repositories/like.repository";

export class LikeService {
	private _likeRepository = LikeRepository;
	constructor() {
		this._likeRepository;
	}
	giveLike = async (likeData: Omit<ILikeEntity, "user_id">, user_id: string): Promise<void> => {
		const newLike = new LikeEntity(likeData, user_id);
		await this._likeRepository.giveLike(newLike);
	};

	removeLike = async (likeData: Omit<ILikeEntity, "user_id" | "created_at">, user_id: string): Promise<void> => {
		await this._likeRepository.removeLike(likeData, user_id);
	};
}
