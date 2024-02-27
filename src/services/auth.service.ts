import { userFactory } from "../entities/user.entity/user.entity";
import { UserCreationEnitity } from "../entities/user.entity/user.types";
import { registerUserRepo } from "../repositories/auth.repository";

export const registerUserService = async (userRegistrationData: Omit<UserCreationEnitity, "id">): Promise<Omit<UserCreationEnitity, "password">> => {
	const newUser = userFactory(userRegistrationData);
	const newUserData = await registerUserRepo(newUser);
	console.log(newUserData);

	return newUserData;
};
