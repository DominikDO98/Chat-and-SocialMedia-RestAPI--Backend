import { IMessageDTO } from "../message.entity/message";
import { IProfileDTO } from "../profile.entity/profile";
import { ProfileDTO } from "../profile.entity/profile.dto";
import { IChatDTO, IChatEntity } from "./chat";

export class ChatDTO implements IChatDTO {
	public readonly chatId: string;
	public readonly name: string;
	public readonly photo?: Buffer | undefined;
	public readonly text?: string | undefined;
	public readonly senderUsername?: string | undefined;
	public readonly isDelivered?: boolean | undefined;
	public readonly createdAt?: Date | undefined;
	constructor(chat: IChatEntity, sender?: string, message?: IMessageDTO, profile?: IProfileDTO) {
		this.chatId = chat.id;
		this.name = chat.name ? chat.name : profile?.firstname || "Unnamed Chat";
		this.photo = profile && profile.profilePhoto ? profile.profilePhoto : undefined;
		this.senderUsername = sender ? sender : undefined;
		this.text = message?.text ? message?.text : undefined;
		this.isDelivered = message?.isDelivered ? message?.isDelivered : false;
		this.createdAt = message?.createdAt ? message?.createdAt : undefined;
	}

	static createDTO(entity: IChatEntity, sender?: string, message?: IMessageDTO, profile?: ProfileDTO) {
		return new ChatDTO(entity, sender, message, profile);
	}
}
