import { v4 as uuid } from "uuid";
import { invitationFactory } from "../entities/invitation.entity/invitation.entity";
import { InvitationEntity } from "../entities/invitation.entity/invitation.type";
import { acceptInvitationRepo, cancelInvitationRepo, loadInvitationsRepo, rejectInvitationRepo, sendInvitationRepo } from "../repositories/invitation.repository";
import { loadCommentsRepo } from "../repositories/comment.repository";

export const sendInvitationService = async (invitaitonData: Omit<InvitationEntity, "id">): Promise<void> => {
	const invitaiton = invitationFactory(invitaitonData);
	await sendInvitationRepo(invitaiton);
};
export const acceptInvitationService = async (invitation_id: string, user_id: string): Promise<void> => {
	const contact_id = uuid();
	await acceptInvitationRepo(invitation_id, contact_id, user_id);
};
export const rejectInvitationService = async (invitation_id: string, user_id: string): Promise<void> => {
	await rejectInvitationRepo(invitation_id, user_id);
};
export const cancelInvitationService = async (invitation_id: string, user_id: string): Promise<void> => {
	await cancelInvitationRepo(invitation_id, user_id);
};
export const loadInvitationsService = async (user_id: string): Promise<InvitationEntity[]> => {
	const invitations = await loadInvitationsRepo(user_id);
	return invitations;
};
