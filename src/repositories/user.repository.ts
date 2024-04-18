import { UserEntity } from "../entities/user.entity/user.types";
import { pool } from "../utils/db/db";
import { convertImg } from "../tests/user.tests/testingAssets/readFile";

export const loadUserDataRepo = async (userId: string): Promise<Omit<UserEntity, "id" | "password">> => {
	const { rows } = await pool.query("SELECT username, email_address, profile_photo, lastname, firstname, birthday, country, city, occupation, school, description FROM users WHERE id = $1", [userId]);
	const userData: Omit<UserEntity, "id" | "password"> = {
		username: rows[0].username,
		email_address: rows[0].email_address,
		profile_photo: rows[0].profile_photo,
		lastname: rows[0].lastname,
		firstname: rows[0].firstname,
		birthday: rows[0].birthday,
		city: rows[0].city,
		occupation: rows[0].occupation,
		school: rows[0].school,
		description: rows[0].description,
	};
	return userData;
};

export const editUserAdditionalDataRepo = async (userId: string, newData: Omit<UserEntity, "id" | "password" | "username" | "email_address" | "profile_photo">): Promise<Omit<UserEntity, "id" | "password" | "username" | "email_address" | "profile_photo">> => {
	console.log(newData.lastname);

	const { rows } = await pool.query("UPDATE  users SET lastname = $1, firstname = $2, birthday = $3, city = $4, occupation = $5, school = $6, description = $7 WHERE id = $8 RETURNING lastname, firstname, birthday, city, occupation, school, description", [newData.lastname, newData.firstname, newData.birthday, newData.city, newData.occupation, newData.school, newData.description, userId]);

	const savedData: Omit<UserEntity, "id" | "password" | "username" | "email_address" | "profile_photo"> = {
		lastname: rows[0].lastname,
		firstname: rows[0].firstname,
		birthday: rows[0].birthday,
		city: rows[0].city,
		occupation: rows[0].occupation,
		school: rows[0].school,
		description: rows[0].description,
	};
	console.log(savedData);

	return savedData;
};

export const uploadProfilePhotoRepo = async (photo: Buffer, userId: string): Promise<boolean> => {
	let result = false;
	const { rows } = await pool.query("UPDATE users SET profile_photo = $1 WHERE id = $2 RETURNING profile_photo", [photo, userId]);
	const newBuffer: Buffer = rows[0].profile_photo;
	if (newBuffer === photo) {
		result = true;
	}
	return result;
};
