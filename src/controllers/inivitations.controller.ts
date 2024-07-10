import { NextFunction, Request, Response } from "express";
import { InvitationService } from "../services/invitation.service";

export class InvitationController {
	private _invitationService = new InvitationService();
	constructor() {
		this._invitationService;
	}
	sendInvitation = async (req: Request, res: Response, next: NextFunction) => {
		try {
			await this._invitationService.sendInvitation({ from_user_id: req.body.id, to_user_id: req.body.toUserID });
			res.status(200).json({ success: true });
		} catch (err) {
			next(err);
		}
	};
	acceptInvitation = async (req: Request, res: Response, next: NextFunction) => {
		try {
			await this._invitationService.acceptInvitation(req.body.invitation_id, req.body.id);
			res.status(200).json({ success: true });
		} catch (err) {
			next(err);
		}
	};
	rejectInvitation = async (req: Request, res: Response, next: NextFunction) => {
		try {
			await this._invitationService.rejectInvitation(req.body.invitation_id, req.body.id);
			res.status(200).json({ success: true });
		} catch (err) {
			next(err);
		}
	};
	cancelInvitation = async (req: Request, res: Response, next: NextFunction) => {
		try {
			await this._invitationService.cancelInvitation(req.body.invitation_id, req.body.id);
			res.status(200).json({ success: true });
		} catch (err) {
			next(err);
		}
	};
	loadInvitations = async (req: Request, res: Response, next: NextFunction) => {
		try {
			const invitations = await this._invitationService.loadInvitations(req.body.id);
			res.status(200).json({ invitaitons: invitations });
		} catch (err) {
			next(err);
		}
	};
}
