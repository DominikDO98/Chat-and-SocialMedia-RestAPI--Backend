export type ConversationEntity = {
	id: string;
	is_group: boolean;
	name?: string;
};

export type PrivateConversationDataEntity = {
	chatid: string;
	otheruser: string;
	otheruserphoto: Buffer;
	text: string;
	sender: string;
	is_delivered: string;
	created_at: Date;
};

export type GroupConversaitonDataEnitity = {
	chatid: string;
	name: string;
	text: string;
	sender: string;
	is_delivered: boolean;
	created_at: Date;
};
