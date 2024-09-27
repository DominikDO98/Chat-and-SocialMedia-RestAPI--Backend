import { IAuthEntity } from "../entities/auth.entity/auth";
import { pool } from "../utils/db/db";
import { AuthenticationError } from "../utils/errors/errors";

export class AuthRepository {
	static create = async (userAuthData: IAuthEntity): Promise<IAuthEntity> => {
		const { rows } = await pool.query("INSERT INTO users (id, username, password, email_address) VALUES ($1, $2, $3, $4) RETURNING id, username, email_address, password", [userAuthData.id, userAuthData.username, userAuthData.password, userAuthData.email_address]);

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
