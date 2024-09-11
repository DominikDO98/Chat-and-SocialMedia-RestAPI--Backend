import { v4 as uuid } from "uuid";
import { IInvitationEntity } from "./invitation.type";

// export const invitationFactory = (newInvitation: Omit<TInvitation, "id">): TInvitation => {
// 	const invitation: TInvitation = {
// 		id: uuid(),
// 		from_user_id: newInvitation.from_user_id,
// 		to_user_id: newInvitation.to_user_id,
// 	};
// 	return invitation;
// };

export class InvitationEntity implements IInvitationEntity {
	public id;
	public from_user_id;
	public to_user_id;
	constructor(newInvitation: Omit<IInvitationEntity, "id">) {
		this.id = uuid();
		this.from_user_id = newInvitation.from_user_id;
		this.to_user_id = newInvitation.to_user_id;
	}
}
