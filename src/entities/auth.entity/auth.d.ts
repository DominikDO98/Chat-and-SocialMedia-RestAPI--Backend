export interface IAuthEntity {
	id: string;
	password: string;
	username: string;
	email_address: string;
}

export interface IAuthDTO {
	username: string;
	emailAddress: string;
}

export type TAuthCreation = {
	password: string;
	username: string;
	emailAddress: string;
};

export type TAuthLoginByNameData = Pick<TAuthCreation, "username" | "password">;
export type TAuthLoginByEmailData = Pick<TAuthCreation, "emailAddress" | "password">;
