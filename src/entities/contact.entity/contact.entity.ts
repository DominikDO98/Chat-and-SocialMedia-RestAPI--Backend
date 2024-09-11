import { v4 as uuid } from "uuid";
import { IContactEntity } from "./contact.type";

export class ContactEntity implements IContactEntity {
	id;
	chat_id;
	constructor(newContact: Omit<IContactEntity, "id">) {
		this.id = uuid();
		this.chat_id = newContact.chat_id;
	}
}
