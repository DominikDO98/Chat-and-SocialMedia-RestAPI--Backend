import { postFactory } from "../entities/post.entity/post.entity";
import { PostEntity } from "../entities/post.entity/post.types";
import { PostRepository } from "../repositories/post.repository";

export class PostService {
	private _postRepository = PostRepository;
	constructor() {
		this._postRepository;
	}
	createPostService = async (postCreationData: Omit<PostEntity, "id" | "user_id" | "created_at">, user_id: string): Promise<void> => {
		const newPost = postFactory(postCreationData, user_id);
		await this._postRepository.createPost(newPost);
	};
	editPostService = async (postEditionData: Omit<PostEntity, "user_id" | "created_at">, user_id: string): Promise<void> => {
		await this._postRepository.editPost(postEditionData, user_id);
	};
	deletePostService = async (user_id: string, post_id: string): Promise<void> => {
		await this._postRepository.deletePost(user_id, post_id);
	};
	loadMyPostsService = async (user_id: string, offset: number): Promise<PostEntity[]> => {
		const userPosts = await this._postRepository.loadMyPosts(user_id, offset);
		return userPosts;
	};
}
