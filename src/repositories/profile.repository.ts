import { IProfileEntity } from "../entities/user.entity/profile";
import { pool } from "../utils/db/db";
import { CustomError } from "../utils/errors/errors";

export class ProfileRepository {
	static createProfile = async (userId: string): Promise<void> => {
		await pool.query("INSERT INTO profiles (user_id) VALUES ($1)", [userId]);
	};

	static loadProfile = async (userId: string): Promise<IProfileEntity> => {
		const { rows } = await pool.query("SELECT profile_photo, lastname, firstname, birthday, country, city, occupation, school, description FROM profiles WHERE user_id = $1", [userId]);
		if (!rows[0]) {
			throw new CustomError("Failed to load user data, please try again later", 500);
		}

		return rows[0];
	};

	static editProfile = async (newData: IProfileEntity): Promise<IProfileEntity> => {
		const { rows } = await pool.query("UPDATE profiles SET lastname = COALESCE($1, lastname), firstname = COALESCE($2, firstname), birthday = COALESCE($3, birthday), city = COALESCE($4, city), occupation = COALESCE($5, occupation), school = COALESCE($6, school), description = COALESCE($7, description) WHERE user_id = $8 RETURNING lastname, firstname, birthday, city, occupation, school, description", [
			newData.lastname,
			newData.firstname,
			newData.birthday,
			newData.city,
			newData.occupation,
			newData.school,
			newData.description,
			newData.user_id,
		]);
		console.log(rows[0]);
		return rows[0];
	};

	static uploadProfilePhoto = async (photo: Buffer, userId: string): Promise<void> => {
		await pool.query("UPDATE profiles SET profile_photo = $1 WHERE id = $2", [photo, userId]);
	};
}
