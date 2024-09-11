export interface IContactEntity {
	id: string;
	chat_id: string | undefined;
}
export interface IContactList {
	contact_id: string;
	chat_id: string | null | undefined;
	username: string;
	firstname: string;
	lastname: string;
}
