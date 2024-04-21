export type UserEntity = {
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
export type UserCreationEnitity = Pick<UserEntity, "id" | "username" | "password" | "email_address">;
export type UserLoginByNameData = Pick<UserEntity, "username" | "password">;
export type UserLoginByEmailData = Pick<UserEntity, "email_address" | "password">;

export type UserRegistrationReturnedData = {
	userData: Omit<UserEntity, "id" | "password">;
	id: string;
	accessToken?: string;
};
export type UserLoginReturnedData = {
	userData: Omit<UserEntity, "id" | "password">;
	password: string;
	id: string;
	accessToken?: string;
};
//types for editing profile
export type LoadFullUserData = Omit<UserEntity, "id" | "password">;
export type EditAdditionalUserData = Omit<UserEntity, "id" | "password" | "username" | "email_address" | "profile_photo">;
