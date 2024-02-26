import { UserCreationEnitity } from "../entities/user.entity/user.types";
import { pool } from "../utils/db/db";
import { v4 as uuid } from "uuid"; //delete while done

export const registerUser = async (newUser: UserCreationEnitity): Promise<string> => {
	const { rows } = await pool.query("INSERT INTO users (id, username, password, email_address) VALUES ($1, $2, $3, $4) RETURNING id", [newUser.id, newUser.username, newUser.password, newUser.email_address]);
	console.log(rows[0].id);

	return "string";
};
registerUser({
	id: uuid(),
	username: "username",
	password: "password",
	email_address: "email@wp.pl",
}); // delete while done
