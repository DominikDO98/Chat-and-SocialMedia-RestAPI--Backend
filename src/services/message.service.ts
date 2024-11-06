import { IMessageDTO, TCreateMessage } from "../entities/message.entity/message";
import { MessageDTO } from "../entities/message.entity/message.dto";
import { MessageEntity } from "../entities/message.entity/message.entity";
import { AuthRepository } from "../repositories/auth.repository";
import { MessageRepository } from "../repositories/message.repository";
import { AuthUtils } from "../utils/authenticationUtils/authUtils";

export class MessageService {
	private _messageRepository = MessageRepository;
	private _authRepository = AuthRepository;
	sendMessage = async (message: TCreateMessage, userId: string): Promise<IMessageDTO> => {
		const id = AuthUtils.uuid();
		const createAt = new Date();
		const newMessage = new MessageEntity(id, message, createAt, userId);
		const sender = await this._authRepository.getUsernameById(userId);
		const entity = await this._messageRepository.sendMessage(newMessage);
		const dto = MessageDTO.createDTO(entity, sender, true);
		return dto;
	};

	loadMessages = async (chatId: string, offsetSeed: string, userId: string): Promise<IMessageDTO[]> => {
		const offset = Number(offsetSeed) * 50;
		const messages = await this._messageRepository.loadMessages(chatId, offset);
		const dtos = await Promise.all(
			messages.map(async (message) => {
				const sender = await this._authRepository.getUsernameById(message.send_by);
				const dto = MessageDTO.createDTO(message, sender, userId === message.send_by);
				return dto;
			}),
		);
		return dtos;
	};

	deleteMessage = async (mess_id: string): Promise<void> => {
		await this._messageRepository.deleteMessage(mess_id);
	};
	getLastMessage = async (chatId: string, userId: string): Promise<IMessageDTO | undefined> => {
		const mess = await this._messageRepository.getLastMessage(chatId);
		if (!mess) return undefined;
		const sender = await this._authRepository.getUsernameById(mess.send_by);
		const dto = MessageDTO.createDTO(mess, sender, mess.send_by === userId);
		return dto;
	};
	checkMessagesAsDelivered = async (chatId: string): Promise<void> => {
		await this._messageRepository.checkMessagesAsDelivered(chatId);
	};
}
