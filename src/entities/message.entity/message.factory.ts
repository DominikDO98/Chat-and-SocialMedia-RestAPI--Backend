import { v4 as uuid } from "uuid";
import { TMessage } from "./message.type";

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
