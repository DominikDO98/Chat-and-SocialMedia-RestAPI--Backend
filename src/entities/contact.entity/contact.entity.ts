import { IContactEntity } from "./contact";

export class ContactEntity implements IContactEntity {
	public readonly id: string;
	public readonly chat_id: string | undefined;
	constructor(id: string, chatId: string) {
		this.id = id;
		this.chat_id = chatId ? chatId : undefined;
	}
}
