import { IMessageDTO, IMessageEntity } from "./message";

export class MessageDTO implements IMessageDTO {
	public readonly id: string;
	public readonly chatId: string;
	public readonly text: string;
	public readonly createdAt: Date;
	public readonly sender: string;
	public readonly isSender: boolean;
	public readonly isDelivered: boolean;
	public readonly picture?: Buffer | undefined;
	public readonly attachment?: string | undefined;
	constructor(message: IMessageEntity, sender: string, isSender: boolean) {
		this.id = message.id;
		this.chatId = message.chat_id;
		this.text = message.text;
		this.createdAt = message.created_at;
		this.sender = sender;
		this.isSender = isSender;
		this.isDelivered = message.is_delivered;
		this.picture = message.picture ? message.picture : undefined;
		this.attachment = message.attachment ? message.attachment : undefined;
	}
	static createDTO(entity: IMessageEntity, sender: string, isSender: boolean) {
		return new MessageDTO(entity, sender, isSender);
	}
}
