import { IAuthEntity, TAuthCreation } from "./auth";

export class AuthEntity implements IAuthEntity {
	public readonly id: string;
	public readonly username;
	public readonly password;
	public readonly emailAddress;
	constructor(id: string, newUser: TAuthCreation) {
		this.id = id;
		this.username = newUser.username;
		this.password = newUser.password;
		this.emailAddress = newUser.emailAddress;
	}
}
