import { conversationFactory } from "../entities/conversation.entity/conversation.entity";
import { ConversationEntity } from "../entities/conversation.entity/conversation.type";
import { createConversationRepo, createGroupConversationRepo } from "../repositories/conversation.repository";

export const createConversationService = async (conctact_id: string, conversationData: Omit<ConversationEntity, "id">): Promise<void> => {
	const newConversation = conversationFactory(conversationData);
	await createConversationRepo(conctact_id, newConversation);
};

export const createGroupConversationService = async (participantsIds: string[], conversationData: Omit<ConversationEntity, "id">): Promise<void> => {
	const newConversation = conversationFactory(conversationData);
	await createGroupConversationRepo(participantsIds, newConversation);
};
