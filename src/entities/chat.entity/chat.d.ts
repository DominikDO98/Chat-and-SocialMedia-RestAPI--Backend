export interface IChatEntity {
	id: string;
	is_group: boolean;
	name?: string;
}

export interface IChatDTO {
	chatId: string;
	name: string;
	photo?: Buffer;
	text?: string;
	senderUsername?: string;
	isDelivered?: boolean;
	createdAt?: Date;
}
