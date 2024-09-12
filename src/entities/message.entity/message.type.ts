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

export type TMessageCreation = Omit<IMessageEntity, "id" | "created_at" | "is_delivered" | "send_by">;
