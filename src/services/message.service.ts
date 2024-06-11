import { messageFactory } from "../entities/message.entity/message.entity";
import { MessageEntity } from "../entities/message.entity/message.type";
import { loadMessagesRepo, sendMessageRepo } from "../repositories/message.repository";

export const sendMessageService = async (message: Omit<MessageEntity, "id" | "created_at" | "is_delivered" | "send_by">, id: string): Promise<void> => {
	const newMessage = messageFactory(message, id);
	await sendMessageRepo(newMessage);
};

export const loadMessagesService = async (chat_id: string, offsetSeed: number): Promise<MessageEntity[]> => {
	const offset = offsetSeed * 50;
	const messages = await loadMessagesRepo(chat_id, offset);
	return messages;
};
