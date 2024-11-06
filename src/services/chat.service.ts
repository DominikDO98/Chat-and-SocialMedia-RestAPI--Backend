import { IChatDTO } from "../entities/chat.entity/chat";
import { ChatDTO } from "../entities/chat.entity/chat.dto";
import { ChatEntity } from "../entities/chat.entity/chat.entity";
import { IProfileDTO } from "../entities/profile.entity/profile";
import { AuthRepository } from "../repositories/auth.repository";
import { ChatRepository } from "../repositories/chat.repository";
import { AuthUtils } from "../utils/authenticationUtils/authUtils";
import { CustomError, ValidationError } from "../utils/errors/errors";
import { ContactService } from "./contact.service";
import { MessageService } from "./message.service";
import { ProfileService } from "./profile.service";

export class ChatService {
	private _chatRepository = ChatRepository;
	private _authRepository = AuthRepository;
	private _messageService = new MessageService();
	private _profileService = new ProfileService();
	private _contactService = new ContactService();

	createPrivateChat = async (contactId: string, userId: string, name?: string): Promise<ChatDTO> => {
		if (await this._contactService.checkIfHasChat(contactId)) {
			throw new ValidationError("Chat for that contact was already created", 401, false);
		}
		const id = AuthUtils.uuid();
		const newChat = new ChatEntity(id, false, name);
		console.log(newChat);
		const chatData = await this._chatRepository
			.createPrivateChat(contactId, newChat)
			.then(async (chat) => {
				await this._contactService.addChat(contactId, chat.id);
				return chat;
			})
			.then(async (chat) => {
				const firstMessage = await this._messageService.sendMessage({ chatId: chat.id, text: "New chat created" }, userId);
				return {
					chat: chat,
					message: firstMessage,
				};
			})
			.catch((err) => {
				console.log(err);
				throw new CustomError("Chat createtion was unsuccesful", 500);
			});
		const senderUsername = await this._authRepository.getUsernameById(userId);
		const profile = await this._profileService.loadProfileByChat(chatData.chat.id, userId);
		console.log("profile", profile);
		const dto = ChatDTO.createDTO(chatData.chat, senderUsername, chatData.message, profile);
		return dto;
	};

	createGroupChat = async (userId: string, participants: string[], name?: string): Promise<ChatDTO> => {
		const id = AuthUtils.uuid();
		const newChat = new ChatEntity(id, true, name);
		const chat = await this._chatRepository.createGroupChat(newChat, participants);
		await this._chatRepository.addUsersToGroup(participants, id);
		const sender = await this._authRepository.getUsernameById(userId);
		const dto = ChatDTO.createDTO(chat, sender);
		console.log(dto);

		return dto;
	};

	addUsersToGroup = async (participantsIds: string[], chatId: string): Promise<IProfileDTO[]> => {
		await this._chatRepository.addUsersToGroup(participantsIds, chatId);
		const participantsProfiles = await this._profileService.loadChatParticipants(chatId);
		return participantsProfiles;
	};

	changeChatName = async (chatId: string, newName: string, userId: string): Promise<IChatDTO> => {
		const chat = await this._chatRepository.getChat(chatId);
		chat.name = newName;
		const editedChat = await this._chatRepository.updateName(chat);
		const sender = await this._authRepository.getLastMessageSenderUsername(chatId);
		const lastMessage = await this._messageService.getLastMessage(chatId, userId);
		const dto = ChatDTO.createDTO(editedChat, sender, lastMessage);
		return dto;
	};

	loadPrivateChats = async (userId: string): Promise<IChatDTO[]> => {
		const chats = await this._chatRepository.loadChats(userId, false);
		const dtos = await Promise.all(
			chats.map(async (chat) => {
				console.log("chat.id", chat.id);

				const sender = await this._authRepository.getLastMessageSenderUsername(chat.id);
				const lastMessage = await this._messageService.getLastMessage(chat.id, userId);
				const profile = await this._profileService.loadProfileByChat(chat.id, userId);
				console.log("chat service", profile);
				return ChatDTO.createDTO(chat, sender, lastMessage, profile);
			}),
		);
		return dtos;
	};

	loadGroupChats = async (userId: string): Promise<IChatDTO[]> => {
		const chats = await this._chatRepository.loadChats(userId, true);
		const dtos = await Promise.all(
			chats.map(async (chat) => {
				const sender = await this._authRepository.getLastMessageSenderUsername(chat.id);
				const lastMessage = await this._messageService.getLastMessage(chat.id, userId);
				return ChatDTO.createDTO(chat, sender, lastMessage);
			}),
		);
		return dtos;
	};

	deleteGroupChat = async (chatId: string): Promise<void> => {
		await this._chatRepository.deleteChat(chatId);
	};

	deleteUserFromGroup = async (participantsIds: string[], chatId: string): Promise<void> => {
		await this._chatRepository.deleteUsersFromGroup(participantsIds, chatId);
	};
}
