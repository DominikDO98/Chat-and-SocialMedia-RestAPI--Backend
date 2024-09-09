import { z } from "zod";

export const ContactSchema = z.object({
	id: z.string().uuid(),
	chat_id: z.string().uuid(),
});
