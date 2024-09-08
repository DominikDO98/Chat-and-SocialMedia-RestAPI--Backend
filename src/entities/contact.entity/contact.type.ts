export type TContact = {
	id: string;
	chat_id: string | undefined;
};
export type TContactList = {
	contact_id: string;
	chat_id: string | null | undefined;
	username: string;
	firstname: string;
	lastname: string;
};
