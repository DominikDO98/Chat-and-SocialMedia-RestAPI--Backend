import { IUserEntity } from "../entities/user.entity/user";
import { UserRepository } from "../repositories/user.repository";

export class UserService {
	private _userRepository = UserRepository;

	loadUserData = async (userId: string): Promise<IUserEntity> => {
		const userData = await this._userRepository.loadUserData(userId);
		return userData;
	};
	editUserAdditionalData = async (userId: string, newData: IUserEntity): Promise<void> => {
		await this._userRepository.editUserAdditionalData(userId, newData);
	};
	uploadProfilePhoto = async (photo: Buffer, userId: string): Promise<void> => {
		await this._userRepository.uploadProfilePhoto(photo, userId);
	};
}
