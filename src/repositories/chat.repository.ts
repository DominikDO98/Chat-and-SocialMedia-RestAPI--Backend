import { PoolClient } from "pg";
import { pool } from "../utils/db/db";
import { IChat, IPrivateChatData, IGroupChatData } from "../entities/chat.entity/chat.type";

export class ChatRepository {
	//add delete private chat
	static addUsersLoop = async (participantsId: string[], client: PoolClient, converation_id: string) => {
		participantsId.forEach(async (user) => {
			await client.query("INSERT INTO users_chats (user_id, chat_id) VALUES ($1, $2)", [user, converation_id]);
		});
	};

	static createChat = async (contact_id: string, chatData: IChat): Promise<void> => {
		const client = await pool.connect();
		try {
			await client.query("BEGIN");
			await client.query("INSERT INTO chats (id, is_group, name) VALUES ($1, false, $2)", [chatData.id, chatData.name]);
			await client.query("UPDATE contacts SET chat_id = $1 WHERE id = $2", [chatData.id, contact_id]); //delete, use contacts.repo
			const { rows } = await client.query("INSERT INTO users_chats (user_id, chat_id) SELECT user_id, chat_id FROM users_contacts FULL JOIN contacts ON contacts.id = users_contacts.contact_id WHERE contact_id = $1 RETURNING *", [contact_id]);
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
	static createGroupChat = async (participantsIds: string[], chatData: IChat): Promise<void> => {
		const client = await pool.connect();
		try {
			await client.query("BEGIN");
			await client.query("INSERT INTO chats (id, is_group, name) VALUES ($1, true, $2)", [chatData.id, chatData.name]);
			await this.addUsersLoop(participantsIds, client, chatData.id);
			await client.query("COMMIT");
		} catch (err) {
			console.log(err);
			client.query("ROLLBACK");
			throw err;
		} finally {
			client.release();
		}
	};
	static addUsersToGroup = async (participantsIds: string[], converation_id: string): Promise<void> => {
		const client = await pool.connect();
		try {
			await client.query("BEGIN");
			await this.addUsersLoop(participantsIds, client, converation_id);
			await client.query("COMMIT");
		} catch (err) {
			console.log(err);
			client.query("ROLLBACK");
			throw err;
		} finally {
			client.release();
		}
	};
	static changeChatName = async (chat_id: string, newName: string): Promise<void> => {
		await pool.query("UPDATE chats SET name = $1 WHERE id = $2", [newName, chat_id]);
	};

	static loadPrivateChats = async (user_id: string): Promise<IPrivateChatData[]> => {
		const { rows } = await pool.query(
			"SELECT chatid, otheruser, otheruserPhoto, text, is_delivered, created_at, users.username as sender FROM (SELECT chats.id as chatid, users.username as otheruser, users.profile_photo as otheruserPhoto, messages.text, messages.created_at, messages.send_by, messages.is_delivered, ROW_NUMBER() OVER(PARTITION BY messages.chat_id ORDER BY messages.created_at DESC) FROM chats FULL JOIN messages ON messages.chat_id = chats.id FULL JOIN users_chats ON users_chats.chat_id = chats.id FULL JOIN users ON users.id = users_chats.user_id	WHERE chats.id IN (SELECT chat_id FROM users_chats WHERE user_id = $1) AND is_group = false	AND NOT users_chats.user_id = $1) as info FULL JOIN users ON users.id = send_by WHERE row_number = 1",
			[user_id],
		);
		return rows;
	};
	static loadGoupChats = async (user_id: string): Promise<IGroupChatData[]> => {
		const { rows } = await pool.query(
			"SELECT chatid, name, text, is_delivered, created_at, users.username as sender FROM (SELECT chats.id as chatid, chats.is_group, chats.name, messages.text, messages.send_by, messages.is_delivered, messages.created_at, ROW_NUMBER() OVER(PARTITION BY chats.id ORDER BY messages.created_at DESC) FROM chats FULL JOIN messages ON messages.chat_id = chats.id WHERE chats.id IN (SELECT chat_id FROM users_chats WHERE user_id = $1) AND is_group = true) as info FULL JOIN users ON send_by = users.id WHERE row_number = 1",
			[user_id],
		);
		return rows;
	};

	static deleteGroupChat = async (chat_id: string): Promise<void> => {
		const client = await pool.connect();
		try {
			await client.query("BEGIN");
			await client.query("DELETE FROM users_chats WHERE chat_id = $1", [chat_id]);
			await client.query("DELETE FROM chats WHERE id = $1 AND is_group = true", [chat_id]);
			await client.query("COMMIT");
		} catch (err) {
			console.log(err);
			client.query("ROLLBACK");
			throw err;
		} finally {
			client.release();
		}
	};

	static deleteUserFromGroup = async (user_id: string, chat_id: string): Promise<void> => {
		await pool.query("DELETE FROM users_chats WHERE user_id = $1 AND chat_id = $2", [user_id, chat_id]);
	};
}
