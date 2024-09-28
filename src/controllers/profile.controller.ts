import { NextFunction, Request, Response } from "express";
import { ProfileService } from "../services/profile.service";

export class ProfileController {
	private _profileService = new ProfileService();
	constructor() {
		this._profileService;
	}
	loadProfile = async (req: Request, res: Response, next: NextFunction) => {
		try {
			const dto = await this._profileService.loadProfile(req.body.id);
			res.status(200).json(dto);
		} catch (err) {
			next(err);
		}
	};
	editProfile = async (req: Request, res: Response, next: NextFunction) => {
		try {
			const dto = await this._profileService.editProfile(req.body.id, req.body.editUserData);
			res.status(200).json(dto);
		} catch (err) {
			next(err);
		}
	};
	uploadProfilePhoto = async (req: Request, res: Response, next: NextFunction) => {
		try {
			await this._profileService.uploadProfilePhoto(req.body.photo, req.body.id);
			res.status(200).json({ success: true });
		} catch (err) {
			next(err);
		}
	};
}
