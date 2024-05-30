import { pool } from "../utils/db/db";

export const deleteContactRepo = async (contact_id: string): Promise<void> => {
	const client = await pool.connect();
	try {
		await client.query("DELETE FROM users_contacts WHERE contact_id = $1", [contact_id]);
		await client.query("DELETE FROM messages WHERE id IN (SELECT conversation_id FROM contacts WHERE id = $1)", [contact_id]);
		await client.query("DELETE FROM users_conversation WHERE conversation_id IN (SELECT conversation_id FROM contacts WHERE id = $1 )", [contact_id]);
		await client.query("DELETE FROM conversationa WHERE id IN (SELECT conversation_id FROM contacts WHERE id = $1)", [contact_id]);
		await client.query("DELETE FROM contacts WHERE id = $1", [contact_id]);
	} catch (err) {
		client.query("ROLLBACK");
	} finally {
		client.release();
	}
};
export const loadContactListRepo = async (user_id: string, offset: number) => {
	const { rows } = await pool.query("SELECT contact_id, username, firstname, lastname FROM users_contacts FULL JOIN users ON id = user_id	WHERE contact_id IN	(SELECT contact_id FROM users_contacts WHERE user_id = $1) AND NOT user_id = $1 ORDER BY username ASC LIMIT 50 OFFSET $2", [user_id, offset]);
	return rows;
};
