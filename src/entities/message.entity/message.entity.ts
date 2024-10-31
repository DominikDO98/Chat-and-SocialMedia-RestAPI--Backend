import { TCreateMessage } from "./message";

export class MessageEntity {
	public readonly id;
	public readonly chat_id;
	public readonly text;
	public readonly created_at;
	public readonly send_by;
	public readonly is_delivered;
	public readonly picture;
	public readonly attachment;
	constructor(id: string, newMessage: TCreateMessage, createdAt: Date, sender: string) {
		this.id = id;
		this.chat_id = newMessage.chatId;
		this.text = newMessage.text;
		this.created_at = createdAt;
		this.send_by = sender;
		this.is_delivered = false;
		this.picture = newMessage.picture ? newMessage.picture : undefined;
		this.attachment = newMessage.attachment ? newMessage.attachment : undefined;
	}
}
