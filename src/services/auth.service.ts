import { TAuthRegistration, TAuthRegistrationReturnedData, TAuthLoginByNameData, TAuthLoginReturnedData, TAuthLoginByEmailData } from "../entities/auth.entity/auth";
import { AuthRegisterEntity, AuthLoginNameEntity, AuthLoginEmailEntity } from "../entities/auth.entity/auth.entity";

export class AuthService {
	registerUser = async (userAuthData: Omit<TAuthRegistration, "id">): Promise<Omit<TAuthRegistrationReturnedData, "id">> => {
		const user = new AuthRegisterEntity(userAuthData);
		const data = await user.registerUser();
		return data;
	};
	loginUserByName = async (userAuthData: TAuthLoginByNameData): Promise<Omit<TAuthLoginReturnedData, "id" | "password">> => {
		const user = new AuthLoginNameEntity(userAuthData);
		const data = await user.login();
		return data;
	};
	loginUserByEmail = async (userAuthData: TAuthLoginByEmailData): Promise<Omit<TAuthLoginReturnedData, "id" | "password">> => {
		const user = new AuthLoginEmailEntity(userAuthData);
		const data = await user.login();
		return data;
	};
}
