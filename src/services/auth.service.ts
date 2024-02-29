import bcrypt from "bcrypt";
import { userFactory } from "../entities/user.entity/user.entity";
import { UserCreationEnitity, UserLoginByNameData } from "../entities/user.entity/user.types";
import { loginUserByEmailRepo, loginUserByNameRepo, registerUserRepo } from "../repositories/auth.repository";
import { ValidationError } from "../utils/middlewareUtils/errors";

export const registerUserService = async (userRegistrationData: Omit<UserCreationEnitity, "id">): Promise<Omit<UserCreationEnitity, "password" | "id">> => {
	const newUser = userFactory(userRegistrationData);
	const newUserData = await registerUserRepo(newUser);
	//TODO: generate access token
	console.log(newUserData);

	return newUserData.userData;
};
export const loginUserByNameService = async (userLoginData: UserLoginByNameData): Promise<Omit<UserCreationEnitity, "password" | "id">> => {
	const user = await loginUserByNameRepo(userLoginData.username);
	const validationResult = await bcrypt.compare(userLoginData.password, user.password);
	if (!validationResult) {
		throw new ValidationError("Wrong password", 401);
	}
	//TODO: generate access token
	return user.userData;
};
export const loginUserByEmailService = async (userLoginData: UserLoginByNameData): Promise<Omit<UserCreationEnitity, "password" | "id">> => {
	const user = await loginUserByEmailRepo(userLoginData.username);
	const validationResult = await bcrypt.compare(userLoginData.password, user.password);
	if (!validationResult) {
		throw new ValidationError("Wrong password", 401);
	}
	//TODO: generate access token
	return user.userData;
};
