import { UserCreationEnitity } from "../entities/user.entity/user.types";
import { pool } from "../utils/db/db";

export const registerUser = async (userRegistrationData: UserCreationEnitity): Promise<string> => {
	const { rows } = await pool.query("INSERT INTO users (id, username, password, email_address) VALUES ($1, $2, $3, $4) RETURNING id", [userRegistrationData.id, userRegistrationData.username, userRegistrationData.password, userRegistrationData.email_address]);

	return rows[0].id;
};
export const loginUserByName = async (username: string): Promise<string[]> => {
	const { rows } = await pool.query("SELECT id, username, password, email_address FROM users WHERE username = $1", [username]);
	console.log(rows[0]);

	return rows[0];
};
export const loginUserByEmail = async (email: string): Promise<string[]> => {
	const { rows } = await pool.query("SELECT id, username, password, email_address FROM users WHERE email_address = $1", [email]);
	console.log(rows[0]);

	return rows[0];
};
