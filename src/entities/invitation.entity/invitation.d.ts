export interface IInvitationEntity {
	id: string;
	from_user_id: string;
	to_user_id: string;
}
export interface IInvitationDTO {
	id: string;
	username: string;
	firstname?: string;
	lastname?: string;
	profilePhoto?: Buffer;
	receiver: boolean;
}
export type TCreateInvitaiton = {
	fromUserId: string;
	toUserId: string;
};
