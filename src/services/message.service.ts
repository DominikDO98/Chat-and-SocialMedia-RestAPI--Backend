import { messageFactory } from "../entities/message.entity/message.entity";
import { MessageCreationEntity, MessageEntity } from "../entities/message.entity/message.type";
import { MessageRepository } from "../repositories/message.repository";

export class MessageService {
	private _messageRepository = MessageRepository;
	constructor() {
		this._messageRepository;
	}
	sendMessageService = async (message: MessageCreationEntity, id: string): Promise<void> => {
		const newMessage = messageFactory(message, id);
		await this._messageRepository.sendMessage(newMessage);
	};

	loadMessagesService = async (chat_id: string, offsetSeed: string): Promise<MessageEntity[]> => {
		const offset = Number(offsetSeed) * 50;
		const messages = await this._messageRepository.loadMessages(chat_id, offset);
		return messages;
	};

	deleteMessageService = async (mess_id: string): Promise<void> => {
		await this._messageRepository.deleteMessage(mess_id);
	};

	checkMessagesAsDeliveredService = async (chatId: string): Promise<void> => {
		await this._messageRepository.checkMessagesAsDelivered(chatId);
	};
}
