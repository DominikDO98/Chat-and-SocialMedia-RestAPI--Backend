import { EditAdditionalUserData, LoadFullUserData } from "../entities/user.entity/user.types";
import { editUserAdditionalDataRepo, loadUserDataRepo, uploadProfilePhotoRepo } from "../repositories/user.repository";
import { CustomError } from "../utils/errors/errors";

export const loadUserDataService = async (userId: string): Promise<LoadFullUserData> => {
	const userData = await loadUserDataRepo(userId);
	return userData;
};
export const editUserAdditionalDataService = async (userId: string, newData: Partial<EditAdditionalUserData>): Promise<EditAdditionalUserData> => {
	const savedData = await editUserAdditionalDataRepo(userId, newData);
	if (savedData !== newData) throw new CustomError("Failed to edit user data, please try again later");
	return savedData;
};
export const uploadProfilePhotoService = async (photo: Buffer, userId: string): Promise<boolean> => {
	const returnedPhoto = await uploadProfilePhotoRepo(photo, userId);
	if (returnedPhoto !== photo) throw new CustomError("Upload failed");
	return true;
};
