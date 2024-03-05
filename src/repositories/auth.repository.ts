import { UserCreationEnitity, UserLoginReturnedData, UserRegistrationReturnedData } from "../entities/user.entity/user.types";
import { pool } from "../utils/db/db";

export const registerUserRepo = async (userRegistrationData: UserCreationEnitity): Promise<UserRegistrationReturnedData> => {
	const { rows } = await pool.query("INSERT INTO users (id, username, password, email_address) VALUES ($1, $2, $3, $4) RETURNING id", [userRegistrationData.id, userRegistrationData.username, userRegistrationData.password, userRegistrationData.email_address]);
	const id = rows[0].id;
	const userData = {
		username: userRegistrationData.username,
		email_address: userRegistrationData.email_address,
	};
	return { userData, id };
};
export const loginUserByNameRepo = async (username: string): Promise<UserLoginReturnedData> => {
	const { rows } = await pool.query("SELECT id, username, password, email_address FROM users WHERE username = $1", [username]);
	const id = rows[0].id;
	const password = rows[0].password;
	const userData = {
		username: rows[0].username,
		email_address: rows[0].email_address,
	};
	return { userData, id, password };
};
export const loginUserByEmailRepo = async (email: string): Promise<UserLoginReturnedData> => {
	const { rows } = await pool.query("SELECT id, username, password, email_address FROM users WHERE email_address = $1", [email]);
	const id = rows[0].id;
	const password = rows[0].password;
	const userData = {
		username: rows[0].username,
		email_address: rows[0].email_address,
	};

	return { userData, id, password };
};
