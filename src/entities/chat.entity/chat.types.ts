export type MessageEntity = {
	id: string;
	conversaiton_id: string;
	text: string;
	created_at: Date;
	send_by: string;
	is_delivered: boolean;
	picture?: Blob;
	attachment?: string;
};

export type ConversationEntity = {
	id: string;
	is_group: boolean;
	name?: string;
};

export type ContactEntity = {
	id: string;
	converation_id: string;
};

export type InvitationEntity = {
	id: string;
	from_user_id: string;
	to_user_id: string;
};
