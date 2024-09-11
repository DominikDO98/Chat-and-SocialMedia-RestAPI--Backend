export interface IInvitationEntity {
	id: string;
	from_user_id: string;
	to_user_id: string;
}
export interface IInvitationWithUser {
	invitationId: string;
	username: string;
	firstname: string;
	lastname: string;
}
