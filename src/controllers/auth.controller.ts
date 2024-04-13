import { Request, Response, NextFunction } from "express";
import { loginUserByEmailService, loginUserByNameService, registerUserService } from "../services/auth.service";
import { UserCreationSchema, UserLoginByEmailSchema, UserLoginByNameSchema } from "../entities/user.entity/user.entity";

export const registerUserController = async (req: Request, res: Response, next: NextFunction) => {
	try {
		UserCreationSchema.parse(req.body.userAuthData);
		const recivedData = await registerUserService(req.body.userAuthData);
		res.cookie("authToken", recivedData.accessToken, { secure: false, httpOnly: true, domain: undefined }).status(201).json(recivedData.userData);
	} catch (err) {
		next(err);
	}
};
export const loginUserByNameController = async (req: Request, res: Response, next: NextFunction) => {
	try {
		UserLoginByNameSchema.parse(req.body.userAuthData);
		const recivedData = await loginUserByNameService(req.body.userAuthData);
		res.cookie("authToken", recivedData.accessToken, { secure: false, httpOnly: true, domain: undefined }).status(200).json(recivedData.userData);
	} catch (err) {
		next(err);
	}
};
export const loginUserByEmailController = async (req: Request, res: Response, next: NextFunction) => {
	try {
		UserLoginByEmailSchema.parse(req.body.userAuthData);
		const recivedData = await loginUserByEmailService(req.body.userAuthData);
		res.cookie("authToken", recivedData.accessToken, { secure: false, httpOnly: true, domain: undefined }).status(200).json(recivedData.userData);
	} catch (err) {
		next(err);
	}
};
