import { v4 as uuid } from "uuid";
import { IMessageEntity } from "./message.type";

// export const messageFactory = (newMessage: Omit<TMessage, "id" | "created_at" | "is_delivered" | "send_by">, senderId: string): TMessage => {
// 	const message: TMessage = {
// 		id: uuid(),
// 		chat_id: newMessage.chat_id,
// 		text: newMessage.text,
// 		created_at: new Date(),
// 		send_by: senderId,
// 		is_delivered: false,
// 		picture: newMessage.picture ? newMessage.picture : undefined,
// 		attachment: newMessage.attachment ? newMessage.attachment : undefined,
// 	};
// 	return message;
// };

export class MessageEntity {
	public id;
	public chat_id;
	public text;
	public created_at;
	public send_by;
	public is_delivered;
	public picture;
	public attachment;
	constructor(newMessage: Omit<IMessageEntity, "id" | "created_at" | "is_delivered" | "send_by">, senderId: string) {
		this.id = uuid();
		this.chat_id = newMessage.chat_id;
		this.text = newMessage.text;
		this.created_at = new Date();
		this.send_by = senderId;
		this.is_delivered = false;
		this.picture = newMessage.picture ? newMessage.picture : undefined;
		this.attachment = newMessage.attachment ? newMessage.attachment : undefined;
	}
}
