import { UserEntity } from "../entities/user.entity/user.types";
import { pool } from "../utils/db/db";
import { ContentNotFoundError } from "../utils/errors/errors";

export const loadUserData = async (userId: string): Promise<Omit<UserEntity, "id" | "password">> => {
	const { rows } = await pool.query("SELECT username, email_address, profile_photo, lastname, firstname, birthday, country, city, occupation, school, description FROM users WHERE id = $1", [userId]);
	if (!rows[0]) {
		throw new ContentNotFoundError("Sorry no content was found", 404);
	}
	const userData: Omit<UserEntity, "id" | "password"> = {
		username: rows[0].username,
		email_address: rows[0].email_address,
		profile_photo: rows[0].profile_photo,
		firstname: rows[0].firstname,
		birthday: rows[0].birthday,
		city: rows[0].city,
		occupation: rows[0].occupation,
		school: rows[0].school,
		description: rows[0].description,
	};
	return userData;
};
