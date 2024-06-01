export type ConversationEntity = {
	id: string;
	is_group: boolean;
	name?: string;
};

export type ConversationDataEntity = {
	conversationID: string;
	conversationName: string;
	lastMessage: string;
	messageSendByUsername: string;
	isMessageDeliverd: boolean;
};
