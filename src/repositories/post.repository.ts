import { CommentEntity, EventEntity, LikeEntity, PostEntity } from "../entities/post.entity/post.types";
import { pool } from "../utils/db/db";
import { CustomError } from "../utils/errors/errors";

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
export const deletePostRepo = async (user_id: string, post_id: string): Promise<boolean> => {
	let result: boolean = false;
	const client = await pool.connect();
	try {
		await client.query("BEGIN;");
		await client.query("DELETE FROM likes WHERE post_id = $2", [post_id]);
		await client.query("DELETE FROM comments WHERE post_id = $1", [post_id]);
		await client.query("DELETE FROM posts WHERE user_id = $1 AND id = $2", [user_id, post_id]);
		await client.query("COMMIT");
		result = true;
	} catch (err) {
		console.log(err);
		await client.query("ROLLBACK");
	} finally {
		client.release();
	}
	return result;
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
export const removeLike = async (likeData: Omit<LikeEntity, "created_at">) => {
	let result: boolean = false;
	try {
		await pool.query("DELETE FROM likes WHERE id = $1 AND user_id = $2 AND post_id = $3", [likeData.id, likeData.user_id, likeData.post_id]);
		result = true;
	} catch (err) {
		console.log(err);
	}
	return result;
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
export const deleteCommentRepo = async (ids: Pick<CommentEntity, "id" | "user_id" | "post_id">): Promise<boolean> => {
	let result: boolean = false;
	try {
		await pool.query("DELETE FROM comments WHERE id = $1 AND user_id = $2 AND post_id = $3", [ids.id, ids.user_id, ids.post_id]);
		result = true;
	} catch (err) {
		console.log(err);
	}
	return result;
};

//events
export const createEventRepo = async (eventData: EventEntity): Promise<false | EventEntity> => {
	let result: EventEntity | false = false;
	const client = await pool.connect();
	try {
		await client.query("BEGIN;");
		await client.query("INSERT INTO posts (id, user_id, group_id, title, text, picture, attachment, created_at, type) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9);", [eventData.id, eventData.user_id, eventData.group_id, eventData.title, eventData.text, eventData.picture, eventData.attachment, eventData.created_at, eventData.type]);
		await client.query("INSERT INTO events (post_id, date, lat, lon) VALUES ($1, $2, $3, $4);", [eventData.id, eventData.date, eventData.lat, eventData.lon]);
		await client.query("COMMIT;");
		const { rows } = await pool.query("SELECT id, user_id, group_id, title, text, picture, attachment, created_at, type, date, lat, lon FROM posts FULL JOIN events ON posts.id = events.post_id WHERE id = $1; ", [eventData.id]);
		result = {
			...rows[0],
			lat: Number(rows[0].lat),
			lon: Number(rows[0].lon),
		};
	} catch (err) {
		console.log(err);
		await client.query("ROLLBACK;");
	} finally {
		client.release();
	}
	return result;
};

export const editEventRepo = async (eventData: EventEntity): Promise<EventEntity | false> => {
	let result: EventEntity | false = false;
	const client = await pool.connect();
	try {
		await client.query("BEGIN;");
		await client.query("UPDATE posts SET title = $1, text = $2, picture = $3, attachment = $4 WHERE id = $5 AND user_id = $6;", [eventData.title, eventData.text, eventData.picture, eventData.attachment, eventData.id, eventData.user_id]);
		await client.query("UPDATE events SET date = $1, lat = $2, lon = $3 FROM posts WHERE events.post_id = posts.id AND posts.user_id = $4 AND events.post_id = $5;", [eventData.date, eventData.lat, eventData.lon, eventData.user_id, eventData.id]);
		await client.query("COMMIT;");
		const { rows } = await pool.query("SELECT id, user_id, group_id, title, text, picture, attachment, created_at, type, date, lat, lon FROM posts FULL JOIN events ON posts.id = events.post_id WHERE id = $1; ", [eventData.id]);
		console.log(rows[0]);

		result = {
			...rows[0],
			lat: Number(rows[0].lat),
			lon: Number(rows[0].lon),
		};
	} catch (err) {
		console.log(err);
		await client.query("ROLLBACK;");
	} finally {
		client.release();
	}
	return result;
};

export const joinEventRepo = async (user_id: string, event_id: string): Promise<boolean> => {
	let result: boolean = false;
	try {
		await pool.query("INSERT INTO users_event (user_id, event_id) VALUES ($1, $2);", [user_id, event_id]);
		result = true;
	} catch (err) {
		console.log(err);
	}
	return result;
};
export const leaveEventRepo = async (user_id: string, event_id: string): Promise<boolean> => {
	let result: boolean = false;
	try {
		await pool.query("DELETE FROM users_event WHERE user_id = $1 AND event_id = $2;", [user_id, event_id]);
		result = true;
	} catch (err) {
		console.log(err);
	}
	return result;
};
export const deleteEventRepo = async (user_id: string, event_id: string): Promise<boolean> => {
	let result: boolean = false;
	const client = await pool.connect();
	try {
		await client.query("BEGIN;");
		await client.query("DELETE FROM users_event WHERE user_id = $1 AND event_id = $2;", [user_id, event_id]);
		await client.query("DELETE FROM likes WHERE post_id = $1;", [event_id]);
		await client.query("DELETE FROM comments WHERE post_id = $1;", [event_id]);
		await client.query("DELETE FROM events USING posts WHERE events.post_id = posts.id AND posts.user_id =  $1 AND events.post_id = $2;", [user_id, event_id]);
		await client.query("DELETE FROM posts WHERE user_id = $1 AND id = $2;", [user_id, event_id]);
		await client.query("COMMIT;");
		result = true;
	} catch (err) {
		console.log(err);
		await pool.query("ROLLBACK;");
	} finally {
		client.release();
	}
	return result;
};
