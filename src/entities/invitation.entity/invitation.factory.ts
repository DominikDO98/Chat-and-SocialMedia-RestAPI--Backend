import { v4 as uuid } from "uuid";
import { TInvitation } from "./invitation.type";

export const invitationFactory = (newInvitation: Omit<TInvitation, "id">): TInvitation => {
	const invitation: TInvitation = {
		id: uuid(),
		from_user_id: newInvitation.from_user_id,
		to_user_id: newInvitation.to_user_id,
	};
	return invitation;
};
