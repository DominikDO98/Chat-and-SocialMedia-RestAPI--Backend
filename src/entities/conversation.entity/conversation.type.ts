export type ConversationEntity = {
	id: string;
	is_group: boolean;
	name?: string;
};

export type ConversationDataEntity = {
	conversationid: string;
	conversationname: string;
	lastmessage: string;
	date: Date;
	lastsender: string;
	isdeliverd: boolean;
};
