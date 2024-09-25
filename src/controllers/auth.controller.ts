import { NextFunction, Request, Response } from "express";
import { AuthService } from "../services/auth.service";
import { AuthCreationSchema, AuthLoginByNameSchema, AuthLoginByEmailSchema } from "../entities/user.entity/user.schema";

export class AuthController {
	private _authService = new AuthService();
	constructor() {
		this._authService;
	}
	registerUser = async (req: Request, res: Response, next: NextFunction) => {
		try {
			AuthCreationSchema.parse(req.body.userAuthData);
			const recivedData = await this._authService.registerUser(req.body.userAuthData);
			res.cookie("authToken", recivedData.accessToken, { secure: false, httpOnly: true, domain: undefined }).status(201).json(recivedData.userData);
		} catch (err) {
			next(err);
		}
	};
	loginUserByName = async (req: Request, res: Response, next: NextFunction) => {
		try {
			AuthLoginByNameSchema.parse(req.body.userAuthData);
			const recivedData = await this._authService.loginUserByName(req.body.userAuthData);
			res.cookie("authToken", recivedData.accessToken, { secure: false, httpOnly: true, domain: undefined }).status(200).json(recivedData.userData);
		} catch (err) {
			next(err);
		}
	};
	loginUserByEmail = async (req: Request, res: Response, next: NextFunction) => {
		try {
			AuthLoginByEmailSchema.parse(req.body.userAuthData);
			const recivedData = await this._authService.loginUserByEmail(req.body.userAuthData);
			res.cookie("authToken", recivedData.accessToken, { secure: false, httpOnly: true, domain: undefined }).status(200).json(recivedData.userData);
		} catch (err) {
			next(err);
		}
	};
}
