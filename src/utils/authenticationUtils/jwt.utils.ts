import jwt from "jsonwebtoken";
import { config } from "dotenv";
import { UserLoginReturnedData } from "../../entities/user.entity/user.types";
config();

export const generateAccessToken = (user: UserLoginReturnedData): string => {
	const accessToken = jwt.sign(user.id, process.env.ACCESS_TOKEN_SECRET, { expiresIn: "1h" });
	return accessToken;
};
