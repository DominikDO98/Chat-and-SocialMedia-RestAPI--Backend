import { EditAdditionalUserData, LoadFullUserData } from "../entities/user.entity/user.types";
import { pool } from "../utils/db/db";
import { CustomError } from "../utils/errors/errors";

export class UserRepository {
	constructor() {}

	static loadUserDataRepo = async (userId: string): Promise<LoadFullUserData> => {
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

	static editUserAdditionalDataRepo = async (userId: string, newData: EditAdditionalUserData): Promise<void> => {
		await pool.query("UPDATE  users SET lastname = COALESCE($1, lastname), firstname = COALESCE($2, firstname), birthday = COALESCE($3, birthday), city = COALESCE($4, city), occupation = COALESCE($5, occupation), school = COALESCE($6, school), description = COALESCE($7, description) WHERE id = $8", [newData.lastname, newData.firstname, newData.birthday, newData.city, newData.occupation, newData.school, newData.description, userId]);
	};

	static uploadProfilePhotoRepo = async (photo: Buffer, userId: string): Promise<void> => {
		await pool.query("UPDATE users SET profile_photo = $1 WHERE id = $2", [photo, userId]);
	};
}
