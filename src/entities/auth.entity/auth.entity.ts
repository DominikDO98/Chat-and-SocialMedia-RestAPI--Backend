import { IAuthEntity, TAuthCreation } from "./auth";

export class AuthEntity implements IAuthEntity {
	public readonly id: string;
	public readonly username;
	public readonly password;
	public readonly email_address;
	constructor(id: string, hashedPassword: string, newUser: TAuthCreation) {
		this.id = id;
		this.username = newUser.username;
		this.password = hashedPassword;
		this.email_address = newUser.emailAddress;
	}
}
