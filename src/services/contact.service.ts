import { ContactListEntity } from "../entities/contact.entity/contact.type";
import { ContactRepository } from "../repositories/contact.repository";

export class ContactService {
	private _contactRepository = ContactRepository;
	constructor() {
		this._contactRepository;
	}
	deleteContact = async (contact_id: string): Promise<void> => {
		await this._contactRepository.deleteContact(contact_id);
	};

	loadContactList = async (user_id: string): Promise<ContactListEntity[]> => {
		const contactList = await this._contactRepository.loadContactList(user_id);
		return contactList;
	};
}
