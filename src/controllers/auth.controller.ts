import { Request, Response, NextFunction } from "express";
import { loginUserByEmailService, loginUserByNameService, registerUserService } from "../services/auth.service";
import { UserCreationSchema, UserLoginByEmailSchema, UserLoginByNameSchema } from "../entities/user.entity/user.entity";

export const registerUserController = async (req: Request, res: Response, next: NextFunction) => {
	try {
		UserCreationSchema.parse(req.body.userRegistrationData);
		const recivedData = await registerUserService(req.body.userRegistrationData);
		res.status(200).json(recivedData.userData).cookie("authToken", recivedData.accessToken, { secure: true, httpOnly: true });
	} catch (err) {
		next(err);
	}
};
export const loginUserByNameController = async (req: Request, res: Response, next: NextFunction) => {
	try {
		UserLoginByNameSchema.parse(req.body.userLoginData);
		const recivedData = await loginUserByNameService(req.body.userLoginData);
		res.status(200).json(recivedData.userData).cookie("authToken", recivedData.accessToken, { secure: true, httpOnly: true });
	} catch (err) {
		next(err);
	}
};
export const loginUserByEmailController = async (req: Request, res: Response, next: NextFunction) => {
	try {
		UserLoginByEmailSchema.parse(req.body.userLoginData);
		const recivedData = await loginUserByEmailService(req.body.userLoginData);
		res.status(200).json(recivedData.userData).cookie("authToken", recivedData.accessToken, { secure: true, httpOnly: true });
	} catch (err) {
		next(err);
	}
};
