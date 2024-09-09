import bcrypt from "bcrypt";
import { TUserCreation, TUserLoginByEmailData, TUserLoginByNameData, TUserLoginReturnedData, TUserRegistrationReturnedData } from "../entities/user.entity/user.types";
import { generateAccessToken } from "../utils/authenticationUtils/jwt.utils";
import { AuthenticationError } from "../utils/errors/errors";
import { AuthRepository } from "../repositories/auth.repository";
import { userFactory } from "../entities/user.entity/user.factory";

export class AuthService {
	private _authrepository = AuthRepository;
	constructor() {
		this._authrepository;
	}
	registerUser = async (userAuthData: Omit<TUserCreation, "id">): Promise<Omit<TUserRegistrationReturnedData, "id">> => {
		const newUser = userFactory(userAuthData);
		const newUserData = await this._authrepository.registerUser(newUser);
		const accessToken = generateAccessToken(newUserData.id);
		return {
			userData: newUserData.userData,
			accessToken: accessToken,
		};
	};
	loginUserByName = async (userAuthData: TUserLoginByNameData): Promise<Omit<TUserLoginReturnedData, "id" | "password">> => {
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
	loginUserByEmail = async (userAuthData: TUserLoginByEmailData): Promise<Omit<TUserLoginReturnedData, "id" | "password">> => {
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
