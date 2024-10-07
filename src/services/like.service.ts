import { LikeEntity } from "../entities/like.entity/like.entity";
import { TCreateLike } from "../entities/like.entity/like";
import { LikeRepository } from "../repositories/like.repository";

export class LikeService {
	private _likeRepository = LikeRepository;

	giveLike = async (likeData: TCreateLike, userId: string): Promise<void> => {
		const newLike = new LikeEntity(likeData, userId);
		await this._likeRepository.giveLike(newLike);
	};

	removeLike = async (postId: string, userId: string): Promise<void> => {
		await this._likeRepository.removeLike(postId, userId);
	};
}
