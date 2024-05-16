import { postFactory } from "../entities/post.entity/post.entity";
import { LikeEntity, PostEntity } from "../entities/post.entity/post.types";
import { createPostRepo, deletePostRepo, editPostRepo, giveLikeRepo, loadMyPostsRepo } from "../repositories/post.repository";
import { CustomError } from "../utils/errors/errors";
import { shallowEqual } from "../utils/shallowEqual/shallowEqual";

//posts
export const createPostService = async (postCreationData: Omit<PostEntity, "id" | "created_at">): Promise<boolean> => {
	let result: boolean = false;
	const newPost = postFactory(postCreationData);
	const newPostData = await createPostRepo(newPost);
	if (!shallowEqual(newPostData, postCreationData)) {
		throw new CustomError("Failed to upload the post", 500);
	} else {
		result = true;
	}
	return result;
};
export const editPostService = async (postEditionData: Omit<PostEntity, "created_at">): Promise<boolean> => {
	let result: boolean = false;
	const editedPost = await editPostRepo(postEditionData);
	if (!shallowEqual(editedPost, postEditionData)) {
		throw new CustomError("Failed to edit the post", 500);
	} else {
		result = true;
	}
	return result;
};
export const deletePostService = async (user_id: string, post_id: string): Promise<boolean> => {
	const result = deletePostRepo(user_id, post_id);
	return result;
};
export const loadMyPostsService = async (user_id: string, offset: number): Promise<PostEntity[]> => {
	const userPosts = await loadMyPostsRepo(user_id, offset);
	return userPosts;
};

//likes
export const giveLikeService = async (likeData: LikeEntity): Promise<boolean> => {
	let result: boolean = false;
	const like = await giveLikeRepo(likeData);
	if (!shallowEqual(like, likeData)) {
		throw new CustomError("Unable to govre like to this post", 500);
	} else {
		result = true;
	}
	return result;
};
