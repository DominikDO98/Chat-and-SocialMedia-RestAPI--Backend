import { CommentEntity, EventEntity, LikeEntity, PostEntity } from "../entities/post.entity/post.types";
import { pool } from "../utils/db/db";
import { CustomError } from "../utils/errors/errors";
//TODO: add client to all transactions
//posts
export const createPostRepo = async (postCreationData: PostEntity): Promise<PostEntity> => {
	const { rows } = await pool.query("INSERT INTO posts (id, user_id, group_id, title, text, picture, attachment, created_at, type) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9) RETURNING id, user_id, group_id, title, text, picture, attachment, created_at, type", [postCreationData.id, postCreationData.user_id, postCreationData.group_id, postCreationData.title, postCreationData.text, postCreationData.picture, postCreationData.attachment, postCreationData.created_at, postCreationData.type]);
	if (!rows[0]) {
		throw new CustomError("Upload failed!", 500);
	}
	const post: PostEntity = {
		...rows[0],
	};

	return post;
};
export const editPostRepo = async (postEdtionData: Omit<PostEntity, "created_at" | "group_id">): Promise<PostEntity> => {
	const { rows } = await pool.query("UPDATE posts SET title = $1, text = $2, picture = $3, attachment = $4 WHERE id = $5 AND user_id = $6 RETURNING id, user_id, group_id, title, text, picture, attachment, created_at, type", [postEdtionData.title, postEdtionData.text, postEdtionData.picture, postEdtionData.attachment, postEdtionData.id, postEdtionData.user_id]);
	if (!rows[0]) {
		throw new CustomError("Failed to edit post! Please try again later", 500);
	}
	const post: PostEntity = {
		...rows[0],
	};

	return post;
};
//@TODO: turn into transactions and delete like and comments also
export const deletePostRepo = async (postDeletionData: Pick<PostEntity, "id" | "user_id">): Promise<boolean> => {
	await pool.query("DELETE FROM posts WHERE id = $1 AND user_id = $2", [postDeletionData.id, postDeletionData.user_id]);
	return true;
};
//likes
export const giveLike = async (likeData: LikeEntity): Promise<LikeEntity> => {
	const { rows } = await pool.query("INSERT INTO likes (id, user_id, post_id, created_at) VALUES ($1, $2, $3, $4) RETURNING id, user_id, post_id, created_at", [likeData.id, likeData.user_id, likeData.post_id, likeData.created_at]);
	if (!rows[0]) {
		throw new CustomError("Unable to give like to this post", 500);
	}
	const like: LikeEntity = {
		...rows[0],
	};
	return like;
};
//@TODO: turn into transactions and delete like and comments also
export const removeLike = async (likeData: Omit<LikeEntity, "created_at">) => {
	await pool.query("DELETE FROM likes WHERE id = $1 AND user_id = $2 AND post_id = $3", [likeData.id, likeData.user_id, likeData.post_id]);

	return true;
};

//comments
export const addComment = async (commentData: CommentEntity): Promise<CommentEntity> => {
	const { rows } = await pool.query("INSERT INTO comments (id, post_id, user_id, text, picture, attachment, created_at) VALUES ($1, $2, $3, $4, $5, $6, $7) RETURNING id, post_id, user_id, text, picture, attachment, created_at", [commentData.id, commentData.post_id, commentData.user_id, commentData.text, commentData.picture, commentData.attachment, commentData.created_at]);
	if (!rows[0]) {
		throw new CustomError("Unable to add comment", 500);
	}
	const comment: CommentEntity = {
		...rows[0],
	};
	return comment;
};

export const editCommentRepo = async (commentChanges: Omit<CommentEntity, "created_at">): Promise<CommentEntity> => {
	const { rows } = await pool.query("UPDATE comments SET text = $1, picture = $2, attachment = $3 WHERE id = $4 AND user_id = $5 AND post_id = $6 RETURNING id, post_id, user_id, text, picture, attachment, created_at", [commentChanges.text, commentChanges.picture, commentChanges.attachment, commentChanges.id, commentChanges.user_id, commentChanges.post_id]);
	if (!rows[0]) {
		throw new CustomError("Unable to add comment", 500);
	}
	const comment: CommentEntity = {
		...rows[0],
	};
	return comment;
};
//@TODO: turn into transactions and delete like and comments also
export const deleteCommentRepo = async (ids: Pick<CommentEntity, "id" | "user_id" | "post_id">): Promise<boolean> => {
	await pool.query("DELETE FROM comments WHERE id = $1 AND user_id = $2 AND post_id = $3", [ids.id, ids.user_id, ids.post_id]);
	return true;
};

//events
//TODO: add client to all transacntion
export const createEventRepo = async (eventData: EventEntity): Promise<false | EventEntity> => {
	let result: EventEntity | false = false;
	try {
		await pool.query("BEGIN;");
		await pool.query("INSERT INTO posts (id, user_id, group_id, title, text, picture, attachment, created_at, type) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9);", [eventData.id, eventData.user_id, eventData.group_id, eventData.title, eventData.text, eventData.picture, eventData.attachment, eventData.created_at, eventData.type]);
		await pool.query("INSERT INTO events (post_id, date, lat, lon) VALUES ($1, $2, $3, $4);", [eventData.id, eventData.date, eventData.lat, eventData.lon]);
		await pool.query("COMMIT;");
		const { rows } = await pool.query("SELECT id, user_id, group_id, title, text, picture, attachment, created_at, type, date, lat, lon FROM posts FULL JOIN events ON posts.id = events.post_id WHERE id = $1; ", [eventData.id]);
		result = {
			...rows[0],
			lat: Number(rows[0].lat),
			lon: Number(rows[0].lon),
		};
	} catch (err) {
		console.log(err);
		await pool.query("ROLLBACK;");
	}
	return result;
};

export const editEventRepo = async (eventData: EventEntity): Promise<EventEntity | false> => {
	let result: EventEntity | false = false;
	try {
		await pool.query("BEGIN;");
		await pool.query("UPDATE posts SET title = $1, text = $2, picture = $3, attachment = $4 WHERE id = $5 AND user_id = $6;", [eventData.title, eventData.text, eventData.picture, eventData.attachment, eventData.id, eventData.user_id]);
		await pool.query("UPDATE events SET date = $1, lat = $2, lon = $3 FROM posts WHERE events.post_id = posts.id AND posts.user_id = $4 AND events.post_id = $5;", [eventData.date, eventData.lat, eventData.lon, eventData.user_id, eventData.id]);
		await pool.query("COMMIT;");
		const { rows } = await pool.query("SELECT id, user_id, group_id, title, text, picture, attachment, created_at, type, date, lat, lon FROM posts FULL JOIN events ON posts.id = events.post_id WHERE id = $1; ", [eventData.id]);
		result = {
			...rows[0],
			lat: Number(rows[0].lat),
			lon: Number(rows[0].lon),
		};
	} catch (err) {
		console.log(err);
		await pool.query("ROLLBACK;");
	}
	return result;
};

export const joinEventRepo = async (user_id: string, event_id: string) => {
	await pool.query("INSERT INTO user_events (user_id, event_id) VALUES ($1, $2);", [user_id, event_id]);
};
