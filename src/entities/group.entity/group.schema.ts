import { z } from "zod";

export const GroupSchema = z.object({
	id: z.string().uuid(),
	admin_id: z.string().uuid(),
	name: z.string().min(3).max(20),
	created_at: z.date(),
	is_private: z.boolean(),
	description: z.string().min(3).max(200),
	profile_photo: z.instanceof(Buffer).optional(),
});
