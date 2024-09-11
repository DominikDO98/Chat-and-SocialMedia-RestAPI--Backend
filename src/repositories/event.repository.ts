import { IEventEntity } from "../entities/event.entity/event.types";
import { TPost } from "../entities/post.entity/post.types";
import { pool } from "../utils/db/db";
import { CustomError, ValidationError } from "../utils/errors/errors";

export class EventRepository {
	static createEvent = async (postData: TPost, eventData: IEventEntity): Promise<void> => {
		const client = await pool.connect();
		try {
			await client.query("BEGIN;");
			await client.query("INSERT INTO posts (id, user_id, group_id, title, text, picture, attachment, created_at, type) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9);", [postData.id, postData.user_id, postData.group_id, postData.title, postData.text, postData.picture, postData.attachment, postData.created_at, postData.type]); //delete use post.repo
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

	static editEvent = async (postData: TPost, eventData: IEventEntity): Promise<void> => {
		const client = await pool.connect();
		try {
			await client.query("BEGIN;");
			await client.query("UPDATE posts SET title = COALESCE($1, title), text = COALESCE($2, text), picture = COALESCE($3, picture), attachment = COALESCE($4, attachment) WHERE id = $5 AND user_id = $6;", [postData.title, postData.text, postData.picture, postData.attachment, postData.id, postData.user_id]); //use post.repo
			await client.query("UPDATE events SET date = COALESCE($1, date), lat = COALESCE($2, lat), lon = COALESCE($3, lon) FROM posts WHERE events.post_id = posts.id AND posts.user_id = $4 AND events.post_id = $5;", [eventData.date, eventData.lat, eventData.lon, postData.user_id, eventData.post_id]);
			await client.query("COMMIT;");
		} catch (err) {
			console.log(err);
			client.query("ROLLBACK;");
			throw err;
		} finally {
			client.release();
		}
	};

	static joinEvent = async (user_id: string, event_id: string): Promise<void> => {
		await pool.query("INSERT INTO users_events (user_id, event_id) VALUES ($1, $2);", [user_id, event_id]);
	};
	static leaveEvent = async (user_id: string, event_id: string): Promise<void> => {
		await pool.query("DELETE FROM users_events WHERE user_id = $1 AND event_id = $2;", [user_id, event_id]);
	};
	static deleteEvent = async (user_id: string, event_id: string): Promise<void> => {
		const client = await pool.connect();
		try {
			await client.query("BEGIN;");
			const { rows } = await client.query("SELECT id FROM posts WHERE user_id = $1 AND id = $2 LIMIT 1", [user_id, event_id]);
			if (!rows[0]) {
				throw new ValidationError("Unauthorized post operation!", 401);
			}
			await client.query("DELETE FROM users_events WHERE event_id = $1;", [event_id]);
			await client.query("DELETE FROM likes WHERE post_id = $1;", [event_id]); //use likes
			await client.query("DELETE FROM comments WHERE post_id = $1;", [event_id]); //use comments
			await client.query("DELETE FROM events USING posts WHERE events.post_id = posts.id AND posts.user_id = $1 AND events.post_id = $2;", [user_id, event_id]);
			await client.query("DELETE FROM posts WHERE user_id = $1 AND id = $2;", [user_id, event_id]); //use posts
			await client.query("COMMIT;");
		} catch (err) {
			console.log(err);
			pool.query("ROLLBACK;");
			throw err;
		} finally {
			client.release();
		}
	};

	static loadEvent = async (event_id: string): Promise<IEventEntity> => {
		const { rows } = await pool.query("SELECT post_id, date, lat, lon, (SELECT COUNT (user_id) FROM users_events WHERE event_id = $1) as particiants FROM events WHERE post_id = $1", [event_id]);
		if (!rows[0]) {
			throw new CustomError("Sorry! We're unable to find any details on that event.", 404);
		}
		return rows[0];
	};
}
