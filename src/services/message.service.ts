import { messageFactory } from "../entities/message.entity/message.entity";
import { MessageCreationEntity, MessageEntity } from "../entities/message.entity/message.type";
import { MessageRepository } from "../repositories/message.repository";

export class MessageService {
	private _messageRepository = MessageRepository;
	constructor() {
		this._messageRepository;
	}
	sendMessage = async (message: MessageCreationEntity, id: string): Promise<void> => {
		const newMessage = messageFactory(message, id);
		await this._messageRepository.sendMessage(newMessage);
	};

	loadMessages = async (chat_id: string, offsetSeed: string): Promise<MessageEntity[]> => {
		const offset = Number(offsetSeed) * 50;
		const messages = await this._messageRepository.loadMessages(chat_id, offset);
		return messages;
	};

	deleteMessage = async (mess_id: string): Promise<void> => {
		await this._messageRepository.deleteMessage(mess_id);
	};

	checkMessagesAsDelivered = async (chatId: string): Promise<void> => {
		await this._messageRepository.checkMessagesAsDelivered(chatId);
	};
}
