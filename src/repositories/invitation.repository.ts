import { InvitationEntity } from "../entities/invitation.entity/invitation.type";
import { pool } from "../utils/db/db";

export const sendInvitationRepo = async (invitation: InvitationEntity): Promise<void> => {
	await pool.query("INSERT INTO invitations (id, from_user_id, to_user_id) VALUES ($1, $2, $3)", [invitation.id, invitation.from_user_id, invitation.to_user_id]);
};

export const acceptInvitationRepo = async (invitaiton_id: string, contact_id: string, user_id: string): Promise<void> => {
	const client = await pool.connect();
	try {
		await client.query("BEGIN");
		const { rows } = await client.query("SELECT id, from_user_id, to_user_id FROM invitations WHERE id = $1 AND to_user_id = $2", [invitaiton_id, user_id]);
		await client.query("DELETE FROM invitations WHERE id = $1 AND to_user_id = $2", [rows[0].id, user_id]);
		await client.query("INSERT INTO contacts (id) VALUES ($1)", [contact_id]);
		await client.query("INSERT INTO users_contacts (user_id, contact_id", [rows[0].from_user_id, contact_id]);
		await client.query("INSERT INTO users_contacts (user_id, contact_id) VALUES ($1, $2)", [rows[0].to_user_id, contact_id]);
		client.query("COMMIT");
	} catch (err) {
		console.log(err);
		client.query("ROLLBACK");
		throw err;
	} finally {
		client.release();
	}
};

export const rejectInvitationRepo = async (invitation_id: string, user_id: string): Promise<void> => {
	await pool.query("DELETE FROM invitations WHERE id = $1 AND to_user_id = $2", [invitation_id, user_id]);
};

export const cancelInvitationRepo = async (invitation_id: string, user_id: string): Promise<void> => {
	await pool.query("DELETE FROM invitations WHERE id = $1 AND from_user_id = $2", [invitation_id, user_id]);
};

export const loadInvitations = async (user_id: string): Promise<InvitationEntity[]> => {
	//TODO: cahnge to return user data insead of ids
	const { rows } = await pool.query("SELECT id, from_user_id, to_user_id FROM invitations WHERE from_user_id = $1 OR to_user_id = $1", [user_id]);
	return rows;
};
