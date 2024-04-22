import { EditAdditionalUserData, LoadFullUserData, UserEntity } from "../entities/user.entity/user.types";
import { pool } from "../utils/db/db";
import { CustomError } from "../utils/errors/errors";

export const loadUserDataRepo = async (userId: string): Promise<LoadFullUserData> => {
	const { rows } = await pool.query("SELECT username, email_address, profile_photo, lastname, firstname, birthday, country, city, occupation, school, description FROM users WHERE id = $1", [userId]);
	if (!rows[0]) {
		throw new CustomError("Failed to load user data, please try again later", 500);
	}
	const userData: LoadFullUserData = {
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

export const editUserAdditionalDataRepo = async (userId: string, newData: EditAdditionalUserData): Promise<EditAdditionalUserData> => {
	const { rows } = await pool.query("UPDATE  users SET lastname = $1, firstname = $2, birthday = $3, city = $4, occupation = $5, school = $6, description = $7 WHERE id = $8 RETURNING lastname, firstname, birthday, city, occupation, school, description", [newData.lastname, newData.firstname, newData.birthday, newData.city, newData.occupation, newData.school, newData.description, userId]);
	if (!rows[0]) {
		throw new CustomError("Failed to edit user data, please try again later", 500);
	}
	const savedData: Omit<UserEntity, "id" | "password" | "username" | "email_address" | "profile_photo"> = {
		lastname: rows[0].lastname,
		firstname: rows[0].firstname,
		birthday: rows[0].birthday,
		city: rows[0].city,
		occupation: rows[0].occupation,
		school: rows[0].school,
		description: rows[0].description,
	};
	return savedData;
};

export const uploadProfilePhotoRepo = async (photo: Buffer, userId: string): Promise<Buffer> => {
	const { rows } = await pool.query("UPDATE users SET profile_photo = $1 WHERE id = $2 RETURNING profile_photo", [photo, userId]);
	if (!rows[0]) {
		throw new CustomError("Upload failed", 500);
	}
	const returnedPhoto: Buffer = rows[0].profile_photo;
	return returnedPhoto;
};
