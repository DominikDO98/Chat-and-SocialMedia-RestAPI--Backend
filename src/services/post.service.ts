import { postFactory } from "../entities/post.entity/post.entity";
import { CommentEntity, LikeEntity, PostEntity } from "../entities/post.entity/post.types";
import { addCommentRepo, createPostRepo, deleteCommentRepo, deletePostRepo, editCommentRepo, editPostRepo, giveLikeRepo, loadCommentsRepo, loadMyPostsRepo, removeLikeRepo } from "../repositories/post.repository";
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

export const removeLikeService = async (likeData: Omit<LikeEntity, "created_at">): Promise<boolean> => {
	const result = await removeLikeRepo(likeData);
	return result;
};

//comments
export const addCommentService = async (commentData: CommentEntity): Promise<boolean> => {
	let result: boolean = false;
	const comment = await addCommentRepo(commentData);
	if (!shallowEqual(comment, commentData)) {
		throw new CustomError("Unable to add comment", 500);
	} else {
		result = false;
	}
	return result;
};

export const editCommentService = async (commentChanges: Omit<CommentEntity, "created_at">): Promise<boolean> => {
	let result: boolean = false;
	const comment = await editCommentRepo(commentChanges);
	if (!shallowEqual(comment, commentChanges)) {
		throw new CustomError("Unable to edit comment, please try again later!", 500);
	} else {
		result = true;
	}
	return result;
};

export const deleteCommentService = async (ids: Pick<CommentEntity, "id" | "user_id" | "post_id">): Promise<boolean> => {
	const result = await deleteCommentRepo(ids);
	return result;
};

export const loadCommentsService = async (post_id: string, offset: number): Promise<CommentEntity[]> => {
	const comments = await loadCommentsRepo(post_id, offset);
	return comments;
};
