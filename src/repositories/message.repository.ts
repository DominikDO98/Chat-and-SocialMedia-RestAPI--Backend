import { TMessage } from "../entities/message.entity/message.type";
import { pool } from "../utils/db/db";

export class MessageRepository {
	//add delete all messages by chat_id
	static sendMessage = async (message: TMessage): Promise<void> => {
		await pool.query("INSERT INTO messages (id, chat_id, text, created_at, send_by, picture, attachment, is_delivered) VALUES ($1, $2, $3, $4, $5, $6, $7, $8)", [message.id, message.chat_id, message.text, message.created_at, message.send_by, message.picture, message.attachment, message.is_delivered]);
	};

	static loadMessages = async (chat_id: string, offset: number): Promise<TMessage[]> => {
		const { rows } = await pool.query("SELECT id, chat_id, text, created_at, send_by, picture, attachment, is_delivered FROM messages WHERE chat_id = $1 LIMIT 50 OFFSET $2", [chat_id, offset]);
		return rows;
	};

	static deleteMessage = async (mess_id: string): Promise<void> => {
		await pool.query("DELETE FROM messages WHERE id = $1", [mess_id]);
	};

	static checkMessagesAsDelivered = async (chatId: string): Promise<void> => {
		await pool.query("UPDATE messages SET is_delivered = true WHERE chat_id = $1", [chatId]);
	};
}
