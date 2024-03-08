import { config } from "dotenv";
import jwt from "jsonwebtoken";
import { UserLoginReturnedData, UserRegistrationReturnedData } from "../../entities/user.entity/user.types";
config();

export const generateAccessToken = (user: UserLoginReturnedData | UserRegistrationReturnedData): string => {
	const accessToken = jwt.sign({ id: user.id }, process.env.ACCESS_TOKEN_SECRET!, { expiresIn: "1h" });
	return accessToken;
};
