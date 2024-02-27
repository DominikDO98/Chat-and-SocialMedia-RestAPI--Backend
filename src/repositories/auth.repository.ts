import { UserCreationEnitity } from "../entities/user.entity/user.types";
import { pool } from "../utils/db/db";

export const registerUser = async (newUser: UserCreationEnitity): Promise<string> => {
	const { rows } = await pool.query("INSERT INTO users (id, username, password, email_address) VALUES ($1, $2, $3, $4) RETURNING id", [newUser.id, newUser.username, newUser.password, newUser.email_address]);

	return rows[0].id;
};
