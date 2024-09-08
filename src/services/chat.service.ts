import { chatFactory } from "../entities/chat.entity/chat.entity";
import { TChat, TGroupChatData, TPrivateChatData } from "../entities/chat.entity/chat.type";
import { ChatRepository } from "../repositories/chat.repository";

export class ChatService {
	private _chatRepository = ChatRepository;
	constructor() {
		this._chatRepository;
	}
	createChat = async (conctact_id: string, chatData: Omit<TChat, "id">): Promise<void> => {
		const newChat = chatFactory(chatData);
		await this._chatRepository.createChat(conctact_id, newChat);
	};

	createGroupChat = async (userId: string, otherParticipants: string[], chatData: Omit<TChat, "id">): Promise<void> => {
		const participants = [userId, ...otherParticipants];
		const newChat = chatFactory(chatData);
		await this._chatRepository.createGroupChat(participants, newChat);
	};

	addUsersToGroup = async (participantsIds: string[], chat_id: string): Promise<void> => {
		await this._chatRepository.addUsersToGroup(participantsIds, chat_id);
	};

	changeChatName = async (chat_id: string, newName: string): Promise<void> => {
		await this._chatRepository.changeChatName(chat_id, newName);
	};

	loadPrivateChats = async (user_id: string): Promise<TPrivateChatData[]> => {
		const chats = await this._chatRepository.loadPrivateChats(user_id);
		return chats;
	};

	loadGroupChats = async (user_id: string): Promise<TGroupChatData[]> => {
		const chats = await this._chatRepository.loadGoupChats(user_id);
		return chats;
	};

	deleteGroupChat = async (chat_id: string): Promise<void> => {
		await this._chatRepository.deleteGroupChat(chat_id);
	};

	deleteUserFromGroup = async (user_id: string, chat_id: string): Promise<void> => {
		await this._chatRepository.deleteUserFromGroup(user_id, chat_id);
	};
}
