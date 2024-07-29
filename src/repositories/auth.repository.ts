import { TUserCreation, TUserLoginReturnedData, TUserRegistrationReturnedData } from "../entities/user.entity/user.types";
import { pool } from "../utils/db/db";
import { AuthenticationError } from "../utils/errors/errors";

export class AuthRepository {
	constructor() {}

	static registerUser = async (userAuthData: TUserCreation): Promise<TUserRegistrationReturnedData> => {
		const { rows } = await pool.query("INSERT INTO users (id, username, password, email_address) VALUES ($1, $2, $3, $4) RETURNING id", [userAuthData.id, userAuthData.username, userAuthData.password, userAuthData.email_address]);
		const id = rows[0].id;
		const userData = {
			username: userAuthData.username,
			email_address: userAuthData.email_address,
		};
		return { userData, id };
	};
	static loginUserByName = async (username: string): Promise<TUserLoginReturnedData> => {
		const { rows } = await pool.query("SELECT id, username, password, email_address FROM users WHERE username = $1", [username]);
		if (!rows[0]) {
			throw new AuthenticationError("User with that username does not exist!", "username", 401);
		}
		const id = rows[0].id;
		const password = rows[0].password;
		const userData = {
			username: rows[0].username,
			email_address: rows[0].email_address,
		};
		return { userData, id, password };
	};
	static loginUserByEmail = async (email: string): Promise<TUserLoginReturnedData> => {
		const { rows } = await pool.query("SELECT id, username, password, email_address FROM users WHERE email_address = $1", [email]);
		if (!rows[0]) {
			throw new AuthenticationError("User with that e-mail address does not exist!", "email_address", 401);
		}
		const id = rows[0].id;
		const password = rows[0].password;
		const userData = {
			username: rows[0].username,
			email_address: rows[0].email_address,
		};
		return { userData, id, password };
	};
}
