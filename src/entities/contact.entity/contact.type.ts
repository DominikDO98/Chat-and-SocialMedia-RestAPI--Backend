export type ContactEntity = {
	id: string;
	converation_id: string;
};
export type ContactListEntity = {
	contact_id: string;
	conversation_id: string | null | undefined;
	username: string;
	firstname: string;
	lastname: string;
};
