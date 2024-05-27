import { NextFunction, Request, Response } from "express";
import { acceptInvitationService, cancelInvitationService, loadInvitationsService, rejectInvitationService, sendInvitationService } from "../services/invitation.service";

export const sendInvitationController = async (req: Request, res: Response, next: NextFunction) => {
	try {
		await sendInvitationService(req.body.invitationData);
		res.status(200).json({ success: true });
	} catch (err) {
		next(err);
	}
};
export const acceptInvitationContorller = async (req: Request, res: Response, next: NextFunction) => {
	try {
		await acceptInvitationService(req.body.invitation_id, req.body.id);
		res.status(200).json({ success: true });
	} catch (err) {
		next(err);
	}
};
export const rejectInvitationController = async (req: Request, res: Response, next: NextFunction) => {
	try {
		await rejectInvitationService(req.body.invitation_id, req.body.id);
		res.status(200).json({ success: true });
	} catch (err) {
		next(err);
	}
};
export const cancelInvitationContorller = async (req: Request, res: Response, next: NextFunction) => {
	try {
		await cancelInvitationService(req.body.invitation_id, req.body.id);
		res.status(200).json({ success: true });
	} catch (err) {
		next(err);
	}
};
export const loadInvitationsController = async (req: Request, res: Response, next: NextFunction) => {
	try {
		const invitations = await loadInvitationsService(req.body.id);
		res.status(200).json({ invitaitons: invitations });
	} catch (err) {
		next(err);
	}
};
