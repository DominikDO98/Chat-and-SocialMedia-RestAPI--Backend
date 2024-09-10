import { IContactList } from "../entities/contact.entity/contact.type";
import { pool } from "../utils/db/db";

export class ContactRepository {
	//add createContact
	static deleteContact = async (contact_id: string): Promise<void> => {
		const client = await pool.connect();
		try {
			await client.query("DELETE FROM users_contacts WHERE contact_id = $1", [contact_id]);
			await client.query("DELETE FROM messages WHERE chat_id IN (SELECT chat_id FROM contacts WHERE id = $1)", [contact_id]); //delete use messages.repo
			await client.query("DELETE FROM users_chats WHERE chat_id IN (SELECT chat_id FROM contacts WHERE id = $1 )", [contact_id]); //delete, sue chat.repo
			await client.query("DELETE FROM chats WHERE id IN (SELECT chat_id FROM contacts WHERE id = $1)", [contact_id]); //delete use.chat repo
			await client.query("DELETE FROM contacts WHERE id = $1", [contact_id]);
		} catch (err) {
			console.log(err);
			client.query("ROLLBACK");
		} finally {
			client.release();
		}
	};
	static loadContactList = async (user_id: string): Promise<IContactList[]> => {
		const { rows } = await pool.query("SELECT contact_id, chat_id, username, firstname, lastname FROM users_contacts FULL JOIN users ON users.id = users_contacts.user_id FULL JOIN contacts ON contacts.id = users_contacts.contact_id	WHERE contact_id IN	(SELECT contact_id FROM users_contacts WHERE user_id = $1) AND NOT user_id = $1 ORDER BY username ASC", [user_id]);
		return rows;
	};
}
