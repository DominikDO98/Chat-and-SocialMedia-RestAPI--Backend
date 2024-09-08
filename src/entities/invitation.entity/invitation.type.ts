export type TInvitation = {
	id: string;
	from_user_id: string;
	to_user_id: string;
};
export type TInvitationWithUser = {
	invitationId: string;
	username: string;
	firstname: string;
	lastname: string;
};
