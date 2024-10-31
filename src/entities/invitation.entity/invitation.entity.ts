import { IInvitationEntity, TCreateInvitaiton } from "./invitation";

export class InvitationEntity implements IInvitationEntity {
	public id;
	public from_user_id;
	public to_user_id;
	constructor(id: string, newInvitation: TCreateInvitaiton) {
		this.id = id;
		this.from_user_id = newInvitation.fromUserId;
		this.to_user_id = newInvitation.toUserId;
	}
}
