import { postFactory } from "../entities/post.entity/post.entity";
import { PostEntity } from "../entities/post.entity/post.types";
import { createPostRepo, deletePostRepo, editPostRepo, loadMyPostsRepo } from "../repositories/post.repository";

//posts
export const createPostService = async (postCreationData: Omit<PostEntity, "id" | "user_id" | "created_at">, user_id: string): Promise<void> => {
	const newPost = postFactory(postCreationData, user_id);
	await createPostRepo(newPost);
};
export const editPostService = async (postEditionData: Omit<PostEntity, "user_id" | "created_at">, user_id: string): Promise<void> => {
	await editPostRepo(postEditionData, user_id);
};
export const deletePostService = async (user_id: string, post_id: string): Promise<void> => {
	await deletePostRepo(user_id, post_id);
};
export const loadMyPostsService = async (user_id: string, offset: number): Promise<PostEntity[]> => {
	const userPosts = await loadMyPostsRepo(user_id, offset);
	return userPosts;
};
