export interface IProfileEntity {
	user_id: string;
	profile_photo: Buffer | undefined;
	lastname: string | undefined;
	firstname: string | undefined;
	birthday: Date | undefined;
	country: string | undefined;
	city: string | undefined;
	occupation: string | undefined;
	school: string | undefined;
	description: string | undefined;
}

export interface IProfileDTO {
	profilePhoto: Buffer | undefined;
	lastname: string | undefined;
	firstname: string | undefined;
	birthday: Date | undefined;
	country: string | undefined;
	city: string | undefined;
	occupation: string | undefined;
	school: string | undefined;
	description: string | undefined;
}

export type TEditProfile = {
	profilePhoto: Buffer | undefined;
	lastname: string | undefined;
	firstname: string | undefined;
	birthday: Date | undefined;
	country: string | undefined;
	city: string | undefined;
	occupation: string | undefined;
	school: string | undefined;
	description: string | undefined;
};
