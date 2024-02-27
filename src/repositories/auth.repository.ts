import { UserCreationEnitity } from "../entities/user.entity/user.types";
import { pool } from "../utils/db/db";

export const registerUserRepo = async (userRegistrationData: UserCreationEnitity): Promise<Omit<UserCreationEnitity, "password">> => {
	const { rows } = await pool.query("INSERT INTO users (id, username, password, email_address) VALUES ($1, $2, $3, $4) RETURNING id, username, email_address", [userRegistrationData.id, userRegistrationData.username, userRegistrationData.password, userRegistrationData.email_address]);

	return rows[0];
};
export const loginUserByNameRepo = async (username: string): Promise<UserCreationEnitity> => {
	const { rows } = await pool.query("SELECT id, username, password, email_address FROM users WHERE username = $1", [username]);

	return rows[0];
};
export const loginUserByEmailRepo = async (email: string): Promise<UserCreationEnitity> => {
	const { rows } = await pool.query("SELECT id, username, password, email_address FROM users WHERE email_address = $1", [email]);

	return rows[0];
};
