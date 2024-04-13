import bcrypt from "bcrypt";
import { userFactory } from "../entities/user.entity/user.entity";
import { UserCreationEnitity, UserLoginByEmailData, UserLoginByNameData, UserLoginReturnedData, UserRegistrationReturnedData } from "../entities/user.entity/user.types";
import { loginUserByEmailRepo, loginUserByNameRepo, registerUserRepo } from "../repositories/auth.repository";
import { generateAccessToken } from "../utils/authenticationUtils/jwt.utils";
import { AuthenticationError } from "../utils/errors/errors";

export const registerUserService = async (userAuthData: Omit<UserCreationEnitity, "id">): Promise<Omit<UserRegistrationReturnedData, "id">> => {
	const newUser = userFactory(userAuthData);
	const newUserData = await registerUserRepo(newUser);
	const accessToken = generateAccessToken(newUserData.id);
	return {
		userData: newUserData.userData,
		accessToken: accessToken,
	};
};
export const loginUserByNameService = async (userAuthData: UserLoginByNameData): Promise<Omit<UserLoginReturnedData, "id" | "password">> => {
	const user = await loginUserByNameRepo(userAuthData.username);
	const validationResult = await bcrypt.compare(userAuthData.password, user.password);
	if (!validationResult) {
		throw new AuthenticationError("Wrong password", "password", 401);
	}
	const accessToken = generateAccessToken(user.id);
	return {
		userData: user.userData,
		accessToken: accessToken,
	};
};
export const loginUserByEmailService = async (userAuthData: UserLoginByEmailData): Promise<Omit<UserLoginReturnedData, "id" | "password">> => {
	const user = await loginUserByEmailRepo(userAuthData.email_address);
	const validationResult = await bcrypt.compare(userAuthData.password, user.password);
	if (!validationResult) {
		throw new AuthenticationError("Wrong password", "password", 401);
	}
	const accessToken = generateAccessToken(user.id);
	return {
		userData: user.userData,
		accessToken: accessToken,
	};
};
