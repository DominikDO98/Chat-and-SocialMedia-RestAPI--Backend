import { MessageEntity } from "../entities/message.entity/message.type";
import { pool } from "../utils/db/db";

export const sendMessageRepo = async (message: MessageEntity): Promise<void> => {
	await pool.query("INSERT INTO messages (id, chat_id, text, created_at, send_by, picture, attachement, is_delivered) VALUES ($1, $2, $3, $4, $5, $6, $7, $8)", [message.id, message.chat_id, message.text, message.created_at, message.send_by, message.picture, message.attachment, message.is_delivered]);
};

export const loadMessagesRepo = async (chat_id: string, offset: number): Promise<MessageEntity[]> => {
	const { rows } = await pool.query("SELECT id, chat_id, text, created_at, send_by, picture, attachment, is_delivered WHERE chat_id = $1 LIMIT 50 OFFSET $2", [chat_id, offset]);
	return rows;
};
