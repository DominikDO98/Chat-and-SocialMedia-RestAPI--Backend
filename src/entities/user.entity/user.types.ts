export type UserEntity = {
	id: string;
	username: string;
	password: string;
	email_address: string;
	profile_photo?: Blob;
	lastname?: string;
	firstname?: string;
	birthday?: Date;
	country?: string;
	city?: string;
	occupation?: string;
	school?: string;
	description?: string;
};

export type UserCreationEnitity = Pick<UserEntity, "id" | "username" | "password" | "email_address">;
export type UserLoginByNameData = Pick<UserEntity, "username" | "password">;
export type UserLoginByEmailData = Pick<UserEntity, "email_address" | "password">;

export type UserRegistrationReturnedData = {
	user: Pick<UserEntity, "username" | "email_address">;
	id: string;
};
export type UserLoginReturnedData = {
	user: Pick<UserEntity, "username" | "email_address" | "password">;
	id: string;
};
