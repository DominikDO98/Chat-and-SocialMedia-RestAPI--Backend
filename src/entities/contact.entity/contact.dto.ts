import { IProfileDTO } from "../profile.entity/profile";
import { IContactDTO, IContactEntity } from "./contact";

export class ContactDTO implements IContactDTO {
	public readonly id: string;
	public readonly chatId: string | undefined;
	public readonly username: string;
	public readonly profilePhoto?: Buffer | undefined;
	public readonly firstname?: string | undefined;
	public readonly lastname?: string | undefined;
	constructor(contact: IContactEntity, username: string, profile: IProfileDTO) {
		this.id = contact.id;
		this.chatId = contact.chat_id ? contact.chat_id : undefined;
		this.username = username;
		this.profilePhoto = profile.profilePhoto ? profile.profilePhoto : undefined;
		this.firstname = profile.firstname ? profile.firstname : undefined;
		this.lastname = profile.lastname ? profile.lastname : undefined;
	}
	static createDTO(entity: IContactEntity, username: string, profile: IProfileDTO) {
		return new ContactDTO(entity, username, profile);
	}
}
