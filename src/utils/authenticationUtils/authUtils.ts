import { v4 } from "uuid";
import bcrypt, { hashSync } from "bcrypt";
import { config } from "dotenv";
import jwt from "jsonwebtoken";
config();

export class AuthUtils {
	static generateAccessToken(id: string): string {
		const accessToken = jwt.sign({ id: id }, process.env.ACCESS_TOKEN_SECRET!, { expiresIn: "1h" });
		return accessToken;
	}
	static uuid(): string {
		return v4();
	}
	static hashPassword(password: string): string {
		return hashSync(password, 10);
	}
	static async validatePassword(givenPassword: string, storedPassword: string): Promise<boolean> {
		const validationResult = await bcrypt.compare(givenPassword, storedPassword);
		return validationResult;
	}
}
