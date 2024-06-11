export type MessageEntity = {
	id: string;
	chat_id: string;
	text: string;
	created_at: Date;
	send_by: string;
	is_delivered: boolean;
	picture?: Buffer;
	attachment?: string;
};
