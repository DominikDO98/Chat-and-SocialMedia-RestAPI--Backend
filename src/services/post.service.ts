import { postFactory } from "../entities/post.entity/post.entity";
import { PostEntity } from "../entities/post.entity/post.types";
import { createPostRepo, editPostRepo } from "../repositories/post.repository";
import { CustomError } from "../utils/errors/errors";
import { shallowEqual } from "../utils/shallowEqual/shallowEqual";

//posts
export const createPostService = async (postCreationData: Omit<PostEntity, "id" | "created_at">): Promise<boolean> => {
	let result: boolean = false;
	const newPost = postFactory(postCreationData);
	const newPostData = await createPostRepo(newPost);
	if (!shallowEqual(newPostData, postCreationData)) {
		throw new CustomError("Faild to upload the post", 500);
	} else {
		result = true;
	}
	return result;
};
export const editPostServie = async (postEditionData: Omit<PostEntity, "created_at" | "group_id">): Promise<boolean> => {
	let result: boolean = false;
	const editedPost = await editPostRepo(postEditionData);
	if (!shallowEqual(editedPost, postEditionData)) {
		throw new CustomError("Failed to edit the post", 500);
	} else {
		result = true;
	}
	return result;
};
