import { IProfileDTO, TEditProfile } from "../entities/profile.entity/profile";
import { ProfileDTO } from "../entities/profile.entity/profile.dto";
import { ProfileEntity } from "../entities/profile.entity/profile.entity";
import { ProfileRepository } from "../repositories/profile.repository";

export class ProfileService {
	private _profileRepository = ProfileRepository;

	createProfile = async (userId: string): Promise<void> => {
		await this._profileRepository.createProfile(userId);
	};

	loadProfileByContact = async (contactId: string, userId: string): Promise<IProfileDTO> => {
		const returnEnity = await this._profileRepository.loadProfileByContactId(contactId, userId);
		const dto = ProfileDTO.createDTO(returnEnity);
		return dto;
	};

	loadProfileByChat = async (chatId: string, userId: string): Promise<IProfileDTO> => {
		const returnEnity = await this._profileRepository.loadProfileByChatId(userId, chatId);
		console.log("profile service", returnEnity);
		const dto = ProfileDTO.createDTO(returnEnity);
		return dto;
	};

	loadChatParticipants = async (chatId: string): Promise<IProfileDTO[]> => {
		const participantsIds = await this._profileRepository.loadChatParticipants(chatId);
		const dtos = participantsIds.map((entity) => {
			const dto = ProfileDTO.createDTO(entity);
			return dto;
		});
		return dtos;
	};

	loadProfile = async (userId: string): Promise<IProfileDTO> => {
		const returnedEntity = await this._profileRepository.loadProfileById(userId);
		const dto = ProfileDTO.createDTO(returnedEntity);
		return dto;
	};
	editProfile = async (userId: string, newData: TEditProfile): Promise<IProfileDTO> => {
		const userDataEntity = new ProfileEntity(userId, newData);
		const returnedEntity = await this._profileRepository.editProfile(userDataEntity);
		const dto = ProfileDTO.createDTO(returnedEntity);
		return dto;
	};
	uploadProfilePhoto = async (photo: Buffer, userId: string): Promise<void> => {
		await this._profileRepository.uploadProfilePhoto(photo, userId);
	};
}
