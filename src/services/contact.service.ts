import { IContactDTO } from "../entities/contact.entity/contact";
import { ContactDTO } from "../entities/contact.entity/contact.dto";
import { IInvitationEntity } from "../entities/invitation.entity/invitation";
import { AuthRepository } from "../repositories/auth.repository";
import { ContactRepository } from "../repositories/contact.repository";
import { AuthUtils } from "../utils/authenticationUtils/authUtils";
import { ProfileService } from "./profile.service";

export class ContactService {
	private _contactRepository = ContactRepository;
	private _authRepository = AuthRepository;
	private _profileService = new ProfileService();
	createContact = async (invitaiton: IInvitationEntity): Promise<void> => {
		const id = AuthUtils.uuid();
		await this._contactRepository.createContact(id, invitaiton);
	};
	deleteContact = async (contactId: string): Promise<void> => {
		await this._contactRepository.deleteContact(contactId);
	};
	loadContactList = async (userId: string): Promise<IContactDTO[]> => {
		const contactList = await this._contactRepository.loadContactList(userId);
		const dtos: IContactDTO[] = await Promise.all(
			contactList.map(async (contact) => {
				const username = await this._authRepository.getOtherUserByContactId(contact.id, userId);
				const profile = await this._profileService.loadProfileByContact(contact.id, userId);
				const dto = ContactDTO.createDTO(contact, username, profile);
				return dto;
			}),
		);
		return dtos;
	};
	addChat = async (contactId: string, chatId: string): Promise<void> => {
		await this._contactRepository.addChat(contactId, chatId);
	};

	checkIfHasChat = async (contactId: string): Promise<boolean> => {
		const contact = await this._contactRepository.getContact(contactId);
		console.log(contact);

		return !!contact.chat_id;
	};
}
