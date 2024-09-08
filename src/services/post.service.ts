import { postFactory } from "../entities/post.entity/post.entity";
import { TPost } from "../entities/post.entity/post.types";
import { PostRepository } from "../repositories/post.repository";

export class PostService {
	private _postRepository = PostRepository;
	constructor() {
		this._postRepository;
	}
	createPost = async (postCreationData: Omit<TPost, "id" | "user_id" | "created_at">, user_id: string): Promise<void> => {
		const newPost = postFactory(postCreationData, user_id);
		await this._postRepository.createPost(newPost);
	};
	editPost = async (postEditionData: Omit<TPost, "user_id" | "created_at">, user_id: string): Promise<void> => {
		await this._postRepository.editPost(postEditionData, user_id);
	};
	deletePost = async (user_id: string, post_id: string): Promise<void> => {
		await this._postRepository.deletePost(user_id, post_id);
	};
	loadMyPosts = async (user_id: string, offset: number): Promise<TPost[]> => {
		const userPosts = await this._postRepository.loadMyPosts(user_id, offset);
		return userPosts;
	};
}
