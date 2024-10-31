import { IInvitationDTO, TCreateInvitaiton } from "../entities/invitation.entity/invitation";
import { InvitationEntity } from "../entities/invitation.entity/invitation.entity";
import { AuthRepository } from "../repositories/auth.repository";
import { InvitationRepository } from "../repositories/invitation.repository";
import { AuthUtils } from "../utils/authenticationUtils/authUtils";
import { ProfileService } from "./profile.service";
import { InvitationDTO } from "../entities/invitation.entity/invitation.dto";
import { ContactService } from "./contact.service";

export class InvitationService {
	private _invitationRepository = InvitationRepository;
	private _authRepository = AuthRepository;
	private _profileService = new ProfileService();
	private _contactService = new ContactService();

	sendInvitation = async (invitaitonData: TCreateInvitaiton): Promise<void> => {
		const id = AuthUtils.uuid();
		const invitaiton = new InvitationEntity(id, invitaitonData);
		await this._invitationRepository.sendInvitation(invitaiton);
	};
	acceptInvitation = async (invitationId: string, userId: string): Promise<void> => {
		const invitation = await this._invitationRepository.loadInvitation(invitationId, userId);
		await this._invitationRepository.rejectInvitation(invitation.id, userId);
		await this._contactService.createContact(invitation);
	};
	rejectInvitation = async (invitationId: string, userId: string): Promise<void> => {
		await this._invitationRepository.rejectInvitation(invitationId, userId);
	};
	cancelInvitation = async (invitationId: string, userId: string): Promise<void> => {
		await this._invitationRepository.cancelInvitation(invitationId, userId);
	};
	loadInvitations = async (userId: string): Promise<IInvitationDTO[]> => {
		const invitations = await this._invitationRepository.loadInvitations(userId);
		const dtos = await Promise.all(
			invitations.map(async (invitation) => {
				const username = await this._authRepository.getUsernameById(invitation.from_user_id);
				const profile = await this._profileService.loadProfile(invitation.from_user_id);
				const dto = InvitationDTO.createDTO(invitation, username, profile, true);
				return dto;
			}),
		);
		return dtos;
	};
}
