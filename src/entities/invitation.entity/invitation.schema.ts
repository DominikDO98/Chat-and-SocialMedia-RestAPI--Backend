import { z } from "zod";

export const InvitationEntitySchema = z.object({
	id: z.string().uuid(),
	from_user_id: z.string().uuid(),
	to_user_id: z.string().uuid(),
});

export const InvitationCreationSchema = z.string().uuid();
