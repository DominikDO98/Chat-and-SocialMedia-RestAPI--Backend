import { ConversationEntity } from "../entities/conversation.entity/conversation.type";
import { pool } from "../utils/db/db";
import { addUsersLoop } from "../utils/repositoryTools/addUsersToGroupLoop";

export const createConversationRepo = async (contact_id: string, conversationData: ConversationEntity): Promise<void> => {
	const client = await pool.connect();
	try {
		await client.query("BEGIN");
		await client.query("INSERT INTO conversations (id, is_group, name) VALUES ($1, false, $2)", [conversationData.id, conversationData.name]);
		await client.query("UPDATE contacts SET conversation_id = $1 WHERE id = $2", [conversationData.id, contact_id]);
		await client.query("INSERT INTO users_conversations (user_id, conversation_id) SELECT user_id, conversation_id FROM users_contacts FULL JOIN contacts ON contacts.id = users_contacts.contact_id WHERE contact_id = $1 ", [contact_id]);
		await client.query("COMMIT");
	} catch (err) {
		console.log(err);
		client.query("ROLLBACK");
		throw err;
	} finally {
		client.release();
	}
};
export const createGroupConversationRepo = async (participantsId: string[], conversationData: ConversationEntity): Promise<void> => {
	const client = await pool.connect();
	try {
		await client.query("BEGIN");
		await client.query("INSERT INTO conversations (id, is_group, name) VALUES ($1, true, $2)", [conversationData.id, conversationData.name]);
		await addUsersLoop(participantsId, client, conversationData.id);
		await client.query("COMMIT");
	} catch (err) {
		console.log(err);
		client.query("ROLLBACK");
		throw err;
	} finally {
		client.release();
	}
};
export const addUsersToGroupRepo = async (participantsId: string[], converation_id: string): Promise<void> => {
	const client = await pool.connect();
	try {
		await client.query("BEGIN");
		await addUsersLoop(participantsId, client, converation_id);
		await client.query("COMMIT");
	} catch (err) {
		console.log(err);
		client.query("ROLLBACK");
		throw err;
	} finally {
		client.release();
	}
};
