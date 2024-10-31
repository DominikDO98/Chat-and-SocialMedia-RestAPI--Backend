import { IProfileEntity } from "../entities/profile.entity/profile";
import { pool } from "../utils/db/db";
import { CustomError } from "../utils/errors/errors";

export class ProfileRepository {
	static createProfile = async (userId: string): Promise<void> => {
		await pool.query("INSERT INTO profiles (user_id) VALUES ($1)", [userId]);
	};

	static loadProfileById = async (userId: string): Promise<IProfileEntity> => {
		const { rows } = await pool.query("SELECT profile_photo, lastname, firstname, birthday, country, city, occupation, school, description FROM profiles WHERE user_id = $1", [userId]);
		if (!rows[0]) {
			throw new CustomError("Failed to load user data, please try again later", 500);
		}
		return rows[0];
	};

	static getLastMessageSender = async (chat_id: string): Promise<IProfileEntity> => {
		const { rows } = await pool.query("SELECT profiles.profile_photo, profiles.lastname, profiles.firstname, profiles.birthday, profiles.country, profiles.city, profiles.occupation, profiles.school, profiles.description FROM profiles FULL JOIN users_chats ON profiles.user_id = users_chats.user_id FULL JOIM messages ON messages.chat_id = users_chats.chat_id WHERE users_chats.chat_id = $1 AND messages.created_at = (SELECT MAX(messages.created_at) FROM messages WHERE chat_id = $1)", [chat_id]);
		if (!rows[0]) {
			throw new CustomError("Cannot load a chat member, please try again later", 500, true);
		}
		return rows[0];
	};

	static loadProfileByContactId = async (contact_id: string, user_id: string): Promise<IProfileEntity> => {
		const { rows } = await pool.query("SELECT profiles.profile_photo, profiles.lastname, profiles.firstname, profiles.birthday, profiles.country, profiles.city, profiles.occupation, profiles.school, profiles.description FROM profiles FULL JOIN users_contacts ON profiles.user_id = users_contacts.user_id WHERE users_contacts.contact_id = $1 AND NOT profiles.user_id = $2", [contact_id, user_id]);
		if (!rows[0]) {
			throw new CustomError("Profile not found!", 404, true);
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
		if (!rows[0]) {
			throw new CustomError("Failed to edit user data, please try again later", 500, true);
		}
		return rows[0];
	};

	static loadChatParticipants = async (chat_id: string): Promise<IProfileEntity[]> => {
		const { rows } = await pool.query("SELECT profiles.profile_photo, profiles.lastname, profiles.firstname, profiles.birthday, profiles.country, profiles.city, profiles.occupation, profiles.school, profiles.description FROM profiles FULL JOIN users_chats ON profiles.user_id = users_chats.user_id WHERE chat_id = $1", [chat_id]);
		return rows;
	};

	static uploadProfilePhoto = async (photo: Buffer, userId: string): Promise<void> => {
		await pool.query("UPDATE profiles SET profile_photo = $1 WHERE id = $2", [photo, userId]);
	};
}
