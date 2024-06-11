import { messageFactory } from "../entities/message.entity/message.entity";
import { MessageEntity } from "../entities/message.entity/message.type";
import { sendMessageRepo } from "../repositories/message.repository";

export const sendMessageService = async (message: Omit<MessageEntity, "id" | "created_at" | "is_delivered" | "send_by">, id: string): Promise<void> => {
	const newMessage = messageFactory(message, id);
	await sendMessageRepo(newMessage);
};
