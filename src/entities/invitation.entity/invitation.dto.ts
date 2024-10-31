import { IProfileDTO } from "../profile.entity/profile";
import { IInvitationDTO, IInvitationEntity } from "./invitation";

export class InvitationDTO implements IInvitationDTO {
	public readonly id: string;
	public readonly username: string;
	public readonly firstname?: string | undefined;
	public readonly lastname?: string | undefined;
	public readonly profilePhoto?: Buffer | undefined;
	public readonly receiver: boolean;
	constructor(invitation: IInvitationEntity, username: string, profile: IProfileDTO, receiver: boolean) {
		this.id = invitation.id;
		this.username = username;
		this.firstname = profile.firstname ? profile.firstname : undefined;
		this.lastname = profile.lastname ? profile.lastname : undefined;
		this.profilePhoto = profile.profilePhoto ? profile.profilePhoto : undefined;
		this.receiver = receiver;
	}

	static createDTO(entity: IInvitationEntity, username: string, profile: IProfileDTO, receiver: boolean) {
		return new InvitationDTO(entity, username, profile, receiver);
	}
}
