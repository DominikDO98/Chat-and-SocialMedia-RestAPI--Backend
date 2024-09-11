export interface IChatEntity {
	id: string;
	is_group: boolean;
	name?: string;
}

export interface IPrivateChatData {
	chatid: string;
	otheruser: string;
	otheruserphoto: Buffer;
	text: string;
	sender: string;
	is_delivered: string;
	created_at: Date;
}

export interface IGroupChatData {
	chatid: string;
	name: string;
	text: string;
	sender: string;
	is_delivered: boolean;
	created_at: Date;
}
