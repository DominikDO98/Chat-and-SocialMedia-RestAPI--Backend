import { invitationFactory } from "../entities/invitation.entity/invitation.entity";
import { InvitationEntity } from "../entities/invitation.entity/invitation.type";
import { sendInvitationRepo } from "../repositories/invitation.repository";

export const sendInvitationService = async (invitaitonData: Omit<InvitationEntity, "id">): Promise<void> => {
	const invitaiton = invitationFactory(invitaitonData);
	await sendInvitationRepo(invitaiton);
};
