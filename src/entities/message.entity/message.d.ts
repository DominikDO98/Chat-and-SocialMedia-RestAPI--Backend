export interface IMessageEntity {
	id: string;
	chat_id: string;
	text: string;
	created_at: Date;
	send_by: string;
	is_delivered: boolean;
	picture?: Buffer;
	attachment?: string;
}

export interface IMessageDTO {
	id: string;
	chatId: string;
	text: string;
	createdAt: Date;
	sender: string;
	isSender: boolean;
	isDelivered: boolean;
	picture?: Buffer;
	attachment?: string;
}

export type TCreateMessage = {
	chatId: string;
	text: string;
	picture?: Buffer;
	attachment?: string;
};
