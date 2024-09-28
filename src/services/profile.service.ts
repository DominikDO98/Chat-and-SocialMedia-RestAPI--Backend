import { IProfileDTO, TEditProfile } from "../entities/user.entity/profile";
import { ProfileDTO } from "../entities/user.entity/profile.dto";
import { ProfileEntity } from "../entities/user.entity/profile.entity";
import { ProfileRepository } from "../repositories/profile.repository";

export class ProfileService {
	private _profileRepository = ProfileRepository;
	loadProfile = async (userId: string): Promise<IProfileDTO> => {
		const returnedEntity = await this._profileRepository.loadProfile(userId);
		const dto = new ProfileDTO(returnedEntity);
		return dto;
	};
	editProfile = async (userId: string, newData: TEditProfile): Promise<IProfileDTO> => {
		const userDataEntity = new ProfileEntity(userId, newData);
		const returnedEntity = await this._profileRepository.editProfile(userDataEntity);
		const dto = new ProfileDTO(returnedEntity);
		return dto;
	};
	uploadProfilePhoto = async (photo: Buffer, userId: string): Promise<void> => {
		await this._profileRepository.uploadProfilePhoto(photo, userId);
	};
}
