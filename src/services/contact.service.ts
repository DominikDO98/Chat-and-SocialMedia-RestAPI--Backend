import { ContactListEntity } from "../entities/contact.entity/contact.type";
import { deleteContactRepo, loadContactListRepo } from "../repositories/contact.repository";

export const deleteContactService = async (contact_id: string): Promise<void> => {
	await deleteContactRepo(contact_id);
};

export const loadContactListService = async (user_id: string): Promise<ContactListEntity[]> => {
	const contactList = await loadContactListRepo(user_id);
	return contactList;
};
