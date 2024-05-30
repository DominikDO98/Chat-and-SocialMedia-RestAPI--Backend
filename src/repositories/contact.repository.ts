import { ContactListEntity } from "../entities/contact.entity/contact.type";
import { pool } from "../utils/db/db";

export const deleteContactRepo = async (contact_id: string): Promise<void> => {
	const client = await pool.connect();
	try {
		await client.query("DELETE FROM users_contacts WHERE contact_id = $1", [contact_id]);
		await client.query("DELETE FROM messages WHERE conversation_id IN (SELECT conversation_id FROM contacts WHERE id = $1)", [contact_id]);
		await client.query("DELETE FROM users_conversations WHERE conversation_id IN (SELECT conversation_id FROM contacts WHERE id = $1 )", [contact_id]);
		await client.query("DELETE FROM conversations WHERE id IN (SELECT conversation_id FROM contacts WHERE id = $1)", [contact_id]);
		await client.query("DELETE FROM contacts WHERE id = $1", [contact_id]);
	} catch (err) {
		console.log(err);
		client.query("ROLLBACK");
	} finally {
		client.release();
	}
};
export const loadContactListRepo = async (user_id: string): Promise<ContactListEntity[]> => {
	const { rows } = await pool.query("SELECT contact_id, username, firstname, lastname FROM users_contacts FULL JOIN users ON id = user_id	WHERE contact_id IN	(SELECT contact_id FROM users_contacts WHERE user_id = $1) AND NOT user_id = $1 ORDER BY username ASC", [user_id]);
	return rows;
};
