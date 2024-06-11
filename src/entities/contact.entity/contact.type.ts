export type ContactEntity = {
	id: string;
	chat_id: string | undefined;
};
export type ContactListEntity = {
	contact_id: string;
	chat_id: string | null | undefined;
	username: string;
	firstname: string;
	lastname: string;
};
