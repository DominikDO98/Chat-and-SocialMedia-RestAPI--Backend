import { IProfileEntity, TEditProfile } from "./profile";

export class ProfileEntity implements IProfileEntity {
	public readonly user_id;
	public profile_photo;
	public lastname;
	public firstname;
	public birthday;
	public country;
	public city;
	public occupation;
	public school;
	public description;

	constructor(id: string, newData: TEditProfile) {
		this.user_id = id;
		this.profile_photo = newData.profilePhoto ? newData.profilePhoto : undefined;
		this.lastname = newData.lastname ? newData.lastname : undefined;
		this.firstname = newData.firstname ? newData.firstname : undefined;
		this.birthday = newData.birthday ? newData.birthday : undefined;
		this.country = newData.country ? newData.country : undefined;
		this.city = newData.city ? newData.city : undefined;
		this.occupation = newData.occupation ? newData.occupation : undefined;
		this.school = newData.school ? newData.school : undefined;
		this.description = newData.description ? newData.description : undefined;
	}
}
