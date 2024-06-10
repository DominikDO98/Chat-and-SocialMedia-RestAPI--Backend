import { PoolClient } from "pg";
import { ConversationDataEntity, ConversationEntity } from "../entities/conversation.entity/conversation.type";
import { pool } from "../utils/db/db";

const addUsersLoop = async (participantsId: string[], client: PoolClient, converation_id: string) => {
	participantsId.forEach(async (user) => {
		await client.query("INSERT INTO users_conversations (user_id, conversation_id) VALUES ($1, $2)", [user, converation_id]);
	});
};
export const createConversationRepo = async (contact_id: string, conversationData: ConversationEntity): Promise<void> => {
	const client = await pool.connect();
	try {
		await client.query("BEGIN");
		await client.query("INSERT INTO conversations (id, is_group, name) VALUES ($1, false, $2)", [conversationData.id, conversationData.name]);
		await client.query("UPDATE contacts SET conversation_id = $1 WHERE id = $2", [conversationData.id, contact_id]);
		const { rows } = await client.query("INSERT INTO users_conversations (user_id, conversation_id) SELECT user_id, conversation_id FROM users_contacts FULL JOIN contacts ON contacts.id = users_contacts.contact_id WHERE contact_id = $1 RETURNING *", [contact_id]);
		await client.query("COMMIT");
		console.log(rows);
	} catch (err) {
		console.log(err);
		client.query("ROLLBACK");
		throw err;
	} finally {
		client.release();
	}
};
export const createGroupConversationRepo = async (participantsIds: string[], conversationData: ConversationEntity): Promise<void> => {
	const client = await pool.connect();
	try {
		await client.query("BEGIN");
		await client.query("INSERT INTO conversations (id, is_group, name) VALUES ($1, true, $2)", [conversationData.id, conversationData.name]);
		await addUsersLoop(participantsIds, client, conversationData.id);
		await client.query("COMMIT");
	} catch (err) {
		console.log(err);
		client.query("ROLLBACK");
		throw err;
	} finally {
		client.release();
	}
};
export const addUsersToGroupRepo = async (participantsIds: string[], converation_id: string): Promise<void> => {
	const client = await pool.connect();
	try {
		await client.query("BEGIN");
		await addUsersLoop(participantsIds, client, converation_id);
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

export const loadPrivateConversationsRepo = async (user_id: string): Promise<ConversationDataEntity[]> => {
	const { rows } = await pool.query(
		"SELECT chatid, otheruser, otheruserPhoto, text, is_delivered, created_at, users.username as sender FROM (SELECT conversations.id as chatid, users.username as otheruser, users.profile_photo as otheruserPhoto, messages.text, messages.created_at, messages.send_by, messages.is_delivered, ROW_NUMBER() OVER(PARTITION BY messages.conversation_id ORDER BY messages.created_at DESC) FROM conversations 	FULL JOIN messages ON messages.conversation_id = conversations.id FULL JOIN users_conversations ON users_conversations.conversation_id = conversations.id FULL JOIN users ON users.id = users_conversations.user_id	WHERE conversations.id IN (SELECT conversation_id FROM users_conversations WHERE user_id = $1) AND is_group = false	AND NOT users_conversations.user_id = $1) FULL JOIN users ON users.id = send_by WHERE row_number = 1",
		[user_id],
	);
	return rows;
};
export const loadGoupConversationsRepo = async (user_id: string): Promise<ConversationDataEntity[]> => {
	const { rows } = await pool.query(
		"SELECT chatid, name, text, is_delivered, created_at, users.username FROM (SELECT conversations.id as chatid, conversations.is_group, conversations.name, messages.text, messages.send_by, messages.is_delivered, messages.created_at, ROW_NUMBER() OVER(PARTITION BY conversations.id ORDER BY messages.created_at DESC)FROM conversations FULL JOIN messages ON messages.conversation_id = conversations.id WHERE conversations.id IN (SELECT conversation_id FROM users_conversations WHERE user_id = $1) AND is_group = true) FULL JOIN users ON send_by = users.id WHERE row_number = 1",
		[user_id],
	);
	return rows;
};

export const deleteGroupConversationRepo = async (conversation_id: string): Promise<void> => {
	const client = await pool.connect();
	try {
		await client.query("BEGIN");
		await client.query("DELETE FROM users_conversations WHERE conversation_id = $1", [conversation_id]);
		await client.query("DELETE FROM conversations WHERE id = $1 AND is_group = true", [conversation_id]);
		await client.query("COMMIT");
	} catch (err) {
		console.log(err);
		client.query("ROLLBACK");
		throw err;
	} finally {
		client.release();
	}
};

export const deleteUserFromGroupRepo = async (user_id: string, conversation_id: string): Promise<void> => {
	await pool.query("DELETE FROM users_conversations WHERE user_id = $1 AND conversation_id = $2", [user_id, conversation_id]);
};
