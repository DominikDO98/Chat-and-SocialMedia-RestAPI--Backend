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
export const changeConversationNameRepo = async (conversation_id: string, newName: string): Promise<void> => {
	await pool.query("UPDATE conversations SET name = $1 WHERE id = $2", [newName, conversation_id]);
};
export const loadConversationsRepo = async (user_id: string): Promise<ConversationEntity[]> => {
	const { rows } = await pool.query(
		"WITH convData AS (SELECT conversations.name conversationname, messages.text AS lastmessage, messages.is_delivered AS isdelivered, messages.created_at AS date, messages.conversation_id AS conversationid, users.username AS lastsender, ROW_NUMBER() OVER(PARTITION BY messages.conversation_id ORDER BY messages.created_at) AS messNumber FROM messages INNER JOIN users ON users.id = messages.send_by INNER JOIN conversations ON conversations.id = messages.conversation_id WHERE messages.conversation_id IN (SELECT users_conversations.conversation_id FROM users_conversations WHERE users_conversations.user_id = $1)) SELECT conversationid, conversationname, lastmessage, isdelivered, date, lastsender FROM convData WHERE messnumber = 1",
		[user_id],
	);
	return rows;
};
