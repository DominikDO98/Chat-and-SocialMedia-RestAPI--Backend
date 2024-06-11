import { chatFactory } from "../entities/chat.entity/chat.entity";
import { ChatEntity, PrivateChatDataEntity, GroupChatDataEnitity } from "../entities/chat.entity/chat.type";
import { createChatRepo, createGroupChatRepo, addUsersToGroupRepo, changeChatNameRepo, loadPrivateChatsRepo, loadGoupChatsRepo, deleteGroupChatRepo, deleteUserFromGroupRepo } from "../repositories/chat.repository";

export const createChatService = async (conctact_id: string, chatData: Omit<ChatEntity, "id">): Promise<void> => {
	const newChat = chatFactory(chatData);
	await createChatRepo(conctact_id, newChat);
};

export const createGroupChatService = async (userId: string, otherParticipants: string[], chatData: Omit<ChatEntity, "id">): Promise<void> => {
	const participants = [userId, ...otherParticipants];
	const newChat = chatFactory(chatData);
	await createGroupChatRepo(participants, newChat);
};

export const addUsersToGroupService = async (participantsIds: string[], chat_id: string): Promise<void> => {
	await addUsersToGroupRepo(participantsIds, chat_id);
};

export const changeChatNameService = async (chat_id: string, newName: string): Promise<void> => {
	await changeChatNameRepo(chat_id, newName);
};

export const loadPrivateChatsService = async (user_id: string): Promise<PrivateChatDataEntity[]> => {
	const chats = await loadPrivateChatsRepo(user_id);
	return chats;
};

export const loadGroupChatsService = async (user_id: string): Promise<GroupChatDataEnitity[]> => {
	const chats = await loadGoupChatsRepo(user_id);
	return chats;
};

export const deleteGroupChatService = async (chat_id: string): Promise<void> => {
	await deleteGroupChatRepo(chat_id);
};

export const deleteUserFromGroupService = async (user_id: string, chat_id: string): Promise<void> => {
	await deleteUserFromGroupRepo(user_id, chat_id);
};
