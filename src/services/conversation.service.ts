import { conversationFactory } from "../entities/conversation.entity/conversation.entity";
import { ConversationDataEntity, ConversationEntity } from "../entities/conversation.entity/conversation.type";
import { addUsersToGroupRepo, changeConversationNameRepo, createConversationRepo, createGroupConversationRepo, loadConversationsRepo } from "../repositories/conversation.repository";

export const createConversationService = async (conctact_id: string, conversationData: Omit<ConversationEntity, "id">): Promise<void> => {
	const newConversation = conversationFactory(conversationData);
	await createConversationRepo(conctact_id, newConversation);
};

export const createGroupConversationService = async (participantsIds: string[], conversationData: Omit<ConversationEntity, "id">): Promise<void> => {
	const newConversation = conversationFactory(conversationData);
	await createGroupConversationRepo(participantsIds, newConversation);
};

export const addUsersToGroupService = async (participantsIds: string[], conversation_id: string): Promise<void> => {
	await addUsersToGroupRepo(participantsIds, conversation_id);
};

export const changeConversationNameService = async (conversation_id: string, newName: string): Promise<void> => {
	await changeConversationNameRepo(conversation_id, newName);
};

export const loadConversationsService = async (user_id: string): Promise<ConversationDataEntity[]> => {
	const conversations = await loadConversationsRepo(user_id);
	return conversations;
};
