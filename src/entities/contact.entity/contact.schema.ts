import { z } from "zod";

export const ContactEntitySchema = z.object({
	id: z.string().uuid(),
	chat_id: z.string().uuid(),
});
