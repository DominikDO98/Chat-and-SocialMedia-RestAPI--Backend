import { IUserEntity } from "../entities/user.entity/user";
import { pool } from "../utils/db/db";
import { CustomError } from "../utils/errors/errors";

export class UserRepository {
	static loadUserData = async (userId: string): Promise<IUserEntity> => {
		const { rows } = await pool.query("SELECT user_id, profile_photo, lastname, firstname, birthday, country, city, occupation, school, description FROM users WHERE id = $1", [userId]);
		if (!rows[0]) {
			throw new CustomError("Failed to load user data, please try again later", 500);
		}
		return rows[0];
	};

	static editUserAdditionalData = async (userId: string, newData: IUserEntity): Promise<void> => {
		await pool.query("UPDATE  users SET lastname = COALESCE($1, lastname), firstname = COALESCE($2, firstname), birthday = COALESCE($3, birthday), city = COALESCE($4, city), occupation = COALESCE($5, occupation), school = COALESCE($6, school), description = COALESCE($7, description) WHERE id = $8", [newData.lastname, newData.firstname, newData.birthday, newData.city, newData.occupation, newData.school, newData.description, userId]);
	};

	static uploadProfilePhoto = async (photo: Buffer, userId: string): Promise<void> => {
		await pool.query("UPDATE users SET profile_photo = $1 WHERE id = $2", [photo, userId]);
	};
}
