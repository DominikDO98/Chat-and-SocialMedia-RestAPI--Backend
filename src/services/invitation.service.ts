import { v4 as uuid } from "uuid";
import { InvitationEntity } from "../entities/invitation.entity/invitation.entity";
import { IInvitationEntity, IInvitationWithUser } from "../entities/invitation.entity/invitation.type";
import { InvitationRepository } from "../repositories/invitation.repository";

export class InvitationService {
	private _invitationRepository = InvitationRepository;

	sendInvitation = async (invitaitonData: Omit<IInvitationEntity, "id">): Promise<void> => {
		const invitaiton = new InvitationEntity(invitaitonData);
		await this._invitationRepository.sendInvitation(invitaiton);
	};
	acceptInvitation = async (invitation_id: string, user_id: string): Promise<void> => {
		const contact_id = uuid();
		await this._invitationRepository.acceptInvitation(invitation_id, contact_id, user_id);
	};
	rejectInvitation = async (invitation_id: string, user_id: string): Promise<void> => {
		await this._invitationRepository.rejectInvitation(invitation_id, user_id);
	};
	cancelInvitation = async (invitation_id: string, user_id: string): Promise<void> => {
		await this._invitationRepository.cancelInvitation(invitation_id, user_id);
	};
	loadInvitations = async (user_id: string): Promise<IInvitationWithUser[]> => {
		const invitations = await this._invitationRepository.loadInvitations(user_id);
		return invitations;
	};
}
