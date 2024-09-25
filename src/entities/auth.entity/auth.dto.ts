import { IAuthDTO, IAuthEntity } from "./auth";

export class AuthDTO implements IAuthDTO {
	public readonly username: string;
	public readonly emailAddress: string;
	constructor(user: IAuthEntity) {
		this.username = user.username;
		this.emailAddress = user.emailAddress;
	}
}
