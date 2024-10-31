import { IContactEntity } from "../entities/contact.entity/contact";
import { IInvitationEntity } from "../entities/invitation.entity/invitation";
import { pool } from "../utils/db/db";
import { CustomError } from "../utils/errors/errors";

export class ContactRepository {
	static createContact = async (contact_id: string, invitation: IInvitationEntity): Promise<IContactEntity> => {
		const client = await pool.connect();
		let entity: IContactEntity | undefined;
		try {
			await client.query("BEGIN");
			const { rows } = await client.query("INSERT INTO contacts (id) VALUES ($1) RETURNING id, chat_id", [contact_id]);
			await client.query("INSERT INTO users_contacts (contact_id, user_id) VALUES ($1, $2)", [contact_id, invitation.from_user_id]);
			await client.query("INSERT INTO users_contacts (contact_id, user_id) VALUES ($1, $2)", [contact_id, invitation.to_user_id]);
			await client.query("COMMIT");
			entity = rows[0];
		} catch (err) {
			client.query("ROLLBACK");
			throw new CustomError("Contact creation was not succesfull!", 500, true);
		} finally {
			client.release();
		}
		if (!entity) {
			throw new CustomError("Contact creation was not succesfull!", 500, true);
		}
		return entity;
	};
	static deleteContact = async (contact_id: string): Promise<void> => {
		await pool.query("DELETE FROM contacts WHERE id = $1", [contact_id]);
	};
	static loadContactList = async (user_id: string): Promise<IContactEntity[]> => {
		const { rows } = await pool.query("SELECT contacts.id, contacts.chat_id FROM users_contacts FULL JOIN contacts ON contacts.id = users_contacts.contact_id WHERE users_contacts.user_id = $1 ", [user_id]);
		if (!rows[0]) {
			throw new CustomError("No contacts found", 404, false);
		}
		return rows;
	};
	static getContact = async (contact_id: string): Promise<IContactEntity> => {
		const { rows } = await pool.query("SELECT contacts.id, contacts.chat_id FROM contacts WHERE contacts.id = $1", [contact_id]);
		if (!rows[0]) {
			throw new CustomError("No contact was found", 404, true);
		}
		return rows[0];
	};
	static addChat = async (contact_id: string, chat_id: string): Promise<IContactEntity> => {
		const { rows } = await pool.query("UPDATE contacts SET chat_id = $1 WHERE contacts.id = $2 RETURNING id, chat_id", [chat_id, contact_id]);
		if (!rows[0]) {
			throw new CustomError("Ooops, somthing went wrong", 500, true);
		}
		return rows[0];
	};
}
