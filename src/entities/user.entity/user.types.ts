export type TUser = {
	id: string;
	username: string;
	password: string;
	email_address: string;
	profile_photo?: Buffer;
	lastname?: string;
	firstname?: string;
	birthday?: Date;
	country?: string;
	city?: string;
	occupation?: string;
	school?: string;
	description?: string;
};
//types for authtorization
export type TUserCreation = Pick<TUser, "id" | "username" | "password" | "email_address">;
export type TUserLoginByNameData = Pick<TUser, "username" | "password">;
export type TUserLoginByEmailData = Pick<TUser, "email_address" | "password">;

export type TUserRegistrationReturnedData = {
	userData: Omit<TUser, "id" | "password">;
	id: string;
	accessToken?: string;
};
export type TUserLoginReturnedData = {
	userData: Omit<TUser, "id" | "password">;
	password: string;
	id: string;
	accessToken?: string;
};
//types for editing profile
export type TLoadFullUserData = Omit<TUser, "id" | "password">;
export type TEditAdditionalUserData = Omit<TUser, "id" | "password" | "username" | "email_address" | "profile_photo">;
