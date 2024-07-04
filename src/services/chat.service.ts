import { chatFactory } from "../entities/chat.entity/chat.entity";
import { ChatEntity, GroupChatDataEnitity, PrivateChatDataEntity } from "../entities/chat.entity/chat.type";
import { ChatRepository } from "../repositories/chat.repository";

export class ChatService {
	private _chatRepository = ChatRepository;
	constructor() {
		this._chatRepository;
	}
	createChat = async (conctact_id: string, chatData: Omit<ChatEntity, "id">): Promise<void> => {
		const newChat = chatFactory(chatData);
		await this._chatsitory.createChat(conctact_id, newChat);
	};

	createGroupChat = async (userId: string, otherParticipants: string[], chatData: Omit<ChatEntity, "id">): Promise<void> => {
		const participants = [userId, ...otherParticipants];
		const newChat = chatFactory(chatData);
		await this._chatsitory.createGroupChat(participants, newChat);
	};

	addUsersToGroup = async (participantsIds: string[], chat_id: string): Promise<void> => {
		await this._chatsitory.addUsersToGroup(participantsIds, chat_id);
	};

	changeChatName = async (chat_id: string, newName: string): Promise<void> => {
		await this._chatsitory.changeChatName(chat_id, newName);
	};

	loadPrivateChats = async (user_id: string): Promise<PrivateChatDataEntity[]> => {
		const chats = await this._chatsitory.loadPrivateChats(user_id);
		return chats;
	};

	loadGroupChats = async (user_id: string): Promise<GroupChatDataEnitity[]> => {
		const chats = await this._chatsitory.loadGoupChats(user_id);
		return chats;
	};

	deleteGroupChat = async (chat_id: string): Promise<void> => {
		await this._chatsitory.deleteGroupChat(chat_id);
	};

	deleteUserFromGroup = async (user_id: string, chat_id: string): Promise<void> => {
		await this._chatsitory.deleteUserFromGroup(user_id, chat_id);
	};
}
