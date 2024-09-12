import { hashSync } from "bcrypt";
import { v4 as uuid } from "uuid";
import { IUserEntity, TUserCreation } from "./user.types";

export class UserEntity implements IUserEntity {
	public id: string;
	public username;
	public password;
	public email_address;
	constructor(newUser: Omit<TUserCreation, "id">) {
		this.id = uuid();
		this.username = newUser.username;
		this.password = hashSync(newUser.password, 10);
		this.email_address = newUser.email_address;
	}
}
