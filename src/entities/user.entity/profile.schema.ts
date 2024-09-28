import { z } from "zod";

export const ProfileEntitySchema = z.object({
	user_id: z.string().uuid(),
	profile_photo: z.instanceof(Buffer).optional(),
	lastname: z.string().max(20).optional(),
	firstname: z.string().max(20).optional(),
	birthday: z.date().optional(),
	country: z.string().max(27).optional(),
	city: z.string().max(85).optional(),
	occupation: z.string().max(50).optional(),
	school: z.string().max(50).optional(),
	description: z.string().max(200).optional(),
});

export const ProfileDTOSchema = z.object({
	profilePhoto: z.instanceof(Buffer).optional(),
	lastname: z.string().max(20).optional(),
	firstname: z.string().max(20).optional(),
	birthday: z.date().optional(),
	country: z.string().max(27).optional(),
	city: z.string().max(85).optional(),
	occupation: z.string().max(50).optional(),
	school: z.string().max(50).optional(),
	description: z.string().max(200).optional(),
});
