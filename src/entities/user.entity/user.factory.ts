import { hashSync } from "bcrypt";
import { v4 as uuid } from "uuid";
import { TUserCreation } from "./user.types";

export const userFactory = (newUser: Omit<TUserCreation, "id">): TUserCreation => {
	const hashedPassword = hashSync(newUser.password, 10);
	const user: TUserCreation = {
		id: uuid(),
		username: newUser.username,
		password: hashedPassword,
		email_address: newUser.email_address,
	};
	return user;
};
