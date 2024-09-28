import { IProfileDTO, IProfileEntity } from "./profile";

export class ProfileDTO implements IProfileDTO {
	public readonly profilePhoto: Buffer | undefined;
	public readonly lastname: string | undefined;
	public readonly firstname: string | undefined;
	public readonly birthday: Date | undefined;
	public readonly country: string | undefined;
	public readonly city: string | undefined;
	public readonly occupation: string | undefined;
	public readonly school: string | undefined;
	public readonly description: string | undefined;
	constructor(userData: IProfileEntity) {
		this.profilePhoto = userData.profile_photo ? userData.profile_photo : undefined;
		this.lastname = userData.lastname ? userData.lastname : undefined;
		this.firstname = userData.firstname ? userData.firstname : undefined;
		this.birthday = userData.birthday ? userData.birthday : undefined;
		this.country = userData.country ? userData.country : undefined;
		this.city = userData.city ? userData.city : undefined;
		this.occupation = userData.occupation ? userData.occupation : undefined;
		this.school = userData.school ? userData.school : undefined;
		this.description = userData.description ? userData.description : undefined;
	}
}
