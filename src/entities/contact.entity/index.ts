import { v4 as uuid } from "uuid";
import { IContact } from "./contact.type";

// export const contactFactory = (newContact: Omit<IContact, "id">): IContact => {
// 	const contact: IContact = {
// 		id: uuid(),
// 		chat_id: newContact.chat_id,
// 	};
// 	return contact;
// };

export class Contact implements IContact {
	id;
	chat_id;
	constructor(newContact: Omit<IContact, "id">) {
		this.id = uuid();
		this.chat_id = newContact.chat_id;
	}
}
