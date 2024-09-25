export interface IAuthEntity {
	id: string;
	password: string;
	username: string;
	emailAddress: string;
}

export interface IAuthDTO {
	username: string;
	emailAddress: string;
}

export type TAuthCreation = Omit<IAuthEntity, "id">;
export type TAuthLoginByNameData = Pick<IAuthEntity, "username" | "password">;
export type TAuthLoginByEmailData = Pick<IAuthEntity, "emailAddress" | "password">;

export type TAuthRegistrationReturnedData = {
	userData: Omit<IAuthEntity, "id" | "password">;
	id: string;
	accessToken?: string;
};
export type TAuthLoginReturnedData = {
	userData: Omit<IAuthEntity, "id" | "password">;
	password: string;
	id: string;
	accessToken?: string;
};
