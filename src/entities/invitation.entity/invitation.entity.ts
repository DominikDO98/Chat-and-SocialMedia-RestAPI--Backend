import { v4 as uuid } from "uuid";
import { IInvitationEntity } from "./invitation.type";

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
