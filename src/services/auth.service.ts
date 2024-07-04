import bcrypt from "bcrypt";
import { userFactory } from "../entities/user.entity/user.entity";
import { UserCreationEnitity, UserLoginByEmailData, UserLoginByNameData, UserLoginReturnedData, UserRegistrationReturnedData } from "../entities/user.entity/user.types";
import { generateAccessToken } from "../utils/authenticationUtils/jwt.utils";
import { AuthenticationError } from "../utils/errors/errors";
import { AuthRepository } from "../repositories/auth.repository";

export class AuthService {
	private _authrepository = AuthRepository;
	constructor() {
		this._authrepository;
	}
	registerUser = async (userAuthData: Omit<UserCreationEnitity, "id">): Promise<Omit<UserRegistrationReturnedData, "id">> => {
		const newUser = userFactory(userAuthData);
		const newUserData = await this._authrepository.registerUser(newUser);
		const accessToken = generateAccessToken(newUserData.id);
		return {
			userData: newUserData.userData,
			accessToken: accessToken,
		};
	};
	loginUserByName = async (userAuthData: UserLoginByNameData): Promise<Omit<UserLoginReturnedData, "id" | "password">> => {
		const user = await this._authrepository.loginUserByName(userAuthData.username);
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
	loginUserByEmail = async (userAuthData: UserLoginByEmailData): Promise<Omit<UserLoginReturnedData, "id" | "password">> => {
		const user = await this._authrepository.loginUserByEmail(userAuthData.email_address);
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
}
