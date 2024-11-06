import { PoolClient } from "pg";
import { pool } from "../utils/db/db";
import { IChatEntity } from "../entities/chat.entity/chat";
import { CustomError } from "../utils/errors/errors";

export class ChatRepository {
	private static addUsersLoop = async (participantsId: string[], client: PoolClient, chat_id: string) => {
		participantsId.forEach(async (user_id) => {
			await client.query("INSERT INTO users_chats (user_id, chat_id) VALUES ($1, $2)", [user_id, chat_id]);
		});
	};
	private static deleteUsersLoop = async (participantsId: string[], client: PoolClient, chat_id: string) => {
		participantsId.forEach(async (user_id) => {
			await client.query("DELETE FROM users_chats WHERE user_id = $1 AND chat_id = $2", [user_id, chat_id]);
		});
	};
	static createPrivateChat = async (contact_id: string, chatData: IChatEntity): Promise<IChatEntity> => {
		const client = await pool.connect();
		let entity: IChatEntity | undefined;
		try {
			await client.query("BEGIN");
			const { rows: users } = await client.query("SELECT user_id FROM users_contacts WHERE contact_id = $1", [contact_id]);
			const { rows: chat } = await client.query("INSERT INTO chats (id, is_group, name) VALUES ($1, $2, $3) RETURNING id, is_group, name", [chatData.id, chatData.is_group, chatData.name]);
			console.log("repo users: ", users);
			this.addUsersLoop([users[0].user_id, users[1].user_id], client, chat[0].id);
			entity = chat[0];
			await client.query("COMMIT");
		} catch (err) {
			await client.query("ROLLBACK");
			console.log(err);
			throw new CustomError("Chat creation was unsuccesful", 500, true);
		} finally {
			client.release();
		}
		if (!entity) {
			throw new CustomError("Something wnet wrong. please try again later", 500, true);
		}
		return entity;
	};

	static createGroupChat = async (chatData: IChatEntity, users: string[]): Promise<IChatEntity> => {
		const client = await pool.connect();
		let entity: IChatEntity | undefined;
		try {
			await client.query("BEGIN");
			const { rows } = await client.query("INSERT INTO chats (id, is_group, name) VALUES ($1, $2, $3) RETURNING id, is_group, name", [chatData.id, chatData.is_group, chatData.name]);
			await this.addUsersLoop(users, client, chatData.id);
			await client.query("COMMIT");
			entity = rows[0];
		} catch (err) {
			client.query("ROLLBACK");
			console.log(err);
			throw err;
		} finally {
			client.release();
		}
		if (!entity) {
			throw new CustomError("Something wnet wrong. please try again later", 500, true);
		}
		return entity;
	};
	static addUsersToGroup = async (participants: string[], chat_id: string): Promise<void> => {
		const client = await pool.connect();
		try {
			await client.query("BEGIN");
			await this.addUsersLoop(participants, client, chat_id);
			await client.query("COMMIT");
		} catch (err) {
			console.log(err);
			client.query("ROLLBACK");
			throw err;
		} finally {
			client.release();
		}
	};
	static getChat = async (chat_id: string): Promise<IChatEntity> => {
		const { rows } = await pool.query("SELECT id, is_group, name FROM chats WHERE id = $1", [chat_id]);
		if (!rows[0]) {
			throw new CustomError("Ooops, something went wrong", 500, true);
		}

		return rows[0];
	};
	static updateName = async (chat: IChatEntity): Promise<IChatEntity> => {
		const { rows } = await pool.query("UPDATE chats SET name = $1 WHERE id = $2 RETURNING id, is_group, name", [chat.name, chat.id]);
		if (!rows[0]) {
			throw new CustomError("Ooops, something went wrong", 500, true);
		}
		return rows[0];
	};

	static loadChats = async (user_id: string, is_group: boolean): Promise<IChatEntity[]> => {
		const { rows } = await pool.query("SELECT chats.id, chats.is_group, chats.name FROM chats FULL JOIN contacts ON contacts.chat_id = chats.id FULL JOIN users_contacts ON users_contacts.contact_id = contacts.id WHERE users_contacts.user_id = $1 and chats.is_group = $2", [user_id, is_group]);
		if (!rows[0]) {
			throw new CustomError("No chats found", 404, true);
		}
		return rows;
	};

	static deleteChat = async (chat_id: string): Promise<void> => {
		await pool.query("DELETE FROM chats WHERE id = $1", [chat_id]);
	};

	static deleteUsersFromGroup = async (participants_ids: string[], chat_id: string): Promise<void> => {
		const client = await pool.connect();
		try {
			await client.query("BEGIN");
			await this.deleteUsersLoop(participants_ids, client, chat_id);
			await client.query("COMMIT");
		} catch (err) {
			console.log(err);
			client.query("ROLLBACK");
			throw err;
		} finally {
			client.release();
		}
	};
}
