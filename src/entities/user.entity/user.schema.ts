import { z } from "zod";

export const UserSchema = z.object({
	id: z.string().uuid(),
	username: z.string().min(5).max(36),
	password: z.string().min(8).max(60),
	email_address: z.string().email().max(320),
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
//user authorization schemas
export const UserCreationSchema = UserSchema.pick({
	username: true,
	password: true,
	email_address: true,
});
export const UserLoginByNameSchema = UserCreationSchema.omit({
	email_address: true,
});
export const UserLoginByEmailSchema = UserCreationSchema.omit({
	username: true,
});
//edit userprofile schemas
export const LoadFullUserDataSchema = UserSchema.omit({
	id: true,
	password: true,
});
export const EditUserAddtionalDataSchema = UserSchema.omit({
	id: true,
	password: true,
	username: true,
	email_address: true,
});
