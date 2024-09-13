import { hashSync } from "bcrypt";
import { v4 as uuid } from "uuid";
import { IUserEntity, TUserCreation } from "./user.types";

export class UserRegistrationEntity implements IUserEntity {
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

export class UserFullEntity implements IUserEntity {
	public id;
	public username;
	public password;
	public email_address;
	public profile_photo?;
	public lastname?;
	public firstname?;
	public birthday?;
	public country?;
	public city?;
	public occupation?;
	public school?;
	public description?;

	constructor(newUser: IUserEntity) {
		this.id = newUser.id;
		this.username = newUser.username;
		this.password = "";
		this.email_address = newUser.email_address;
		this.profile_photo = newUser.profile_photo ? newUser.profile_photo : undefined;
		this.lastname = newUser.lastname ? newUser.lastname : undefined;
		this.firstname = newUser.firstname ? newUser.firstname : undefined;
		this.birthday = newUser.birthday ? newUser.birthday : undefined;
		this.country = newUser.country ? newUser.country : undefined;
		this.city = newUser.city ? newUser.city : undefined;
		this.occupation = newUser.occupation ? newUser.occupation : undefined;
		this.school = newUser.school ? newUser.school : undefined;
		this.description = newUser.description ? newUser.description : undefined;
	}
}
