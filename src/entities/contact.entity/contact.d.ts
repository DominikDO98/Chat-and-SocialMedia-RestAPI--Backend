export interface IContactEntity {
	id: string;
	chat_id: string | undefined;
}

export interface IContactEntityWithUser {
	id: string;
	chat_id: string | undefined;
	user_id: string;
}

export interface IContactDTO {
	id: string;
	chatId: string | undefined;
	username: string;
	profilePhoto?: Buffer;
	firstname?: string;
	lastname?: string;
}
