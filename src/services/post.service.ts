import { commentFactory } from "../entities/post.entity/comment.entity";
import { eventFactory } from "../entities/post.entity/event.entity";
import { likeFactory } from "../entities/post.entity/like.entity";
import { postFactory } from "../entities/post.entity/post.entity";
import { CommentEntity, EventEntity, LikeEntity, PostEntity } from "../entities/post.entity/post.types";
import { addCommentRepo, createEventRepo, createPostRepo, deleteCommentRepo, deleteEventRepo, deletePostRepo, editCommentRepo, editEventRepo, editPostRepo, giveLikeRepo, joinEventRepo, leaveEventRepo, loadCommentsRepo, loadMyPostsRepo, removeLikeRepo } from "../repositories/post.repository";

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

//likes
export const giveLikeService = async (likeData: Omit<LikeEntity, "user_id">, user_id: string): Promise<void> => {
	const newLike = likeFactory(likeData, user_id);
	await giveLikeRepo(newLike);
};

export const removeLikeService = async (likeData: Omit<LikeEntity, "user_id" | "created_at">, user_id: string): Promise<void> => {
	const likeToDelete = likeFactory(likeData, user_id);
	await removeLikeRepo(likeToDelete);
};

//comments
export const addCommentService = async (commentData: Omit<CommentEntity, "user_id">, user_id: string): Promise<void> => {
	const newComment = commentFactory(commentData, user_id);
	await addCommentRepo(newComment);
};

export const editCommentService = async (commentChanges: Omit<CommentEntity, "user_id" | "created_at">, user_id: string): Promise<void> => {
	const editedComment = commentFactory(commentChanges, user_id);
	await editCommentRepo(editedComment);
};

export const deleteCommentService = async (commentIds: Pick<CommentEntity, "id" | "post_id">, user_id: string): Promise<void> => {
	const ids = {
		...commentIds,
		user_id: user_id,
	};
	await deleteCommentRepo(ids);
};

export const loadCommentsService = async (post_id: string, offset: number): Promise<CommentEntity[]> => {
	const comments = await loadCommentsRepo(post_id, offset);
	return comments;
};

//events
export const createEventService = async (postData: Omit<PostEntity, "user_id">, eventData: EventEntity, user_id: string): Promise<void> => {
	const newPost = postFactory(postData, user_id);
	const newEvent = eventFactory(eventData);
	await createEventRepo(newPost, newEvent);
};

export const editEventService = async (postData: Omit<PostEntity, "user_id">, eventData: EventEntity, user_id: string): Promise<void> => {
	const newPost = postFactory(postData, user_id);
	const newEvent = eventFactory(eventData);
	await editEventRepo(newPost, newEvent);
};

export const joinEventService = async (user_id: string, event_id: string): Promise<void> => {
	await joinEventRepo(user_id, event_id);
};

export const leaveEventService = async (user_id: string, event_id: string): Promise<void> => {
	await leaveEventRepo(user_id, event_id);
};

export const deleteEventService = async (user_id: string, event_id: string): Promise<void> => {
	await deleteEventRepo(user_id, event_id);
};
