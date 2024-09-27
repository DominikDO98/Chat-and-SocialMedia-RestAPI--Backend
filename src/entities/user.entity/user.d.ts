export interface IUserEntity {
	user_id: string;
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

export interface IUserDTO {
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
