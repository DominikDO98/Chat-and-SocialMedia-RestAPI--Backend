import { UserEntity } from "../entities/user.entity/user.types";
import { pool } from "../utils/db/db";
import { convertImg } from "../utils/fileReader/readFile";

export const loadUserData = async (userId: string): Promise<Omit<UserEntity, "id" | "password">> => {
	const { rows } = await pool.query("SELECT username, email_address, profile_photo, lastname, firstname, birthday, country, city, occupation, school, description FROM users WHERE id = $1", [userId]);
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

export const editUserAdditionalData = async (userId: string, newData: Omit<UserEntity, "id" | "password" | "username" | "email_address">): Promise<Omit<UserEntity, "id" | "password" | "username" | "email_address">> => {
	const { rows } = await pool.query("INSERT INTO users (firstname, birthday, city, occupation, school, description) VALUES ( $1, $2, $3, $4, $5, $6) WHERE id = $7 RETURNING firstname, birthday, city, occupation, school, description", [newData.firstname, newData.birthday, newData.city, newData.occupation, newData.school, newData.description, userId]);

	const savedData: Omit<UserEntity, "id" | "password" | "username" | "email_address"> = {
		profile_photo: rows[0].profile_photo,
		firstname: rows[0].firstname,
		birthday: rows[0].birthday,
		city: rows[0].city,
		occupation: rows[0].occupation,
		school: rows[0].school,
		description: rows[0].description,
	};
	return savedData;
};

export const uploadProfilePhoto = async (userId: string): Promise<boolean> => {
	const buff = await convertImg();
	console.log(buff);

	const { rows } = await pool.query("UPDATE users SET profile_photo = $1 WHERE id = $2 RETURNING profile_photo", [buff, userId]);
	const newBlob: Buffer = rows[0].profile_photo;
	console.log(newBlob);

	return true;
};
uploadProfilePhoto("22f70797-1fe2-482c-bbac-eff97fdb66d9");
