import { v4 as uuid } from "uuid";
import { z } from "zod";
import { TInvitation } from "./invitation.type";

export const InvitationSchema = z.object({
	id: z.string().uuid(),
	from_user_id: z.string().uuid(),
	to_user_id: z.string().uuid(),
});

export const InvitationCreationSchema = z.string().uuid();

export const invitationFactory = (newInvitation: Omit<TInvitation, "id">): TInvitation => {
	const invitation: TInvitation = {
		id: uuid(),
		from_user_id: newInvitation.from_user_id,
		to_user_id: newInvitation.to_user_id,
	};
	return invitation;
};
