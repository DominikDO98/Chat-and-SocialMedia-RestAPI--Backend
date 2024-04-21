import { EditAdditionalUserData, LoadFullUserData } from "../entities/user.entity/user.types";
import { editUserAdditionalDataRepo, loadUserDataRepo } from "../repositories/user.repository";

export const loadUserDataService = async (userId: string): Promise<LoadFullUserData> => {
	const userData = await loadUserDataRepo(userId);
	return userData;
};
export const editUserAdditionalDataService = async (userId: string, newData: EditAdditionalUserData): Promise<EditAdditionalUserData> => {
	const savedData = await editUserAdditionalDataRepo(userId, newData);
	return savedData;
};
export const uploadProfilePhotoRepo = async (photo: Buffer, userId: string): Promise<Buffer> => {
	const returnedPhoto = await uploadProfilePhotoRepo(photo, userId);
	return returnedPhoto;
};
