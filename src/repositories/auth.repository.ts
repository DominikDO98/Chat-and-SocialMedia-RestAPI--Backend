import { IAuthEntity } from "../entities/auth.entity/auth";
import { pool } from "../utils/db/db";
import { AuthenticationError, CustomError } from "../utils/errors/errors";

export class AuthRepository {
	static getUsernameById = async (user_id: string): Promise<string> => {
		const { rows } = await pool.query("SELECT username FROM users WHERE id = $1", [user_id]);
		if (!rows[0]) {
			throw new CustomError("Cannot find the user", 500, true);
		}
		return rows[0].username;
	};
	static getOtherUserByContactId = async (contact_id: string, user_id: string): Promise<string> => {
		const { rows } = await pool.query("SELECT users.username FROM users_contacts FULL JOIN users ON users_contacts.user_id = users.id WHERE users_contacts.contact_id = $1 AND NOT users.id = $2", [contact_id, user_id]);
		if (!rows[0]) {
			throw new CustomError("User not found!", 404, true);
		}
		return rows[0];
	};
	static getLastMessageSenderUsername = async (chat_id: string): Promise<string> => {
		const { rows } = await pool.query("SELECT users.username FROM users FULL JOIN users_chats ON users.id = users_chats.user_id FULL JOIN messages ON messages.chat_id = users_chats.chat_id WHERE users_chats.chat_id = $1 AND messages.created_at = (SELECT MAX(created_at) FROM messages WHERE chat_id = $1)", [chat_id]);
		return rows[0];
	};
	static create = async (userAuthData: IAuthEntity): Promise<IAuthEntity> => {
		const { rows } = await pool.query("INSERT INTO users (id, username, password, email_address) VALUES ($1, $2, $3, $4) RETURNING id, username, email_address, password", [userAuthData.id, userAuthData.username, userAuthData.password, userAuthData.email_address]);
		if (!rows[0]) {
			throw new CustomError("Unexpected error!", 500, true);
		}

		return rows[0];
	};
	static getByName = async (username: string): Promise<IAuthEntity> => {
		const { rows } = await pool.query("SELECT id, username, password, email_address FROM users WHERE username = $1", [username]);
		if (!rows[0]) {
			throw new AuthenticationError("User with that username does not exist!", "username", 401);
		}
		return rows[0];
	};
	static getByEmail = async (email: string): Promise<IAuthEntity> => {
		const { rows } = await pool.query("SELECT id, username, password, email_address FROM users WHERE email_address = $1", [email]);
		if (!rows[0]) {
			throw new AuthenticationError("User with that e-mail address does not exist!", "email_address", 401);
		}
		return rows[0];
	};
}
