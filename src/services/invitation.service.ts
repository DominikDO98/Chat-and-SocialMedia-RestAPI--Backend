import { v4 as uuid } from "uuid";
import { invitationFactory } from "../entities/invitation.entity/invitation.factory";
import { TInvitation, TInvitationWithUser } from "../entities/invitation.entity/invitation.type";
import { InvitationRepository } from "../repositories/invitation.repository";

export class InvitationService {
	private _invitationRepository = InvitationRepository;
	constructor() {
		this._invitationRepository;
	}
	sendInvitation = async (invitaitonData: Omit<TInvitation, "id">): Promise<void> => {
		const invitaiton = invitationFactory(invitaitonData);
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
	loadInvitations = async (user_id: string): Promise<TInvitationWithUser[]> => {
		const invitations = await this._invitationRepository.loadInvitations(user_id);
		return invitations;
	};
}
