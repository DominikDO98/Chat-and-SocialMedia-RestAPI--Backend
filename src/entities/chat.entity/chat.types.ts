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

export type ContactEntity = {
	id: string;
	converation_id: string;
};
