interface IAuth {
	id: string;
	password: string;
	username: string;
	emailAddress: string;
}

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

export type TAuthCreation = Omit<IAuth, "id">;
export type TAuthLoginByNameData = Pick<IAuth, "username" | "password">;
export type TAuthLoginByEmailData = Pick<IAuth, "emailAddress" | "password">;
