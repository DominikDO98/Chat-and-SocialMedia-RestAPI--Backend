import { hashSync } from "bcrypt";
import { v4 as uuid } from "uuid";
import { z } from "zod";
import { UserCreationEnitity } from "./user.types";

export const UserSchema = z.object({
	id: z.string().uuid(),
	username: z.string().min(5).max(36),
	password: z.string().min(8).max(60),
	email_address: z.string().email().max(320),
	profile_photo: z.instanceof(Blob).optional(),
	lastname: z.string().max(20).optional(),
	firstname: z.string().max(20).optional(),
	birthday: z.date().optional(),
	country: z.string().max(27).optional(),
	city: z.string().max(85).optional(),
	occupation: z.string().max(50).optional(),
	school: z.string().max(50).optional(),
	description: z.string().max(200).optional(),
});
export const UserCreationSchema = UserSchema.omit({
	id: true,
	profile_photo: true,
	lastname: true,
	firstname: true,
	birthday: true,
	country: true,
	city: true,
	occupation: true,
	school: true,
	description: true,
});
export const UserLoginByNameSchema = UserCreationSchema.omit({
	email_address: true,
});
export const UserLoginByEmailSchema = UserCreationSchema.omit({
	username: true,
});

export const userFactory = (newUser: Omit<UserCreationEnitity, "id">): UserCreationEnitity => {
	const hashedPassword = hashSync(newUser.password, 10);
	const user: UserCreationEnitity = {
		id: uuid(),
		username: newUser.username,
		password: hashedPassword,
		email_address: newUser.email_address,
	};
	return user;
};
