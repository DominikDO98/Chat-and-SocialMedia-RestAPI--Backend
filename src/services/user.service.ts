import { EditAdditionalUserData, LoadFullUserData } from "../entities/user.entity/user.types";
import { UserRepository } from "../repositories/user.repository";

export class UserService {
	private _userRepository = UserRepository;
	constructor() {
		this._userRepository;
	}
	loadUserData = async (userId: string): Promise<LoadFullUserData> => {
		const userData = await this._userRepository.loadUserData(userId);
		return userData;
	};
	editUserAdditionalData = async (userId: string, newData: Partial<EditAdditionalUserData>): Promise<void> => {
		await this._userRepository.editUserAdditionalData(userId, newData);
	};
	uploadProfilePhoto = async (photo: Buffer, userId: string): Promise<void> => {
		await this._userRepository.uploadProfilePhoto(photo, userId);
	};
}
