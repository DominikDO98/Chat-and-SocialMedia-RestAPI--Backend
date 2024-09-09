import { v4 as uuid } from "uuid";
import { TContact } from "./contact.type";

export const contactFactory = (newContact: Omit<TContact, "id">): TContact => {
	const contact: TContact = {
		id: uuid(),
		chat_id: newContact.chat_id,
	};
	return contact;
};
