import { IContactList } from "../entities/contact.entity/contact.type";
import { ContactRepository } from "../repositories/contact.repository";

export class ContactService {
	private _contactRepository = ContactRepository;

	deleteContact = async (contact_id: string): Promise<void> => {
		await this._contactRepository.deleteContact(contact_id);
	};

	loadContactList = async (user_id: string): Promise<IContactList[]> => {
		const contactList = await this._contactRepository.loadContactList(user_id);
		return contactList;
	};
}
