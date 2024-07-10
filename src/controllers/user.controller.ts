import { NextFunction, Request, Response } from "express";
import { UserService } from "../services/user.service";

export class UserController {
	private _userService = new UserService();
	constructor() {
		this._userService;
	}
	loadUserData = async (req: Request, res: Response, next: NextFunction) => {
		try {
			const fullUserData = await this._userService.loadUserData(req.body.id);
			res.status(200).json({ fullUserData: fullUserData });
		} catch (err) {
			next(err);
		}
	};
	editUserAdditionalData = async (req: Request, res: Response, next: NextFunction) => {
		try {
			await this._userService.editUserAdditionalData(req.body.id, req.body.editUserData);
			res.status(200).json({ success: true });
		} catch (err) {
			next(err);
		}
	};
	uploadProfilePhoto = async (req: Request, res: Response, next: NextFunction) => {
		try {
			await this._userService.uploadProfilePhoto(req.body.photo, req.body.id);
			res.status(200).json({ success: true });
		} catch (err) {
			next(err);
		}
	};
}
