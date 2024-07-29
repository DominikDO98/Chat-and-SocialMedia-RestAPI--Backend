import { v4 as uuid } from "uuid";
import { z } from "zod";
import { TMessage } from "./message.type";

export const MessageSchema = z.object({
	id: z.string().uuid(),
	chat_id: z.string().uuid(),
	text: z.string().max(100),
	created_at: z.date(),
	send_by: z.string().uuid(),
	is_delivered: z.boolean(),
	picture: z.instanceof(Buffer).optional(),
	attachment: z.string().min(3).max(200).optional(),
});

export const messageFactory = (newMessage: Omit<TMessage, "id" | "created_at" | "is_delivered" | "send_by">, senderId: string): TMessage => {
	const message: TMessage = {
		id: uuid(),
		chat_id: newMessage.chat_id,
		text: newMessage.text,
		created_at: new Date(),
		send_by: senderId,
		is_delivered: false,
		picture: newMessage.picture ? newMessage.picture : undefined,
		attachment: newMessage.attachment ? newMessage.attachment : undefined,
	};
	return message;
};
