import { UserFullEntity, UserRegistrationEntity } from "./user.entity";
import { IUserEntity } from "./user.types";

export class UserFactory {
	static createUser(newUser: IUserEntity) {
		if (newUser.id) {
			return new UserFullEntity(newUser);
		} else {
			return new UserRegistrationEntity(newUser);
		}
	}
}
