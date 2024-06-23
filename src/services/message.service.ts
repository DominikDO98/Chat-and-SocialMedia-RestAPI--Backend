import { messageFactory } from "../entities/message.entity/message.entity";
import { MessageCreationEntity, MessageEntity } from "../entities/message.entity/message.type";
import { checkMessageAsDeliveredRepo, deleteMessageRepo, loadMessagesRepo, sendMessageRepo } from "../repositories/message.repository";

export const sendMessageService = async (message: MessageCreationEntity, id: string): Promise<void> => {
	const newMessage = messageFactory(message, id);
	await sendMessageRepo(newMessage);
};

export const loadMessagesService = async (chat_id: string, offsetSeed: string): Promise<MessageEntity[]> => {
	const offset = Number(offsetSeed) * 50;
	const messages = await loadMessagesRepo(chat_id, offset);
	return messages;
};

export const deleteMessageService = async (mess_id: string): Promise<void> => {
	await deleteMessageRepo(mess_id);
};

export const checkMessageAsDeliveredService = async (mess_id: string): Promise<void> => {
	await checkMessageAsDeliveredRepo(mess_id);
};
