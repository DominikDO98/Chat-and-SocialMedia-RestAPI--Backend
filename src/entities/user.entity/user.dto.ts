import { IUserDTO, IUserEntity } from "./user";

export class UserDTO implements IUserDTO {
	public readonly profilePhoto: Buffer | undefined;
	public readonly lastname: string | undefined;
	public readonly firstname: string | undefined;
	public readonly birthday: Date | undefined;
	public readonly country: string | undefined;
	public readonly city: string | undefined;
	public readonly occupation: string | undefined;
	public readonly school: string | undefined;
	public readonly description: string | undefined;
	constructor(userData: IUserEntity) {
		this.profilePhoto = userData.profilePhoto;
		this.lastname = userData.lastname;
		this.firstname = userData.firstname;
		this.birthday = userData.birthday;
		this.country = userData.country;
		this.city = userData.city;
		this.occupation = userData.occupation;
		this.school = userData.school;
		this.description = userData.description;
	}
}
