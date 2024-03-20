import { config } from "dotenv";
import jwt from "jsonwebtoken";
config();

export const generateAccessToken = (id: string): string => {
	const accessToken = jwt.sign({ id: id }, process.env.ACCESS_TOKEN_SECRET!, { expiresIn: "1h" });
	return accessToken;
};
