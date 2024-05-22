import { CommentEntity, EventEntity, LikeEntity, PostEntity } from "../entities/post.entity/post.types";
import { pool } from "../utils/db/db";

//posts
export const createPostRepo = async (postCreationData: PostEntity): Promise<void> => {
	await pool.query("INSERT INTO posts (id, user_id, group_id, title, text, picture, attachment, created_at, type) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9) ", [postCreationData.id, postCreationData.user_id, postCreationData.group_id, postCreationData.title, postCreationData.text, postCreationData.picture, postCreationData.attachment, postCreationData.created_at, postCreationData.type]);
};
export const editPostRepo = async (postEdtionData: Omit<PostEntity, "created_at" | "group_id" | "user_id">, user_id: string): Promise<void> => {
	await pool.query("UPDATE posts SET title = $1, text = $2, picture = $3, attachment = $4 WHERE id = $5 AND user_id = $6 ", [postEdtionData.title, postEdtionData.text, postEdtionData.picture, postEdtionData.attachment, postEdtionData.id, user_id]);
};
export const deletePostRepo = async (user_id: string, post_id: string): Promise<void> => {
	const client = await pool.connect();
	try {
		await client.query("BEGIN;");
		await client.query("DELETE FROM likes WHERE post_id = $1", [post_id]);
		await client.query("DELETE FROM comments WHERE post_id = $1", [post_id]);
		await client.query("DELETE FROM posts WHERE user_id = $1 AND id = $2", [user_id, post_id]);
		await client.query("COMMIT");
	} catch (err) {
		console.log(err);
		client.query("ROLLBACK");
		throw err;
	} finally {
		client.release();
	}
};

export const loadMyPostsRepo = async (user_id: string, offset: number): Promise<PostEntity[]> => {
	const { rows } = await pool.query(
		"SELECT posts.id, posts.group_id, posts.title, posts.text, posts.picture, posts.attachment, posts.created_at, posts.type, (SELECT COUNT(user_id) FROM likes WHERE post_id = posts.id) AS likes, comments.id AS commentid, comments.text AS commenttext, comments.picture AS commentpicture, comments.attachment AS commentattachment, comments.created_at AS commentcreated_at, (SELECT username FROM users WHERE id = comments.user_id) AS commentusername FROM posts  FULL JOIN comments ON posts.id = comments.post_id WHERE posts.user_id = $1 ORDER BY posts.created_at DESC LIMIT 10 OFFSET $2",
		[user_id, offset],
	);
	return rows;
};

//likes
export const giveLikeRepo = async (likeData: LikeEntity): Promise<void> => {
	await pool.query("INSERT INTO likes (user_id, post_id) VALUES ($1, $2)", [likeData.user_id, likeData.post_id]);
};
export const removeLikeRepo = async (likeData: Omit<LikeEntity, "created_at" | "user_id">, user_id: string): Promise<void> => {
	await pool.query("DELETE FROM likes WHERE post_id = $1 AND user_id = $2", [likeData.post_id, user_id]);
};

//comments
export const addCommentRepo = async (commentData: CommentEntity): Promise<void> => {
	await pool.query("INSERT INTO comments (id, post_id, user_id, text, picture, attachment, created_at) VALUES ($1, $2, $3, $4, $5, $6, $7) RETURNING id, post_id, user_id, text, picture, attachment, created_at", [commentData.id, commentData.post_id, commentData.user_id, commentData.text, commentData.picture, commentData.attachment, commentData.created_at]);
};

export const editCommentRepo = async (commentChanges: Omit<CommentEntity, "created_at" | "post_id" | "user_id">, user_id: string): Promise<void> => {
	await pool.query("UPDATE comments SET text = $1, picture = $2, attachment = $3 WHERE id = $4 AND user_id = $5 AND id = $6 ", [commentChanges.text, commentChanges.picture, commentChanges.attachment, commentChanges.id, user_id, commentChanges.id]);
};
export const deleteCommentRepo = async (ids: Pick<CommentEntity, "id" | "user_id">): Promise<void> => {
	await pool.query("DELETE FROM comments WHERE id = $1 AND user_id = $2", [ids.id, ids.user_id]);
};

export const loadCommentsRepo = async (post_id: string, offset: number): Promise<CommentEntity[]> => {
	const { rows } = await pool.query("SELECT comments.id, text, picture, attachment, created_at, username FROM comments FULL JOIN users ON comments.user_id = users.id WHERE post_id = $1 LIMIT 10 OFFSET $2", [post_id, offset]);
	return rows;
};

//events
export const createEventRepo = async (postData: PostEntity, eventData: EventEntity): Promise<void> => {
	const client = await pool.connect();
	try {
		await client.query("BEGIN;");
		await client.query("INSERT INTO posts (id, user_id, group_id, title, text, picture, attachment, created_at, type) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9);", [postData.id, postData.user_id, postData.group_id, postData.title, postData.text, postData.picture, postData.attachment, postData.created_at, postData.type]);
		await client.query("INSERT INTO events (post_id, date, lat, lon) VALUES ($1, $2, $3, $4);", [eventData.post_id, eventData.date, eventData.lat, eventData.lon]);
		await client.query("COMMIT;");
	} catch (err) {
		console.log(err);
		client.query("ROLLBACK;");
		throw err;
	} finally {
		client.release();
	}
};

export const editEventRepo = async (postData: PostEntity, eventData: EventEntity): Promise<void> => {
	const client = await pool.connect();
	try {
		await client.query("BEGIN;");
		await client.query("UPDATE posts SET title = $1, text = $2, picture = $3, attachment = $4 WHERE id = $5 AND user_id = $6;", [postData.title, postData.text, postData.picture, postData.attachment, postData.id, postData.user_id]);
		await client.query("UPDATE events SET date = $1, lat = $2, lon = $3 FROM posts WHERE events.post_id = posts.id AND posts.user_id = $4 AND events.post_id = $5;", [eventData.date, eventData.lat, eventData.lon, postData.user_id, eventData.post_id]);
		await client.query("COMMIT;");
	} catch (err) {
		console.log(err);
		client.query("ROLLBACK;");
		throw err;
	} finally {
		client.release();
	}
};

export const joinEventRepo = async (user_id: string, event_id: string): Promise<void> => {
	await pool.query("INSERT INTO users_events (user_id, event_id) VALUES ($1, $2);", [user_id, event_id]);
};
export const leaveEventRepo = async (user_id: string, event_id: string): Promise<void> => {
	await pool.query("DELETE FROM users_events WHERE user_id = $1 AND event_id = $2;", [user_id, event_id]);
};
export const deleteEventRepo = async (user_id: string, event_id: string): Promise<void> => {
	const client = await pool.connect();
	try {
		await client.query("BEGIN;");
		await client.query("DELETE FROM users_events WHERE user_id = $1 AND event_id = $2;", [user_id, event_id]);
		await client.query("DELETE FROM likes WHERE post_id = $1;", [event_id]);
		await client.query("DELETE FROM comments WHERE post_id = $1;", [event_id]);
		await client.query("DELETE FROM events USING posts WHERE events.post_id = posts.id AND posts.user_id = $1 AND events.post_id = $2;", [user_id, event_id]);
		await client.query("DELETE FROM posts WHERE user_id = $1 AND id = $2;", [user_id, event_id]);
		await client.query("COMMIT;");
	} catch (err) {
		console.log(err);
		pool.query("ROLLBACK;");
		throw err;
	} finally {
		client.release();
	}
};
