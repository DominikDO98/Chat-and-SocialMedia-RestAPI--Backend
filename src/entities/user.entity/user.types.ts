export interface IUserEntity {
	id?: string;
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
}
//types for authtorization
export type TUserCreation = Pick<IUserEntity, "id" | "username" | "password" | "email_address">;
export type TUserLoginByNameData = Pick<IUserEntity, "username" | "password">;
export type TUserLoginByEmailData = Pick<IUserEntity, "email_address" | "password">;

export type TUserRegistrationReturnedData = {
	userData: Omit<IUserEntity, "id" | "password">;
	id: string;
	accessToken?: string;
};
export type TUserLoginReturnedData = {
	userData: Omit<IUserEntity, "id" | "password">;
	password: string;
	id: string;
	accessToken?: string;
};
//types for editing profile
export type TLoadFullUserData = Omit<IUserEntity, "id" | "password">;
export type TEditAdditionalUserData = Omit<IUserEntity, "id" | "password" | "username" | "email_address" | "profile_photo">;
