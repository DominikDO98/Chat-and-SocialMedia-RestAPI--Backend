import { PoolClient } from "pg";

export const addUsersLoop = async (participantsId: string[], client: PoolClient, converation_id: string) => {
	participantsId.forEach(async (user) => {
		await client.query("INSERT INTO users_conversation (user_id, conversation_id) VALUES ($1, $2)", [user, converation_id]);
	});
};
