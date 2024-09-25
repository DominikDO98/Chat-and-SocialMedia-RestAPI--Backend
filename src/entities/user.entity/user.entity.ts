import { IUserEntity } from "./user";

export class UserEntity implements IUserEntity {
	public readonly userId;
	public profilePhoto;
	public lastname;
	public firstname;
	public birthday;
	public country;
	public city;
	public occupation;
	public school;
	public description;

	constructor(newUser: IUserEntity) {
		this.userId = newUser.userId;
		this.profilePhoto = newUser.profilePhoto ? newUser.profilePhoto : undefined;
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
