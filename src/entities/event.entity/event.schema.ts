import { z } from "zod";

export const EventSchema = z.object({
	post_id: z.string().uuid().optional(),
	date: z.string().optional(),
	lat: z.number().max(90).multipleOf(0.000001).optional(),
	lon: z.number().max(180).multipleOf(0.000001).optional(),
});
