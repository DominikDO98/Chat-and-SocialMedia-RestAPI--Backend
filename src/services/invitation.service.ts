import { invitationFactory } from "../entities/invitation.entity/invitation.entity";
import { InvitationEntity } from "../entities/invitation.entity/invitation.type";
import { acceptInvitationRepo, sendInvitationRepo } from "../repositories/invitation.repository";
import { v4 as uuid } from "uuid";
export const sendInvitationService = async (invitaitonData: Omit<InvitationEntity, "id">): Promise<void> => {
	const invitaiton = invitationFactory(invitaitonData);
	await sendInvitationRepo(invitaiton);
};

export const acceptInvitationService = async (invitation_id: string, user_id: string): Promise<void> => {
	const contact_id = uuid();
	await acceptInvitationRepo(invitation_id, contact_id, user_id);
};
