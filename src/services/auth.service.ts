import { IAuthDTO, TAuthCreation, TAuthLoginByEmailData, TAuthLoginByNameData } from "../entities/auth.entity/auth";
import { AuthDTO } from "../entities/auth.entity/auth.dto";
import { AuthEntity } from "../entities/auth.entity/auth.entity";
import { AuthRepository } from "../repositories/auth.repository";
import { ProfileRepository } from "../repositories/profile.repository";
import { AuthUtils } from "../utils/authenticationUtils/authUtils";
import { AuthenticationError } from "../utils/errors/errors";
export class AuthService {
	private _authrepository = AuthRepository;
	private _profileRepository = ProfileRepository;
	registerUser = async (userAuthData: TAuthCreation): Promise<{ dto: IAuthDTO; accessToken: string }> => {
		const id = AuthUtils.uuid();
		const hashPassword = AuthUtils.hashPassword(userAuthData.password);
		const userEntity = new AuthEntity(id, hashPassword, userAuthData);
		const newUserEntity = await this._authrepository.create(userEntity);
		await this._profileRepository.createProfile(id);
		const dto = new AuthDTO(newUserEntity);
		const accessToken = AuthUtils.generateAccessToken(newUserEntity.id);
		return {
			dto: dto,
			accessToken: accessToken,
		};
	};
	loginUserByName = async (authData: TAuthLoginByNameData): Promise<{ dto: IAuthDTO; accessToken: string }> => {
		const userEntity = await this._authrepository.getByName(authData.username);
		if (!AuthUtils.validatePassword(authData.password, userEntity.password)) {
			throw new AuthenticationError("Wrong password", "password", 401);
		}
		const accessToken = AuthUtils.generateAccessToken(userEntity.id);
		const dto = new AuthDTO(userEntity);
		return {
			dto: dto,
			accessToken: accessToken,
		};
	};
	loginUserByEmail = async (authData: TAuthLoginByEmailData): Promise<{ dto: IAuthDTO; accessToken: string }> => {
		const userEntity = await this._authrepository.getByEmail(authData.emailAddress);
		if (!AuthUtils.validatePassword(authData.password, userEntity.password)) {
			throw new AuthenticationError("Wrong password", "password", 401);
		}
		const accessToken = AuthUtils.generateAccessToken(userEntity.id);
		const dto = new AuthDTO(userEntity);
		return {
			dto: dto,
			accessToken: accessToken,
		};
	};
}
