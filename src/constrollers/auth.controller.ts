import { Request, Response, NextFunction } from "express";
import { loginUserByEmailService, loginUserByNameService, registerUserService } from "../services/auth.service";

export const registerUserController = async (req: Request, res: Response, next: NextFunction) => {
	try {
		//TODO: zod
		const recivedData = await registerUserService(req.body.userRegistrationData);
		res.status(200).json(recivedData);
	} catch (err) {
		next(err);
	}
};
export const loginUserByNameController = async (req: Request, res: Response, next: NextFunction) => {
	try {
		//TODO: zod
		const recivedData = await loginUserByNameService(req.body.userLoginData);
		res.status(200).json(recivedData);
	} catch (err) {
		next(err);
	}
};
export const loginUserByEmailController = async (req: Request, res: Response, next: NextFunction) => {
	try {
		//TODO: zod
		const recivedData = await loginUserByEmailService(req.body.userLoginData);
		res.status(200).json(recivedData);
	} catch (err) {
		next(err);
	}
};
