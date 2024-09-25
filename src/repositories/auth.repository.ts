import { IAuthLoginEmailEntity, IAuthLoginNameEntity, IAuthRegisterEntity, TAuthLoginReturnedData, TAuthRegistrationReturnedData } from "../entities/auth.entity/auth";
import { AuthLoginEmailDTO, AuthLoginNameDTO, AuthRegisterDTO } from "../entities/auth.entity/auth.dto";
import { pool } from "../utils/db/db";
import { AuthenticationError } from "../utils/errors/errors";

export class AuthRepository {
	static registerUser = async (userEntity: IAuthRegisterEntity): Promise<TAuthRegistrationReturnedData> => {
		const userDTO = AuthRegisterDTO.createDTO(userEntity);
		const { rows } = await pool.query("INSERT INTO users (id, username, password, email_address) VALUES ($1, $2, $3, $4) RETURNING id, username, email_address", [userDTO.id, userDTO.username, userDTO.password, userDTO.email_address]);
		const id = rows[0].id;
		const userData = {
			username: rows[0].username,
			emailAddress: rows[0].email_address,
		};
		return { userData, id };
	};
	static loginUserByName = async (userEntity: IAuthLoginNameEntity): Promise<TAuthLoginReturnedData> => {
		const userDTO = AuthLoginNameDTO.createDTO(userEntity);
		const { rows } = await pool.query("SELECT id, username, password, email_address FROM users WHERE username = $1", [userDTO.username]);
		if (!rows[0]) {
			throw new AuthenticationError("User with that username does not exist!", "username", 401);
		}
		const id = rows[0].id;
		const password = rows[0].password;
		const userData = {
			username: rows[0].username,
			emailAddress: rows[0].email_address,
		};
		return { userData, id, password };
	};
	static loginUserByEmail = async (userEntity: IAuthLoginEmailEntity): Promise<TAuthLoginReturnedData> => {
		const userDTO = AuthLoginEmailDTO.createDTO(userEntity);
		const { rows } = await pool.query("SELECT id, username, password, email_address FROM users WHERE email_address = $1", [userDTO.email_address]);
		if (!rows[0]) {
			throw new AuthenticationError("User with that e-mail address does not exist!", "email_address", 401);
		}
		const id = rows[0].id;
		const password = rows[0].password;
		const userData = {
			username: rows[0].username,
			emailAddress: rows[0].email_address,
		};
		return { userData, id, password };
	};
}
