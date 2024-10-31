import { IInvitationEntity } from "../entities/invitation.entity/invitation";
import { pool } from "../utils/db/db";
import { CustomError } from "../utils/errors/errors";

export class InvitationRepository {
	static sendInvitation = async (invitation: IInvitationEntity): Promise<IInvitationEntity> => {
		const { rows } = await pool.query("INSERT INTO invitations (id, from_user_id, to_user_id) VALUES ($1, $2, $3) RETURNING id, from_user_id, to_user_id", [invitation.id, invitation.from_user_id, invitation.to_user_id]);
		return rows[0];
	};
	static loadInvitation = async (invitation_id: string, user_id: string): Promise<IInvitationEntity> => {
		const { rows } = await pool.query("SELECT id, from_user_id, to_user_id FROM invitations WHERE id = $1 AND to_user_id = $2", [invitation_id, user_id]);
		console.log(rows[0]);

		if (!rows[0]) {
			throw new CustomError("No such invitation was found", 404, true);
		}
		return rows[0];
	};
	static rejectInvitation = async (invitation_id: string, user_id: string): Promise<void> => {
		await pool.query("DELETE FROM invitations WHERE id = $1 AND to_user_id = $2", [invitation_id, user_id]);
	};
	static cancelInvitation = async (invitation_id: string, user_id: string): Promise<void> => {
		await pool.query("DELETE FROM invitations WHERE id = $1 AND from_user_id = $2", [invitation_id, user_id]);
	};
	static loadInvitations = async (user_id: string): Promise<IInvitationEntity[]> => {
		const { rows } = await pool.query("SELECT id, from_user_id, to_user_id FROM invitations WHERE to_user_id = $1", [user_id]);
		console.log(rows);

		return rows;
	};
}
