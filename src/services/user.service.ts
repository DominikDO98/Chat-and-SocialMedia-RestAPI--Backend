import { EditAdditionalUserData, LoadFullUserData } from "../entities/user.entity/user.types";
import { editUserAdditionalDataRepo, loadUserDataRepo, uploadProfilePhotoRepo } from "../repositories/user.repository";

export const loadUserDataService = async (userId: string): Promise<LoadFullUserData> => {
	const userData = await loadUserDataRepo(userId);
	return userData;
};
export const editUserAdditionalDataService = async (userId: string, newData: Partial<EditAdditionalUserData>): Promise<void> => {
	await editUserAdditionalDataRepo(userId, newData);
};
export const uploadProfilePhotoService = async (photo: Buffer, userId: string): Promise<void> => {
	await uploadProfilePhotoRepo(photo, userId);
};
