import { NextFunction, Request, Response } from "express";
import { InvitationService } from "../services/invitation.service";

export class InvitationController {
	private _invitationService = new InvitationService();
	sendInvitation = async (req: Request, res: Response, next: NextFunction) => {
		try {
			await this._invitationService.sendInvitation({ fromUserId: req.body.id, toUserId: req.body.toUserID });
			res.status(200).json({ success: true });
		} catch (err) {
			next(err);
		}
	};
	acceptInvitation = async (req: Request, res: Response, next: NextFunction) => {
		try {
			await this._invitationService.acceptInvitation(req.body.invitationId, req.body.id);
			res.status(200).json({ success: true });
		} catch (err) {
			next(err);
		}
	};
	rejectInvitation = async (req: Request, res: Response, next: NextFunction) => {
		try {
			await this._invitationService.rejectInvitation(req.body.invitationId, req.body.id);
			res.status(200).json({ success: true });
		} catch (err) {
			next(err);
		}
	};
	cancelInvitation = async (req: Request, res: Response, next: NextFunction) => {
		try {
			await this._invitationService.cancelInvitation(req.body.invitationId, req.body.id);
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
