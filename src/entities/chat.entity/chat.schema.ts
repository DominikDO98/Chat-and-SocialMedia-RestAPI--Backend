import { string, z } from "zod";

export const ChatSchema = z.object({
	id: z.string().uuid(),
	is_group: z.boolean(),
	name: z.string().min(3).max(20).optional(),
});

export const ChatCreationSchema = ChatSchema.omit({
	id: true,
});

export const ChatParticipantsIdsSchema = z.array(string().uuid()).max(10);
