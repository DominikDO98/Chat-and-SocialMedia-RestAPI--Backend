import { UserEntity } from "../entities/user.entity/user.types";
import { editUserAdditionalDataRepo, loadUserDataRepo } from "../repositories/user.repository";

export const loadUserDataService = async (userId: string): Promise<Omit<UserEntity, "id" | "password">> => {
	const userData = await loadUserDataRepo(userId);
	return userData;
};
export const editUserAdditionalDataService = async (userId: string, newData: Omit<UserEntity, "id" | "password" | "username" | "email_address" | "profile_photo">): Promise<Omit<UserEntity, "id" | "password" | "username" | "email_address" | "profile_photo">> => {
	const savedData = await editUserAdditionalDataRepo(userId, newData);
	return savedData;
};
export const uploadProfilePhotoRepo = async (photo: Buffer, userId: string): Promise<Buffer> => {
	const returnedPhoto = await uploadProfilePhotoRepo(photo, userId);
	return returnedPhoto;
};
