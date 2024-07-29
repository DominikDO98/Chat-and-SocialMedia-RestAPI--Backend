import { v4 as uuid } from "uuid";
import { z } from "zod";
import { TContact } from "./contact.type";

export const ContactSchema = z.object({
	id: z.string().uuid(),
	chat_id: z.string().uuid(),
});

export const contactFactory = (newContact: Omit<TContact, "id">): TContact => {
	const contact: TContact = {
		id: uuid(),
		chat_id: newContact.chat_id,
	};
	return contact;
};
