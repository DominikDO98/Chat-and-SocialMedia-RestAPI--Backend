import { IEventEntity } from "../entities/event.entity/event";
import { pool } from "../utils/db/db";
import { CustomError } from "../utils/errors/errors";

export class EventRepository {
	static createEvent = async (eventData: IEventEntity): Promise<IEventEntity> => {
		const { rows } = await pool.query("INSERT INTO events (post_id, date, lat, lon) VALUES ($1, $2, $3, $4) RETURNING post_id, date, lat, lon", [eventData.post_id, eventData.date, eventData.lat, eventData.lon]);
		return rows[0];
	};

	static editEvent = async (eventData: IEventEntity): Promise<IEventEntity> => {
		const { rows } = await pool.query("UPDATE events SET date = COALESCE($2, date), lat = COALESCE($3, lat), lon = COALESCE($4, lon) WHERE post_id = $1 RETURNING post_id, date, lat, lon", [eventData.post_id, eventData.date, eventData.lat, eventData.lon]);
		console.log(eventData.post_id);

		return rows[0];
	};
	static countParticipants = async (event_id: string): Promise<number> => {
		const { rows } = await pool.query("SELECT COUNT(user_id) FROM users_events WHERE event_id = $1", [event_id]);
		return rows[0];
	};
	static joinEvent = async (user_id: string, event_id: string): Promise<void> => {
		await pool.query("INSERT INTO users_events (user_id, event_id) VALUES ($1, $2);", [user_id, event_id]);
	};
	static leaveEvent = async (user_id: string, event_id: string): Promise<void> => {
		await pool.query("DELETE FROM users_events WHERE user_id = $1 AND event_id = $2;", [user_id, event_id]);
	};
	static deleteEvent = async (user_id: string, post_id: string): Promise<void> => {
		await pool.query("DELETE FROM events WHERE post_id = $1", [post_id]);
	};

	static loadEvent = async (event_id: string): Promise<IEventEntity> => {
		const { rows } = await pool.query("SELECT post_id, date, lat, lon, (SELECT COUNT (user_id) FROM users_events WHERE event_id = $1) as particiants FROM events WHERE post_id = $1", [event_id]);
		if (!rows[0]) {
			throw new CustomError("Sorry! We're unable to find any details on that event.", 404);
		}
		return rows[0];
	};
}
