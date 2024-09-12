import { z } from "zod";

export const MessageEntitySchema = z.object({
	id: z.string().uuid(),
	chat_id: z.string().uuid(),
	text: z.string().max(100),
	created_at: z.date(),
	send_by: z.string().uuid(),
	is_delivered: z.boolean(),
	picture: z.instanceof(Buffer).optional(),
	attachment: z.string().min(3).max(200).optional(),
});
