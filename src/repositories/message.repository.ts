import { IMessageEntity } from "../entities/message.entity/message";
import { pool } from "../utils/db/db";
import { CustomError } from "../utils/errors/errors";

export class MessageRepository {
	//add delete all messages by chat_id
	static sendMessage = async (message: IMessageEntity): Promise<IMessageEntity> => {
		const { rows } = await pool.query("INSERT INTO messages (id, chat_id, text, created_at, send_by, picture, attachment, is_delivered) VALUES ($1, $2, $3, $4, $5, $6, $7, $8)", [message.id, message.chat_id, message.text, message.created_at, message.send_by, message.picture, message.attachment, message.is_delivered]);
		if (!rows[0]) {
			throw new CustomError("Ooops! Something Went wrong", 500, true);
		}
		return rows[0];
	};

	static loadMessages = async (chat_id: string, offset: number): Promise<IMessageEntity[]> => {
		const { rows } = await pool.query("SELECT id, chat_id, text, created_at, send_by, picture, attachment, is_delivered FROM messages WHERE chat_id = $1 LIMIT 50 OFFSET $2", [chat_id, offset]);
		return rows;
	};

	static deleteMessage = async (mess_id: string): Promise<void> => {
		await pool.query("DELETE FROM messages WHERE id = $1", [mess_id]);
	};

	static checkMessagesAsDelivered = async (chatId: string): Promise<void> => {
		await pool.query("UPDATE messages SET is_delivered = true WHERE chat_id = $1 RETURNING id, chat_id, text, created_at, send_by, picture, attachment, is_deliverd", [chatId]);
	};

	static getLastMessage = async (chat_id: string): Promise<IMessageEntity> => {
		const { rows } = await pool.query("SELECT id, chat_id, text, created_at, send_by, picture, attachment, is_delivered FROM messages WHERE chat_id = $1 AND created_at = (SELECT MAX(created_at) FROM messages WHERE chat_id = $1)", [chat_id]);
		return rows[0];
	};
}
